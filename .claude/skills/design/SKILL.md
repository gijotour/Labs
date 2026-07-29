---
name: design
description: 디자인 작업의 단일 진입점. "디자인해줘", "디자인 좀 해줘", "UI 만들어줘", "화면 만들어줘", "예쁘게 해줘", "랜딩페이지", "리디자인", "레이아웃", "스타일 개선", "애니메이션 넣어줘", "모션 다듬어줘", "느낌 좋게" 같은 요청에 사용한다. 요청 유형을 판별해 알맞은 전문 디자인 스킬로 연결하고, 이 저장소 스택(React 19 + Vite 8, 순수 CSS, 모션 라이브러리 없음)에 맞는 제약을 함께 적용한다. design, UI, layout, style, animation, motion 관련 요청의 첫 관문.
---

# 디자인 (design) — GIJO Labs 디자인 작업 진입점

이 스킬은 **라우터**다. 디자인 규칙을 직접 담지 않는다. 요청을 읽고 알맞은 전문 스킬을
골라 호출한 뒤, 아래 "프로젝트 제약"을 그 위에 덮어씌우는 것이 전부다.

## 1. 라우팅 표 — 먼저 여기서 고른다

| 사용자가 원하는 것 | 호출할 스킬 | 비고 |
|---|---|---|
| 랜딩페이지·포트폴리오·소개 페이지를 새로 만들기 | `design-taste-frontend` | 이 저장소에 포함됨 |
| 기존 화면을 더 고급스럽게 갈아엎기 (리디자인) | `design-taste-frontend` | 감사(audit) 먼저 수행 |
| 버튼·모달·토스트 등 **컴포넌트 하나**의 완성도 | `emil-design-eng` | 개인 스킬 |
| 제스처·스와이프·시트·스프링 물리 모션 | `apple-design` | 개인 스킬 |
| 이미 있는 애니메이션 코드가 괜찮은지 검토 | `review-animations` | 사용자가 직접 요청할 때만 |
| 프로젝트 전체 모션을 감사하고 개선 로드맵 | `improve-animations` | 코드 수정 안 함, 계획만 |
| 어디에 애니메이션을 넣으면 좋을지 탐색 | `find-animation-opportunities` | 제안만 |
| "그 튕기는 효과 뭐라고 불러?" | `animation-vocabulary` | 용어 찾기 |
| 같은 UI를 여러 버전으로 만들어 비교 | `prototype` | 사용자가 직접 요청할 때만 |
| 라이브러리 뭐 쓸지 (차트·드래그·토스트 등) | `pick-ui-library` | 사용자가 직접 요청할 때만 |
| 차트·그래프·대시보드 | `dataviz` | 빌트인. 차트 코드 쓰기 **전에** 읽을 것 |

**대시보드·데이터 테이블·관리자 화면은 `design-taste-frontend`의 대상이 아니다**
(스킬 본문 13장에 명시). 그 경우는 `dataviz` + 아래 프로젝트 제약만 적용한다.

## 2. 애매할 때의 결정 트리

1. **결과물이 이미지인가, 코드인가?**
   이 저장소에서는 항상 코드다. 이미지 생성 스킬은 등록돼 있지 않다.

2. **새로 만드는가, 고치는가?**
   - 새로 만든다 → `design-taste-frontend`
   - 고친다 → 범위를 본다. 화면 전체면 `design-taste-frontend`(리디자인 모드),
     컴포넌트 하나면 `emil-design-eng`

3. **정적인 문제인가, 움직임의 문제인가?**
   - 배치·간격·타이포·색 → `design-taste-frontend` 또는 `emil-design-eng`
   - 전환·반응·물리 → `apple-design`, 기존 코드 검토면 `review-animations`

4. **범위가 파일 하나인가, 프로젝트 전체인가?**
   전체 감사는 `improve-animations`. 계획만 내놓고 코드는 안 고친다는 점을 사용자에게 먼저 알린다.

5. 그래도 안 갈리면 **묻지 말고 `design-taste-frontend`로 간다.** 이게 기본값이다.

## 3. 프로젝트 제약 — 어떤 스킬을 쓰든 항상 적용

이 저장소의 실제 스택이다. 전문 스킬이 다른 전제를 깔고 있으면 **이쪽이 이긴다.**

| 항목 | 실제 값 |
|---|---|
| 프레임워크 | React 19 + Vite 8 (Next.js 아님) |
| 라우팅 | react-router-dom 7 |
| 스타일 | **순수 CSS** (`src/App.css`, `src/index.css`) — Tailwind 없음 |
| 모션 | **라이브러리 없음** — Motion / Framer Motion / GSAP 미설치 |
| 소스 배치 | `src/labs`, `src/tour-app`, `src/shared`, `src/services`, `src/data` |
| 백엔드 | `backend/` (FastAPI), `server/` (Express) |
| 검증 | `npm run lint`, `npm run build` |

지켜야 할 것:

- **Server Component / `use client` 지시어를 쓰지 않는다.** Next.js 전제 코드가 나오면 순수
  React로 바꿔서 낸다.
- **Tailwind 클래스명을 쓰지 않는다.** CSS 파일에 실제 규칙을 쓰거나 CSS Module을 만든다.
- **모션은 CSS `transition` / `@keyframes` / Web Animations API로 먼저 해결한다.**
  `apple-design`의 스프링 예제나 `design-taste-frontend`의 GSAP 스켈레톤은 그대로 못 쓴다.
  라이브러리가 꼭 필요하면 **설치 전에 사용자에게 먼저 묻는다.**
- **`prefers-reduced-motion` 폴백을 반드시 넣는다.**
- 작업 후 `npm run lint`와 `npm run build`를 돌려 통과를 확인한다.

## 4. 자주 쓰는 조합

- **새 랜딩페이지**: `design-taste-frontend`로 구조·타이포·레이아웃을 잡고 →
  마무리 디테일에 `emil-design-eng`
- **기존 화면 개선**: `design-taste-frontend`의 감사 프로토콜로 문제를 먼저 나열 →
  사용자 승인 후 수정
- **"움직임이 싸구려 같다"**: `improve-animations`로 감사 → 우선순위 상위 항목만
  `apple-design` 원칙으로 재작성
- **차트가 들어가는 화면**: `dataviz`를 먼저 읽고 팔레트를 정한 뒤, 나머지 레이아웃을
  `design-taste-frontend`로 처리

## 5. 스킬이 없을 때

`design-taste-frontend`와 `dataviz` 두 개만 이 저장소·Claude Code에 항상 있다.
나머지(`emil-design-eng`, `apple-design`, `review-animations`, `improve-animations`,
`find-animation-opportunities`, `animation-vocabulary`, `prototype`, `pick-ui-library`)는
**계정 단위 개인 스킬**이라 다른 사람 세션에는 없을 수 있다.

호출하려는 스킬이 목록에 없으면 멈추지 말고 `design-taste-frontend` + 위 3장 제약으로
진행하고, 어떤 스킬이 없어서 대체했는지 한 줄로 알린다.

`review-animations` / `prototype` / `pick-ui-library` 세 개는 자동 호출이 막혀 있다
(`disable-model-invocation: true`). 사용자가 그 동작을 명시적으로 원할 때만 쓰고,
호출이 거부되면 `/review-animations` 처럼 직접 입력하도록 안내한다.
