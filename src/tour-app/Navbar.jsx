import { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import logoImg from '../assets/logo.png';

const MENU = [
  { to: '/gijotour/proposals', label: '제안서' },
  { to: '/gijotour/reviews', label: '후기·공지' },
  { to: '/gijotour/tv', label: '설계사 TV' },
  { to: '/gijotour/about', label: '기업 워크샵' }
];

const Navbar = ({ isLoggedIn, onLogout, userName, userRole }) => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isStaffArea = location.pathname.includes('/admin') || location.pathname.includes('/designer');

  return (
    <header className={`t-nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="t-nav__inner">
        <Link to="/gijotour" className="t-nav__brand" aria-label="지아이조 투어 홈">
          <img src={logoImg} alt="" className="t-nav__logo" />
          <span className="t-nav__brand-copy">
            <strong>GIJO TOUR</strong>
            <em>PREMIUM TRAVEL</em>
          </span>
        </Link>

        {!isStaffArea && (
          <nav className="t-nav__menu" aria-label="주요 메뉴">
            {MENU.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `t-nav__link ${isActive ? 'is-active' : ''}`}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        )}

        <div className="t-nav__actions">
          {isLoggedIn ? (
            <>
              <Link
                to={userRole === 'admin' ? '/gijotour/admin' : '/gijotour/designer'}
                className="t-nav__who"
              >
                {userName}
              </Link>
              <button type="button" className="t-nav__cta t-nav__cta--quiet" onClick={onLogout}>
                로그아웃
              </button>
            </>
          ) : (
            <Link to="/gijotour/login" className="t-nav__who">파트너 로그인</Link>
          )}

          {!isStaffArea && (
            <Link to="/gijotour#request" className="t-nav__cta">무료 상담</Link>
          )}

          <button
            type="button"
            className="t-nav__burger"
            aria-expanded={menuOpen}
            aria-controls="t-nav-mobile"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="sr-only">메뉴 {menuOpen ? '닫기' : '열기'}</span>
            <span aria-hidden="true">{menuOpen ? '✕' : '☰'}</span>
          </button>
        </div>
      </div>

      {menuOpen && !isStaffArea && (
        <nav className="t-nav__mobile" id="t-nav-mobile" aria-label="모바일 메뉴">
          {MENU.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className="t-nav__mobile-link"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
          <Link
            to="/gijotour#request"
            className="t-nav__mobile-link is-cta"
            onClick={() => setMenuOpen(false)}
          >
            무료 상담 신청
          </Link>
        </nav>
      )}

      <style>{`
        .t-nav {
          position: sticky;
          top: 0;
          z-index: 900;
          background: rgba(7, 11, 18, 0.72);
          border-bottom: 1px solid transparent;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition: background 0.2s ease, border-color 0.2s ease;
        }
        .t-nav.is-scrolled {
          background: rgba(7, 11, 18, 0.94);
          border-bottom-color: rgba(255, 255, 255, 0.09);
        }
        .t-nav__inner {
          width: min(1180px, calc(100% - 3rem));
          margin: 0 auto;
          height: 68px;
          display: flex;
          align-items: center;
          gap: 2rem;
        }
        .t-nav__brand {
          display: flex;
          align-items: center;
          gap: 0.625rem;
          text-decoration: none;
          flex-shrink: 0;
        }
        .t-nav__logo {
          height: 34px;
          width: auto;
        }
        .t-nav__brand-copy {
          display: flex;
          flex-direction: column;
          line-height: 1;
        }
        .t-nav__brand-copy strong {
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: #f2f5f9;
        }
        .t-nav__brand-copy em {
          font-style: normal;
          font-size: 9px;
          letter-spacing: 0.16em;
          color: #8b9bb4;
          margin-top: 3px;
        }
        .t-nav__menu {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          margin-right: auto;
        }
        .t-nav__link {
          padding: 0.5rem 0.75rem;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 550;
          color: #b6c2d2;
          text-decoration: none;
          transition: color 0.18s ease, background 0.18s ease;
        }
        .t-nav__link:hover {
          color: #f2f5f9;
          background: rgba(255, 255, 255, 0.05);
        }
        .t-nav__link.is-active {
          color: #35d6ff;
        }
        .t-nav__actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-left: auto;
        }
        .t-nav__who {
          font-size: 14px;
          font-weight: 550;
          color: #b6c2d2;
          text-decoration: none;
          white-space: nowrap;
        }
        .t-nav__who:hover { color: #f2f5f9; }
        .t-nav__cta {
          display: inline-flex;
          align-items: center;
          padding: 0.5625rem 1rem;
          border-radius: 10px;
          background: #35d6ff;
          color: #04121a;
          font: inherit;
          font-size: 14px;
          font-weight: 650;
          text-decoration: none;
          border: 0;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.18s ease;
        }
        .t-nav__cta:hover { background: #5ee0ff; }
        .t-nav__cta--quiet {
          background: transparent;
          color: #b6c2d2;
          border: 1px solid rgba(255, 255, 255, 0.16);
        }
        .t-nav__cta--quiet:hover {
          background: rgba(255, 255, 255, 0.06);
          color: #f2f5f9;
        }
        .t-nav__burger {
          display: none;
          padding: 0.5rem 0.625rem;
          border-radius: 8px;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.16);
          color: #f2f5f9;
          font-size: 16px;
          cursor: pointer;
        }
        .t-nav a:focus-visible,
        .t-nav button:focus-visible {
          outline: 2px solid #35d6ff;
          outline-offset: 2px;
        }
        .t-nav .sr-only {
          position: absolute; width: 1px; height: 1px; padding: 0;
          margin: -1px; overflow: hidden; clip: rect(0,0,0,0);
          white-space: nowrap; border: 0;
        }
        .t-nav__mobile {
          display: none;
          flex-direction: column;
          padding: 0.5rem 0 1rem;
          width: min(1180px, calc(100% - 3rem));
          margin: 0 auto;
          border-top: 1px solid rgba(255, 255, 255, 0.09);
        }
        .t-nav__mobile-link {
          padding: 0.875rem 0.5rem;
          font-size: 16px;
          font-weight: 550;
          color: #b6c2d2;
          text-decoration: none;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }
        .t-nav__mobile-link.is-cta {
          margin-top: 0.75rem;
          border: 0;
          border-radius: 10px;
          background: #35d6ff;
          color: #04121a;
          font-weight: 650;
          text-align: center;
        }

        @media (max-width: 900px) {
          .t-nav__inner { width: calc(100% - 2.5rem); gap: 1rem; }
          .t-nav__menu { display: none; }
          .t-nav__burger { display: inline-flex; }
          .t-nav__mobile { display: flex; width: calc(100% - 2.5rem); }
        }
        @media (max-width: 600px) {
          .t-nav__inner { width: calc(100% - 2rem); height: 60px; }
          .t-nav__mobile { width: calc(100% - 2rem); }
          .t-nav__brand-copy em { display: none; }
          .t-nav__who { display: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .t-nav, .t-nav__link, .t-nav__cta { transition: none; }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
