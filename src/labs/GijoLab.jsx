import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoImg from '../assets/logo.png';
import { PRODUCTS } from './products';
import { VENDORS, CONTACT_URL } from './vendors';

/**
 * GIJO LABS 허브 (/).
 *
 * 디자인 기준 (design-taste-frontend 감사 후 재작성, 2026-09-02)
 *   DESIGN_VARIANCE 7 / MOTION_INTENSITY 5 / VISUAL_DENSITY 4
 *
 *   · 레이아웃 패밀리를 4개로 나눈다: 비대칭 스플릿 히어로 / 베인토 그리드 /
 *     전폭 단일 행 / 2단 푸터. 이전에는 전부 중앙정렬 세로 스택 하나였다.
 *   · 모서리 반경 체계를 하나로 고정한다: 타일 14px, 배지/알약 999px, 입력·버튼 10px.
 *   · 액센트는 브랜드 시안(--t-accent) 하나만 쓴다. 페이지 어디서도 바꾸지 않는다.
 *   · 모션은 CSS 만 쓴다(이 저장소에 모션 라이브러리가 없다).
 *     transform/opacity 만 건드리고 prefers-reduced-motion 에서 전부 끈다.
 *   · 제품 화면 캡처는 실제 라이브 사이트를 찍은 것이다(public/shots/).
 *     가짜 div 목업을 만들지 않는다.
 */

/** 현재 상태. 사실만 적는다. */
const STATUS = [
  { id: 'as', name: 'GIJO AS', text: '보안 관제 제품 개발 진행 중' },
  { id: 'tour', name: '지아이조 투어', text: '1:1 전문가 매칭 서비스 운영 중' },
];

/**
 * 실행 잠금 코드.
 *
 * 이건 보안 장치가 아니다. 이 값은 프론트 번들에 그대로 실려 나가므로
 * 개발자 도구를 열거나 소스를 보면 누구나 읽을 수 있다.
 * 지나가는 방문자가 바로 못 열게 하는 문턱일 뿐이다.
 * 진짜로 막아야 한다면 서버 인증이 필요하다.
 */
const ACCESS_CODE = '0070';

const GijoLab = () => {
  const navigate = useNavigate();

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
        {/* ── 히어로 (비대칭 스플릿) ── */}
        <header className="lab-intro">
          <div className="lab-intro__copy">
            <div className="lab-intro__brand">
              <img src={logoImg} alt="" className="lab-intro__logo" />
              <span className="lab-intro__wordmark">GIJO LABS</span>
            </div>

            <h1 className="lab-intro__title">
              보안·AI 기술을 만드는
              <br />
              투어랩
            </h1>

            <p className="lab-intro__lead">
              보안 제품 공급과 기술지원이 본업입니다. 그 위에서 자체 제품도 만듭니다.
            </p>

            <div className="lab-intro__actions">
              <a
                className="lab-intro__cta"
                href={CONTACT_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                보안 상담 <span className="lab-arrow" aria-hidden="true">→</span>
              </a>
              <a className="lab-intro__cta lab-intro__cta--quiet" href="#products">
                자체 제품 보기
              </a>
            </div>
          </div>

          <aside className="lab-intro__status" aria-label="현재 상태">
            {STATUS.map((s) => (
              <p key={s.id} className="lab-status">
                <strong className="lab-status__name">{s.name}</strong>
                <span className="lab-status__text">{s.text}</span>
              </p>
            ))}
          </aside>
        </header>

        {/* ── 핵심 사업 ──
             보안 제품 공급과 기술지원이 본업이다. 자체 제품보다 먼저 온다.
             벤더 목록 출처와 로고를 쓰지 않는 이유는 vendors.js 주석 참조. */}
        <section className="lab-core" aria-labelledby="lab-core-title">
          <div className="lab-core__head">
            <h2 id="lab-core-title" className="lab-core__title">보안 제품 공급과 기술지원</h2>
            <p className="lab-core__lead">
              IT 인프라의 취약점을 외부자와 내부자 양쪽 관점에서 점검하고,
              서버에 쌓이는 개인정보를 검출·암호화·접근제어까지 이어서 관리합니다.
            </p>
            <a
              className="lab-core__cta"
              href={CONTACT_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              지아이조 테크놀로지 <span className="lab-arrow" aria-hidden="true">→</span>
            </a>
          </div>

          <ul className="lab-core__grid">
            {VENDORS.map((v) => (
              <li key={v.id} className="lab-vendor">
                <span className="lab-vendor__name">{v.name}</span>
                <span className="lab-vendor__ko">{v.ko}</span>
                <span className="lab-vendor__covers">{v.covers}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ── 제품 (베인토 그리드) ──
             모든 제품을 한 목록으로 둔다. 지아이조 투어도 여기 포함된다.
             투어는 Labs 아래 서비스 하나이지 상위 개념이 아니다.
             타일 크기와 순서 규칙은 products.js 주석 참조. */}
        <section id="products" className="lab-products" aria-label="제품">
          <ul className="lab-products__grid">
            {PRODUCTS.map((proj, i) => (
              <li
                key={proj.id}
                className={[
                  'lab-tile',
                  proj.span === 2 ? 'lab-tile--wide' : '',
                  proj.featured ? 'lab-tile--featured' : '',
                  proj.shot ? 'lab-tile--shot' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                style={{ '--i': i }}
              >
                {proj.shot && (
                  <div className="lab-tile__shot">
                    <img
                      src={proj.shot}
                      alt={`${proj.name} 실제 화면`}
                      width="640"
                      height="400"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                )}

                <div className="lab-tile__body">
                  <div className="lab-tile__top">
                    <h2 className="lab-tile__name">{proj.name}</h2>
                    {proj.status && <span className="lab-tile__tag">{proj.status}</span>}
                  </div>

                  <p className="lab-tile__desc">{proj.summary}</p>

                  <p className="lab-tile__meta">
                    {proj.lang} · 업데이트 {proj.updated}
                  </p>

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
                        <button type="submit" className="lab-gate__ok">확인</button>
                        <button type="button" className="lab-gate__cancel" onClick={closeGate}>
                          취소
                        </button>
                        {gateError && (
                          <span className="lab-gate__error" role="alert">{gateError}</span>
                        )}
                      </form>
                    ) : (
                      <button type="button" className="lab-tile__cta" onClick={() => openGate(proj)}>
                        {proj.internal ? '열기' : '실행'}{' '}
                        <span className="lab-arrow" aria-hidden="true">→</span>
                      </button>
                    ))}
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* ── 푸터 (2단) ── */}
        <footer className="lab-foot">
          <span className="lab-foot__brand">GIJO LABS</span>
          <span className="lab-foot__copy">
            © {new Date().getFullYear()} GIJO Labs. All rights reserved.
          </span>
        </footer>
      </div>

      <style>{`
        /* 모서리 반경 체계 - 페이지 전체에서 이 셋만 쓴다
           타일 14px / 배지·알약 999px / 입력·버튼 10px */

        .lab-hub {
          min-height: 100dvh;
          padding: 2rem 1.5rem 3rem;
          background:
            radial-gradient(900px 520px at 12% -8%, rgba(53, 214, 255, 0.09), transparent 68%),
            var(--t-bg);
        }
        .lab-shell {
          width: min(1120px, 100%);
          margin: 0 auto;
          /* 한국어는 어절 단위로 끊어야 한다. 기본값이면 '만듭/니다' 처럼
             단어 중간에서 잘린다. */
          word-break: keep-all;
          overflow-wrap: anywhere;
        }

        /* 전역 section { padding: 140px 0 }(01-base-tokens.css:178) 무력화.
           투어 랜딩용 요소 셀렉터인데 이 페이지 섹션까지 잡는다.
           전역 규칙 자체는 손대지 않는다. 투어 전 화면에 영향이 간다. */
        .lab-products {
          padding: 0;
        }

        /* ── 히어로 ── 좌측 정렬 비대칭 스플릿
           클래스명이 lab-hero 가 아니라 lab-intro 인 이유:
           05-payment-lab-hub.css:291 에 이미 .lab-hero 가 있고
           align-items:center + text-align:center 를 건다.
           내 규칙에 text-align 선언이 없으면 그게 그대로 상속돼 스플릿이 깨진다.
           전역 규칙을 고치면 투어 화면에 영향이 가므로 이름을 피했다. */
        .lab-intro {
          display: grid;
          grid-template-columns: minmax(0, 1.45fr) minmax(0, 1fr);
          gap: 2.5rem;
          align-items: end;
          padding: 3.5rem 0 3rem;
          border-bottom: 1px solid var(--t-line);
          margin-bottom: 2.5rem;
        }
        .lab-intro__brand {
          display: flex;
          align-items: center;
          gap: 0.625rem;
          margin-bottom: 1.5rem;
        }
        .lab-intro__logo {
          width: 32px;
          height: 32px;
          object-fit: contain;
        }
        .lab-intro__wordmark {
          font-size: 0.8125rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          opacity: 0.62;
        }
        .lab-intro__title {
          font-size: clamp(2.25rem, 5vw, 3.5rem);
          line-height: 1.14;
          letter-spacing: -0.03em;
          margin: 0 0 1.125rem;
          font-weight: 800;
        }
        .lab-intro__lead {
          margin: 0 0 1.75rem;
          max-width: 46ch;
          font-size: 1rem;
          line-height: 1.7;
          opacity: 0.66;
        }
        .lab-intro__cta {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.7rem 1.4rem;
          border-radius: 10px;
          background: var(--t-accent);
          color: var(--t-accent-ink);
          font-size: 0.875rem;
          font-weight: 700;
          text-decoration: none;
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), filter 0.25s;
        }
        .lab-intro__cta:hover { filter: brightness(1.08); }
        .lab-intro__cta:active { transform: translateY(1px); }
        .lab-intro__actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }
        /* 보조 CTA. 본업 상담이 1차, 자체 제품 열람이 2차다. */
        .lab-intro__cta--quiet {
          background: none;
          color: inherit;
          border: 1px solid var(--t-line-strong);
          font-weight: 600;
          opacity: 0.78;
        }
        .lab-intro__cta--quiet:hover { filter: none; opacity: 1; }

        .lab-intro__status {
          display: grid;
          gap: 0.75rem;
          align-content: end;
          padding-bottom: 0.375rem;
        }
        .lab-status {
          margin: 0;
          padding-left: 0.875rem;
          border-left: 2px solid var(--t-accent-line);
        }
        .lab-status__name {
          display: block;
          font-size: 0.8125rem;
          font-weight: 700;
        }
        .lab-status__text {
          display: block;
          margin-top: 0.15rem;
          font-size: 0.8125rem;
          line-height: 1.5;
          opacity: 0.55;
        }

        /* ── 핵심 사업 ──
           전역 section { padding: 140px 0 } 무력화는 아래 .lab-products 와 동일 이유. */
        .lab-core {
          padding: 0;
          margin-bottom: 2.5rem;
        }
        .lab-core__head {
          display: grid;
          gap: 0.75rem;
          justify-items: start;
          margin-bottom: 1.25rem;
        }
        .lab-core__title {
          margin: 0;
          font-size: clamp(1.375rem, 2.6vw, 1.75rem);
          letter-spacing: -0.02em;
        }
        .lab-core__lead {
          margin: 0;
          max-width: 62ch;
          font-size: 0.9375rem;
          line-height: 1.7;
          opacity: 0.62;
        }
        .lab-core__cta {
          font-size: 0.8125rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          color: var(--t-accent);
          text-decoration: none;
        }
        .lab-core__cta:hover { text-decoration: underline; }
        .lab-core__cta:hover .lab-arrow { transform: translateX(3px); }

        .lab-core__grid {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1px;
          background: var(--t-line);
          border: 1px solid var(--t-line);
          border-radius: 14px;
          overflow: hidden;
        }
        .lab-vendor {
          display: grid;
          gap: 0.2rem;
          align-content: start;
          padding: 1.125rem 1.25rem;
          background: var(--t-bg);
          transition: background 0.3s;
        }
        .lab-vendor:hover { background: rgba(255, 255, 255, 0.03); }
        .lab-vendor__name {
          font-size: 0.9375rem;
          font-weight: 700;
          letter-spacing: 0.01em;
        }
        .lab-vendor__ko {
          font-size: 0.6875rem;
          opacity: 0.4;
        }
        .lab-vendor__covers {
          margin-top: 0.3rem;
          font-size: 0.8125rem;
          line-height: 1.5;
          opacity: 0.6;
        }

        /* ── 제품 베인토 ── */
        .lab-products__grid {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 0.875rem;
        }
        .lab-tile {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border: 1px solid var(--t-line);
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.022);
          transition:
            transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
            border-color 0.3s,
            background 0.3s;
        }
        .lab-tile:hover {
          transform: translateY(-3px);
          border-color: var(--t-line-strong);
          background: rgba(255, 255, 255, 0.04);
        }
        .lab-tile--wide { grid-column: span 2; }
        .lab-tile--featured {
          border-color: var(--t-accent-line);
          background:
            linear-gradient(140deg, var(--t-accent-weak), rgba(255, 255, 255, 0.02));
        }

        .lab-tile__shot {
          aspect-ratio: 16 / 10;
          overflow: hidden;
          border-bottom: 1px solid var(--t-line);
          background: rgba(255, 255, 255, 0.03);
        }
        .lab-tile__shot img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          display: block;
          transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .lab-tile:hover .lab-tile__shot img { transform: scale(1.035); }

        .lab-tile__body {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          flex: 1;
          padding: 1.25rem;
        }
        .lab-tile--featured .lab-tile__body { padding: 1.625rem; }

        .lab-tile__top {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .lab-tile__name {
          margin: 0;
          font-size: 1rem;
          letter-spacing: -0.01em;
        }
        .lab-tile--featured .lab-tile__name { font-size: 1.3125rem; }
        .lab-tile__tag {
          font-size: 0.625rem;
          letter-spacing: 0.1em;
          padding: 0.15rem 0.5rem;
          border-radius: 999px;
          border: 1px solid var(--t-accent-line);
          color: var(--t-accent);
        }
        .lab-tile__desc {
          margin: 0;
          font-size: 0.8125rem;
          line-height: 1.65;
          opacity: 0.62;
        }
        .lab-tile--featured .lab-tile__desc {
          font-size: 0.9375rem;
          max-width: 54ch;
        }
        .lab-tile__meta {
          margin: auto 0 0;
          padding-top: 0.625rem;
          font-size: 0.6875rem;
          opacity: 0.38;
        }
        .lab-tile__cta {
          align-self: flex-start;
          padding: 0;
          border: 0;
          background: none;
          font: inherit;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: var(--t-accent);
          cursor: pointer;
        }
        .lab-tile__cta:hover { text-decoration: underline; }
        .lab-tile__cta .lab-arrow {
          display: inline-block;
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .lab-tile__cta:hover .lab-arrow { transform: translateX(3px); }

        /* ── 실행 잠금 ── */
        .lab-gate {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .lab-gate input {
          width: 6.5rem;
          padding: 0.4rem 0.6rem;
          font: inherit;
          font-size: 0.8125rem;
          color: inherit;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--t-line-strong);
          border-radius: 10px;
        }
        .lab-gate input::placeholder { color: rgba(255, 255, 255, 0.42); }
        .lab-gate input:focus {
          outline: 2px solid var(--t-accent-line);
          outline-offset: 1px;
          border-color: transparent;
        }
        .lab-gate button {
          font: inherit;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.4rem 0.75rem;
          border-radius: 10px;
          cursor: pointer;
        }
        .lab-gate__ok {
          border: 1px solid transparent;
          background: var(--t-accent);
          color: var(--t-accent-ink);
        }
        .lab-gate__cancel {
          border: 1px solid var(--t-line-strong);
          background: none;
          color: inherit;
          opacity: 0.62;
        }
        .lab-gate__error {
          flex-basis: 100%;
          font-size: 0.75rem;
          color: #ff8a8a;
        }

        /* ── 푸터 ── */
        .lab-foot {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
          margin-top: 2.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--t-line);
        }
        .lab-foot__brand {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          opacity: 0.5;
        }
        .lab-foot__copy { font-size: 0.75rem; opacity: 0.32; }

        .lab-arrow {
          display: inline-block;
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* ── 진입 모션 ──
           타일이 순서대로 올라온다. 위계를 알려주는 목적이며
           transform/opacity 만 건드린다. */
        @media (prefers-reduced-motion: no-preference) {
          .lab-tile {
            opacity: 0;
            animation: lab-rise 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            animation-delay: calc(var(--i, 0) * 55ms);
          }
          @keyframes lab-rise {
            from { opacity: 0; transform: translateY(14px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        }

        /* ── 반응형 ── */
        @media (max-width: 900px) {
          .lab-intro {
            grid-template-columns: 1fr;
            gap: 1.75rem;
            align-items: start;
            padding: 2.5rem 0 2.25rem;
          }
          .lab-intro__status { align-content: start; padding-bottom: 0; }
          .lab-products__grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .lab-core__grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          /* 2열에서는 강조 타일만 전 폭을 쓴다.
             MD Studio 같은 일반 wide 타일이 2칸을 계속 요구하면 줄바꿈이 일어나
             앞 타일 옆에 빈 칸이 남는다. */
          .lab-tile--wide:not(.lab-tile--featured) { grid-column: span 1; }
        }
        @media (max-width: 600px) {
          .lab-hub { padding: 1.5rem 1.125rem 2.5rem; }
          .lab-products__grid { grid-template-columns: 1fr; }
          .lab-core__grid { grid-template-columns: 1fr; }
          .lab-tile--wide { grid-column: span 1; }
        }

        @media (prefers-reduced-motion: reduce) {
          .lab-tile,
          .lab-tile__shot img,
          .lab-arrow,
          .lab-intro__cta {
            transition: none !important;
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default GijoLab;
