/**
 * Labs 의 두 갈래 — 기술(/tech)과 투어(/travel).
 *
 * 허브(/)는 이 두 갈래로 들어가는 문만 보여 준다. 제품 타일은 갈래 화면에 있다.
 * 어느 제품이 어느 갈래인지는 products.js 의 `group` 칸이 정한다.
 *
 * ── 공개 원칙 ─────────────────────────────────────────────────────────
 * · 여기 글은 gijo.co.kr 번들에 실려 누구나 읽는다. products.js 머리의 공개 원칙을 따른다.
 * · 가격·판매 조건을 적지 않는다(정해지지 않았다). 「도입·파일럿 상담에서 안내」까지만.
 * · 라이트는 「프로모션 버전」이라고 적는다. 값을 매기는 말은 쓰지 않는다.
 * · 단계 사이에 자료가 이어진다는 말은 확인된 것만 적는다. 지금 확인된 것은
 *   라이트 → 표준(같은 설치본 · 라이선스 키)뿐이다. MD Studio → ASTER 반입은 확인 전이라 적지 않았다.
 */

/** 도입 문의 창구. 본업 사이트의 제품문의 화면. */
const CONTACT_URL = 'https://gijo.ai/gijohome/user/productInquiries/product_inquiries';

export const SECTIONS = [
  {
    id: 'tech',
    path: '/tech',
    navLabel: '기술',
    brand: '지아이조 테크놀로지',
    brandNote: '보안·AI 기술',
    docTitle: '보안·AI 기술 — 지아이조 테크놀로지',
    accent: true,

    // 허브의 문
    door: {
      pill: '기술',
      title: '보안·AI 기술',
      desc: '지아이조 테크놀로지의 보안 솔루션 공급·기술지원과, 직접 만드는 보안·AI 제품입니다.',
      cta: '기술 제품 보기',
    },

    hero: {
      pill: '보안·AI 기술',
      title: ['필요한 만큼만,', '단계별로 쓰는 보안 도구'],
      lead:
        '혼자 쓰는 문서 도구부터 보안담당자 1인용 보안 지식 저장소, 보안팀용 운영 제품까지 필요한 범위만큼 골라 씁니다. ' +
        '기본 구성에서는 자료가 회사 밖으로 나가지 않습니다.',
    },

    ladder: {
      kicker: '제품 구성',
      title: '쓰임에 따라 세 단계로 구성했습니다',
      steps: [
        {
          label: '문서 도구',
          name: 'GIJO Smart MD Studio',
          who: '혼자 쓰는 문서 작성기',
          text:
            '워드처럼 쓰고, 캡처를 붙여 넣고, 이미지가 든 문서 한 파일로 내보냅니다. ' +
            '서버 없이 오프라인으로 동작합니다. GIJO ASTER 「내 문서」 기능의 출발점이 된 도구입니다.',
          to: '/mdstudio',
        },
        {
          label: '프로모션 버전',
          name: 'GIJO ASTER 라이트',
          who: '보안담당자 1인',
          text: '대화창에 물으면 근거 있는 답을 주는 보안 지식 저장소입니다. 조회, 문서 반입, 등록부 기록을 할 수 있습니다.',
          to: '/aster#editions',
        },
        {
          label: '유료',
          name: 'GIJO ASTER 표준',
          who: '보안팀',
          text:
            'AI 에이전트가 탐지·분석을 자동화하고, 조치는 승인 뒤에 실행합니다. 필요한 기능은 기능 팩으로 엽니다. ' +
            '라이트와 같은 설치본이라 라이선스 키를 넣으면 쌓아 둔 자료 그대로 열립니다.',
          to: '/aster#editions',
          accent: true,
        },
      ],
      note: 'GIJO ASTER는 개발 중입니다. 가격·도입 조건은 도입·파일럿 상담에서 안내합니다.',
    },

    list: { kicker: '전체 목록', title: '기술 제품과 사업' },

    closing: {
      title: '도입을 검토 중이신가요?',
      text: '도입·파일럿 문의는 지아이조 테크놀로지 제품문의로 받습니다.',
      action: { label: '도입·파일럿 문의', href: CONTACT_URL },
    },
  },
  {
    id: 'travel',
    path: '/travel',
    navLabel: '투어',
    brand: 'GIJO Tour',
    brandNote: '여행 서비스',
    docTitle: '여행 서비스 — GIJO Tour',

    door: {
      pill: '투어',
      title: '여행 서비스',
      desc: '여행설계사와 비즈니스를 잇는 투어 플랫폼과, 여행길에 함께 쓰는 앱입니다.',
      cta: '투어 서비스 보기',
    },

    hero: {
      pill: '여행 서비스',
      title: ['여행을 설계하고,', '여행길에 함께 씁니다'],
      lead: '전문 여행설계사를 잇는 투어 플랫폼과, 현지에서 꺼내 쓰는 회화·놀이 앱입니다.',
    },

    list: { kicker: '전체 목록', title: '투어 서비스' },

    // 앱 안 화면으로 가는 맺음말은 action.to 를 쓴다(바깥 주소는 action.href).
    closing: {
      title: '게임만 바로 열고 싶다면',
      text: 'GIJO Arcade와 GIJO Drink에 든 게임을 하나씩 모아 둔 목록입니다. 누르면 그 게임이 바로 열립니다.',
      action: { label: '게임 목록 보기', to: '/games' },
    },
  },
];

export const findSection = (id) => SECTIONS.find((section) => section.id === id) ?? null;
