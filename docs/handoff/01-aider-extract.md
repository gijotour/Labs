# 1단계 · Aider 코드 발췌 리포트

- 생성 도구: `aider 0.86.2` — `aider --show-repo-map --map-tokens 8192`
- 대상: `gijo-tour-app` (git worktree, 85 files)
- 원본 발췌 전문: [`00-aider-repomap.txt`](./00-aider-repomap.txt) (1,173줄)
- 이 문서의 "검증 사실"은 Aider 발췌 후 실제 파일/명령으로 재확인한 것만 기록함

---

## A. 시스템 구성 (실측)

| 레이어 | 경로 | 스택 | 배포 |
|---|---|---|---|
| 프론트 | `src/` | React 19.2 + Vite 8 + react-router-dom 7, 순수 CSS | Netlify (`netlify.toml`, publish=`dist`, SPA redirect) |
| 백엔드 A | `backend/` | FastAPI + SQLAlchemy + SQLite/Postgres | **Railway (실제 배포됨)** — 루트 `railway.json`의 `startCommand: cd backend && uvicorn main:app` |
| 백엔드 B | `server/` | Express 4 + `pg` | **배포 안 됨** (단, `package.json`의 `start`/`server` 스크립트가 여기를 가리킴) |
| 정적 유틸 | `spa_server.py`, `start.sh`, `stop.sh`, `status.sh` | Python http.server / 셸 | 로컬 전용 |

프론트가 호출하는 단일 API 클라이언트: `src/services/railwayApi.js`
(`VITE_API_URL` 미설정 시 `isRailwayApiEnabled()`가 false → 호출 자체를 차단)

---

## B. API 계약 대조표 (핵심 발견)

`railwayApi.js`가 호출하는 엔드포인트 vs 각 백엔드가 실제로 구현한 엔드포인트.

| 엔드포인트 | 프론트 호출 | `backend/main.py` (배포됨) | `server/index.js` (미배포) |
|---|---|---|---|
| `GET/POST /api/proposals` | O | O (37, 41행) | O (15, 20행) |
| `GET/POST /api/matching-requests` | O | O (49, 54행) | **X** |
| `PATCH /api/matching-requests/{id}` | O | O (67행) | **X** |
| `GET/POST/PATCH/DELETE /api/guides` | O | **X** | O (30~68행) |
| `GET/POST/PATCH/DELETE /api/users` | O | **X** | O (69~105행) |
| `GET/POST /api/videos` | X (미사용) | O (81, 85행) | X |
| `POST /api/upload` | X (미사용) | O (118행) | X |
| `GET /health` | X | **X** | O (11행) |

**결론:** 배포된 FastAPI에는 `/api/guides`, `/api/users`가 없다.
→ `src/tour-app/AdminGuideUserManager.jsx`(290줄)는 `VITE_API_URL`이 설정된 순간
   `Promise.all([getGuides(), getUsers()])`에서 404로 전면 실패한다.
반대로 Express를 띄우면 랜딩의 매칭 신청(`createMatchingRequest`)이 죽는다.
**두 백엔드 중 어느 쪽을 켜도 화면 일부가 반드시 깨지는 상태.**

---

## C. 상태·인증 발췌

### 세션 (`src/App.jsx` 11~53행)
```js
const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('gijo_auth') === 'true');
const [userRole,   setUserRole]   = useState(() => localStorage.getItem('gijo_role') || 'designer');
const [userName,   setUserName]   = useState(() => localStorage.getItem('gijo_user_name') || '방문객');
useEffect(() => { localStorage.setItem('gijo_auth', isLoggedIn); /* role, user_name 동일 */ });
```

### 로그인 (`src/tour-app/Login.jsx` 12~50행) — 전부 클라이언트 판정
```js
if (inputId.toLowerCase() === 'admin') {
  if (pw !== 'admin') { setLoginError('관리자 비밀번호가 올바르지 않습니다.'); return; }
  onLoginSuccess('admin', '관리자');
}
// 설계사: activeDesigners 배열에 이름이 있거나 id === 'demo' 이면 통과 (비밀번호 미검증)
```

### 라우트 가드 (`src/tour-app/GijoTourApp.jsx` 44행 주석 + `RequireRole`)
```js
// 주의: localStorage의 값을 신뢰하는 클라이언트 측 가드이므로 실제 보안 장치가 아니다.
function RequireRole({ isLoggedIn, userRole, allow, children }) {
  if (!isLoggedIn || !allow.includes(userRole)) return <Navigate to="/gijotour/login" replace />;
  return children;
}
```
→ 서버 토큰·세션 없음. `localStorage.gijo_role = 'admin'` 한 줄로 관리자 화면 진입 가능.

### 그 외 localStorage 영속 데이터 (서버 미연동)
- `gijo_admin_settings` — `components/AdminSettings.jsx` 33·45·53행
- `gijo_tv_comments` — `DesignerTV.jsx` 11·19행

---

## D. 데이터 소스 이중화

`src/data/mockDb.js`(253줄)가 여전히 실데이터 원본. `GijoTourApp.jsx`의 상태
(`packages`, `notices`, `designers`, `pendingDesigners`, `designerProposals`, `tvVideos`)는
모두 mockDb 기반 `useState`이며, 서버로 나가는 것은 `createMatchingRequest` 하나뿐
(`GijoTourApp.jsx` 97~120행). 새로고침하면 승인·제안·후기·공지가 전부 사라진다.

ID 생성도 3가지가 혼재:
```js
id: Date.now()                                        // DesignerDashboard, Login 가입
id: prev.reduce((max, n) => Math.max(max, n.id ?? 0), 0) + 1   // notices, proposals, designers
id: BIGSERIAL / Integer PK                            // server/db.js, backend/models.py
```

---

## E. 백엔드 세부 (`backend/`)

```python
# main.py 22~28  — 전 출처 허용 + 자격증명 허용 (브라우저가 거부하는 조합, 보안상 부적절)
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True,
                   allow_methods=["*"], allow_headers=["*"])

# main.py 31~34  — 업로드를 컨테이너 로컬 디스크에 저장
UPLOAD_DIR = "uploads"; os.makedirs(UPLOAD_DIR, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

# main.py 94~96, 121~123 — 확장자 검증·용량 제한·타입 화이트리스트 없음
ext = file.filename.split('.')[-1]
filename = f"{uuid.uuid4()}.{ext}"
shutil.copyfileobj(file.file, buffer)

# database.py 17 — 마이그레이션 없음. models.Base.metadata.create_all() 로만 스키마 생성
engine = create_engine(DATABASE_URL, connect_args=connect_args)
```
- Railway 컨테이너는 재배포 시 파일시스템이 초기화됨 → 업로드 이미지 영구 소실
- `healthcheckPath`가 `/api/proposals` (DB 조회를 헬스체크로 사용). 전용 `/health` 없음
- `railway.json`이 루트와 `backend/` 두 곳에 존재하고 내용이 다름 (multiRegion·runtime V2 차이)

---

## F. 프론트 규모 / 코드 냄새 (`wc -l` 실측)

```
4709  src/index.css                      ← 전역 CSS 단일 파일
 948  src/labs/GijoResearch.jsx
 668  src/tour-app/DesignerDashboard.jsx  ← 폼·목록·모달·업로드 한 파일
 641  src/tour-app/dashboard.css
 557  src/tour-app/DesignerShowcase.jsx   ← 모달 3종 + 후기 폼
 509  src/tour-app/NoticeBoard.jsx
 480  src/labs/GijoLab.jsx
 375  src/tour-app/DesignerTV.jsx
 368  src/tour-app/components/AdminSettings.jsx   ← 인라인 style 다수
 340  src/tour-app/GijoTourApp.jsx         ← 전역 상태 허브
합계 13,666줄 (src)
```

반복 패턴 (중복 후보):
- 상태 순환 토글이 3곳에 각각 구현: `AdminPanel.toggleStatus`, `AdminGuideUserManager.cycleGuide/cycleUser`, `AdminCSCenter.advanceStatus`
- ESC 키로 모달 닫기 `useEffect`가 3곳 복붙: `DesignerShowcase`, `DesignerTV`, `NoticeBoard`
- 토스트 상태(`useState('')` + 자동 소멸)가 `AdminPanel`, `DesignerShowcase`, `AdminSettings`에 개별 존재
- `Pill` 상태 배지 컴포넌트가 `AdminPanel`, `AdminGuideUserManager`에 중복 정의

---

## G. 품질 게이트 실측

`npm run lint` → **6 errors**
```
server/db.js       6:21, 7:8   'process' is not defined   (eslint.config.js에 node globals 미등록)
server/index.js    9:14        'process' is not defined
src/App.jsx        11:19       'setUiScale' 미사용        (uiScale 조절 기능이 배선되다 만 흔적)
src/shared/Footer.jsx        2:8   'logo' 미사용
src/shared/SizeControl.jsx   6:9   'scales' 미사용         (SizeControl이 실제로 동작하지 않음)
```
테스트: **없음** (테스트 러너·테스트 파일 0개)
CI: **없음** (`.github/workflows` 없음)

---

## H. 미완결 흔적

- `PaymentPage.jsx` — `handlePayment()`가 `setStep(2)`만 수행. 주석: `// PayPal MCP 연동 시 이 부분에 로직이 들어갈 예정`
- `SizeControl.jsx` / `App.jsx` — UI 배율 기능이 상태만 있고 미배선
- `public/GIJO_Drink_v3_0_1.html` — 라우팅과 무관한 단독 HTML 잔존
- `.env.example` 기준 외부 연동은 `VITE_KAKAO_CHANNEL_URL`, `VITE_API_URL` 둘뿐
