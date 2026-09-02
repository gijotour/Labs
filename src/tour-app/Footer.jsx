import { Link } from 'react-router-dom';

/**
 * 투어 서비스 푸터.
 *
 * 예전에는 index.css 의 구 언어(.footer / .glass-card-no-hover / .container)를 썼다.
 * 둥근 카드가 페이지 바닥에서 100px 떠 있고 워드마크에 파란 그라데이션이 걸려,
 * 투어 화면 중 유일하게 Labs 허브와 톤이 끊기는 지점이었다.
 * 지금은 나머지 고객 화면과 같은 .t-* 토큰 위에서 그린다.
 *
 * 링크 정리 (2026-09-02):
 *   · SERVICE 는 실제 라우트가 있는 것만 남겼다. 예전 #designer / #regions 는
 *     라우터 앱에서 존재하지 않는 앵커라 클릭하면 아무 일도 일어나지 않았다.
 *   · SUPPORT 는 갈 곳이 없어 href="#" 로 걸려 있었다. 맨 위로 튀는 가짜 링크라
 *     링크를 걷어내고 안내 문구로 바꿨다. 페이지가 생기면 <Link> 로 되돌린다.
 */

const SERVICE_LINKS = [
  { to: '/gijotour/proposals', label: '여행설계사 제안서' },
  { to: '/gijotour/tv', label: '설계사 TV' },
  { to: '/gijotour/about', label: '기업 워크샵' }
];

const SUPPORT_ITEMS = ['세금계산서 문의', '카드 결제 안내', '이용약관'];

const Footer = () => {
  return (
    <footer className="t-foot">
      <div className="t-shell">
        <div className="t-foot__grid">
          <div className="t-foot__about">
            <span className="t-foot__brand">GIJO Tour LaB</span>
            <p className="t-foot__desc">
              가이드의 특색을 담은 B2B 전문 여행 포털. 후불 정산으로 파트너사와 고객
              양쪽의 위험을 줄입니다.
            </p>
          </div>

          <nav className="t-foot__col" aria-label="서비스">
            <h2 className="t-foot__head">서비스</h2>
            <ul>
              {SERVICE_LINKS.map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="t-foot__col">
            <h2 className="t-foot__head">고객 지원</h2>
            <ul>
              {SUPPORT_ITEMS.map((item) => (
                <li key={item} className="t-foot__soon">{item}</li>
              ))}
            </ul>
            <p className="t-foot__note">전화·이메일로 먼저 문의해 주세요.</p>
          </div>

          <div className="t-foot__col">
            <h2 className="t-foot__head">문의</h2>
            <ul>
              <li><a href="mailto:contact@gijotour.com">contact@gijotour.com</a></li>
              <li><a href="tel:+82212345678">+82 (0)2-1234-5678</a></li>
            </ul>
          </div>
        </div>

        <p className="t-foot__copy">
          © {new Date().getFullYear()} GIJO Tour LaB. All rights reserved.
        </p>
      </div>

      <style>{`
        /* 이 파일의 규칙은 .tour-surface 스코프 밖이다.
           푸터는 GijoTourApp 이 셸 바깥에서 렌더하므로 토큰만 상속받아 쓴다.
           tour-theme.css 의 .t-shell 도 .tour-surface 자손 셀렉터라 여기엔 안 걸린다.
           같은 값을 여기서 다시 준다. 안 그러면 푸터가 화면 폭 끝까지 붙는다. */
        .t-foot .t-shell {
          width: min(1180px, calc(100% - 3rem));
          margin: 0 auto;
        }
        .t-foot {
          border-top: 1px solid var(--t-line);
          background: var(--t-bg);
          color: var(--t-fg-muted);
          padding: 3.5rem 0 2rem;
          font-size: var(--t-small);
          /* 한국어는 어절 단위로 끊어야 '플랫/폼' 처럼 갈라지지 않는다 */
          word-break: keep-all;
          overflow-wrap: anywhere;
        }
        .t-foot__grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 2.5rem;
          align-items: start;
        }
        .t-foot__brand {
          display: block;
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: -0.01em;
          color: var(--t-fg);
          margin-bottom: 0.75rem;
        }
        .t-foot__desc {
          margin: 0;
          max-width: 34ch;
          line-height: 1.7;
          color: var(--t-fg-subtle);
        }
        .t-foot__head {
          margin: 0 0 0.875rem;
          font-size: var(--t-small);
          font-weight: 600;
          color: var(--t-fg);
        }
        .t-foot__col ul {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          gap: 0.5rem;
        }
        .t-foot__col a {
          color: var(--t-fg-subtle);
          text-decoration: none;
          transition: color 0.2s;
        }
        .t-foot__col a:hover,
        .t-foot__col a:focus-visible {
          color: var(--t-fg);
        }
        .t-foot__col a:focus-visible {
          outline: 2px solid var(--t-accent-line);
          outline-offset: 3px;
          border-radius: 4px;
        }
        /* 아직 페이지가 없는 항목. 링크처럼 보이면 안 된다. */
        .t-foot__soon {
          color: var(--t-fg-subtle);
          opacity: 0.65;
        }
        .t-foot__note {
          margin: 0.875rem 0 0;
          color: var(--t-fg-subtle);
          opacity: 0.65;
          line-height: 1.6;
        }
        .t-foot__copy {
          margin: 3rem 0 0;
          padding-top: 1.5rem;
          border-top: 1px solid var(--t-line);
          color: var(--t-fg-subtle);
        }

        @media (max-width: 860px) {
          .t-foot__grid {
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
          }
          .t-foot__about {
            grid-column: 1 / -1;
          }
        }
        @media (max-width: 520px) {
          .t-foot__grid {
            grid-template-columns: 1fr;
          }
          .t-foot__copy {
            margin-top: 2rem;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
