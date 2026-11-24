/**
 * GIJO LABS 제품군.
 *
 * 이 목록은 "앞으로 완성해 나갈 제품들"이다. 단순 링크 모음이 아니라 로드맵이다.
 * 대부분 GitHub 저장소지만 그렇지 않은 것도 있다(지아이조 투어는 이 앱 안의 서비스,
 * GIJO ASTER 는 비공개 저장소, Gster 는 사내 도구). 그래서 파일명이 products.js 다.
 *
 * ── 공개 원칙 ─────────────────────────────────────────────────────────
 * · 원칙적으로 공개 저장소만 넣는다. 이 페이지는 gijo.co.kr 로 공개되므로
 *   비공개 저장소는 이름만으로도 내부 정보가 샌다.
 *   (2026-09-02 기준 비공개: GIJOSKv1 / ERP / AS-Private / GIJO-SVR-LOG)
 * · 예외 - GIJO ASTER(옛 이름 GIJO AS)는 사용자가 메인 제품으로 공개하기로 결정했다(2026-09-02).
 *   랜딩 상단에서 이미 개발 중임을 알리고 있어 존재 자체는 공개 상태였다.
 *   단 저장소 링크는 걸지 않는다. 비공개라 방문자는 404 를 받고,
 *   링크 자체가 저장소 경로를 노출한다.
 *   설명도 제품 수준까지만 쓴다. README 의 스택 표(포트/DB 경로/파일 구조)는 옮기지 않는다.
 * · 예외 - Gster 는 사내 도구다. 개념 수준 소개만 공개하기로 결정했다(2026-11-19).
 *   「사내 도구」 배지와 「판매 상품 아님」을 타일에 고정한다. 저장소·실행 링크는 걸지 않는다.
 * · GIJO ASTER 와 Gster 의 타일 글은 승인된 문안이다. 소개 페이지 글(src/product-pages/content)과
 *   함께 content.test.js 가 표기 규칙을 감시한다.
 * · summary 는 각 저장소의 README 첫 문단에서 가져온다. 지어내지 않는다.
 * · 진행률 같은 주관적 수치는 넣지 않는다. 검증 가능한 신호만 쓴다
 *   (라이브 데모 유무, 마지막 커밋일, 주 언어).
 *
 * ── 갈래 ─────────────────────────────────────────────────────────────
 * 허브(/)는 두 문만 보여 주고, 타일은 갈래 화면에 나뉘어 나온다(2026-11-19).
 *   group: 'tech'   → /tech   (보안·AI 기술 — 간판 「지아이조 테크놀로지」)
 *   group: 'travel' → /travel (여행 서비스 — 간판 「GIJO Tour」)
 * 갈래 글과 제품 구성(단계)은 sections.js 에 있다.
 *
 * ── 그리드 규칙 ───────────────────────────────────────────────────────
 * 데스크톱은 3열이고 **갈래마다** 타일의 span 합이 행을 정확히 채워야 한다.
 *   기술: 테크놀로지(2) + ASTER(1) = 3 / MD Studio(1) + BridgeAI(1) + Gster(1) = 3
 *   투어: 투어(2) + Talk(1) = 3 / 혼자 하는 게임(1) + 모임 게임(1) + 카지노 룰 연습판(1) = 3
 * 제품을 넣거나 뺄 때 순서와 span 합을 다시 맞출 것. 빈 칸이 남으면 깨져 보인다.
 * content.test.js 가 갈래별 합을 감시한다.
 *
 * ── 갱신 방법 ─────────────────────────────────────────────────────────
 *   gh repo list gijotour --limit 100 \
 *     --json name,description,url,isPrivate,isFork,primaryLanguage,updatedAt,homepageUrl
 *   라이브 여부는 https://gijotour.github.io/<repo>/ 응답 코드로 확인한다.
 *
 * 제외한 것:
 *   · Labs        - 이 사이트 자신
 *   · my_memory   - 제품이 아니라 개인 작업 저장소. 목록에 넣지 않기로 확정(2026-09-02)
 */

/**
 * @type {{
 *   id: string, name: string, summary: string, lang: string, updated: string,
 *   repo: string|null,      // null 이면 코드 링크를 렌더하지 않는다 (비공개 저장소)
 *   live: string|null,      // 외부 라이브 주소
 *   internal?: string,      // 앱 내부 경로. 있으면 react-router 로 이동한다
 *   site?: string,          // 잠금 없이 바로 여는 외부 주소 (사업 사이트 등)
 *   page?: string,          // 잠금 없이 바로 여는 앱 내부 소개 페이지 (/aster 등)
 *   guide?: { to: string, label: string }, // 소개 페이지가 아닌 앱 내부 안내 화면 (/casino 등)
 *   group: 'tech'|'travel', // 어느 갈래 화면에 나오는가
 *   hideOnDoor?: boolean,   // 허브의 문에 이름을 올리지 않는다 (사내 도구)
 *   span?: 1|2,             // 데스크톱 3열 그리드에서 차지할 열 수 (기본 1)
 *   featured?: boolean,     // 강조 타일
 *   status?: string,        // 상태 배지 문구
 * }[]}
 */
export const PRODUCTS = [
  // ── 기술 (/tech) ──────────────────────────────────────────────────
  {
    // 본업. 보안 제품 공급과 기술지원.
    // 설명은 gijo.ai/gijohome 의 카피에서 가져왔다. 지어내지 않았다.
    id: 'gijo-technology',
    name: '지아이조 테크놀로지',
    summary:
      'IT 인프라의 취약점을 외부자와 내부자 양쪽 관점에서 점검하고, ' +
      '서버에 쌓이는 개인정보를 검출·암호화·접근제어까지 이어서 관리합니다. ' +
      '보안 제품 공급과 기술지원이 본업입니다.',
    lang: '보안 솔루션 공급 · 기술지원',
    updated: '',
    repo: null,
    live: null,
    site: 'https://gijo.ai/gijohome/user/main/user_main',
    group: 'tech',
    span: 2,
    featured: true,
    status: '핵심 사업',
  },
  {
    // 옛 이름 GIJO AS. 이름 풀이 「자율 보안 운영 시스템」은 고정이다.
    id: 'gijo-aster',
    name: 'GIJO ASTER',
    summary:
      '자율 보안 운영 시스템. 취약점 스캐너 결과·보안로그·보안제품 리포트를 한자리에서 엮어 분석하는 ' +
      '한국형 온프레미스 AI 보안관리 플랫폼. 기본 구성에서는 자료가 회사 밖으로 나가지 않습니다.',
    lang: '온프레미스 · 로컬 LLM',
    updated: '',
    repo: null,
    live: null,
    page: '/aster',
    group: 'tech',
    span: 1,
    featured: true,
    status: '개발 중',
  },
  {
    id: 'gijo-smart-md-studio',
    name: 'GIJO Smart MD Studio',
    summary:
      '워드처럼 쓰고 이미지를 Base64로 품은 단일 .md 파일로 내보내는 마크다운 편집기. 오프라인 동작.',
    lang: 'JavaScript',
    updated: '2026-08-20',
    repo: 'https://github.com/gijotour/gijo-smart-md-studio',
    live: null,
    page: '/mdstudio',
    group: 'tech',
    span: 1,
  },
  {
    id: 'gijo-bridge-ai',
    name: 'GIJO BridgeAI',
    // 2026-11-24: 「VRAM 을 끌어 쓴다」는 실제와 달랐다(메모리를 합치지 않는다). 요청을 서버로 넘기는 것이다.
    summary: '노트북에서 집·사무실의 GPU 서버에 SSH 로 연결해, 편집기의 AI 요청을 그 서버로 넘기는 Windows 앱',
    lang: 'Windows 설치판 · JavaScript',
    updated: '2026-11-24',
    repo: 'https://github.com/gijotour/GIJO_BridgeAI',
    live: null,
    page: '/bridgeai',
    group: 'tech',
    span: 1,
  },
  {
    // 사내 도구. 판매 상품이 아니다. 소개 페이지는 잠금 없이 열고 검색에는 안 잡히게 한다.
    id: 'gster',
    name: 'Gster',
    summary:
      'GIJO 안에서 개발·관리·운영을 말로 맡기는 AI 비서. ' +
      '사내 장비의 로컬 두뇌로 동작하고, 바깥 AI에 물을지는 사람이 정합니다.',
    lang: '사내 운영 중 · 판매 상품 아님',
    updated: '',
    repo: null,
    live: null,
    page: '/gster',
    group: 'tech',
    hideOnDoor: true,
    span: 1,
    status: '사내 도구',
  },

  // ── 투어 (/travel) ────────────────────────────────────────────────
  {
    id: 'gijotour',
    name: '지아이조 투어',
    summary:
      '전문 여행설계사와 기업을 연결할 B2B 투어 플랫폼을 준비하고 있다. ' +
      '고객이 조건을 남기면 검증한 현지 전문가를 1:1로 매칭하려 한다.',
    lang: 'React · Vite',
    updated: '2026-11-19',
    repo: null,
    live: null,
    internal: '/gijotour',
    group: 'travel',
    span: 2,
    featured: true,
    // 2026-11-24: 예시 내용으로 도는 체험판이다(src/tour-app/demo.js). 실제 서비스가 열리면 바꾼다.
    status: '체험판',
  },
  {
    id: 'gijotalk',
    name: 'GIJO Talk',
    // 저장소에 README 가 없다. 설명은 실제 앱 화면에서 확인한 것만 적었다(2026-11-19):
    // 일정 · 만남 대화 · 단원 학습 · 내 단어장 · 오프라인 저장.
    summary:
      '투어 일정표와 상황별 만남 대화·단원 학습을 담은 여행 동반 앱. ' +
      '출국 전에 받아 두면 현지에서 인터넷 없이 씁니다.',
    lang: 'TypeScript',
    updated: '2026-11-18',
    repo: 'https://github.com/gijotour/gijotalk',
    live: 'https://gijotour.github.io/gijotalk/',
    page: '/talk',
    group: 'travel',
    span: 1,
  },
  // ── 게임 3칸 ── 이름은 게임 목록(/games)의 묶음 이름과 같게 쓴다(2026-11-22).
  {
    id: 'gijoarcade',
    name: '혼자 하는 게임',
    // 게임 수와 이름은 src/games/games.js 의 solo 묶음에서 가져왔다.
    summary:
      '비행기나 대기 시간에 혼자 하는 게임 11종. ' +
      '777 슬롯·2048 퍼즐·블록 쌓기·지뢰찾기 등을 설치 없이 브라우저에서 엽니다.',
    lang: 'GIJO Arcade',
    updated: '2026-11-21',
    repo: 'https://github.com/gijotour/gijoarcade',
    live: 'https://gijotour.github.io/gijoarcade/',
    page: '/arcade',
    group: 'travel',
    span: 1,
  },
  {
    id: 'gijodrink',
    name: '모임 게임',
    // 게임 수와 이름은 src/games/games.js 의 party 묶음에서 가져왔다.
    summary:
      '폰 한 대로 여럿이 하는 게임 11종. ' +
      '미션 룰렛·시간 폭탄·라이어 게임·10초 맞추기 등을 모임 자리에서 바로 엽니다.',
    lang: 'GIJO Drink',
    updated: '2026-11-20',
    repo: 'https://github.com/gijotour/gijodrink',
    live: 'https://gijotour.github.io/gijodrink/',
    page: '/drink',
    group: 'travel',
    span: 1,
  },
  {
    // GIJO Arcade 안의 카지노 화면이다. 규칙 설명은 제품 소개 페이지가 아니라 /casino 에 있어
    // page 대신 guide 로 건다(page 는 src/product-pages 의 글과 짝을 이뤄야 한다).
    id: 'gijocasino',
    name: '카지노 룰 연습판',
    // 게임 수와 이름은 src/games/games.js 의 casino 묶음에서 가져왔다.
    summary:
      '블랙잭·바카라·룰렛·홀덤 등 10종의 규칙을 가상 칩으로 익히는 연습판. ' +
      '쉬운 규칙 설명이 함께 있고 현금 거래는 없습니다.',
    lang: 'GIJO Arcade',
    updated: '2026-11-21',
    repo: 'https://github.com/gijotour/gijoarcade',
    live: 'https://gijotour.github.io/gijoarcade/?mode=casino',
    guide: { to: '/casino', label: '규칙 설명 보기' },
    group: 'travel',
    span: 1,
  },
];
