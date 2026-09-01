import { useNavigate } from 'react-router-dom';
import logoImg from '../assets/logo.png';
import { GITHUB_PROJECTS } from './githubProjects';
import '../tour-app/tour-theme.css';

const NEWS = [
  {
    id: 'gijo-as',
    badge: 'SPEC ACTIVE',
    lead: 'GIJO AS (보안전문담당자용 보안 툴)',
    body: '보안 관제 제품 실시간 개발 진행 중'
  },
  {
    id: 'gijo-tour',
    badge: 'LIVE NEWS',
    lead: '지아이조 투어',
    body: '“검증된 현지 전문가와 함께하는 실패 없는 맞춤형 여정” 서비스 활성화 중'
  }
];

const GAME_MODES = [
  '미션 룰렛',
  '크로커다일 룰렛',
  '시간 폭탄',
  '터치 룰렛',
  '찰랑찰랑 타이타닉',
  '손가락 사다리'
];

const GijoLab = () => {
  const navigate = useNavigate();

  return (
    <div className="lab-surface lab-hub page-fade-in">
      <div className="lab-shell">
        {/* ── GIJO.AI 배너 ── */}
        <a className="lab-banner" href="https://gijo.ai" target="_blank" rel="noopener noreferrer">
          <span className="lab-banner__body">
            <span className="lab-eyebrow">Main Security System</span>
            <strong className="lab-banner__title">GIJO.AI</strong>
            <span className="lab-banner__desc">글로벌 인텔리전스 보안 시스템 유통</span>
          </span>
          <span className="lab-banner__cta">
            VISIT SITE <span className="lab-arrow" aria-hidden="true">→</span>
          </span>
        </a>

        {/* ── 헤더 ── */}
        <header className="lab-head">
          <img src={logoImg} alt="" className="lab-logo" />
          <h1 className="lab-title">GIJO Labs</h1>
          <p className="lab-sub">Advanced Travel Technology &amp; Innovation</p>
        </header>

        {/* ── 개발 소식 ── */}
        <section className="lab-news" aria-label="개발 현황">
          {NEWS.map((item) => (
            <article key={item.id} className="lab-news__item">
              <span className="lab-news__badge">{item.badge}</span>
              <span className="lab-dot" aria-hidden="true" />
              <p className="lab-news__text">
                <strong>{item.lead}</strong> {item.body}
              </p>
            </article>
          ))}
        </section>

        {/* ── 프로젝트 ── */}
        <section className="lab-grid" aria-label="프로젝트">
          <button type="button" className="lab-card lab-card--lead" onClick={() => navigate('/gijotour')}>
            <span className="lab-eyebrow">Flagship Project</span>
            <h2 className="lab-card__title">지아이조 투어</h2>
            <p className="lab-card__desc">
              전문 여행설계사와 비즈니스를 연결하는 하이엔드 B2B 투어 플랫폼
            </p>
            <span className="lab-card__cta">
              ENTER PORTAL <span className="lab-arrow" aria-hidden="true">→</span>
            </span>
          </button>

          <a
            className="lab-card lab-card--wide"
            href="https://app.notion.com/p/394c101e9b2081488281dad0ab1e308d"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="lab-eyebrow">Research Notes</span>
            <h2 className="lab-card__title">GIJO 연구노트</h2>
            <p className="lab-card__desc">
              프로젝트 리서치와 아이디어를 기록하는 노션 워크스페이스
            </p>
            <span className="lab-card__cta">
              OPEN NOTION <span className="lab-arrow" aria-hidden="true">→</span>
            </span>
          </a>
        </section>

        {/* ── 제품군 (GitHub) ──
             앞으로 완성해 나갈 제품 목록. 데이터는 githubProjects.js 에 있고
             공개 저장소만 넣는다(이 페이지는 gijo.co.kr 로 공개된다). */}
        <section className="lab-repos" aria-labelledby="lab-repos-title">
          <div className="lab-repos__head">
            <span className="lab-eyebrow">Building</span>
            <h2 id="lab-repos-title" className="lab-repos__title">만들고 있는 것들</h2>
            <a
              className="lab-repos__all"
              href="https://github.com/gijotour"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub <span className="lab-arrow" aria-hidden="true">→</span>
            </a>
          </div>

          <ul className="lab-repos__grid">
            {GITHUB_PROJECTS.map((proj) => (
              <li
                key={proj.id}
                className={`lab-repo${proj.featured ? ' lab-repo--featured' : ''}`}
              >
                <div className="lab-repo__top">
                  <h3 className="lab-repo__name">{proj.name}</h3>
                  {proj.status && <span className="lab-repo__tag">{proj.status}</span>}
                  {proj.live && <span className="lab-repo__live">LIVE</span>}
                </div>

                <p className="lab-repo__desc">{proj.summary}</p>

                <div className="lab-repo__meta">
                  <span>{proj.lang}</span>
                  <span aria-hidden="true">·</span>
                  <span>업데이트 {proj.updated}</span>
                </div>

                {/* 비공개 저장소는 repo·live 가 모두 null 이라 링크 줄을 아예 그리지 않는다.
                    링크를 걸면 방문자가 404 를 받고 저장소 경로만 노출된다. */}
                {(proj.live || proj.repo) && (
                  <div className="lab-repo__links">
                    {proj.live && (
                      <a href={proj.live} target="_blank" rel="noopener noreferrer">
                        실행 <span className="lab-arrow" aria-hidden="true">→</span>
                      </a>
                    )}
                    {proj.repo && (
                      <a href={proj.repo} target="_blank" rel="noopener noreferrer">
                        코드 <span className="lab-arrow" aria-hidden="true">→</span>
                      </a>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </section>

        {/* ── 게임 (하단 전용 섹션) ── */}
        <section className="lab-game" aria-labelledby="lab-game-title">
          <div className="lab-game__body">
            <span className="lab-eyebrow">Side Project</span>
            <h2 id="lab-game-title" className="lab-game__title">GIJO Drink · 파티 게임</h2>
            <p className="lab-game__desc">
              모임 자리에서 바로 켜서 즐기는 웹 파티 게임입니다. 설치 없이 브라우저에서 실행됩니다.
            </p>

            <ul className="lab-game__modes">
              {GAME_MODES.map((mode) => (
                <li key={mode}>{mode}</li>
              ))}
            </ul>

            <a
              className="lab-game__cta"
              href="/GIJO_Drink_v3_0_1.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              게임 실행 <span className="lab-arrow" aria-hidden="true">→</span>
            </a>
          </div>

          <div className="lab-game__art" aria-hidden="true">
            <img src="/soju_cup_neon.png" alt="" loading="lazy" />
            <img src="/beer_glass_neon.png" alt="" loading="lazy" />
          </div>
        </section>

        {/* ── 푸터 ── */}
        <footer className="lab-foot">
          <p>© {new Date().getFullYear()} GIJO Labs. All projects are part of the GIJO Ecosystem.</p>
        </footer>
      </div>

      <style>{`
        .lab-hub {
          min-height: 100vh;
          padding: 2.5rem 1.5rem 3rem;
          /* 이전의 blur(160px) 메시 3개 대신 정지된 미묘한 그라데이션 하나 */
          background:
            radial-gradient(1200px 600px at 50% -10%, rgba(53, 214, 255, 0.06), transparent 70%),
            var(--t-bg);
        }
        .lab-shell {
          width: min(1080px, 100%);
          margin: 0 auto;
        }

        .lab-eyebrow {
          display: block;
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--t-accent);
        }
        .lab-arrow {
          display: inline-block;
          transition: transform 0.18s ease;
        }

        /* ── 배너 ── */
        .lab-banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          padding: 1.25rem 1.5rem;
          border: 1px solid var(--t-line);
          border-radius: var(--t-radius);
          background: var(--t-surface-1);
          text-decoration: none;
          transition: border-color 0.18s ease, background 0.18s ease;
        }
        .lab-banner:hover {
          border-color: var(--t-accent-line);
          background: var(--t-surface-2);
        }
        .lab-banner:hover .lab-arrow { transform: translateX(4px); }
        .lab-banner__body { display: block; }
        .lab-banner__title {
          display: block;
          margin: 0.375rem 0 0.125rem;
          font-size: 1.375rem;
          font-weight: 700;
          letter-spacing: -0.01em;
          color: var(--t-fg);
        }
        .lab-banner__desc { font-size: 0.9375rem; color: var(--t-fg-muted); }
        .lab-banner__cta {
          flex-shrink: 0;
          font-size: 0.8125rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--t-accent);
          white-space: nowrap;
        }

        /* ── 헤더 ── */
        .lab-head {
          text-align: center;
          padding: 3rem 0 2rem;
        }
        .lab-logo {
          width: 84px;
          height: 84px;
          object-fit: contain;
          margin-bottom: 1rem;
        }
        .lab-title {
          font-family: 'Syncopate', 'Outfit', sans-serif;
          font-size: 2.75rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--t-fg);
          margin: 0 0 0.75rem;
        }
        .lab-sub {
          font-size: 0.8125rem;
          font-weight: 600;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--t-fg-subtle);
          margin: 0;
        }

        /* ── 개발 소식 ── */
        .lab-news {
          display: grid;
          gap: 0.5rem;
          max-width: 780px;
          margin: 0 auto 2.5rem;
        }
        .lab-news__item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border: 1px solid var(--t-line);
          border-radius: var(--t-radius-sm);
          background: var(--t-surface-1);
        }
        .lab-news__badge {
          flex-shrink: 0;
          padding: 0.1875rem 0.5rem;
          border-radius: 4px;
          border: 1px solid var(--t-accent-line);
          background: var(--t-accent-weak);
          color: var(--t-accent);
          font-size: 0.625rem;
          font-weight: 700;
          letter-spacing: 0.08em;
        }
        .lab-dot {
          flex-shrink: 0;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--t-accent);
          animation: labPulse 2s infinite ease-in-out;
        }
        @keyframes labPulse {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 1; }
        }
        .lab-news__text {
          margin: 0;
          font-size: 0.875rem;
          line-height: 1.5;
          color: var(--t-fg-muted);
        }
        .lab-news__text strong { color: var(--t-fg); font-weight: 650; }

        /* ── 제품군(GitHub) ── */
        .lab-repos { margin-top: 1.75rem; }
        .lab-repos__head {
          display: flex;
          align-items: baseline;
          gap: 0.75rem;
          margin-bottom: 0.875rem;
          flex-wrap: wrap;
        }
        .lab-repos__title {
          font-size: 1.25rem;
          margin: 0;
          letter-spacing: -0.01em;
        }
        .lab-repos__all {
          margin-left: auto;
          font-size: 0.75rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--t-accent, #38bdf8);
          text-decoration: none;
        }
        .lab-repos__all:hover { text-decoration: underline; }
        .lab-repos__grid {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(260px, 100%), 1fr));
          gap: 0.875rem;
        }
        .lab-repo {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding: 1.25rem;
          border: 1px solid var(--t-line);
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.02);
        }
        .lab-repo--featured {
          grid-column: 1 / -1;
          padding: 1.75rem;
          border-color: rgba(56, 189, 248, 0.28);
          background: linear-gradient(
            135deg,
            rgba(56, 189, 248, 0.07),
            rgba(255, 255, 255, 0.02)
          );
        }
        .lab-repo--featured .lab-repo__name { font-size: 1.375rem; }
        .lab-repo--featured .lab-repo__desc { font-size: 0.9375rem; max-width: 62ch; }
        .lab-repo__tag {
          font-size: 0.625rem;
          letter-spacing: 0.1em;
          padding: 0.125rem 0.45rem;
          border-radius: 999px;
          border: 1px solid rgba(56, 189, 248, 0.4);
          color: var(--t-accent, #38bdf8);
        }
        .lab-repo__top {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .lab-repo__name {
          font-size: 1rem;
          margin: 0;
        }
        .lab-repo__live {
          font-size: 0.625rem;
          letter-spacing: 0.1em;
          padding: 0.125rem 0.4rem;
          border-radius: 999px;
          border: 1px solid rgba(74, 222, 128, 0.35);
          color: #4ade80;
        }
        .lab-repo__desc {
          margin: 0;
          font-size: 0.8125rem;
          line-height: 1.6;
          opacity: 0.72;
        }
        .lab-repo__meta {
          display: flex;
          gap: 0.4rem;
          font-size: 0.6875rem;
          opacity: 0.45;
          margin-top: auto;
          padding-top: 0.5rem;
        }
        .lab-repo__links {
          display: flex;
          gap: 1rem;
          font-size: 0.75rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
        .lab-repo__links a {
          color: var(--t-accent, #38bdf8);
          text-decoration: none;
        }
        .lab-repo__links a:hover { text-decoration: underline; }

        /* ── 프로젝트 그리드 ── */
        .lab-grid {
          display: grid;
          /* 연구 포털 제거로 이 그리드에는 포털 카드 2장만 남았다.
             둘 다 전 폭을 쓰게 해서 한쪽만 좁게 남는 모양을 피한다.
             (auto-fit 으로는 안 된다 — lead 카드가 grid-column: 1/-1 로
              모든 트랙을 점유하므로 빈 트랙 축소가 발동하지 않는다) */
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        .lab-card {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.625rem;
          padding: 1.75rem;
          border: 1px solid var(--t-line);
          border-radius: var(--t-radius);
          background: var(--t-surface-1);
          text-align: left;
          text-decoration: none;
          font: inherit;
          color: inherit;
          cursor: pointer;
          transition: border-color 0.18s ease, background 0.18s ease;
        }
        .lab-card:hover {
          border-color: var(--t-accent-line);
          background: var(--t-surface-2);
        }
        .lab-card:hover .lab-arrow { transform: translateX(4px); }

        /* 플래그십은 전체 폭을 차지해 위계를 만든다 */
        .lab-card--lead,
        .lab-card--wide {
          grid-column: 1 / -1;
        }
        .lab-card--lead {
          padding: 2.25rem;
        }
        .lab-card--lead .lab-card__title { font-size: 1.75rem; }
        .lab-card--lead .lab-card__desc { max-width: 42ch; }

        .lab-card__title {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 700;
          letter-spacing: -0.01em;
          color: var(--t-fg);
        }
        .lab-card__desc {
          margin: 0;
          font-size: 0.9375rem;
          line-height: 1.6;
          color: var(--t-fg-muted);
          flex-grow: 1;
        }
        .lab-card__cta {
          margin-top: 0.75rem;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--t-accent);
        }

        /* ── 푸터 ── */
        .lab-foot {
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--t-line);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .lab-foot p {
          margin: 0;
          font-size: 0.8125rem;
          color: var(--t-fg-subtle);
        }
        /* ── 게임 섹션 ── */
        .lab-game {
          display: grid;
          grid-template-columns: 1fr 260px;
          gap: 1.5rem;
          align-items: center;
          margin-top: 2.5rem;
          padding: 2rem;
          border: 1px solid var(--t-line);
          border-radius: var(--t-radius);
          background: var(--t-surface-1);
          overflow: hidden;
        }
        .lab-game__title {
          margin: 0.375rem 0 0.5rem;
          font-size: 1.375rem;
          font-weight: 700;
          letter-spacing: -0.01em;
          color: var(--t-fg);
        }
        .lab-game__desc {
          margin: 0 0 1rem;
          font-size: 0.9375rem;
          line-height: 1.6;
          color: var(--t-fg-muted);
          max-width: 46ch;
        }
        .lab-game__modes {
          list-style: none;
          margin: 0 0 1.25rem;
          padding: 0;
          display: flex;
          flex-wrap: wrap;
          gap: 0.375rem;
        }
        .lab-game__modes li {
          padding: 0.3125rem 0.625rem;
          border: 1px solid var(--t-line);
          border-radius: 999px;
          font-size: 0.75rem;
          color: var(--t-fg-subtle);
        }
        .lab-game__cta {
          display: inline-flex;
          align-items: center;
          gap: 0.4375rem;
          padding: 0.6875rem 1.125rem;
          border-radius: var(--t-radius-sm);
          background: var(--t-accent);
          color: var(--t-accent-ink);
          font-size: 0.9375rem;
          font-weight: 650;
          text-decoration: none;
          transition: background 0.18s ease;
        }
        .lab-game__cta:hover { background: #5ee0ff; }
        .lab-game__cta:hover .lab-arrow { transform: translateX(3px); }

        .lab-game__art {
          display: flex;
          align-items: flex-end;
          justify-content: center;
          gap: 0.5rem;
        }
        .lab-game__art img {
          width: 50%;
          max-width: 118px;
          height: auto;
          object-fit: contain;
          filter: saturate(0.85);
        }

        /* ── 포커스 ── */
        .lab-hub a:focus-visible,
        .lab-hub button:focus-visible {
          outline: 2px solid var(--t-accent);
          outline-offset: 3px;
        }

        /* ── 반응형 ── */
        @media (max-width: 900px) {
          .lab-hub { padding: 2.5rem 1.25rem; }
          .lab-grid { grid-template-columns: repeat(2, 1fr); }
          .lab-head { padding: 2rem 0 1.5rem; }
          .lab-title { font-size: 2.25rem; }
          .lab-banner { flex-direction: column; align-items: flex-start; gap: 1rem; }
          .lab-game { grid-template-columns: 1fr; }
          .lab-game__art { order: -1; justify-content: flex-start; }
          .lab-game__art img { max-width: 92px; }
        }
        @media (max-width: 600px) {
          .lab-grid { grid-template-columns: 1fr; }
          .lab-title { font-size: 1.875rem; }
          .lab-logo { width: 64px; height: 64px; }
          .lab-news__item { flex-wrap: wrap; }
          .lab-foot { flex-direction: column; align-items: flex-start; }
          .lab-game { padding: 1.5rem; }
          .lab-game__cta { width: 100%; justify-content: center; }
        }

        @media (prefers-reduced-motion: reduce) {
          .lab-dot { animation: none; opacity: 1; }
          .lab-arrow, .lab-card, .lab-banner, .lab-game { transition: none; }
          .lab-card:hover .lab-arrow,
          .lab-banner:hover .lab-arrow { transform: none; }
        }
      `}</style>
    </div>
  );
};

export default GijoLab;
