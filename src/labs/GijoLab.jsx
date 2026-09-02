import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// GIJO 공식 심볼. gijo.ai 의 logo_gijo_white.svg 에서 마크 부분만 잘라낸 것이다.
// 기존 logo.png 는 229KB 였는데 이건 3KB 다.
import markImg from '../assets/gijo-mark.png';
import { PRODUCTS } from './products';
// 이 화면은 .lab-surface 위에서 --t-* 토큰을 15곳 쓴다. 토큰 정의는 tour-theme.css 에 있다.
// 예전에는 App.jsx 가 GijoTourApp 을 정적 import 하는 바람에 이 CSS 가 우연히 딸려 왔다.
// 투어를 React.lazy 로 분할하면서 그 우연이 끊겨 Labs 허브의 카드 배경·테두리가 전부 사라졌다.
// 부모(Labs)가 자식(투어)의 CSS 에 의존하는 구조 자체는 여전히 잘못됐다 -> 05-next.md [N-8].
// 여기서는 의존을 명시만 한다. 분리는 CSS 캐스케이드 정리([N-5]) 뒤에 한다.
import '../tour-app/tour-theme.css';


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
 *   · 타일은 타이포만 쓴다. 제품 화면 캡처를 넣었다가 걷어냈다(2026-09-02, 사용자 요청).
 *     이미지를 다시 넣는다면 실제 라이브 화면을 찍어 쓸 것. 가짜 div 목업은 만들지 않는다.
 */

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
            {/* 마크만 둔다. 바로 아래 헤드라인이 이미 브랜드명을 크게 말하고 있어
                텍스트 워드마크까지 넣으면 40px 안에서 같은 문구가 두 번 나온다. */}
            <div className="lab-intro__brand">
              <img src={markImg} alt="GIJO Tour LaB" className="lab-intro__logo" />
            </div>

            <h1 className="lab-intro__title">
              보안·AI 기술을 만드는
              <br />
              <span className="lab-intro__name">GIJO Tour LaB</span>
            </h1>

          </div>
        </header>

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
                ]
                  .filter(Boolean)
                  .join(' ')}
                style={{ '--i': i }}
              >
                <div className="lab-tile__body">
                  <div className="lab-tile__top">
                    <h2 className="lab-tile__name">{proj.name}</h2>
                    {proj.status && <span className="lab-tile__tag">{proj.status}</span>}
                  </div>

                  <p className="lab-tile__desc">{proj.summary}</p>

                  <p className="lab-tile__meta">
                    {proj.lang}
                    {proj.updated && ` · 업데이트 ${proj.updated}`}
                  </p>

                  {/* 사업 사이트는 잠금 없이 바로 연다. 상담 동선을 막을 이유가 없다. */}
                  {proj.site && (
                    <a
                      className="lab-tile__cta"
                      href={proj.site}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      바로가기 <span className="lab-arrow" aria-hidden="true">→</span>
                    </a>
                  )}

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
          <span className="lab-foot__brand">GIJO Tour LaB</span>
          <span className="lab-foot__copy">
            © {new Date().getFullYear()} GIJO Tour LaB. All rights reserved.
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
          /* 리드·CTA·상태 패널을 걷어내 우측 열이 비었다. 단일 열로 되돌린다. */
          padding: 3.5rem 0 2.5rem;
          border-bottom: 1px solid var(--t-line);
          margin-bottom: 2.5rem;
        }
        .lab-intro__brand {
          display: flex;
          align-items: center;
          margin-bottom: 1.25rem;
        }
        .lab-intro__logo {
          /* 심볼 원본이 100x96 이라 정사각으로 강제하면 찌그러진다.
             30px 에서는 육각형 외곽선과 사선이 뭉개져 파란 덩어리로 보인다.
             워드마크 텍스트를 뺀 뒤로 이 마크가 이 줄의 유일한 브랜드 요소다. */
          height: 44px;
          width: auto;
          object-fit: contain;
        }
        .lab-intro__title {
          font-size: clamp(2.25rem, 5vw, 3.5rem);
          line-height: 1.14;
          letter-spacing: -0.03em;
          margin: 0;
          font-weight: 800;
        }
        .lab-intro__name {
          letter-spacing: -0.02em;
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
          text-decoration: none;
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
          letter-spacing: 0.12em;
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
          .lab-intro { padding: 2.5rem 0 2rem; }
          .lab-products__grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          /* 2열에서는 강조 타일만 전 폭을 쓴다.
             MD Studio 같은 일반 wide 타일이 2칸을 계속 요구하면 줄바꿈이 일어나
             앞 타일 옆에 빈 칸이 남는다. */
          .lab-tile--wide:not(.lab-tile--featured) { grid-column: span 1; }
        }
        @media (max-width: 600px) {
          .lab-hub { padding: 1.5rem 1.125rem 2.5rem; }
          .lab-products__grid { grid-template-columns: 1fr; }
          .lab-tile--wide { grid-column: span 1; }
        }

        @media (prefers-reduced-motion: reduce) {
          .lab-tile,
          .lab-arrow {
            transition: none !important;
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default GijoLab;
