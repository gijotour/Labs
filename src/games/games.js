/**
 * 게임 목록 (/games).
 *
 * ── 게임을 더할 때 ────────────────────────────────────────────────────
 * 아래 GAMES 에 한 줄 넣는다. 그게 전부다. 화면(GamesApp.jsx)은 이 표만 읽는다.
 *   group : 'solo'(혼자 하는 게임 — GIJO Arcade) | 'party'(모임 게임 — GIJO Drink)
 *           | 'casino'(카지노 룰 연습판 — GIJO Arcade. 규칙 설명은 /casino 에 있다)
 *   play  : 그 앱 안에서 게임을 바로 여는 이름. 주소 끝에 `#play=<play>` 로 붙는다.
 *           두 앱(gijoarcade · gijodrink)이 이 꼴의 주소를 받아 해당 게임을 바로 연다.
 *
 * ── 공개 원칙 ─────────────────────────────────────────────────────────
 * · 실제로 앱에 들어 있는 게임만 적는다. 만들 예정인 게임은 올리지 않는다.
 * · 연령 표기와 음주를 권하는 말은 쓰지 않는다.
 */

const ARCADE_URL = 'https://gijotour.github.io/gijoarcade/';
const DRINK_URL = 'https://gijotour.github.io/gijodrink/';

export const GROUPS = [
  {
    id: 'solo',
    title: '혼자 하는 게임',
    note: 'GIJO Arcade · 비행기나 대기 시간에',
    base: ARCADE_URL,
    intro: '/arcade',
  },
  {
    id: 'party',
    title: '모임 게임',
    note: 'GIJO Drink · 폰 한 대로 여럿이',
    base: DRINK_URL,
    intro: '/drink',
  },
  {
    id: 'casino',
    title: '카지노 룰 연습판',
    note: 'GIJO Arcade · 가상 칩으로 규칙 익히기',
    base: ARCADE_URL,
    intro: '/casino',
    introLabel: '규칙 설명 보기',
  },
];

export const GAMES = [
  // ── 혼자 하는 게임 (GIJO Arcade) ──
  { id: 'slots', group: 'solo', play: 'slots', icon: '🎰', name: '777 슬롯', desc: '가상 크레딧으로 돌리는 슬롯머신' },
  { id: 'puzzle', group: 'solo', play: 'puzzle', icon: '🔢', name: '2048 퍼즐', desc: '밀어서 같은 숫자를 합치는 퍼즐' },
  { id: 'flappy', group: 'solo', play: 'flappy', icon: '🚀', name: '플래피 비행', desc: '화면을 눌러 장애물 사이를 통과' },
  { id: 'block', group: 'solo', play: 'block', icon: '🧱', name: '블록 쌓기', desc: '블록을 쌓아 줄을 지우는 퍼즐' },
  { id: 'snake', group: 'solo', play: 'snake', icon: '🐍', name: '뱀 키우기', desc: '먹이를 먹고 길어지는 스네이크' },
  { id: 'brick', group: 'solo', play: 'brick', icon: '🏓', name: '벽돌 깨기', desc: '공을 튕겨 벽돌을 모두 깨기' },
  { id: 'shoot', group: 'solo', play: 'shoot', icon: '✈️', name: '비행기 슈팅', desc: '끌어서 피하고 자동으로 쏘는 슈팅' },
  { id: 'tower', group: 'solo', play: 'tower', icon: '🏗️', name: '타워 쌓기', desc: '오가는 블록을 눌러 멈춰 높이 쌓기' },
  { id: 'mines', group: 'solo', play: 'mines', icon: '🚩', name: '지뢰찾기', desc: '숫자를 단서로 지뢰를 피해 칸 열기' },
  { id: 'memory', group: 'solo', play: 'memory', icon: '🧠', name: '패턴 기억', desc: '반짝이는 순서를 기억해 따라 누르기' },
  { id: 'pop', group: 'solo', play: 'pop', icon: '🫧', name: '컬러 팝', desc: '이어진 같은 색 타일을 눌러 지우기' },

  // ── 모임 게임 (GIJO Drink) ──
  { id: 'roulette', group: 'party', play: 'roulette', icon: '🎡', name: '미션 룰렛', desc: '미션을 적고 돌려서 정하기' },
  { id: 'cards', group: 'party', play: 'cards', icon: '🃏', name: '카드 뒤집기', desc: '인원수만큼 깔린 카드를 한 장씩' },
  { id: 'bomb', group: 'party', play: 'bomb', icon: '💣', name: '시간 폭탄', desc: '터지기 전에 옆 사람에게 넘기기' },
  { id: 'crocodile', group: 'party', play: 'crocodile', icon: '🐊', name: '크로커다일 룰렛', desc: '함정 이빨을 피해 번갈아 누르기' },
  { id: 'titanic', group: 'party', play: 'titanic', icon: '🚢', name: '찰랑찰랑 타이타닉', desc: '잔이 가라앉지 않게 조금씩 채우기' },
  { id: 'touch', group: 'party', play: 'finger', icon: '👆', name: '터치 룰렛', desc: '손가락을 올리고 기다리면 당첨자 결정' },
  { id: 'liar', group: 'party', play: 'liar', icon: '🕵️', name: '여행자 라이어 게임', desc: '여행 단어를 보고 대화로 라이어 찾기' },
  { id: 'tensec', group: 'party', play: 'tensec', icon: '⏱️', name: '10초 맞추기', desc: '가려진 시계를 감으로 멈춰 겨루기' },
  { id: 'forehead', group: 'party', play: 'forehead', icon: '🙆', name: '이마 단어 퀴즈', desc: '이마에 댄 단어를 설명 듣고 맞히기' },
  { id: 'react', group: 'party', play: 'react', icon: '⚡', name: '번개 반응 대결', desc: '신호가 오면 가장 먼저 누르기' },
  { id: 'bridge', group: 'party', play: 'bridge', icon: '🤝', name: '러브 드링크', desc: '손가락을 올린 사람 중 둘을 연결' },

  // ── 카지노 룰 연습판 (GIJO Arcade) ──
  { id: 'blackjack', group: 'casino', play: 'blackjack', icon: '🃏', name: '블랙잭', desc: '21에 가깝게 만들어 딜러 이기기' },
  { id: 'baccarat', group: 'casino', play: 'baccarat', icon: '🎴', name: '바카라', desc: '9에 가까울 쪽을 맞히기' },
  { id: 'roulette-table', group: 'casino', play: 'roulette', icon: '🎯', name: '룰렛', desc: '구슬이 멈출 숫자나 색 맞히기' },
  { id: 'sicbo', group: 'casino', play: 'sicbo', icon: '🎲', name: '다이사이', desc: '주사위 세 개의 결과 맞히기' },
  { id: 'dragontiger', group: 'casino', play: 'dragontiger', icon: '🐉', name: '드래곤 타이거', desc: '카드 한 장씩, 높은 쪽 맞히기' },
  { id: 'threecard', group: 'casino', play: 'threecard', icon: '♠️', name: '쓰리카드 포커', desc: '세 장 족보로 딜러와 겨루기' },
  { id: 'craps', group: 'casino', play: 'craps', icon: '🧊', name: '크랩스', desc: '주사위 두 개, 패스 라인 배우기' },
];

export const playUrl = (game) => {
  const group = GROUPS.find((g) => g.id === game.group);
  return `${group.base}#play=${game.play}`;
};
