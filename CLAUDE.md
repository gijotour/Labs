한글로 답변

깃허브 배포는 항상확인

## 제품 구조 — 이건 전제다

**GIJO LABS 가 상위 브랜드다. 랜딩은 https://gijo.co.kr/ 이고, 이 저장소의 `/` 가 그 화면이다.**

> **화면에 쓰는 상위 브랜드 표기는 `GIJO Tour LaB` 이다** (2026-09-02 확정).
> 코드 주석과 이 문서는 구조를 설명할 때 `GIJO LABS` 를 계속 쓴다. 같은 대상이다.
> 투어 내비의 `GIJO TOUR / PREMIUM TRAVEL` 은 상위 브랜드가 아니라 **서비스 이름**이라 바꾸지 않는다.

**지아이조 투어(`/gijotour`)는 GIJO LABS 아래 서비스 하나일 뿐이다. 서비스는 앞으로 늘어난다.**

저장소 이름과 히스토리가 `gijotour` 중심이라 투어가 곧 제품인 것처럼 보이지만 아니다.
작업할 때 이 구분을 흐리지 말 것.

```
GIJO LABS  (gijo.co.kr)
├── /                    Labs 허브        src/labs/GijoLab.jsx
├── /security  /llm      연구 포털        src/labs/GijoResearch.jsx
└── /gijotour/*          지아이조 투어    src/tour-app/       ← 서비스 하나
    (앞으로 여기에 서비스가 더 붙는다)
```

### 서비스 경계 규칙

1. **`src/App.jsx` 는 Labs 셸이다. 어떤 서비스의 상태도 두지 않는다.**
   인증·세션·도메인 데이터·내비게이션바·푸터는 각 서비스가 자기 안에서 소유한다.
   서비스 추가는 `App.jsx` 의 `SERVICES` 배열에 한 줄 넣는 것으로 끝나야 한다.
   그 파일의 다른 곳을 고쳐야 한다면 경계가 새고 있다는 신호다.
   `<Routes key>` 는 주소의 **첫 마디**(`/gijotour`, `/aster` …)만 쓴다. 전체 주소로 되돌리면
   서비스 안에서 화면만 옮겨도 서비스가 통째로 새로 그려져 상태를 잃는다
   (2026-11-24: 투어에서 고른 상품이 결제 화면에 못 가고 첫 화면으로 튕겼다).

2. **크롬(내비·푸터)을 "Labs 화면이 아니면 붙인다" 식으로 판단하지 않는다.**
   부정 목록은 새 서비스가 추가될 때 조용히 잘못된 크롬을 물려준다.

3. **`localStorage` 키에는 서비스 접두사를 붙인다.** 투어는 `gijotour_*`.
   접두사 없는 `gijo_*` 는 서비스가 늘면 충돌한다.

4. **`src/shared/` 에는 진짜 여러 서비스가 쓰는 것만 둔다.**
   한 서비스만 쓰면 그 서비스 폴더로 내린다.

### 지아이조 투어는 체험판이다 (2026-11-24)

- 설계사·후기·가격·공지·영상은 예시(`src/data/mockDb.js`)이고, 신청·결제·로그인을 받을 서버가 없다.
- `src/tour-app/demo.js` 의 `TOUR_DEMO` 하나로 체험판 띠, 로그인·관리 화면 닫기, 제휴 신청·평점·의견 막기,
  예시 영상 재생 막기가 함께 켜진다. 실제 서비스를 열 때 `false` 로 바꾼다.
- 받아 줄 곳이 없는 기능은 **받는 척하지 않는다**(「접수 완료」「결제 완료」 화면을 띄우지 않는다).
- 실제 문의 창구(카카오 채널 등)가 정해지기 전까지 푸터는 「문의 창구 준비 중」이다.
  없는 주소·자리 채움 번호를 다시 넣지 않는다.

### 알려진 잔여 문제

- Labs 토큰(`src/labs/lab-theme.css`)과 투어 토큰(`src/tour-app/tour-theme.css`)은 값이 같은 사본이다.
  2026-11-22 에 Labs 가 투어 CSS 를 import 하던 것을 끊으면서 나눴다. 톤을 바꿀 때는 두 파일을 같이 본다.
- 투어의 지연 로드 화면(`DashboardShell` · `DesignerTV` · `AdminGuideUserManager`)은 `tour-theme.css` 를
  다시 import 하지 않는다. import 하면 테마가 별도 조각으로 떨어져 랜딩 CSS **뒤에** 실리고,
  `.tour-surface h2` 와 `.t-form__head h2` 처럼 무게가 같은 규칙의 승패가 뒤집힌다.
- `src/styles/05-payment-lab-hub.css` 에 섞여 있던 예전 Labs 랜딩(`.lab-*`) 규칙은 어느 화면도 쓰지 않아
  2026-11-24 에 걷어냈다(계산된 스타일 대조로 화면 불변 확인). 파일 이름은 그대로 둔다.
  `:root` 의 `--lab-accent` · `--lab-gradient` 도 이제 쓰는 곳이 없지만 01 파일은 건드리지 않았다.

## CSS 를 건드릴 때

`src/index.css` 는 `@import` 순서만 정의하는 파일이다. 규칙은 `src/styles/01-…` ~ `08-…` 에 있다.

**파일 순서를 바꾸거나 규칙을 다른 조각으로 옮기지 말 것.** 원본 4,709줄은 뒤 규칙이 앞 규칙을
덮어쓰는 누적 구조였다. 셀렉터 91개가 중복 정의돼 있고 그중 54개는 1000줄 이상 떨어져 있다
(`.nav-links` 5곳, `.sidebar-nav-elite` 6곳, `:root` 4곳). 순서가 바뀌면 빌드는 통과하는데
화면만 달라진다.

CSS 를 리팩터링했다면 **빌드 산출물을 바이트 단위로 대조**해 렌더가 안 변했음을 증명할 것.
바이트가 달라질 수밖에 없는 정리(쓰지 않는 규칙 지우기 등)는 실제 브라우저로 대조한다:
`npm run snap:style -- before.json` → 수정·빌드 → `npm run snap:style -- after.json --compare before.json`
→ 「바뀐 화면 0」. 이 PC 의 Chrome 을 쓰며, 자세한 것은 `scripts/style-snapshot.mjs` 머리말.

```bash
npm run build && sha256sum dist/assets/index-*.css
```

## 배포

프론트만 배포한다. `main` 푸시 → Netlify 자동 배포.
**백엔드는 배포하지 않는다** (Railway 중단, 2026-09-02). `backend/` 코드와 테스트는 남아 있다.
자세한 절차는 `deploy` 스킬 참조.

배포 전 게이트 — 하나라도 실패하면 푸시하지 않는다.

```bash
npm run lint     # 오류 0 (2026-11-22 확인). 하나라도 나오면 차단
npm run build
npm test                                          # vitest
cd backend && .venv/Scripts/python -m pytest -q   # pytest (계약 테스트 포함)
# backend/.venv 가 없으면: cd backend && python -m venv .venv && .venv/Scripts/python -m pip install -r requirements-dev.txt
```

## 스킬 등록 시

새 스킬을 등록하면 아래 3가지를 **반드시 함께 안내한다.** 스킬만 넣고 끝내지 않는다.

1. **기존 스킬과의 관계** — 이미 있는 스킬과 역할이 겹치는지, 겹치면 어느 쪽을 언제 쓰는지
2. **사용법** — 어떤 말로 불러지는지(트리거 문구 예시), 자동 호출인지 `/이름` 직접 호출인지
3. **적용 범위** — 프로젝트 스킬(팀 공유)인지 개인 스킬인지, 언제부터 적용되는지

전체 목록·배치 기준·추가 방법은 `.claude/skills/README.md` 참조.
스킬을 추가하거나 지우면 그 문서도 같이 갱신한다.
