/**
 * GIJO LABS 제품군 — GitHub 저장소 기반.
 *
 * 이 목록은 "앞으로 완성해 나갈 제품들"이다. 단순 링크 모음이 아니라 로드맵이다.
 *
 * ── 원칙 ──────────────────────────────────────────────────────────────
 * · **원칙적으로 공개 저장소만 넣는다.** 이 페이지는 gijo.co.kr 로 공개되므로
 *   비공개 저장소는 이름만으로도 내부 정보가 샌다.
 *   (2026-09-02 기준 비공개: GIJOSKv1 / ERP / AS-Private / GIJO-SVR-LOG)
 * · 예외 — **GIJO AS** 는 사용자가 메인 제품으로 공개하기로 결정했다(2026-09-02).
 *   랜딩 상단 NEWS 에서 이미 "보안 관제 제품 실시간 개발 진행 중"으로 알리고 있어
 *   존재 자체는 이미 공개 상태였다.
 *   단 **저장소 링크는 걸지 않는다** — 비공개라 방문자는 404 를 받고,
 *   링크 자체가 저장소 경로를 노출한다. `repo: null` 이면 코드 링크가 렌더되지 않는다.
 *   설명도 제품 수준까지만 쓴다. README 의 스택 표(포트·DB 경로·파일 구조)는 옮기지 않는다.
 * · `summary` 는 각 저장소의 README 첫 문단에서 가져온다. 지어내지 않는다.
 * · 진행률·완성도 같은 주관적 수치는 넣지 않는다. 대신 검증 가능한 신호만 쓴다
 *   (라이브 데모 유무, 마지막 커밋일, 주 언어).
 *
 * ── 갱신 방법 ──────────────────────────────────────────────────────────
 *   gh repo list gijotour --limit 100 \
 *     --json name,description,url,isPrivate,isFork,primaryLanguage,updatedAt,homepageUrl
 *   그리고 라이브 여부는 https://gijotour.github.io/<repo>/ 응답 코드로 확인한다.
 *
 * 제외한 것:
 *   · Labs        — 이 사이트 자신
 *   · my_memory   — README 없음, 내용 불명(connect-ai 폴더 하나). 정리 후 추가
 */

/**
 * @type {{
 *   id: string, name: string, summary: string, lang: string, updated: string,
 *   repo: string|null,      // null 이면 코드 링크를 렌더하지 않는다 (비공개 저장소)
 *   live: string|null,      // null 이면 실행 링크를 렌더하지 않는다
 *   featured?: boolean,     // 메인 제품. 전 폭으로 강조한다
 *   status?: string,        // 배지 문구. 없으면 live 여부로 LIVE 배지만 붙는다
 * }[]}
 */
export const GITHUB_PROJECTS = [
  {
    id: 'gijo-as',
    name: 'GIJO AS',
    summary:
      '보안담당자가 취약점 스캐너 로그·보안로그·보안제품 리포트를 한자리에서 분석하고 관제하는 ' +
      '온프레미스 AI 보안관리 플랫폼. 모든 처리를 사내에서 끝내 자료가 밖으로 나가지 않는다.',
    lang: 'TypeScript · Electron · 로컬 LLM',
    updated: '2026-08-11',
    repo: null,
    live: null,
    featured: true,
    status: '개발 중',
  },
  {
    id: 'gijotalk',
    name: 'GIJO Talk',
    summary: '지아이조 투어 일정표와 현지 생활영어·타갈로그 회화를 함께 보는 여행 동반 앱',
    lang: 'TypeScript',
    updated: '2026-08-30',
    repo: 'https://github.com/gijotour/gijotalk',
    live: 'https://gijotour.github.io/gijotalk/',
  },
  {
    id: 'gijo-bridge-ai',
    name: 'GIJO BridgeAI',
    summary:
      '노트북에서 집에 둔 GPU 서버(GB10·Mac Studio·RTX)의 VRAM을 네트워크로 끌어 쓰는 원격 오프로드 브릿지',
    lang: 'JavaScript',
    updated: '2026-08-12',
    repo: 'https://github.com/gijotour/GIJO_BridgeAI',
    live: null,
  },
  {
    id: 'gijo-smart-md-studio',
    name: 'GIJO Smart MD Studio',
    summary:
      '워드처럼 쓰고 이미지를 Base64로 품은 단일 .md 파일로 내보내는 마크다운 편집기. 오프라인 동작',
    lang: 'JavaScript',
    updated: '2026-08-20',
    repo: 'https://github.com/gijotour/gijo-smart-md-studio',
    live: null,
  },
  {
    id: 'gijoarcade',
    name: 'GIJO Arcade',
    summary: '설치 없이 브라우저에서 도는 오프라인 레트로 아케이드 게임 5종 (777 슬롯머신 외)',
    lang: 'HTML',
    updated: '2026-08-24',
    repo: 'https://github.com/gijotour/gijoarcade',
    live: 'https://gijotour.github.io/gijoarcade/',
  },
  {
    id: 'gijodrink',
    name: 'GIJO Drink',
    summary: '모임 자리에서 바로 켜는 웹 술게임 7종. 카드 뒤집기·미션 룰렛·시간 폭탄 등',
    lang: 'HTML',
    updated: '2026-08-24',
    repo: 'https://github.com/gijotour/gijodrink',
    live: 'https://gijotour.github.io/gijodrink/',
  },
];
