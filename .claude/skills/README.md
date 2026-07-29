# GIJO Labs 스킬 안내

이 저장소에서 쓸 수 있는 Claude 스킬 전체 목록이다. 스킬은 **필요할 때 자동으로 호출**되지만,
`/이름` 으로 직접 부를 수도 있다.

---

## 한눈에 — 뭘 하고 싶은가

| 하고 싶은 일 | 이렇게 말하면 된다 | 걸리는 스킬 |
|---|---|---|
| 화면·UI 만들거나 고치기 | "디자인해줘", "이 페이지 예쁘게" | `design` → 알맞은 곳으로 연결 |
| 프로덕션 배포 | "배포해줘" | `deploy` |
| 차트·그래프 그리기 | "매출 차트 만들어줘" | `dataviz` |
| 엑셀·워드·PPT·PDF 다루기 | "이 xlsx 정리해줘" | `xlsx` `docx` `pptx` `pdf` |
| 코드 정리 | `/simplify` | `simplify` |
| 보안 점검 | `/security-review` | `security-review` |
| 새 스킬 만들기 | "스킬 만들어줘" | `skill-creator` |

---

## 1. 프로젝트 스킬 — 이 저장소에 포함 (팀 전체 공유)

`.claude/skills/` 아래에 있고 git으로 관리된다. 팀원 누구나 쓸 수 있다.

### `design` — 디자인 작업 진입점 ★
디자인 관련 요청은 전부 여기로 먼저 들어온다. 요청을 판별해서 알맞은 전문 스킬로
연결하고, 이 저장소 스택(React 19 + Vite, 순수 CSS, 모션 라이브러리 없음) 제약을
덮어씌운다.

> "디자인해줘" / "UI 만들어줘" / "랜딩페이지" / "리디자인" / "애니메이션 넣어줘"

### `design-taste-frontend` — 안티슬롭 프론트엔드
랜딩페이지·포트폴리오·리디자인용. 브리프를 읽고 디자인 방향을 추론한 뒤
VARIANCE / MOTION / DENSITY 3개 다이얼을 조정한다. 대시보드·데이터 테이블은 대상 밖.
출처는 [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) (MIT).
보통은 `design`을 통해 자동으로 불린다.

### `deploy` — 프로덕션 배포
`main` 푸시 → Netlify(프론트) + Railway(백엔드) 자동 배포. 빌드 검증부터
배포 결과 확인까지 담당한다.

> "배포해줘" / "프로덕션 반영" / "라이브 올려줘"

---

## 2. 개인 스킬 — 계정 단위 (다른 사람 세션엔 없을 수 있음)

이 저장소가 아니라 계정에 등록돼 있다. 팀원과 공유하려면 `.claude/skills/`로 옮겨
커밋해야 한다.

**디자인 · 모션** — 대부분 `design`이 알아서 불러준다

| 스킬 | 언제 |
|---|---|
| `emil-design-eng` | 컴포넌트 하나의 완성도, UI 디테일 |
| `apple-design` | 제스처·스와이프·시트·스프링 물리 모션 |
| `improve-animations` | 프로젝트 전체 모션 감사 + 개선 로드맵 (코드는 안 고침) |
| `find-animation-opportunities` | 어디에 애니메이션을 넣으면 좋을지 탐색 |
| `animation-vocabulary` | "그 튕기는 효과 뭐라고 부르지?" 용어 찾기 |
| `review-animations` | 애니메이션 코드 리뷰 — `/review-animations` 로 직접 호출 |
| `prototype` | 같은 UI를 여러 버전으로 만들어 비교 — 직접 호출 |
| `pick-ui-library` | 라이브러리 선택 (차트·드래그·토스트 등) — 직접 호출 |

**문서 · 파일** — `xlsx` `docx` `pptx` `pdf`
스프레드시트·워드·프레젠테이션·PDF를 읽고 쓰고 변환한다. 파일명만 언급해도 걸린다.

**기타**

| 스킬 | 언제 |
|---|---|
| `skill-creator` | 새 스킬 제작, 기존 스킬 개선, 성능 측정 |
| `session-start-hook` | 웹 세션에서 테스트·린트가 돌도록 저장소 세팅 |
| `morning` | 아침 브리핑 — `/morning` |
| `gijohn` | 3계층(directives/execution) 아키텍처 작업 지침 ⚠️ 아래 참고 |

---

## 3. 빌트인 — Claude Code 기본 제공

| 스킬 | 언제 |
|---|---|
| `dataviz` | **차트·그래프·대시보드를 만들기 전에 반드시** |
| `artifact-design` | 공유 가능한 HTML 페이지(아티팩트) 만들 때 |
| `artifact-capabilities` | 아티팩트에 실시간 데이터·상태가 필요할 때 |
| `simplify` | 바뀐 코드 정리·중복 제거 |
| `code-review` | 작업 중인 diff 리뷰 |
| `review` | GitHub PR 리뷰 |
| `security-review` | 브랜치 변경분 보안 점검 |
| `run` | 앱 실행해서 변경사항 눈으로 확인 |
| `claude-api` | Claude API·모델·가격 관련 작업 |
| `update-config` | 권한·훅·환경변수 등 `settings.json` 설정 |
| `loop` | 주기적 반복 작업 |
| `init` | `CLAUDE.md` 생성 |

---

## 알아둘 것

**⚠️ `gijohn` 스킬은 이 저장소와 맞지 않는다.**
`directives/` + `execution/` 디렉터리를 전제하는데 Labs에는 없다. 또 description이
`"사용방법"` 한 단어라 자동 호출이 사실상 안 걸린다. 다른 프로젝트용으로 보인다.

**스킬 이름 규칙**: 소문자·숫자·하이픈만 (kebab-case, 64자 이하). 한글 이름은 못 쓴다.
그래서 디자인 스킬 이름은 `design`이지만, "디자인해줘"라는 한글 요청에 걸리도록
description에 한글 트리거를 넣어뒀다.

**새 스킬 추가하기**

```bash
mkdir -p .claude/skills/<이름>
# .claude/skills/<이름>/SKILL.md 작성 — frontmatter의 name은 폴더명과 같아야 함
```

외부 저장소에서 가져올 때는 `design-taste-frontend/README.md` 처럼 출처·커밋·갱신
방법을 같이 남긴다. 새 스킬은 다음 세션부터 적용된다.
