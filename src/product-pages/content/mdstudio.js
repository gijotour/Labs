/**
 * GIJO Smart MD Studio 소개 글 (/mdstudio).
 *
 * ── 공개 원칙 ─────────────────────────────────────────────────────────
 * · 저장소 README(v2.1.0)에 있는 기능만 적는다. 지어내지 않는다.
 * · GIJO ASTER 「내 문서」와의 관계는 「출발점이 된 도구」까지만 적는다.
 *   MD Studio 문서를 ASTER 로 반입하는 길은 확인 전이라 「이어 쓴다」고 적지 않는다.
 * · 가격·판매 조건을 적지 않는다(정해지지 않았다).
 * · 먼저 권하는 길은 웹판이다(받을 실행 파일이 없어 Windows 경고가 뜨지 않는다). 설치판은 그 아래에 둔다.
 * · 설치 파일에 코드 서명이 없어 Windows 가 경고를 띄운다. 숨기지 않고 적는다.
 */

/** 웹판. 설치 없이 브라우저에서 연다. 한 번 열면 오프라인에서도 열린다. */
const WEB_URL = 'https://gijotour.github.io/gijo-smart-md-studio/';

/** 데스크톱 설치판을 받는 곳. 공개 저장소의 릴리즈 목록이다. */
const DOWNLOAD_URL = 'https://github.com/gijotour/gijo-smart-md-studio/releases';

export const MDSTUDIO = {
  id: 'mdstudio',
  path: '/mdstudio',
  navName: 'MD Studio',
  docTitle: 'GIJO Smart MD Studio — 이미지가 든 문서를 한 파일로',
  description:
    '워드처럼 쓰고 캡처를 붙여 넣어, 이미지가 든 마크다운 문서 한 파일로 내보내는 문서 작성기. 서버 없이 오프라인으로 동작합니다.',
  noindex: false,
  maker: '지아이조 테크놀로지',

  hero: {
    pills: [{ text: '문서 작성기', accent: true }, { text: '혼자 쓰는 도구' }],
    title: 'GIJO Smart MD Studio',
    subtitle: '이미지가 든 문서를 한 파일로',
    lead:
      '워드처럼 쓰고, 화면 캡처를 붙여 넣고, 이미지가 든 마크다운 문서 한 파일로 내보냅니다. ' +
      '문서를 쓰고 저장하는 일은 서버도 로그인도 없이 내 PC에서 됩니다.',
    actions: [
      { label: '웹에서 바로 열기', href: WEB_URL, external: true, primary: true },
      { label: '데스크톱 설치판 (윈도우 경고가 뜰 수 있어요)', href: DOWNLOAD_URL, external: true },
      { label: '하는 일 보기 ↓', href: '#features' },
    ],
  },

  sections: [
    {
      type: 'cards',
      id: 'features',
      kicker: '하는 일',
      title: ['쓰고, 붙이고, 가리고, 내보냅니다'],
      columns: 3,
      items: [
        {
          title: '워드처럼 쓰기',
          text: 'A4 용지 모양의 화면에서 여백과 서식을 보며 씁니다. 다크·라이트 테마를 고를 수 있고 쓰는 대로 자동 저장됩니다.',
          accent: true,
        },
        {
          title: '캡처 붙여넣기',
          text: '화면을 캡처하고 붙여 넣으면 자동으로 압축해 문서 안에 넣습니다. 사진 파일을 끌어다 놓아도 됩니다.',
        },
        {
          title: '이미지에 표시하고 가리기',
          text: '넣은 이미지 위에 화살표·사각형·글자를 그리고, 보이면 안 되는 부분은 모자이크로 가립니다.',
        },
        {
          title: '문서함과 버전 기록',
          text: '여러 문서를 한곳에서 관리하고 제목·본문을 검색합니다. 쓰는 동안 쌓인 버전으로 되돌릴 수 있습니다.',
        },
        {
          title: '백업과 복원',
          text: '문서함 전체를 파일 하나로 백업하고 되살립니다. 가지고 있던 마크다운 파일도 가져옵니다.',
        },
        {
          title: '네 가지 형식으로 내보내기',
          text: '이미지가 든 마크다운 한 파일, HTML, PDF, 워드(.docx)로 내보냅니다. 워드는 구조를 지키되 색 같은 세부 서식은 단순해집니다.',
        },
      ],
    },
    {
      type: 'split',
      kicker: '쓰는 방식',
      title: ['쓰고 저장하는 일은', '내 PC에서'],
      rows: [
        { term: '오프라인', text: '문서 작성과 저장은 인터넷 없이 됩니다. 문서는 그 PC 안에 저장됩니다.' },
        { term: '웹과 데스크톱', text: '설치 없이 브라우저에서 바로 씁니다. 한 번 열어 두면 인터넷 없이도 열립니다. 데스크톱 설치판도 있습니다.' },
        { term: '자동 업데이트', text: '데스크톱 앱은 인터넷에 연결돼 있을 때 새 버전이 나오면 내려받고, 다시 시작할지 묻습니다.' },
      ],
    },
    {
      type: 'list',
      kicker: '쓰기 전에',
      title: ['미리 알려 드립니다'],
      items: [
        '웹판은 받을 실행 파일이 없어 Windows 경고가 뜨지 않습니다. PDF는 인쇄 창에서 「PDF로 저장」을 골라 저장하고, 제목 단축키(Ctrl+1~3)는 데스크톱 설치판에서만 됩니다.',
        '데스크톱 설치판은 아직 코드 서명이 없어 Windows가 「Windows에서 PC를 보호했습니다」 경고를 띄웁니다. 「추가 정보 → 실행」으로 설치합니다. 설치판은 Windows용입니다.',
        'AI에게 묻기, 지식 검색, 결재 기능은 없습니다. 이런 기능은 GIJO ASTER에 있습니다.',
        '문서는 그 PC(웹판은 그 브라우저)에만 있습니다. 다른 PC로 옮기려면 백업 파일로 옮깁니다. 브라우저의 사이트 데이터를 지우면 웹판 문서도 지워지니 백업해 두세요.',
      ],
    },
    {
      type: 'closing',
      kicker: 'GIJO ASTER 와의 관계',
      title: '「내 문서」의 출발점',
      text:
        'GIJO Smart MD Studio는 GIJO ASTER 「내 문서」 기능의 출발점이 된 도구입니다. ' +
        '혼자 문서만 쓴다면 이 도구로 충분합니다. AI에게 묻기·지식 검색·결재가 필요하면 GIJO ASTER 소개를 봐 주세요.',
      action: { label: 'GIJO ASTER 소개 보기', href: '/aster' },
    },
  ],
};
