# 테스트 명세

각 작업이 "됐다"를 무엇으로 판정하는지 정의한다. 테스트 **코드**는 여기 쓰지 않는다.
Aider가 이 명세를 보고 코드를 작성하고, Claude가 실행 결과로 게이트를 통과시킨다.

계획서의 작업 ID(`P0-1` 등)와 1:1로 대응한다 → [`03-plan.md`](./03-plan.md)

---

## Phase 0

### [T-P0-1] Express 백엔드가 완전히 제거됐다
- 대상: `P0-1`
- 종류: 수동 + 정적 검사
- 절차:
  1. `server/` 디렉터리가 존재하지 않는다
  2. `package.json`의 `scripts`에 `node server/index.js`를 부르는 항목이 없다
  3. `package.json`의 `dependencies`에서 `express`, `pg`, `cors`가 제거됐다
  4. `npm install && npm run build` 가 성공한다
- 기대: 위 4가지 모두 참. 프론트 번들 크기가 이전(464KB)보다 커지지 않는다

### [T-P0-2] guides CRUD가 배포 백엔드에서 동작한다
- 대상: `P0-2`
- 종류: 통합 (pytest + FastAPI TestClient)
- 전제: 빈 테스트 DB
- 절차:
  1. `POST /api/guides` 로 `{name, region, role, phone, memo}` 생성
  2. `GET /api/guides` 로 목록 조회
  3. `PATCH /api/guides/{id}` 로 `{status: "Active"}` 변경
  4. `DELETE /api/guides/{id}`
  5. `GET /api/guides` 재조회
- 기대:
  - 1) 201 또는 200, 응답에 `id`가 있고 `status` 기본값이 `"Pending"`
  - 2) 방금 만든 항목이 목록에 있다
  - 3) 200, 응답의 `status`가 `"Active"`
  - 4) 200 또는 204
  - 5) 삭제한 항목이 목록에 없다

### [T-P0-3] users CRUD가 배포 백엔드에서 동작한다
- 대상: `P0-2`
- 종류: 통합
- 절차: T-P0-2와 동일한 흐름을 `/api/users` 에 대해 수행. 생성 필드는 `{name, type, contact, request}`
- 기대:
  - 생성 시 `type` 기본값 `"Customer"`, `status` 기본값 `"Lead"`
  - 나머지는 T-P0-2와 동일
  - **추가:** 테이블명이 `users_crm` 이어야 한다 (Postgres 예약어 `user` 회피)

### [T-P0-4] 테스트 러너가 배선됐다
- 대상: `P0-3`
- 종류: 수동
- 절차: `npm test` 와 `pytest` 를 각각 실행
- 기대: 둘 다 0개가 아닌 테스트를 수집하고 exit code 0으로 끝난다.
  "테스트 없음"으로 통과하는 것은 실패로 간주한다

### [T-P0-5] 프론트가 부르는 모든 엔드포인트가 백엔드에 존재한다 ★
- 대상: `P0-4`
- 종류: 단위 (계약 테스트)
- 전제: 없음. 네트워크 호출 없이 정적으로 대조한다
- 절차:
  1. `src/services/railwayApi.js` 에서 `request(...)`에 넘기는 모든 경로와 메서드를 수집
  2. FastAPI 앱의 라우트 목록(`app.routes`)을 수집
  3. 1)의 각 (메서드, 경로)가 2)에 있는지 대조. 경로 파라미터(`{id}`)는 패턴으로 매칭
- 기대: 누락이 0건. 누락이 있으면 **어떤 경로가 없는지 이름을 찍고 실패**한다
- 비고: 이 테스트가 있었다면 `/api/guides`·`/api/users` 부재를 배포 전에 잡았다.
  **회귀 방지의 핵심 항목이므로 CI 필수 대상.**

### [T-P0-6] 헬스체크가 DB를 건드리지 않는다
- 대상: `P0-5`
- 종류: 통합 + 수동
- 절차:
  1. `GET /health` 호출
  2. `railway.json` 의 `healthcheckPath` 값 확인
  3. DB 연결이 끊긴 상태에서 `GET /health` 호출
- 기대: 1) 200 `{"status":"ok"}` / 2) `/health` / 3) **여전히 200** (DB 무관)

---

## Phase 1

### [T-P1-1] CORS가 지정한 출처만 허용한다
- 대상: `P1-1`
- 종류: 통합
- 절차:
  1. `ALLOWED_ORIGINS` 미설정 상태에서 `Origin: http://localhost:5173` 으로 프리플라이트
  2. 같은 상태에서 `Origin: https://evil.example.com` 으로 프리플라이트
  3. `ALLOWED_ORIGINS=https://a.example.com,https://b.example.com` 설정 후 각각 요청
- 기대:
  - 1) `Access-Control-Allow-Origin` 이 `http://localhost:5173`
  - 2) 허용 헤더가 **없다** (와일드카드 `*` 가 나오면 실패)
  - 3) a·b 는 허용, 그 외는 거부

### [T-P1-2] 업로드가 검증된다
- 대상: `P1-2`
- 종류: 통합
- 절차: `POST /api/upload` 에 아래를 각각 전송
  1. 정상 PNG (1KB)
  2. `.exe` 파일
  3. 확장자는 `.png` 지만 Content-Type 이 `application/x-msdownload`
  4. 6MB PNG
- 기대: 1) 200 + `url` 반환 / 2) 400 / 3) 400 / 4) 400.
  거부된 경우 **디스크에 파일이 남지 않아야 한다**

### [T-P1-3] 관리자 API가 토큰 없이는 막힌다
- 대상: `P1-3`
- 종류: 통합
- 절차: 관리자 전용 엔드포인트를 (1) 토큰 없이 (2) 잘못된 토큰으로 (3) 유효한 관리자 토큰으로 호출
- 기대: 1) 401 / 2) 401 / 3) 200

### [T-P1-4] localStorage 조작만으로 관리자 화면 데이터를 못 본다
- 대상: `P1-3`
- 종류: 수동
- 절차:
  1. 로그아웃 상태에서 devtools 콘솔로 `gijo_auth`, `gijo_role` 을 관리자 값으로 설정
  2. `/gijotour/admin` 으로 이동
- 기대: 화면이 열리더라도 **서버 데이터는 하나도 로드되지 않는다**(401).
  라우트 가드가 클라이언트 측이라는 사실 자체는 변하지 않으므로,
  판정 기준은 "화면 진입 차단"이 아니라 **"데이터 노출 차단"** 이다

### [T-P1-5] 공지·제안이 새로고침 후에도 남는다
- 대상: `P1-4`
- 종류: 수동
- 절차: 공지 1건 + 제안 1건 작성 → 브라우저 새로고침 → 다른 브라우저(또는 시크릿창)로 접속
- 기대: 두 경우 모두 작성한 항목이 보인다

### [T-P1-6] 업로드 이미지가 재배포 후에도 살아있다
- 대상: `P1-5`
- 종류: 수동
- 절차: 이미지 업로드 → URL 기록 → Railway 재배포 → 해당 URL 재요청
- 기대: 200 + 동일 이미지. 404면 실패

---

## Phase 2 · 3

### [T-P2-1] CSS 분할이 화면을 바꾸지 않았다
- 대상: `P2-1`, `P2-2`
- 종류: 수동 (시각 회귀)
- 절차: 분할 **전**에 주요 화면 스크린샷을 남기고, 분할 후 같은 화면을 같은 뷰포트로 다시 촬영해 대조.
  대상 화면: `/`, `/gijotour`, `/gijotour/login`, `/gijotour/admin`, `/gijotour/designer`, `/security`
- 기대: 의도한 변경 외 차이 없음. `npm run build` 후 CSS 총량이 이전(89.81KB)보다 증가하지 않는다

### [T-P3-1] 라우트 분할이 번들을 줄였다
- 대상: `P3-1`
- 종류: 수동
- 절차: `npm run build` 출력 확인
- 기대: 초기 진입 청크가 464KB보다 작다. 라우트별 청크가 2개 이상 생성된다.
  모든 라우트가 여전히 정상 렌더된다

### [T-P3-2] lint가 깨끗하다
- 대상: `P3-2`
- 종류: 수동
- 절차: `npm run lint`
- 기대: exit code 0, 0 errors. **경고를 끄는 방식으로 통과시키면 실패**로 간주한다
  (미사용 변수는 실제로 제거하거나 배선한다)

---

## 게이트 규칙

- Phase는 그 Phase의 모든 T 항목이 통과해야 종료된다
- Aider 작업 직후 Claude가 `git show` 로 diff를 확인하고, 해당 T 항목을 실행한다
- 실패 시 `git revert` 후 지시를 다듬어 재투입한다. 같은 작업을 3회 실패하면 Claude가 직접 구현한다
- **자동화된 항목(T-P0-5 포함)은 CI에 올린다.** 수동 항목은 배포 전 체크리스트로 관리한다
