import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoImg from '../assets/logo.png';
import { PRODUCTS } from './products';
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

/**
 * 실행 잠금 코드.
 *
 * ⚠ 이건 보안 장치가 아니다. 이 값은 프론트 번들에 그대로 실려 나가므로
 *   개발자 도구를 열거나 소스를 보면 누구나 읽을 수 있다.
 *   지나가는 방문자가 바로 못 열게 하는 문턱일 뿐이다.
 *   진짜로 막아야 한다면 서버 인증이 필요하다.
 */
const ACCESS_CODE = '0070';

const GijoLab = () => {
  const navigate = useNavigate();

  // 실행 잠금 — 어느 카드에서 열렸는지, 어디로 보낼지
  const [gate, setGate] = useState(null); // { id, kind, target }
  const [pw, setPw] = useState('');
  const [gateError, setGateError] = useState('');

  const openGate = (proj) => {
    setGate(
      proj.internal
        ? { id: proj.id, kind: 'internal', target: proj.internal }
        : { id: proj.id, kind: 'external', target: proj.live }
    );
    setPw('');
    setGateError('');
  };

  const closeGate = () => {
    setGate(null);
    setPw('');
    setGateError('');
  };

  const submitGate = (e) => {
    e.preventDefault();
    if (pw !== ACCESS_CODE) {
      setGateError('비밀번호가 올바르지 않습니다.');
      return;
    }
    const { kind, target } = gate;
    closeGate();
    // window.open 은 이 제출 핸들러(사용자 제스처) 안에서 호출해야 팝업 차단을 피한다
    if (kind === 'internal') navigate(target);
    else window.open(target, '_blank', 'noopener,noreferrer');
  };

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

        {/* ── 제품군 ──
             GIJO LABS 의 모든 제품을 한 목록으로 둔다. 지아이조 투어도 여기 포함된다
             — 투어는 Labs 아래 서비스 하나이지 상위 개념이 아니다.
             데이터는 products.js. 공개 노출 원칙은 그 파일 주석에 있다. */}
        <section className="lab-repos" aria-label="제품">
          <ul className="lab-repos__grid">
            {PRODUCTS.map((proj) => (
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
                {/* 코드(저장소) 링크는 노출하지 않는다. 실행 가능한 것만 잠금 뒤에 둔다. */}
                {(proj.internal || proj.live) &&
                  (gate?.id === proj.id ? (
                    <form className="lab-gate" onSubmit={submitGate}>
                      <input
                        type="password"
                        inputMode="numeric"
                        autoFocus
                        value={pw}
                        onChange={(e) => setPw(e.target.value)}
                        placeholder="비밀번호"
                        aria-label={`${proj.name} 비밀번호`}
                      />
                      <button type="submit">확인</button>
                      <button type="button" className="lab-gate__cancel" onClick={closeGate}>
                        취소
                      </button>
                      {gateError && (
                        <span className="lab-gate__error" role="alert">{gateError}</span>
                      )}
                    </form>
                  ) : (
                    <div className="lab-repo__links">
                      <button type="button" onClick={() => openGate(proj)}>
                        {proj.internal ? '열기' : '실행'}{' '}
                        <span className="lab-arrow" aria-hidden="true">→</span>
                      </button>
                    </div>
                  ))}
              </li>
            ))}
          </ul>
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
          padding: 2.5rem 0 1.75rem;
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
        /* 전역 section 규칙(01-base-tokens.css:178 — padding 140px 0) 무력화.
           투어 랜딩용으로 만든 요소 셀렉터인데 Labs 허브의 섹션까지 잡아
           위아래로 280px 씩 빈 공간을 만들고 있었다.
           전역 규칙 자체는 손대지 않는다 — 투어 전 화면에 영향이 간다. */
        .lab-news,
        .lab-repos {
          padding: 0;
        }

        .lab-news {
          display: grid;
          gap: 0.5rem;
          max-width: 780px;
          margin: 0 auto 2rem;
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
        .lab-repos { margin-top: 0; }
        .lab-repos__head {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 0.875rem;
        }
        .lab-repos__all {
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
        .lab-gate {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .lab-gate input {
          width: 6.5rem;
          padding: 0.35rem 0.55rem;
          font: inherit;
          font-size: 0.8125rem;
          color: inherit;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--t-line);
          border-radius: 8px;
        }
        .lab-gate input:focus {
          outline: none;
          border-color: rgba(56, 189, 248, 0.5);
        }
        .lab-gate button {
          font-size: 0.75rem;
          letter-spacing: 0.06em;
          padding: 0.35rem 0.7rem;
          border-radius: 8px;
          border: 1px solid rgba(56, 189, 248, 0.35);
          background: none;
          color: var(--t-accent, #38bdf8);
          cursor: pointer;
        }
        .lab-gate__cancel {
          border-color: var(--t-line) !important;
          color: inherit !important;
          opacity: 0.55;
        }
        .lab-gate__error {
          flex-basis: 100%;
          font-size: 0.75rem;
          color: #f87171;
        }
        .lab-repo__links {
          display: flex;
          gap: 1rem;
          font-size: 0.75rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
        .lab-repo__links a,
        .lab-repo__links button {
          color: var(--t-accent, #38bdf8);
          text-decoration: none;
          background: none;
          border: 0;
          padding: 0;
          font: inherit;
          letter-spacing: inherit;
          text-transform: inherit;
          cursor: pointer;
        }
        .lab-repo__links a:hover,
        .lab-repo__links button:hover { text-decoration: underline; }

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
        }
        @media (max-width: 600px) {
          .lab-grid { grid-template-columns: 1fr; }
          .lab-title { font-size: 1.875rem; }
          .lab-logo { width: 64px; height: 64px; }
          .lab-news__item { flex-wrap: wrap; }
          .lab-foot { flex-direction: column; align-items: flex-start; }
        }

        @media (prefers-reduced-motion: reduce) {
          .lab-dot { animation: none; opacity: 1; }
          .lab-arrow, .lab-card, .lab-banner { transition: none; }
          .lab-card:hover .lab-arrow,
          .lab-banner:hover .lab-arrow { transform: none; }
        }
      `}</style>
    </div>
  );
};

export default GijoLab;
