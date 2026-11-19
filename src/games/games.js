/**
 * 게임 목록 (/games).
 *
 * ── 게임을 더할 때 ────────────────────────────────────────────────────
 * 아래 GAMES 에 한 줄 넣는다. 그게 전부다. 화면(GamesApp.jsx)은 이 표만 읽는다.
 *   group : 'solo'(혼자 하는 게임 — GIJO Arcade) | 'party'(모임 게임 — GIJO Drink)
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

  // ── 모임 게임 (GIJO Drink) ──
  { id: 'roulette', group: 'party', play: 'roulette', icon: '🎡', name: '미션 룰렛', desc: '미션을 적고 돌려서 정하기' },
  { id: 'cards', group: 'party', play: 'cards', icon: '🃏', name: '카드 뒤집기', desc: '인원수만큼 깔린 카드를 한 장씩' },
  { id: 'bomb', group: 'party', play: 'bomb', icon: '💣', name: '시간 폭탄', desc: '터지기 전에 옆 사람에게 넘기기' },
  { id: 'crocodile', group: 'party', play: 'crocodile', icon: '🐊', name: '크로커다일 룰렛', desc: '함정 이빨을 피해 번갈아 누르기' },
  { id: 'titanic', group: 'party', play: 'titanic', icon: '🚢', name: '찰랑찰랑 타이타닉', desc: '잔이 가라앉지 않게 조금씩 채우기' },
  { id: 'touch', group: 'party', play: 'finger', icon: '👆', name: '터치 룰렛', desc: '손가락을 올리고 기다리면 당첨자 결정' },
  { id: 'bridge', group: 'party', play: 'bridge', icon: '🤝', name: '러브 드링크', desc: '손가락을 올린 사람 중 둘을 연결' },
];

export const playUrl = (game) => {
  const group = GROUPS.find((g) => g.id === game.group);
  return `${group.base}#play=${game.play}`;
};
