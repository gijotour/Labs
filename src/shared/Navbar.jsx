import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logoImg from '../assets/logo.png';

const Navbar = ({ isLoggedIn, onLogout, userName, userRole }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isAdmin = location.pathname.includes('/admin');

  return (
    <>
      <nav className={`premium-mobile-nav ${scrolled ? 'scrolled' : ''}`}>
        <button className="brand-mark" onClick={() => go('/gijotour')} aria-label="GIJO LABS 홈">
          <img src={logoImg} alt="GIJO LABS Logo" className="brand-logo-img" />
          <span className="brand-copy">
            <strong>GIJO LABS</strong>
            <em>PREMIUM TRAVEL</em>
          </span>
        </button>

        {/* 관리자 및 로그인 버튼 영역 제거 */}
      </nav>

      {!isAdmin && (
        <div className="mobile-bottom-cta">
          <button onClick={() => {
            if (location.pathname !== '/gijotour') go('/gijotour');
            setTimeout(() => document.getElementById('request')?.scrollIntoView({ behavior: 'smooth' }), 120);
          }}>
            무료 여행 설계 받기
          </button>
        </div>
      )}

      <style>{`
        .premium-mobile-nav{position:fixed;top:20px;left:50%;transform:translateX(-50%);z-index:1000;width:min(1120px,calc(100% - 24px));display:flex;align-items:center;justify-content:space-between;padding:12px 24px;border-radius:20px;background:rgba(3,5,8,0.5);border:1px solid rgba(255,255,255,0.08);backdrop-filter:blur(24px) saturate(160%);box-shadow:0 20px 40px rgba(0,0,0,0.4);transition:.25s ease}.premium-mobile-nav.scrolled{background:rgba(3,5,8,0.85);border-color:rgba(0,210,255,0.2)}.brand-mark{display:flex;align-items:center;gap:10px;background:transparent;border:0;color:#fff;cursor:pointer;padding:0}.brand-logo-img{height:58px;width:auto;max-width:200px;object-fit:contain;opacity:1;filter:drop-shadow(0 0 15px rgba(0,210,255,0.6))}.brand-copy{display:flex;flex-direction:column;align-items:flex-start;line-height:1}.brand-copy strong{font-family:Georgia,serif;font-size:20px;letter-spacing:.16em;color:#f5d889}.brand-copy em{font-style:normal;font-size:9px;letter-spacing:.2em;color:rgba(255,255,255,.58);margin-top:4px}.nav-actions-minimal{display:flex;align-items:center;gap:8px}.nav-chip{border:0;border-radius:999px;background:#d6b36a;color:#0b0b0b;font-weight:900;padding:11px 14px;cursor:pointer;white-space:nowrap}.nav-chip.ghost{background:rgba(255,255,255,.08);color:#fff;border:1px solid rgba(255,255,255,.12);max-width:110px;overflow:hidden;text-overflow:ellipsis}.mobile-bottom-cta{display:none;position:fixed;left:0;right:0;bottom:0;z-index:999;padding:12px 14px 16px;background:linear-gradient(180deg,transparent,rgba(0,0,0,.92) 24%,#050505)}.mobile-bottom-cta button{width:100%;border:0;border-radius:18px;background:linear-gradient(135deg,#f0d58b,#c79b3f);color:#080808;padding:17px 18px;font-size:16px;font-weight:1000;box-shadow:0 -4px 34px rgba(214,179,106,.24)}@media(max-width:760px){.premium-mobile-nav{top:10px;width:calc(100% - 20px);padding:10px 16px}.brand-logo-img{height:48px;width:auto;filter:drop-shadow(0 0 10px rgba(0,210,255,0.5))}.brand-copy strong{font-size:18px}.brand-copy em{font-size:8px}.nav-chip{padding:10px 12px;font-size:13px}.mobile-bottom-cta{display:block}}@media(max-width:370px){.brand-copy em{display:none}.brand-logo-img{height:42px;width:auto}.nav-chip.ghost{max-width:82px}}
      `}</style>
    </>
  );
};

export default Navbar;
