# 개선 계획서

- 작성: Claude (2026-09-02)
- 근거: [`01-aider-extract.md`](./01-aider-extract.md) — Aider 구조 발췌 + 실측 재확인
- 사슬: **Claude**(계획·설계·판단·게이트) ↔ **GB10/Aider**(기계적 구현)

---

## 0. 진행 상황 (2026-09-02 갱신)

**Phase 0 완료.** 커밋 18개가 `main`에 반영됐다 (`53d7975..7181d27`).
게이트 실측: `pytest 6 passed` · `vitest 7 passed` · `vite build` 통과 · `eslint` 6 → 3 errors.
`T-P0-1` ~ `T-P0-6` 전부 통과.

**배포 방침이 바뀌었다 — Railway 배포를 중단한다.**
Railway 대시보드 확인 결과 트라이얼이 만료됐고(`Limited Access`),
`gijo-tour-app` 서비스는 **4개월 전 빌드 실패 후 오프라인**, Postgres도 오프라인이었다.
즉 백엔드는 오래전부터 죽어 있었고 그동안 화면은 mockDb 로 정상 동작했다.
**현재 제품에 서버 DB가 필요 없다**는 뜻이므로 백엔드 배포를 접는다.

이에 따른 계획 변경:

| 항목 | 변경 |
|---|---|
| 3절 #8 업로드 영속성 (P1-5) | **보류** — 배포할 서버가 없다 |
| 3절 #9 mockDb → DB 이관 (P1-4) | **보류** — 4절 (다)의 전제가 사라졌다 |
| 3절 #4 헬스체크 (P0-5) | 코드는 남기되 `railway.json` 은 삭제됨 |
| 4절 (가) 백엔드 단일화 | 완료 — FastAPI 유지, `server/` 제거 |
| 4절 (나) 인증 (P1-3) | **범위 축소** — 서버가 없으므로 서버 토큰 검증은 불가. 클라이언트 가드 개선만 가능 |

`backend/` 코드와 pytest 6건은 그대로 남긴다. 다시 서버가 필요해지면
호스팅만 새로 붙이면 된다. 프론트는 `VITE_API_URL` 미설정 시 API 호출을
아예 하지 않으므로(`isRailwayApiEnabled()`) 백엔드 부재로 화면이 깨지지 않는다.

**따라서 다음 우선순위는 Phase 2(구조·디자인)와 Phase 3(성능·마감)이다.**
Phase 1은 서버 의존 항목을 제외하면 P1-1(CORS)·P1-2(업로드 검증)만 남는데,
둘 다 배포되지 않는 서버의 코드라 급하지 않다.

---

## 1. 현황 요약

배포는 살아 있고 빌드도 통과한다(`vite build` 207ms, 464KB). 화면 수도 충분하다.
문제는 **뒤쪽이 비어 있다**는 것이다.

- 백엔드가 둘(`backend/` FastAPI, `server/` Express)인데 API도 DB 스키마도 서로 다르다.
  루트 `railway.json`은 FastAPI만 배포한다. Express는 죽은 코드인데 `package.json`의 `start`가 여전히 가리킨다.
- 프론트가 부르는 `/api/guides`, `/api/users`가 배포된 백엔드에 **없다**.
- 화면 데이터의 대부분이 `mockDb.js` 기반 `useState`다. 새로고침하면 사라진다.
- 인증이 전부 클라이언트 판정이다. `localStorage`의 role 값 하나로 관리자 화면에 들어간다.
- 테스트 0개, CI 없음. 즉 **회귀를 잡을 장치가 하나도 없다.**

## 2. 작업 분배 원칙

작업마다 두 가지만 묻는다.

1. **판단이 필요한가?** (설계 결정 / 미적 판단 / 보안 / 여러 파일에 걸친 추론) → **Claude**
2. **대상 파일 합계가 15k 토큰을 넘는가?** → **Claude** (Aider 컨텍스트 32k)

둘 다 아니면 **GB10/Aider**. 지시가 "무엇을 어디에" 수준까지 떨어지는 기계적 작업이 Aider의 자리다.

> GB10을 쓰는 이유는 속도가 아니라 **분리**다. 반복적이고 토큰을 많이 먹는 작업을 떼어내
> 무인으로 돌리고, Claude는 판단과 게이트에 집중한다. 판단이 필요한 일을 Aider에 억지로
> 넘기면 검토 비용이 구현 비용을 넘는다.

참고 — 실측 토큰(≈ chars/3500):

```
backend/main.py 1.3k   models.py 0.5k   schemas.py 0.3k   database.py 0.3k  → 백엔드 전체 2.4k
server/index.js 1.0k   server/db.js 0.4k
railwayApi.js 0.6k     App.jsx 0.9k     Login.jsx 2.7k
GijoTourApp.jsx 3.4k   AdminGuideUserManager.jsx 3.3k     mockDb.js 3.9k
DesignerDashboard.jsx 9.2k
src/index.css 29.3k  ← 단독으로 Aider 컨텍스트 초과
```

백엔드는 전부 합쳐도 2.4k라 Aider에 통째로 넣을 수 있다. 프론트는 파일 단위로 쪼개야 한다.

## 3. 개선 항목

| # | 항목 | 분류 | 심각도 | 영향 파일 | 근거 |
|---|---|---|---|---|---|
| 1 | 두 백엔드가 같은 DB에 서로 다른 `proposals` 스키마를 생성 | 버그 | **P0** | `server/db.js`, `backend/models.py` | 3.1 |
| 2 | `/api/guides`·`/api/users`가 배포 백엔드에 없음 | 버그 | **P0** | `backend/main.py`, `AdminGuideUserManager.jsx` | 01·B절 |
| 3 | 테스트 러너·CI 부재 → 회귀 감지 불가 | DX | **P0** | (신규) | 01·G절 |
| 4 | `railway.json` 헬스체크가 `/api/proposals`(DB 조회) | 운영 | P1 | `railway.json` | 01·E절 |
| 5 | 인증이 전부 클라이언트 판정 | 보안 | P1 | `Login.jsx`, `App.jsx`, `GijoTourApp.jsx` | 01·C절 |
| 6 | CORS `allow_origins=["*"]` + `allow_credentials=True` | 보안 | P1 | `backend/main.py` | 01·E절 |
| 7 | 업로드 파일 검증 없음(확장자·용량·타입) | 보안 | P1 | `backend/main.py` | 01·E절 |
| 8 | 업로드가 컨테이너 로컬 디스크 → 재배포 시 소실 | 버그 | P1 | `backend/main.py` | 01·E절 |
| 9 | mockDb 기반 상태가 새로고침에 소실 | 기능 | P1 | `GijoTourApp.jsx`, `mockDb.js` | 01·D절 |
| 10 | `src/index.css` 4,709줄 단일 파일 | 구조 | P2 | `src/index.css` | 01·F절 |
| 11 | 인라인 `style={{}}` 160곳 | 구조 | P2 | `src/**/*.jsx` | 실측 |
| 12 | 중복 패턴(모달 ESC·토스트·Pill·상태순환) | 구조 | P2 | 다수 | 01·F절 |
| 13 | 라우트 코드 분할 없음 (464KB 단일 번들) | 성능 | P3 | `GijoTourApp.jsx`, `App.jsx` | `vite build` |
| 14 | lint 6 errors | DX | P3 | `eslint.config.js` 외 | 01·G절 |
| 15 | 미완결 기능(`PaymentPage` 스텁, `SizeControl` 미배선) | 기능 | P3 | 해당 파일 | 01·H절 |

### 3.1 항목 1 상세 — 왜 P0인가

두 백엔드 모두 `proposals` 테이블을 **"없으면 생성"** 방식으로 만든다.

```
server/db.js       proposals(id BIGSERIAL, rating NUMERIC, review_count INT,
                             customer_request JSONB, detailed_plan JSONB,
                             status, created_at, updated_at)

backend/models.py  proposals(id Integer, title, region, price, duration,
                             designer_name, status, description)
```

`CREATE TABLE IF NOT EXISTS`도 `Base.metadata.create_all()`도 **기존 테이블을 변경하지 않는다.**
같은 `DATABASE_URL`을 보는 순간 먼저 만든 쪽의 스키마가 남고, 나머지는 조용히 실패한다.
지금은 Express가 배포되지 않아 터지지 않고 있을 뿐이다. 누군가 `npm start`를 운영에서 한 번만
실행해도 재현된다. **백엔드 단일화가 다른 모든 작업의 선행 조건이다.**

## 4. 갈림길과 추천

### (가) 어느 백엔드를 남길 것인가

| | A. FastAPI(`backend/`) 유지 | B. Express(`server/`) 유지 |
|---|---|---|
| 비용 | `guides`/`users` 엔드포인트 이식 | `matching-requests`·`videos`·`upload` 전부 이식 |
| 리스크 | 낮음 — 이미 배포 중인 코드 | 높음 — 배포 설정부터 다시 |
| 잃는 것 | JSONB 컬럼(`customer_request`, `detailed_plan`) — **현재 아무도 안 씀** | 이미 도는 서비스 |

**추천: A.** 실제 배포본이고 이식할 코드가 더 적다. `server/`는 삭제하고 `package.json`의
`start`/`server` 스크립트도 함께 정리한다. JSONB가 나중에 필요하면 SQLAlchemy의 `JSON` 타입으로 되살릴 수 있다.

### (나) 인증을 어디까지 올릴 것인가

| | A. 전면 서버 인증 | B. 관리자만 서버 검증 | C. 현행 유지 |
|---|---|---|---|
| 비용 | 큼 (가입·비밀번호·복구·세션) | 중간 (로그인 1개 + 토큰 + 관리자 API 보호) | 0 |
| 리스크 | 범위가 커서 다른 작업을 밀어냄 | — | 관리자 화면이 사실상 공개 |

**추천: B.** 지금 실질 피해는 "누구나 관리자 화면에 들어간다" 하나다.
서버 로그인 엔드포인트 + 토큰 + 관리자 API 의존성 검사 선에서 끊는다.
설계사 계정 체계는 실사용자가 생긴 뒤에 판단한다.

### (다) mockDb를 어디까지 DB로 옮길 것인가

**추천: 공지(`notices`)와 제안(`proposals`)만 우선.** 이 둘은 사용자가 직접 만들고
사라지면 바로 체감한다. `packages`·`designers`는 사실상 콘텐츠라 당분간 mockDb로 둔다.
후기(`reviews`)는 제안 이관 이후로 미룬다.

### (라) `index.css` 4,709줄을 어떤 축으로 쪼갤 것인가

**추천: 이미 존재하는 축을 따라간다.** `tour-theme.css` / `dashboard.css` / `PremiumLanding.css`가
이미 도메인별로 분리돼 있다. 새 축(레이어별·컴포넌트별)을 도입하면 기존 3개와 규칙이 충돌한다.
`index.css`는 **전역 토큰 + 리셋 + 공용 유틸만** 남기고 화면별 규칙을 해당 도메인 CSS로 옮긴다.
CSS 변수 228개가 이미 있으므로 토큰 체계는 새로 만들지 말고 정리만 한다.

## 5. 실행 계획

### Phase 0 — 지혈 + 게이트 세우기

**목표:** 어느 백엔드를 켜도 화면이 깨지지 않게 하고, 회귀를 잡을 장치를 만든다.

```
[P0-1] 백엔드 단일화 — Express 제거
  담당: Claude   (판단 필요: 무엇을 지우고 무엇을 이식할지)
  대상: server/ 삭제, package.json 수정, railway.json 중복 정리
  완료 판정: T-P0-1

[P0-2] guides / users 엔드포인트를 FastAPI로 이식
  담당: Aider    대상 파일 합계 2.4k tok
  대상: backend/models.py, backend/schemas.py, backend/main.py
  지시: server/index.js 30~105행의 guides·users CRUD와 server/db.js의 테이블 정의를
        SQLAlchemy 모델 + Pydantic 스키마 + FastAPI 라우터로 옮긴다.
        경로·메서드·필드명은 railwayApi.js가 부르는 것과 정확히 일치시킨다.
        users 테이블명은 users_crm 을 따른다.
  의존: [P0-1]   난이도: M   완료 판정: T-P0-2, T-P0-3

[P0-3] 테스트 러너 도입
  담당: Claude   (판단 필요: 러너 선택과 구조 결정)
  대상: package.json, vite.config.js, backend/requirements.txt, (신규) 설정 파일
  내용: 프론트 Vitest, 백엔드 pytest. 스모크 테스트 1개씩으로 배선만 확인한다.
  완료 판정: T-P0-4

[P0-4] API 계약 테스트 작성
  담당: Aider    대상 파일 합계 2.0k tok
  대상: src/services/railwayApi.js(읽기), (신규) 계약 테스트 파일
  지시: railwayApi가 호출하는 모든 경로를 뽑아 FastAPI 앱의 라우트 목록과 대조해
        누락이 있으면 실패하는 테스트를 작성한다.
  의존: [P0-2], [P0-3]   난이도: S   완료 판정: T-P0-5

[P0-5] 헬스체크 연결
  담당: Aider    대상 파일 합계 0.2k tok
  대상: railway.json
  지시: healthcheckPath 를 /api/proposals 에서 /health 로 바꾼다.
  의존: [P0-1]   난이도: S   완료 판정: T-P0-6
```

### Phase 1 — 보안과 영속성

**목표:** 관리자 화면을 실제로 잠그고, 사용자가 만든 데이터가 남게 한다.

```
[P1-1] CORS 출처 제한
  담당: Aider    0.3k tok    대상: backend/main.py
  지시: allow_origins 를 환경변수 ALLOWED_ORIGINS(쉼표 구분)에서 읽게 한다.
        미설정 시 http://localhost:5173 만 허용. allow_credentials 는 유지.
  난이도: S   완료 판정: T-P1-1

[P1-2] 업로드 검증
  담당: Aider    0.5k tok    대상: backend/main.py
  지시: 확장자 화이트리스트(jpg/jpeg/png/webp/gif), 최대 5MB, Content-Type 검사 추가.
        위반 시 HTTPException(400). 파일명은 기존대로 uuid4 로 생성.
  난이도: S   완료 판정: T-P1-2

[P1-3] 서버 로그인 + 관리자 API 보호
  담당: Claude   (보안 판단 필요)
  대상: backend/(신규 auth), backend/main.py, Login.jsx, App.jsx
  완료 판정: T-P1-3, T-P1-4

[P1-4] 공지·제안 DB 이관
  담당: Claude 설계 → Aider(백엔드 2.4k) → Claude(프론트 상태 배선 3.4k)
  완료 판정: T-P1-5

[P1-5] 업로드 영속성
  담당: Claude   (인프라 판단 필요 — Railway 볼륨 vs 외부 스토리지)
  완료 판정: T-P1-6
```

### Phase 2 — 구조와 디자인

**목표:** 이후 디자인 작업이 컨텍스트에 들어가게 만든다.

```
[P2-1] index.css 분할              담당: Claude  (29.3k tok — Aider 불가)
[P2-2] 인라인 style 160곳 → CSS    담당: Aider   (파일 단위 순차 투입, 각 1~9k tok)
[P2-3] 중복 패턴 추출              담당: Aider   (useEscapeClose, Toast, Pill, useStatusCycle)
[P2-4] 디자인 시스템 정리          담당: Claude  (CSS 변수 228개 감사 → design 스킬 적용)
```

### Phase 3 — 성능·운영·마감

```
[P3-1] 라우트 코드 분할(React.lazy)  담당: Aider   (App.jsx 0.9k + GijoTourApp.jsx 3.4k)
[P3-2] lint 0 만들기                 담당: Aider   (eslint.config.js에 node globals 추가 외)
[P3-3] GitHub Actions CI             담당: Claude  (배포 사슬에 영향 — 판단 필요)
[P3-4] 미완결 기능 정리              담당: Claude  (PaymentPage·SizeControl 존치/제거 결정)
```

## 6. 손대지 않을 것 (Non-goals)

- 결제 실연동(PayPal 등) — 사업 결정이 선행돼야 한다
- `packages`·`designers` 콘텐츠의 DB 이관 — 실사용자 확보 후
- 프론트 프레임워크·빌드 도구 교체
- `public/GIJO_Drink_v3_0_1.html` — 용도 미확인. 제거 전에 확인 필요
- `src/labs/` (GijoLab·GijoResearch, 1,428줄) — 이번 범위 밖

## 7. 되돌리기

- Aider 작업은 작업당 1커밋이므로 `git revert <sha>` 로 개별 롤백된다
- Phase 0 착수 전 `git tag pre-phase0` 를 찍는다
- **배포 후 확인**(매 Phase 종료 시):
  1. Railway `/health` 200
  2. 랜딩 매칭 신청 제출 → 관리자 화면에 노출
  3. 관리자 가이드/사용자 목록 로드
  4. Netlify 프론트 첫 페인트 정상
- 배포는 `main` 푸시로 자동 진행되므로 **푸시 전 반드시 사용자 확인**을 받는다
