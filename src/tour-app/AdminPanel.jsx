import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AdminCSCenter from './components/AdminCSCenter';
import AdminPerformance from './components/AdminPerformance';
import AdminFinance from './components/AdminFinance';
import AdminSettings from './components/AdminSettings';

const AdminPanel = ({ onLogout, designers, setDesigners, stats, pendingRequests = [], onApprove, matchingRequests = [] }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const activeTab = queryParams.get('tab') || 'active';

  const toggleStatus = (id) => {
    setDesigners(designers.map(d => {
      if (d.id === id) {
        const statuses = ['Active', 'Pending', 'Suspended'];
        const nextStatus = statuses[(statuses.indexOf(d.status) + 1) % statuses.length];
        return { ...d, status: nextStatus };
      }
      return d;
    }));
  };

  return (
    <div className="dashboard-elite-layout">
      {/* Sidebar Navigation */}
      <aside className="elite-sidebar">
        <div className="sidebar-header-elite">
          <div className="gt-symbol">GT</div>
          <span className="brand-logo-text">GIJO ADMIN</span>
        </div>
        <nav className="sidebar-nav-elite">
          <button className={`nav-item-elite ${activeTab === 'active' ? 'active' : ''}`} onClick={() => navigate('?tab=active')}>
            <span className="icon">👤</span>활동 설계사
          </button>
          <button className={`nav-item-elite ${activeTab === 'pending' ? 'active' : ''}`} onClick={() => navigate('?tab=pending')}>
            <span className="icon">📩</span>가입 요청
          </button>
          <button className={`nav-item-elite ${activeTab === 'matching' ? 'active' : ''}`} onClick={() => navigate('?tab=matching')}>
            <span className="icon">📝</span>고객 매칭 요청
          </button>
          <button className={`nav-item-elite ${activeTab === 'cs' ? 'active' : ''}`} onClick={() => navigate('?tab=cs')}>
            <span className="icon">🚨</span>CS 센터
          </button>
          <button className={`nav-item-elite ${activeTab === 'reports' ? 'active' : ''}`} onClick={() => navigate('?tab=reports')}>
            <span className="icon">📈</span>퍼포먼스
          </button>
          <button className={`nav-item-elite ${activeTab === 'finance' ? 'active' : ''}`} onClick={() => navigate('?tab=finance')}>
            <span className="icon">🏦</span>정산/재무
          </button>
          <button className={`nav-item-elite ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => navigate('?tab=settings')}>
            <span className="icon">⚙️</span>시스템 설정
          </button>
        </nav>
        <div className="sidebar-footer-elite">
          <button className="btn-sidebar-logout" onClick={onLogout}>로그아웃</button>
        </div>
      </aside>

      <main className="dashboard-main-elite">
        <div className="elite-dashboard-content custom-scrollbar">
          <div className="content-intro">
            <h1>
              {activeTab === 'active' && '운영 효율성 대시보드'}
              {activeTab === 'pending' && '여행설계사 가입 요청'}
              {activeTab === 'matching' && '📝 고객 매칭 요청 현황'}
              {activeTab === 'cs' && '🚨 실시간 고객 CS 센터'}
              {activeTab === 'reports' && '📈 상세 퍼포먼스 리포트'}
              {activeTab === 'finance' && '🏦 정산 및 재무 관리'}
              {activeTab === 'settings' && '⚙️ 플랫폼 통합 설정'}
            </h1>
            <p>
              {activeTab === 'active' && '플랫폼 내 활동 여행설계사 및 실시간 비즈니스 지표를 관리합니다.'}
              {activeTab === 'pending' && '새로운 여행설계사 파트너들의 신청 내역을 검토하고 승인합니다.'}
              {activeTab === 'matching' && '플랫폼에 접수된 고객들의 1:1 맞춤 설계 매칭 의뢰 내역을 실시간으로 확인합니다.'}
              {activeTab === 'cs' && '여행 중인 고객 및 설계사의 긴급 문의와 티켓을 실시간으로 관리합니다.'}
              {activeTab === 'reports' && '상품 판매 추이와 설계사별 퍼포먼스를 상세한 그래프로 분석합니다.'}
              {activeTab === 'finance' && '수익금 배분, 결제 대금 정산 및 플랫폼 재무 건전성을 관리합니다.'}
              {activeTab === 'settings' && '결제 게이트웨이 연동, 권한 설정 등 플랫폼의 전반적인 환경을 제어합니다.'}
            </p>
          </div>

          {activeTab === 'active' && (
            <div className="elite-stats-grid">
              {stats.map((stat, index) => (
                <div key={index} className="elite-stat-card glass-card">
                  <span className="stat-label">{stat.label}</span>
                  <span className="stat-value">{stat.value}</span>
                  <div className="stat-glow"></div>
                </div>
              ))}
            </div>
          )}

          {(activeTab === 'active' || activeTab === 'pending') && (
            <div className="elite-data-table glass-card" style={{ marginTop: '2rem' }}>
              <table className="elite-dashboard-table">
                <thead>
                  <tr>
                    {activeTab === 'active' ? (
                      <>
                        <th>여행설계사 (마스터)</th>
                        <th>지역</th>
                        <th>기록</th>
                        <th>평점</th>
                        <th>상태</th>
                        <th>관리</th>
                      </>
                    ) : (
                      <>
                        <th>신청자 명</th>
                        <th>활동 지역</th>
                        <th>자기소개 및 경력</th>
                        <th>신청 일자</th>
                        <th>관리</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {activeTab === 'active' ? (
                    designers.map(d => (
                      <tr key={d.id}>
                        <td data-label="여행설계사 (마스터)">
                          <div className="designer-profile-cell" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div className="mini-avatar" style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }}></div>
                            <span>{d.name}</span>
                          </div>
                        </td>
                        <td data-label="지역">{d.region}</td>
                        <td data-label="기록">{d.totalProposals} Proposals</td>
                        <td data-label="평점" className="rating-cell">★ {d.rating}</td>
                        <td data-label="상태">
                          <span className={`elite-status-pill ${d.status.toLowerCase()}`} style={{
                            padding: '4px 10px',
                            borderRadius: '999px',
                            fontSize: '12px',
                            fontWeight: '800',
                            background: d.status === 'Active' ? 'rgba(0, 210, 255, 0.15)' : d.status === 'Pending' ? 'rgba(214, 179, 106, 0.15)' : 'rgba(255, 82, 82, 0.15)',
                            color: d.status === 'Active' ? '#00d2ff' : d.status === 'Pending' ? '#d6b36a' : '#ff5252'
                          }}>
                            {d.status}
                          </span>
                        </td>
                        <td data-label="관리">
                          <div className="elite-table-btns">
                            <button className="btn-table-action" onClick={() => toggleStatus(d.id)} style={{
                              padding: '6px 12px',
                              background: 'rgba(255,255,255,0.05)',
                              border: '1px solid rgba(255,255,255,0.1)',
                              borderRadius: '8px',
                              color: '#fff',
                              cursor: 'pointer'
                            }}>
                              {d.status === 'Active' ? 'SUSPEND' : 'ACTIVATE'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    pendingRequests.length > 0 ? (
                      pendingRequests.map(req => (
                        <tr key={req.id}>
                          <td data-label="신청자 명"><strong>{req.name}</strong></td>
                          <td data-label="활동 지역">{req.region}</td>
                          <td data-label="자기소개 및 경력" style={{ maxWidth: '300px', fontSize: '0.85rem', opacity: 0.8 }}>{req.bio}</td>
                          <td data-label="신청 일자">{req.date}</td>
                          <td data-label="관리">
                            <button className="btn-table-action primary" onClick={() => onApprove(req.id)} style={{
                              padding: '8px 16px',
                              background: 'var(--accent-brand, linear-gradient(90deg, #00d2ff 0%, #3a7bd5 100%))',
                              border: 0,
                              borderRadius: '8px',
                              color: '#000',
                              fontWeight: '800',
                              cursor: 'pointer'
                            }}>APPROVE</button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" style={{ textAlign: 'center', padding: '4rem', opacity: 0.5 }}>대기 중인 가입 요청이 없습니다.</td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'matching' && (
            <div className="elite-data-table glass-card" style={{ marginTop: '2rem' }}>
              <table className="elite-dashboard-table">
                <thead>
                  <tr>
                    <th>의뢰자 명</th>
                    <th>희망 일정</th>
                    <th>인원</th>
                    <th>예산 범위</th>
                    <th>설계 희망 테마</th>
                    <th>연락처</th>
                    <th>신청 일자</th>
                    <th>상태</th>
                  </tr>
                </thead>
                <tbody>
                  {matchingRequests.map(req => (
                    <tr key={req.id}>
                      <td data-label="의뢰자 명"><strong>{req.name}</strong></td>
                      <td data-label="희망 일정">{req.date}</td>
                      <td data-label="인원">{req.people}</td>
                      <td data-label="예산 범위">{req.budget}</td>
                      <td data-label="설계 희망 테마" style={{ maxWidth: '220px', fontSize: '0.9rem', opacity: 0.85 }}>{req.purpose}</td>
                      <td data-label="연락처">{req.contact}</td>
                      <td data-label="신청 일자">{req.dateCreated}</td>
                      <td data-label="상태">
                        <span className={`elite-status-pill ${req.status === '매칭완료' ? 'active' : 'pending'}`} style={{
                          padding: '4px 10px',
                          borderRadius: '999px',
                          fontSize: '12px',
                          fontWeight: '800',
                          background: req.status === '매칭완료' ? 'rgba(0, 210, 255, 0.15)' : 'rgba(214, 179, 106, 0.15)',
                          color: req.status === '매칭완료' ? '#00d2ff' : '#d6b36a'
                        }}>
                          {req.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {matchingRequests.length === 0 && (
                    <tr>
                      <td colSpan="8" style={{ textAlign: 'center', padding: '4rem', opacity: 0.5 }}>대기 중인 고객 매칭 요청이 없습니다.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'cs' && <AdminCSCenter />}

          {activeTab === 'reports' && <AdminPerformance />}

          {activeTab === 'finance' && <AdminFinance />}

          {activeTab === 'settings' && <AdminSettings />}
        </div>
      </main>
      <style>{styles}</style>
    </div>
  );
};

const styles = `
  .dashboard-elite-layout { display: flex; min-height: 100vh; background: var(--bg-color, #050a14); color: #fff; }
  .elite-sidebar { width: 260px; background: rgba(10, 17, 40, 0.9); border-right: 1px solid var(--glass-border, rgba(255, 255, 255, 0.08)); padding: 2rem 1.5rem; display: flex; flex-direction: column; gap: 2rem; backdrop-filter: var(--glass-blur, blur(20px)); }
  .sidebar-header-elite { display: flex; align-items: center; gap: 12px; }
  .brand-logo-text { font-size: 1.2rem; font-weight: 900; letter-spacing: 0.5px; background: var(--accent-brand, linear-gradient(90deg, #00d2ff 0%, #3a7bd5 100%)); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
  .sidebar-nav-elite { display: flex; flex-direction: column; gap: 0.5rem; flex-grow: 1; }
  .nav-item-elite { display: flex; align-items: center; gap: 12px; padding: 12px 16px; border: 0; background: transparent; color: var(--text-secondary, #b0c4de); font-size: 0.95rem; font-weight: 700; border-radius: 12px; cursor: pointer; text-align: left; transition: var(--transition-smooth, all 0.3s ease); }
  .nav-item-elite:hover { background: rgba(255,255,255,0.03); color: #fff; }
  .nav-item-elite.active { background: rgba(0, 210, 255, 0.1); color: var(--accent-color, #00d2ff); border: 1px solid rgba(0, 210, 255, 0.2); }
  .nav-item-elite .icon { font-size: 1.1rem; }
  .sidebar-footer-elite { border-top: 1px solid var(--glass-border, rgba(255, 255, 255, 0.08)); padding-top: 1.5rem; }
  .btn-sidebar-logout { width: 100%; padding: 12px; border: 1px solid rgba(255,255,255,0.15); background: rgba(255,255,255,0.05); color: #fff; border-radius: 10px; font-weight: 700; cursor: pointer; transition: var(--transition-smooth, all 0.3s ease); }
  .btn-sidebar-logout:hover { background: rgba(255, 50, 50, 0.1); border-color: rgba(255, 50, 50, 0.3); color: #ff5252; }
  
  .dashboard-main-elite { flex-grow: 1; padding: 3rem; overflow-y: auto; height: 100vh; }
  .elite-dashboard-content { max-width: 1200px; margin: 0 auto; }
  .content-intro { margin-bottom: 3rem; }
  .content-intro h1 { font-size: 2.2rem; font-weight: 900; margin-bottom: 0.5rem; }
  .content-intro p { opacity: 0.6; font-size: 1.1rem; }

  .elite-stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
  .elite-stat-card { padding: 1.8rem; border-radius: 16px; background: var(--glass-bg, rgba(10, 17, 40, 0.7)); border: 1px solid var(--glass-border, rgba(255, 255, 255, 0.08)); position: relative; overflow: hidden; display: flex; flex-direction: column; gap: 0.5rem; }
  .stat-label { font-size: 0.85rem; color: var(--text-secondary, #b0c4de); font-weight: 700; }
  .stat-value { font-size: 1.8rem; font-weight: 900; color: #fff; }
  .stat-glow { position: absolute; bottom: 0; right: 0; width: 60px; height: 60px; background: radial-gradient(circle, rgba(0, 210, 255, 0.15) 0%, transparent 70%); }

  .elite-data-table { border-radius: 16px; overflow: hidden; background: var(--glass-bg, rgba(10, 17, 40, 0.7)); border: 1px solid var(--glass-border, rgba(255, 255, 255, 0.08)); }
  .elite-data-table table { width: 100%; border-collapse: collapse; text-align: left; }
  .elite-data-table th, .elite-data-table td { padding: 1.2rem 1.5rem; border-bottom: 1px solid var(--glass-border, rgba(255, 255, 255, 0.08)); }
  .elite-data-table th { background: rgba(0, 0, 0, 0.2); font-size: 0.85rem; font-weight: 800; text-transform: uppercase; color: var(--text-secondary, #b0c4de); letter-spacing: 0.5px; }
  .elite-data-table tr:last-child td { border-bottom: 0; }

  @media (max-width: 1000px) {
    .elite-stats-grid { grid-template-columns: repeat(2, 1fr); }
  }

  @media (max-width: 900px) {
    .dashboard-elite-layout { flex-direction: column; }
    .elite-sidebar { width: 100%; height: auto; border-right: none; border-bottom: 1px solid var(--glass-border, rgba(255, 255, 255, 0.08)); }
    .sidebar-nav-elite { flex-direction: row; overflow-x: auto; padding: 0.5rem; gap: 0.3rem; }
    .nav-item-elite { padding: 6px 12px; font-size: 0.75rem; white-space: nowrap; border-radius: 8px; }
    .nav-item-elite .icon { font-size: 0.9rem; margin-right: 5px; }
    .sidebar-footer-elite { display: none; }
    .dashboard-main-elite { padding: 1.5rem; }
  }

  @media (max-width: 600px) {
    .elite-stats-grid { grid-template-columns: 1fr; }
    .elite-dashboard-table thead { display: none; }
    .elite-dashboard-table tr { 
      display: block; 
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid var(--glass-border, rgba(255, 255, 255, 0.08));
      border-radius: 16px;
      margin-bottom: 1.2rem;
      padding: 1.2rem;
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    }
    .elite-dashboard-table td { 
      display: flex; 
      justify-content: space-between; 
      align-items: center; 
      width: 100%; 
      border: none !important; 
      padding: 10px 0 !important;
      font-size: 0.85rem !important;
    }
    .elite-dashboard-table td::before { 
      content: attr(data-label); 
      font-weight: 700; 
      color: var(--accent-color, #00d2ff); 
      font-size: 0.75rem; 
      opacity: 0.6;
    }
  }
`;

export default AdminPanel;
