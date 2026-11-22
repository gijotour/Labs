/**
 * Labs 화면(/ · /tech · /travel) 공용 스타일.
 *
 * CSS 파일이 아니라 문자열로 두고 각 화면이 <style> 로 넣는다. 이유:
 *  · 원래 GijoLab.jsx 안에 <style> 로 들어 있던 규칙이다. 화면이 셋으로 늘어 한 곳으로 옮겼다.
 *  · CSS 파일로 만들어 import 하면 dist/assets/index-*.css 에 섞여 들어가 기존 캐스케이드
 *    (src/styles/01~08)와 순서 싸움을 한다. 문자열로 두면 그 산출물이 한 바이트도 안 변한다.
 *
 * 토큰(--t-*)은 .lab-surface 가 준다(정의는 ./lab-theme.css).
 */
export const LAB_STYLES = `
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
      
        /* ════════════════════════════════════════════════════════════════
           아래는 허브를 기술/투어 두 갈래로 나누면서 더한 규칙이다(2026-11-19).
           위 규칙은 GijoLab.jsx 에 있던 것을 글자 그대로 옮긴 것이다.
           ════════════════════════════════════════════════════════════════ */

        .lab-kicker {
          margin: 0 0 0.625rem;
          font-size: 0.75rem;
          letter-spacing: 0.12em;
          color: var(--t-fg-subtle);
        }
        .lab-lead {
          max-width: 60ch;
          margin: 1.25rem 0 0;
          font-size: 1.0625rem;
          line-height: 1.65;
          color: var(--t-fg-muted);
        }
        .lab-pill {
          display: inline-block;
          font-size: 0.6875rem;
          letter-spacing: 0.08em;
          padding: 0.2rem 0.625rem;
          border-radius: 999px;
          border: 1px solid var(--t-line-strong);
          color: var(--t-fg-muted);
        }
        .lab-pill--accent {
          border-color: var(--t-accent-line);
          color: var(--t-accent);
        }

        /* ── 허브(/)의 두 문 ── */
        .lab-doors {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 0.875rem;
        }
        .lab-door {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          height: 100%;
          min-height: 320px;
          padding: 2rem;
          color: inherit;
          text-decoration: none;
          border: 1px solid var(--t-line);
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.022);
          transition:
            transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
            border-color 0.3s,
            background 0.3s;
        }
        .lab-door:hover {
          transform: translateY(-3px);
          border-color: var(--t-line-strong);
          background: rgba(255, 255, 255, 0.04);
        }
        .lab-door:focus-visible,
        .lab-topnav a:focus-visible,
        .lab-step__cta:focus-visible,
        .lab-closing__btn:focus-visible {
          outline: 2px solid var(--t-accent);
          outline-offset: 2px;
        }
        .lab-door--accent {
          border-color: var(--t-accent-line);
          background: linear-gradient(140deg, var(--t-accent-weak), rgba(255, 255, 255, 0.02));
        }
        .lab-door .lab-pill { align-self: flex-start; }
        .lab-door__title {
          margin: 0;
          font-size: 1.75rem;
          line-height: 1.3;
          letter-spacing: -0.02em;
          font-weight: 800;
          color: var(--t-fg);
        }
        .lab-door__desc {
          margin: 0;
          max-width: 44ch;
          font-size: 1rem;
          line-height: 1.65;
          color: var(--t-fg-muted);
        }
        .lab-door__items {
          list-style: none;
          margin: auto 0 0;
          padding: 0.5rem 0 0;
          display: flex;
          flex-wrap: wrap;
          gap: 0.375rem;
        }
        .lab-door__items li {
          font-size: 0.75rem;
          padding: 0.15rem 0.55rem;
          border: 1px solid var(--t-line-strong);
          border-radius: 999px;
        }
        .lab-door__cta {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: var(--t-accent);
        }
        .lab-door:hover .lab-arrow { transform: translateX(3px); }

        /* ── 갈래 화면(/tech · /travel) ── */
        .lab-topnav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.5rem 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--t-line);
        }
        .lab-topnav__brand {
          font-weight: 800;
          letter-spacing: -0.01em;
        }
        .lab-topnav__brand small {
          margin-left: 0.5rem;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--t-fg-subtle);
        }
        .lab-topnav__links {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          gap: 1.25rem;
          font-size: 0.8125rem;
          font-weight: 600;
        }
        .lab-topnav__links a {
          color: var(--t-fg-muted);
          text-decoration: none;
          white-space: nowrap;
        }
        .lab-topnav__links a:hover { color: var(--t-fg); }
        .lab-topnav__links a[aria-current="page"] { color: var(--t-accent); }

        .lab-block {
          /* 전역 section { padding: 140px 0 } 를 이 화면 안에서만 덮는다 */
          padding: 0 0 3rem;
        }
        .lab-block__title {
          margin: 0;
          font-size: clamp(1.375rem, 3vw, 1.875rem);
          line-height: 1.3;
          letter-spacing: -0.02em;
          font-weight: 800;
          color: var(--t-fg);
        }
        .lab-block__lead {
          max-width: 60ch;
          margin: 0.75rem 0 0;
          font-size: 1rem;
          line-height: 1.65;
          color: var(--t-fg-muted);
        }
        .lab-block .lab-products__grid,
        .lab-block .lab-ladder { margin-top: 1.75rem; }
        .lab-note {
          margin: 1rem 0 0;
          font-size: 0.8125rem;
          color: var(--t-fg-subtle);
        }

        /* 제품 구성(단계) */
        .lab-ladder {
          list-style: none;
          padding: 0;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 0.875rem;
        }
        .lab-step {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding: 1.5rem;
          border: 1px solid var(--t-line);
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.022);
        }
        .lab-step--accent {
          border-color: var(--t-accent-line);
          background: linear-gradient(140deg, var(--t-accent-weak), rgba(255, 255, 255, 0.02));
        }
        .lab-step__num {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--t-accent);
        }
        .lab-step__name {
          margin: 0;
          font-size: 1.0625rem;
          line-height: 1.4;
          letter-spacing: -0.01em;
          font-weight: 700;
          color: var(--t-fg);
        }
        .lab-step__who {
          margin: 0;
          font-size: 0.8125rem;
          color: var(--t-fg-subtle);
        }
        .lab-step__text {
          margin: 0;
          font-size: 0.9rem;
          line-height: 1.65;
          color: var(--t-fg-muted);
        }
        .lab-step__cta {
          align-self: flex-start;
          margin-top: auto;
          padding-top: 0.75rem;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: var(--t-accent);
          text-decoration: none;
        }
        .lab-step__cta:hover { text-decoration: underline; }
        .lab-step__cta:hover .lab-arrow { transform: translateX(3px); }

        /* 맺음(문의) */
        .lab-closing {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          padding: 2rem;
          border: 1px solid var(--t-line-strong);
          border-radius: 14px;
          background: var(--t-surface-1);
        }
        .lab-closing__text {
          max-width: 52ch;
          margin: 0.375rem 0 0;
          font-size: 0.9375rem;
          color: var(--t-fg-muted);
        }
        .lab-closing__btn {
          display: inline-flex;
          gap: 0.375rem;
          padding: 0.7rem 1.125rem;
          font-size: 0.875rem;
          font-weight: 700;
          white-space: nowrap;
          text-decoration: none;
          border-radius: 10px;
          background: var(--t-accent);
          color: var(--t-accent-ink);
        }

        @media (max-width: 900px) {
          .lab-ladder { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          /* 단계가 홀수라 2열에서는 마지막 하나가 혼자 남는다. 한 줄을 다 쓰게 한다. */
          .lab-ladder > li:last-child:nth-child(odd) { grid-column: 1 / -1; }
        }
        @media (max-width: 600px) {
          .lab-doors,
          .lab-ladder { grid-template-columns: 1fr; }
          .lab-ladder > li:last-child:nth-child(odd) { grid-column: auto; }
          .lab-door { min-height: 0; padding: 1.5rem; }
          .lab-closing { padding: 1.5rem; }
        }
        @media (prefers-reduced-motion: reduce) {
          .lab-door,
          .lab-door .lab-arrow {
            transition: none !important;
            transform: none !important;
          }
        }
`;
