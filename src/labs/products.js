/**
 * GIJO LABS 제품군.
 *
 * 이 목록은 "앞으로 완성해 나갈 제품들"이다. 단순 링크 모음이 아니라 로드맵이다.
 * 대부분 GitHub 저장소지만 그렇지 않은 것도 있다(지아이조 투어는 이 앱 안의 서비스,
 * GIJO AS 는 비공개 저장소). 그래서 파일명이 products.js 다.
 *
 * ── 공개 원칙 ─────────────────────────────────────────────────────────
 * · 원칙적으로 공개 저장소만 넣는다. 이 페이지는 gijo.co.kr 로 공개되므로
 *   비공개 저장소는 이름만으로도 내부 정보가 샌다.
 *   (2026-09-02 기준 비공개: GIJOSKv1 / ERP / AS-Private / GIJO-SVR-LOG)
 * · 예외 - GIJO AS 는 사용자가 메인 제품으로 공개하기로 결정했다(2026-09-02).
 *   랜딩 상단에서 이미 개발 중임을 알리고 있어 존재 자체는 공개 상태였다.
 *   단 저장소 링크는 걸지 않는다. 비공개라 방문자는 404 를 받고,
 *   링크 자체가 저장소 경로를 노출한다.
 *   설명도 제품 수준까지만 쓴다. README 의 스택 표(포트/DB 경로/파일 구조)는 옮기지 않는다.
 * · summary 는 각 저장소의 README 첫 문단에서 가져온다. 지어내지 않는다.
 * · 진행률 같은 주관적 수치는 넣지 않는다. 검증 가능한 신호만 쓴다
 *   (라이브 데모 유무, 마지막 커밋일, 주 언어).
 *
 * ── 그리드 규칙 ───────────────────────────────────────────────────────
 * 데스크톱은 3열이고 각 타일의 span 합이 행을 정확히 채워야 한다.
 *   테크놀로지(2) + 투어(1) = 3
 *   AS(1) + Talk(1) + Arcade(1) = 3
 *   Drink(1) + BridgeAI(1) + MD Studio(1) = 3
 * 제품을 넣거나 뺄 때 순서와 span 합을 다시 맞출 것. 빈 칸이 남으면 깨져 보인다.
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
 *   span?: 1|2,             // 데스크톱 3열 그리드에서 차지할 열 수 (기본 1)
 *   featured?: boolean,     // 강조 타일
 *   status?: string,        // 상태 배지 문구
 * }[]}
 */
export const PRODUCTS = [
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
    span: 2,
    featured: true,
    status: '핵심 사업',
  },
  {
    id: 'gijotour',
    name: '지아이조 투어',
    summary:
      '전문 여행설계사와 비즈니스를 연결하는 B2B 투어 플랫폼. ' +
      '고객이 조건을 남기면 검증된 현지 전문가를 1:1로 매칭한다.',
    lang: 'React · Vite',
    updated: '2026-09-02',
    repo: null,
    live: null,
    internal: '/gijotour',
    span: 1,
    featured: true,
    status: '서비스 중',
  },
  {
    id: 'gijo-as',
    name: 'GIJO AS',
    summary:
      '취약점 스캐너 로그와 보안 리포트를 한자리에서 분석하는 온프레미스 AI 보안관리 플랫폼. ' +
      '모든 처리를 사내에서 끝낸다.',
    lang: 'TypeScript, Electron, 로컬 LLM',
    updated: '2026-08-11',
    repo: null,
    live: null,
    span: 1,
    featured: true,
    status: '개발 중',
  },
  {
    id: 'gijotalk',
    name: 'GIJO Talk',
    summary: '투어 일정표와 현지 생활영어·타갈로그 회화를 함께 보는 여행 동반 앱',
    lang: 'TypeScript',
    updated: '2026-08-30',
    repo: 'https://github.com/gijotour/gijotalk',
    live: 'https://gijotour.github.io/gijotalk/',
    span: 1,
  },
  {
    id: 'gijoarcade',
    name: 'GIJO Arcade',
    summary: '설치 없이 브라우저에서 도는 오프라인 레트로 아케이드 게임 5종',
    lang: 'HTML',
    updated: '2026-08-24',
    repo: 'https://github.com/gijotour/gijoarcade',
    live: 'https://gijotour.github.io/gijoarcade/',
    span: 1,
  },
  {
    id: 'gijodrink',
    name: 'GIJO Drink',
    summary: '모임 자리에서 바로 켜는 웹 술게임 7종',
    lang: 'HTML',
    updated: '2026-08-24',
    repo: 'https://github.com/gijotour/gijodrink',
    live: 'https://gijotour.github.io/gijodrink/',
    span: 1,
  },
  {
    id: 'gijo-bridge-ai',
    name: 'GIJO BridgeAI',
    summary: '노트북에서 집에 둔 GPU 서버의 VRAM을 네트워크로 끌어 쓰는 원격 오프로드 브릿지',
    lang: 'JavaScript',
    updated: '2026-08-12',
    repo: 'https://github.com/gijotour/GIJO_BridgeAI',
    live: null,
    span: 1,
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
    span: 1,
  },
];
