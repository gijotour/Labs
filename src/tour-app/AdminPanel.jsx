import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashboardShell from './DashboardShell';
import AdminCSCenter from './components/AdminCSCenter';
import AdminPerformance from './components/AdminPerformance';
import AdminFinance from './components/AdminFinance';
import AdminSettings from './components/AdminSettings';

const TABS = [
  { key: 'active', icon: '👤', label: '활동 설계사', title: '운영 효율성 대시보드', desc: '플랫폼 내 활동 여행설계사 및 실시간 비즈니스 지표를 관리합니다.' },
  { key: 'pending', icon: '📩', label: '가입 요청', title: '여행설계사 가입 요청', desc: '새로운 여행설계사 파트너들의 신청 내역을 검토하고 승인합니다.' },
  { key: 'matching', icon: '📝', label: '고객 매칭 요청', title: '고객 매칭 요청 현황', desc: '접수된 1:1 맞춤 설계 매칭 의뢰 내역을 확인합니다.' },
  { key: 'cs', icon: '🚨', label: 'CS 센터', title: '실시간 고객 CS 센터', desc: '여행 중인 고객 및 설계사의 긴급 문의와 티켓을 관리합니다.' },
  { key: 'reports', icon: '📈', label: '퍼포먼스', title: '상세 퍼포먼스 리포트', desc: '상품 판매 추이와 설계사별 퍼포먼스를 분석합니다.' },
  { key: 'finance', icon: '🏦', label: '정산·재무', title: '정산 및 재무 관리', desc: '수익금 배분, 결제 대금 정산 및 재무 건전성을 관리합니다.' },
  { key: 'settings', icon: '⚙️', label: '시스템 설정', title: '플랫폼 통합 설정', desc: '결제 게이트웨이 연동, 권한 설정 등 전반적인 환경을 제어합니다.' }
];

const TONE = {
  Active: 'ok',
  Pending: 'wait',
  Suspended: 'off',
  접수: 'wait',
  상담중: 'wait',
  매칭완료: 'ok',
  취소: 'off'
};

const Pill = ({ status }) => (
  <span className={`dash__pill dash__pill--${TONE[status] ?? 'wait'}`}>{status ?? '—'}</span>
);

const AdminPanel = ({ onLogout, designers = [], setDesigners, stats = [], pendingRequests = [], onApprove, matchingRequests = [] }) => {
  const location = useLocation();
  const activeTab = new URLSearchParams(location.search).get('tab') || 'active';
  const [toast, setToast] = useState('');

  const toggleStatus = (id) => {
    const target = designers.find((d) => d.id === id);
    const statuses = ['Active', 'Pending', 'Suspended'];
    const next = statuses[(statuses.indexOf(target?.status) + 1) % statuses.length];

    setDesigners(designers.map((d) => (d.id === id ? { ...d, status: next } : d)));
    setToast(`${target?.name ?? '설계사'} 상태를 ${next}(으)로 변경했습니다.`);
  };

  const approve = (req) => {
    onApprove?.(req);
    setToast(`${req.name} 설계사의 가입을 승인했습니다.`);
  };

  return (
    <DashboardShell
      brand="GIJO ADMIN"
      tabs={TABS}
      activeTab={activeTab}
      onLogout={onLogout}
      toast={toast}
      onCloseToast={() => setToast('')}
    >
      {activeTab === 'active' && (
        <>
          <div className="dash__stats">
            {stats.map((stat) => (
              <div key={stat.label} className="dash__stat">
                <span className="dash__stat-label">{stat.label}</span>
                <span className="dash__stat-value">{stat.value}</span>
              </div>
            ))}
          </div>

          <section className="dash__panel">
            <h2 className="dash__panel-title">활동 설계사 {designers.length}명</h2>
            <div className="dash__tablewrap">
              <table className="dash__table">
                <thead>
                  <tr>
                    <th scope="col">여행설계사</th>
                    <th scope="col">지역</th>
                    <th scope="col">제안</th>
                    <th scope="col">평점</th>
                    <th scope="col">상태</th>
                    <th scope="col">관리</th>
                  </tr>
                </thead>
                <tbody>
                  {designers.map((d) => (
                    <tr key={d.id}>
                      <td data-label="여행설계사">
                        <span className="dash__person">
                          <span className="dash__avatar" aria-hidden="true">{d.name?.[0] ?? '?'}</span>
                          {d.name}
                        </span>
                      </td>
                      <td data-label="지역">{d.region}</td>
                      <td data-label="제안" className="dash__num">{d.totalProposals}건</td>
                      <td data-label="평점" className="dash__num">★ {d.rating}</td>
                      <td data-label="상태"><Pill status={d.status} /></td>
                      <td data-label="관리">
                        <button type="button" className="dash__btn" onClick={() => toggleStatus(d.id)}>
                          {d.status === 'Active' ? '정지' : '활성화'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}

      {activeTab === 'pending' && (
        <section className="dash__panel">
          <h2 className="dash__panel-title">가입 요청 {pendingRequests.length}건</h2>
          <div className="dash__tablewrap">
            <table className="dash__table">
              <thead>
                <tr>
                  <th scope="col">신청자</th>
                  <th scope="col">이메일</th>
                  <th scope="col">활동 지역</th>
                  <th scope="col">경력 및 자기소개</th>
                  <th scope="col">신청일</th>
                  <th scope="col">관리</th>
                </tr>
              </thead>
              <tbody>
                {pendingRequests.length > 0 ? pendingRequests.map((req) => (
                  <tr key={req.id}>
                    <td data-label="신청자"><span className="dash__strong">{req.name}</span></td>
                    <td data-label="이메일">{req.email || '—'}</td>
                    <td data-label="활동 지역">{req.region}</td>
                    <td data-label="경력 및 자기소개" className="dash__longtext">{req.bio || '—'}</td>
                    <td data-label="신청일">{req.date || '—'}</td>
                    <td data-label="관리">
                      {/* 핸들러가 name·region을 쓰므로 객체 전체를 넘긴다 */}
                      <button type="button" className="dash__btn dash__btn--primary" onClick={() => approve(req)}>
                        승인
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={6} className="dash__empty">대기 중인 가입 요청이 없습니다.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {activeTab === 'matching' && (
        <section className="dash__panel">
          <h2 className="dash__panel-title">매칭 요청 {matchingRequests.length}건</h2>
          <div className="dash__tablewrap">
            <table className="dash__table">
              <thead>
                <tr>
                  <th scope="col">접수번호</th>
                  <th scope="col">연락처</th>
                  <th scope="col">인원</th>
                  <th scope="col">희망 일정</th>
                  <th scope="col">예산</th>
                  <th scope="col">희망 테마</th>
                  <th scope="col">접수일</th>
                  <th scope="col">상태</th>
                </tr>
              </thead>
              <tbody>
                {matchingRequests.length > 0 ? matchingRequests.map((req) => (
                  <tr key={req.id}>
                    <td data-label="접수번호" className="dash__mono">GJ-{String(req.id).slice(-6)}</td>
                    <td data-label="연락처"><span className="dash__strong">{req.contact}</span></td>
                    <td data-label="인원">{req.people}</td>
                    <td data-label="희망 일정">{req.travel_date}</td>
                    <td data-label="예산">{req.budget || '—'}</td>
                    <td data-label="희망 테마" className="dash__longtext">{req.purpose || '—'}</td>
                    <td data-label="접수일">{(req.created_at ?? '').slice(0, 10) || '—'}</td>
                    <td data-label="상태"><Pill status={req.status} /></td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={8} className="dash__empty">접수된 고객 매칭 요청이 없습니다.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {activeTab === 'cs' && <AdminCSCenter />}
      {activeTab === 'reports' && <AdminPerformance />}
      {activeTab === 'finance' && <AdminFinance />}
      {activeTab === 'settings' && <AdminSettings />}
    </DashboardShell>
  );
};

export default AdminPanel;
