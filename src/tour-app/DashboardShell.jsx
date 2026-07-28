import { useSearchParams } from 'react-router-dom';
import './tour-theme.css';
import './dashboard.css';

/**
 * 관리자·파트너 대시보드가 공유하는 셸.
 * 사이드바 메뉴, 본문 헤더, 토스트를 한 곳에서 관리해 두 화면이 어긋나지 않게 한다.
 *
 * @param brand      사이드바 상단 이름 (예: 'GIJO ADMIN')
 * @param mark       브랜드 마크 텍스트 (기본 'GT')
 * @param tabs       [{ key, icon, label, title, desc }]
 * @param activeTab  현재 탭 key
 * @param onLogout   로그아웃 핸들러
 * @param toast      표시할 알림 문자열 (없으면 미표시)
 * @param onCloseToast
 */
const DashboardShell = ({
  brand,
  mark = 'GT',
  tabs,
  activeTab,
  onLogout,
  toast,
  onCloseToast,
  children
}) => {
  const [, setSearchParams] = useSearchParams();
  const current = tabs.find((t) => t.key === activeTab) ?? tabs[0];

  return (
    <div className="tour-surface dash">
      <aside className="dash__side">
        <div className="dash__brand">
          <span className="dash__mark">{mark}</span>
          <span className="dash__brandname">{brand}</span>
        </div>

        <nav className="dash__nav" aria-label={`${brand} 메뉴`}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              className={`dash__navitem ${activeTab === tab.key ? 'is-active' : ''}`}
              aria-current={activeTab === tab.key ? 'page' : undefined}
              onClick={() => setSearchParams({ tab: tab.key })}
            >
              <span className="dash__navicon" aria-hidden="true">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="dash__sidefoot">
          <button type="button" className="dash__logout" onClick={onLogout}>로그아웃</button>
        </div>
      </aside>

      <main className="dash__main">
        <div className="dash__content">
          <header className="dash__intro">
            <h1>{current.title}</h1>
            <p>{current.desc}</p>
          </header>

          {children}
        </div>
      </main>

      {toast && (
        <div className="dash__toast" role="status">
          <span>{toast}</span>
          <button type="button" onClick={onCloseToast} aria-label="알림 닫기">✕</button>
        </div>
      )}
    </div>
  );
};

export default DashboardShell;
