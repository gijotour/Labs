# 다음 작업 목록

> **2026-09-02 갱신 — 추천 순서 5건을 전부 실행했다.**
>
> | | 작업 | 커밋 | 결과 |
> |---|---|---|---|
> | N-1 | CI | `6b7175e` | Actions 4잡. 이후 푸시 전부 통과 |
> | N-2 | 이미지 압축 | `b4bbba7` | dist 4.3MB -> 1.8MB |
> | N-9 | 라우트 분할 | `6871393` `e05c721` | 진입 JS 433KB -> 198KB |
> | N-5 | CSS 정리 | `c1ee7b0` | 검증 도구 도입 + 최악 구간 병합 |
> | N-3 | 투어 리디자인 | `7316377` | Footer / Login / 랜딩 정리 |
>
> **실행하며 이 문서의 전제 두 개가 틀린 것으로 드러났다. 아래 각 항목에 적어 뒀다.**
> 남은 것은 N-4 · N-6 · N-7 · N-8 · N-10 · N-11 이고, 그중 N-4 와 N-10 은
> 여전히 제품 결정이 먼저다.

- 기준일: 2026-09-02, `main` = `e6aa655`
- 모든 수치는 이 시점 실측이다. 추정치는 "추정"이라고 표시했다.
- 담당 기준은 [`03-plan.md`](./03-plan.md) 2절 그대로:
  판단이 필요하거나 대상 파일이 15k 토큰을 넘으면 **Claude**, 그 외 기계적 작업은 **Aider**(GB10)

---

## 지금 상태 (실측)

```
번들        JS 422KB (단일, 라우트 분할 0)   CSS 87KB
dist        4.3MB   그중 투어 지역 이미지 4장이 3.4MB
CSS         중복 정의 셀렉터 91개, 그중 64개가 파일을 넘나든다
인라인 style 151곳
테스트      pytest 6 + vitest 7 = 13개 (전부 통과)
CI          없음. 게이트 4종이 전부 로컬 수동
lint        1 error (SizeControl.scales)
```

---

## P0 — 먼저 해야 하는 것

### [N-1] GitHub Actions CI
**담당: Claude** (배포 사슬에 영향, 판단 필요) · **난이도 S**

이번 세션에서 게이트가 실제로 회귀를 **4건** 잡았다.
`/api/upload` 삭제, 계약 테스트 정규식 버그, 계약 테스트가 `.js` 를 안 보던 문제,
2열 구간 베인토 빈 칸. 전부 사람이 수동으로 돌려서 잡은 것이다.

CI 가 없으면 다음에 누가(또는 어떤 에이전트가) 작업할 때 아무것도 걸러지지 않는다.
`lint` / `build` / `vitest` / `pytest` 4종을 PR 과 main 푸시에 건다.

특히 `backend/tests/test_api_contract.py` 는 프론트가 호출하는 경로가
백엔드에 실제로 있는지 정적 대조한다. **이게 CI 의 핵심 항목이다.**

완료 판정: PR 을 하나 열었을 때 4개 잡이 모두 돌고, 하나라도 실패하면 머지가 막힌다.

### [N-2] 투어 지역 이미지 압축
**담당: Claude** (이미지 처리) · **난이도 S**

```
dist/assets/danang.png    0.9MB
dist/assets/bangkok.png   0.9MB
dist/assets/laos.png      0.8MB
dist/assets/tagaytay.png  0.8MB
                          ────────
                          3.4MB  ← dist 4.3MB 의 79%
```

PNG 로 저장된 사진이다. WebP 또는 품질 조정 JPEG 로 바꾸면 **1MB 이하로 떨어질 것**(추정).
`jimp` 가 이미 의존성에 있어 추가 설치가 필요 없다.
`<img>` 태그에 `width`/`height` 와 `loading="lazy"` 도 함께 넣는다.

완료 판정: dist 2MB 이하, 투어 랜딩 화면이 육안으로 동일.

---

## P1 — 사용자가 체감하는 것

### [N-3] 투어 앱 화면 리디자인
**담당: Claude** (미적 판단) · **난이도 L**

Labs 허브(`/`)만 새 디자인 언어로 갈았다. `/gijotour` 로 들어가면 톤이 끊긴다.
같은 브랜드인데 두 개의 사이트처럼 보인다.

대상이 크다. 한 번에 하지 말고 화면 단위로 쪼갤 것.
```
DesignerShowcase.jsx  24KB   고객이 가장 먼저 보는 화면
NoticeBoard.jsx       21KB
DesignerDashboard.jsx 32KB   ← 대시보드는 design-taste-frontend 대상 밖(스킬 13장)
```
대시보드·관리자 화면은 리디자인 스킬의 범위가 아니다. 밀도와 가독성만 손본다.

~~**선행 조건: [N-5] CSS 캐스케이드 정리.**~~ **틀렸다 (2026-09-02 실측).**

```
src/styles 중복 셀렉터 67개 중
  투어 고객 화면 className 에 걸리는 것   0개
  전역 요소 셀렉터(모든 화면에 걸림)      0개
투어 앱 자체 CSS(tour-theme.css + 컴포넌트 <style>)
  규칙 582블록, 중복 셀렉터 4개, 파일 넘나듦 0개
```

중복은 전부 레거시 관리자·대시보드 클래스(`.elite-*`, `.nav-item-elite`)에
몰려 있다. 투어 고객 화면은 `.t-*` 네임스페이스라 겹치지 않는다.
N-3 은 N-5 를 기다릴 이유가 없었고, 실제로 먼저 하지 않고도 문제없이 끝냈다.

또 대상 산정도 틀렸다. DesignerShowcase / NoticeBoard 는 이미 신 언어였고,
실제로 톤이 끊기는 곳은 Footer 와 Login 둘뿐이었다. 자세한 건 `7316377`.

### [N-4] mockDb 데이터 소실
**담당: Claude** (설계 판단) · **난이도 M**

공지·제안·후기를 만들어도 새로고침하면 사라진다. 백엔드를 접었으므로 선택지는 둘이다.
- `localStorage` 로 브라우저에만 남긴다 (기기 간 공유 안 됨, 구현 작음)
- 서버를 다시 붙인다 (Render·Fly 등, `backend/` 코드와 pytest 6건이 그대로 있다)

**이건 제품 결정이라 사용자 확인이 필요하다.** 먼저 물을 것.

---

## P2 — 구조 부채

### [N-5] CSS 캐스케이드 정리
**담당: Claude** (여러 파일에 걸친 추론) · **난이도 L**

`index.css` 를 8개로 나눈 것은 **읽을 수 있게** 만든 것이지 캐스케이드를 고친 게 아니다.

```
중복 정의 셀렉터 91개 / 그중 64개가 파일을 넘나든다
.nav-links 5곳 · .sidebar-nav-elite 6곳 · :root 4곳
```

파일 순서를 바꾸면 화면이 조용히 달라진다. 이걸 정리해야 [N-3] 을 안전하게 할 수 있다.

~~합칠 때마다 빌드 CSS 를 바이트 대조~~ **바이트 대조는 여기서 못 쓴다.**
그건 순서 보존 분할에만 유효하다. 규칙을 실제로 병합하면 바이트는 당연히 달라진다.
필요한 증명은 "바이트가 같다"가 아니라 **"요소가 받는 최종 선언이 같다"**이다.

`scripts/css_cascade_snapshot.py` 가 그 일을 한다. dist 의 CSS 를 `<link>` 순서대로
읽어 (미디어 컨텍스트 × 요소 모양)별 최종 선언 맵을 뽑는다. 576개 모양, 4,727개 선언.
리팩터 전후 JSON 을 diff 해서 비어 있으면 렌더가 안 변한 것이다.

**쓰기 전에 음성 대조부터 할 것.** 규칙 한 줄을 일부러 주입해 diff 가 잡히는지 본다.
첫 판은 Vite 최소화 CSS 가 블록 마지막 선언의 세미콜론을 지운다는 걸 놓쳐
주입해도 diff 0 이었다. 그대로 뒀으면 모든 검증이 헛돌 뻔했다.

**진행 상황(2026-09-02, `c1ee7b0`)**
```
:root              3곳 -> 1곳     .elite-sidebar      3곳 -> 2곳
.nav-item-elite    5곳 -> 2곳     .sidebar-nav-elite  3곳 -> 2곳
중복 셀렉터 67 -> 66 · 중복 블록 151 -> 143 · 파일 넘나듦 51 -> 50
```
남은 66개는 대부분 "03 에 기본값, 08 에 밀도 오버라이드" 쌍이라 구조상 정당하다.
급한 부채가 아니다.

### [N-6] 인라인 style 151곳 → CSS 클래스
**담당: Aider** (파일 단위로 쪼개면 기계적) · **난이도 M**

가장 많은 곳은 `components/AdminSettings.jsx`. 파일 하나씩 넘기면
각 1~9k 토큰이라 컨텍스트에 들어간다.

### [N-7] 중복 패턴 추출
**담당: Aider** · **난이도 S**

같은 코드가 여러 곳에 복붙돼 있다.
```
ESC 키로 모달 닫기 useEffect   DesignerShowcase / DesignerTV / NoticeBoard
토스트 상태                     AdminPanel / DesignerShowcase / AdminSettings
Pill 상태 배지 컴포넌트          AdminPanel / AdminGuideUserManager
상태 순환 토글                  AdminPanel / AdminGuideUserManager / AdminCSCenter
```
→ `useEscapeClose`, `useToast`, `<StatusPill>`, `useStatusCycle` 로 뽑는다.

### [N-8] 의존 방향 정리
**담당: Claude** · **난이도 M**

- `src/labs/GijoLab.jsx` 가 `../tour-app/tour-theme.css` 를 import 한다. **부모가 자식에 의존한다.**
- `01-base-tokens.css:178` 의 `section { padding: 140px 0 }` 는 전역 요소 셀렉터라
  모든 `<section>` 을 잡는다. 지금은 Labs 쪽에서 개별 무력화 중이다.

둘 다 [N-5] 와 같이 처리하는 게 효율적이다.

---

## P3 — 마감

### [N-9] 라우트 코드 분할
**담당: Aider** · **난이도 S**

JS 422KB 단일 번들. `React.lazy` + `Suspense` 로 `/gijotour/*` 를 분리하면
Labs 허브만 보는 방문자가 투어 앱 코드를 받지 않는다.
대상: `App.jsx`(1k 토큰) + `GijoTourApp.jsx`(3.4k 토큰).

### [N-10] lint 0
**담당: Claude** (기능 판단 필요) · **난이도 S**

남은 1건은 `SizeControl.scales` 미사용이다. 이건 **미완결 UI 배율 기능**의 흔적이다.
`src/shared/` 에 `SizeControl.jsx`, `NavigateHub.jsx` 두 파일이 있는데 아무도 렌더하지 않는다.
`--ui-scale` CSS 변수와 배선은 남아 있다. 살릴지 지울지 정해야 한다.

### [N-11] 미완결 기능 정리
**담당: Claude** · **난이도 S**

`PaymentPage.handlePayment()` 가 `setStep(2)` 만 한다.
주석: `// PayPal MCP 연동 시 이 부분에 로직이 들어갈 예정`.
결제는 사업 결정이 선행돼야 하므로, 최소한 화면에 "준비 중"임을 명시할지 판단이 필요하다.

---

## 손대지 않을 것

- 결제 실연동 — 사업 결정 선행
- 서버 인증 — 배포할 서버가 없다. 클라이언트 가드 개선만 가능
- `src/labs/` 외 다른 서비스 추가 — `App.jsx` 의 `SERVICES` 배열에 한 줄이면 된다.
  구조는 이미 준비돼 있다

---

## 추천 순서

```
1. N-1  CI                    ← 이후 모든 작업의 안전망
2. N-2  이미지 압축            ← 즉효, 저위험
3. N-9  라우트 분할            ← Aider 로 빠르게
4. N-5  CSS 캐스케이드 정리     ← N-3 의 선행 조건
5. N-3  투어 앱 리디자인
```

`N-4`(데이터 소실)와 `N-10`(미완결 기능)은 **제품 결정이 필요하므로 먼저 물을 것.**
