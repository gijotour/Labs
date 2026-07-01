import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const NavigateHub = ({ isLoggedIn, userName, userRole, onLogout, uiScale, onScaleChange }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);
  const [isSizeMenuOpen, setIsSizeMenuOpen] = React.useState(false);

  // 루트 경로(/)에서는 보이지 않게 처리
  if (location.pathname === '/') return null;

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
    setIsSizeMenuOpen(false);
  };

  const toggleSizeMenu = () => {
    setIsSizeMenuOpen(!isSizeMenuOpen);
    setIsUserMenuOpen(false);
  };

  return (
    <div className="elite-nav-hub slim-hub animate-up">
      <button 
        className="nav-hub-btn back" 
        onClick={() => { navigate(-1); setIsUserMenuOpen(false); setIsSizeMenuOpen(false); }}
        title="뒤로 가기"
      >
        <span className="icon">←</span>
      </button>
      <div className="nav-hub-divider"></div>
      <button 
        className="nav-hub-btn home" 
        onClick={() => { navigate('/gijotour'); setIsUserMenuOpen(false); setIsSizeMenuOpen(false); }}
        title="투어 홈으로"
      >
        <span className="icon">🏠</span>
      </button>
      <div className="nav-hub-divider"></div>
      
      {/* Size Control Button Integrated */}
      <button 
        className={`nav-hub-btn size ${isSizeMenuOpen ? 'active' : ''}`}
        onClick={toggleSizeMenu}
        title="화면 크기"
      >
        <span className="icon" style={{ fontSize: '0.9rem', fontWeight: '800' }}>Aa</span>
      </button>

      {isLoggedIn && (
        <>
          <div className="nav-hub-divider"></div>
          <div className="nav-hub-user-wrapper">
            <button 
              className={`nav-hub-btn user ${isUserMenuOpen ? 'active' : ''}`}
              onClick={toggleUserMenu}
              title="내 정보"
            >
              <div className="nav-avatar mini">👤</div>
            </button>
            
            {isUserMenuOpen && (
              <div className="nav-hub-dropdown glass-card animate-up-bottom" onClick={(e) => e.stopPropagation()}>
                <div className="hub-user-info">
                  <span className="name">{userName}님</span>
                  <span className="role">{userRole === 'admin' ? 'ADMIN' : 'DESIGNER'}</span>
                </div>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item" onClick={() => { 
                  const el = document.getElementById('notice');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  else navigate('/gijotour');
                  setIsUserMenuOpen(false); 
                }}>📋 이모저모 (게시판 글작성)</button>
                <button className="dropdown-item" onClick={() => { navigate('/gijotour/designer'); setIsUserMenuOpen(false); }}>👤 여행설계 하기</button>
                {userRole === 'admin' && (
                  <button className="dropdown-item" onClick={() => { navigate('/gijotour/admin'); setIsUserMenuOpen(false); }}>🛡️ 운영 시스템 (관리자)</button>
                )}
                <div className="dropdown-divider"></div>
                <button className="dropdown-item logout" onClick={() => { onLogout(); setIsUserMenuOpen(false); }}>🚪 로그아웃</button>
              </div>
            )}
          </div>
        </>
      )}

      {/* Size Control Menu Integrated */}
      {isSizeMenuOpen && (
        <div className="nav-hub-dropdown size-guide-menu glass-card animate-up-bottom" onClick={(e) => e.stopPropagation()}>
          <div className="hub-user-info">
            <span className="name">화면 크기 가이드</span>
          </div>
          <div className="dropdown-divider"></div>
          <div className="hub-size-grid">
            {[
              { label: '작게', value: 0.9 },
              { label: '보통', value: 1.0 },
              { label: '크게', value: 1.15 },
              { label: '최대', value: 1.3 }
            ].map((s) => (
              <button
                key={s.label}
                className={`hub-size-btn ${uiScale === s.value ? 'active' : ''}`}
                onClick={() => {
                  onScaleChange(s.value);
                  setIsSizeMenuOpen(false);
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavigateHub;
