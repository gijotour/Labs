#!/usr/bin/env node
/**
 * 화면 대조 도구 — 실제 브라우저가 계산한 스타일의 지문을 뜬다.
 *
 * 왜 필요한가.
 *   CSS 를 고친 뒤 "화면이 그대로다"를 증명하는 방법이 둘 있다.
 *   · 빌드 CSS 바이트 대조(CLAUDE.md) — 순서 보존 분할처럼 바이트가 같아야 할 때.
 *   · scripts/css_cascade_snapshot.py — 규칙을 병합해 바이트가 달라질 때, CSS 만 읽어 정적으로 본다.
 *   이 도구는 세 번째다. 빌드한 사이트를 실제 Chrome 으로 열어, 여러 주소 × 폰·PC 폭에서
 *   **모든 요소**의 계산된 스타일 26가지를 읽는다. 쓰지 않는 규칙을 지웠을 때처럼
 *   "어떤 요소에도 안 걸리는가"를 확인하는 데 맞다(2026-11-24 05 파일 정리 때 이 방식으로 증명).
 *
 * 준비물: 이 PC 의 Chrome(또는 CHROME_PATH 환경변수). 추가 패키지는 없다.
 *
 * 사용:
 *   npm run build
 *   node scripts/style-snapshot.mjs before.json      # 고치기 전
 *   (CSS 수정)
 *   npm run build
 *   node scripts/style-snapshot.mjs after.json --compare before.json
 *   → 「바뀐 화면 0」이어야 한다. 바뀐 화면이 있으면 처음 다른 요소를 보여 준다.
 *
 * 같은 빌드로 두 번 떠서 0 이 나오는지도 한 번 확인해 두면 좋다(움직이는 화면이 섞이면 흔들린다).
 */
import { spawn, execSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync, existsSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createHash } from 'node:crypto';

const ROUTES = [
  '/', '/tech', '/travel', '/aster', '/mdstudio', '/arcade', '/talk', '/drink', '/bridgeai', '/games', '/casino',
  '/gijotour', '/gijotour/proposals', '/gijotour/reviews', '/gijotour/about', '/gijotour/tv', '/gijotour/nope',
];
const SIZES = [['phone', 375, 812], ['desktop', 1280, 900]];
const PROPS = ['display', 'position', 'width', 'height', 'margin', 'padding', 'color', 'background-color', 'background-image',
  'font-size', 'font-weight', 'font-family', 'line-height', 'border', 'border-radius', 'box-shadow', 'opacity', 'transform',
  'grid-template-columns', 'flex-direction', 'gap', 'text-align', 'z-index', 'overflow', 'visibility', 'letter-spacing'];
const PREVIEW_PORT = 4179;
const DEBUG_PORT = 9339;

const args = process.argv.slice(2);
const outFile = args.find((a) => !a.startsWith('--') && args[args.indexOf(a) - 1] !== '--compare');
const compareWith = args.includes('--compare') ? args[args.indexOf('--compare') + 1] : null;
if (!outFile) {
  console.error('쓰기: node scripts/style-snapshot.mjs <결과.json> [--compare <이전.json>]');
  process.exit(2);
}
if (!existsSync('dist/index.html')) {
  console.error('dist 가 없다. 먼저 npm run build');
  process.exit(2);
}

const CHROME = process.env.CHROME_PATH || [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
].find((p) => existsSync(p));
if (!CHROME) {
  console.error('Chrome 을 못 찾았다. CHROME_PATH 환경변수로 알려 달라.');
  process.exit(2);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const kill = (child) => {
  if (!child || child.exitCode !== null) return;
  try {
    if (process.platform === 'win32') execSync(`taskkill /PID ${child.pid} /T /F`, { stdio: 'ignore' });
    else child.kill('SIGTERM');
  } catch { /* 이미 꺼졌다 */ }
};

async function waitFor(url, tries = 60) {
  for (let i = 0; i < tries; i++) {
    try { const r = await fetch(url); if (r.ok) return r; } catch { /* 아직 안 떴다 */ }
    await sleep(250);
  }
  throw new Error('응답이 없다: ' + url);
}

/** 크롬 개발자 도구 프로토콜(CDP)을 아주 얇게 감싼다. */
function cdp(wsUrl) {
  const ws = new WebSocket(wsUrl);
  let id = 0;
  const pending = new Map();
  ws.addEventListener('message', (ev) => {
    const msg = JSON.parse(ev.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) reject(new Error(msg.error.message)); else resolve(msg.result);
    }
  });
  const ready = new Promise((r) => ws.addEventListener('open', r, { once: true }));
  return {
    ready,
    send: (method, params = {}) => new Promise((resolve, reject) => {
      const n = ++id;
      pending.set(n, { resolve, reject });
      ws.send(JSON.stringify({ id: n, method, params }));
    }),
    close: () => ws.close(),
  };
}

const SNAP = `(() => { const P = ${JSON.stringify(PROPS)};
  return [...document.querySelectorAll('body *')].map((e) => { const cs = getComputedStyle(e);
    return e.tagName + '.' + (typeof e.className === 'string' ? e.className : '') + '|' + P.map((p) => cs.getPropertyValue(p)).join('|'); }); })()`;

const profile = mkdtempSync(join(tmpdir(), 'style-snap-'));
const preview = spawn(`npx vite preview --port ${PREVIEW_PORT} --strictPort`, { shell: true, stdio: 'ignore' });
let chrome;
let client;
try {
  await waitFor(`http://localhost:${PREVIEW_PORT}/`);
  chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${DEBUG_PORT}`, `--user-data-dir=${profile}`,
    '--no-first-run', '--no-default-browser-check', '--disable-gpu', 'about:blank'], { stdio: 'ignore' });
  await waitFor(`http://127.0.0.1:${DEBUG_PORT}/json/version`);
  const pages = await (await fetch(`http://127.0.0.1:${DEBUG_PORT}/json/list`)).json();
  const page = pages.find((p) => p.type === 'page');
  client = cdp(page.webSocketDebuggerUrl);
  await client.ready;
  await client.send('Page.enable');
  await client.send('Runtime.enable');

  const out = {};
  for (const [label, w, h] of SIZES) {
    await client.send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: label === 'phone' });
    for (const r of ROUTES) {
      await client.send('Page.navigate', { url: `http://localhost:${PREVIEW_PORT}${r}` });
      await sleep(2000); // 지연 로드 조각과 들어올 때 움직이는 효과가 끝나기를 기다린다
      const res = await client.send('Runtime.evaluate', { expression: SNAP, returnByValue: true });
      const lines = res.result.value || [];
      out[`${label} ${r}`] = { n: lines.length, hash: createHash('sha256').update(lines.join('\n')).digest('hex').slice(0, 16), lines };
      process.stderr.write('.');
    }
  }
  process.stderr.write('\n');
  writeFileSync(outFile, JSON.stringify(out));
  console.log(`${Object.keys(out).length}개 화면을 ${outFile} 에 적었다.`);

  if (compareWith) {
    const before = JSON.parse(readFileSync(compareWith, 'utf8'));
    const changed = Object.keys(out).filter((k) => !before[k] || before[k].hash !== out[k].hash);
    console.log(`바뀐 화면 ${changed.length}`);
    for (const k of changed) {
      const a = before[k]?.lines || [];
      const b = out[k].lines;
      const i = b.findIndex((line, idx) => line !== a[idx]);
      console.log(`  ${k}: 요소 ${a.length} → ${b.length}` + (i >= 0 ? `, 처음 다른 요소 #${i}\n    전: ${(a[i] || '').slice(0, 160)}\n    후: ${(b[i] || '').slice(0, 160)}` : ''));
    }
    process.exitCode = changed.length ? 1 : 0;
  }
} finally {
  client?.close();
  kill(chrome);
  kill(preview);
  await sleep(300);
  try { rmSync(profile, { recursive: true, force: true }); } catch { /* 크롬이 아직 잡고 있으면 남겨 둔다 */ }
}
