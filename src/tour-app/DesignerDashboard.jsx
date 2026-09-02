import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashboardShell from './DashboardShell';

const TABS = [
  { key: 'proposals', icon: '📄', label: '나의 제안 관리', title: '나의 제안 관리', desc: '등록한 맞춤 제안서를 확인하고 새로운 여정을 등록합니다.' },
  { key: 'matching', icon: '📩', label: '고객 매칭 의뢰', title: '고객 매칭 의뢰 내역', desc: '고객이 남긴 맞춤 설계 의뢰를 확인하고 제안서를 작성합니다.' },
  { key: 'tv', icon: '📺', label: 'TV 영상 관리', title: '여행설계사 TV 관리', desc: '영상을 통해 고객들에게 신뢰와 현장감을 전달하세요.' },
  { key: 'account', icon: '👤', label: '마스터 프로필', title: '전문 여행설계사 마스터 프로필', desc: '전문성을 입증할 상세 경력과 포트폴리오를 관리합니다.' },
  { key: 'settlements', icon: '💰', label: '정산 및 수익', title: '정산 및 수익', desc: '확정된 프로젝트의 정산 내역과 지급 상태를 확인합니다.' }
];

const DesignerDashboard = ({
  userName,
  onLogout,
  proposals = [],
  onAddProposal,
  tvVideos = [],
  onAddTvVideo,
  matchingRequests = []
}) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const activeTab = queryParams.get('tab') || 'proposals';
  const [showModal, setShowModal] = useState(false);
  const [showTvModal, setShowTvModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formError, setFormError] = useState('');
  const [toast, setToast] = useState('');

  // 내 제안서 필터링 (로그인한 사용자 것만 표시)
  const myProposals = proposals.filter(p => p.designer === userName || p.designer === "Alex Kim");

  // 새로운 제안 등록을 위한 상태
  const [newProposal, setNewProposal] = useState({
    title: '',
    region: '',
    price: '',
    youtubeUrl: '',
    description: '',
    itinerary: [{ day: 1, content: '' }]
  });

  // 새로운 TV 비디오 등록을 위한 상태
  const [newTvVideo, setNewTvVideo] = useState({ title: '', category: '', youtubeUrl: '', file: null, thumbnail: 'https://images.unsplash.com/photo-1552465011-b4e21bd6e79a?q=80&w=2039&auto=format&fit=crop' });

  const handleAddDay = () => {
    setNewProposal({
      ...newProposal,
      itinerary: [...newProposal.itinerary, { day: newProposal.itinerary.length + 1, content: '' }]
    });
  };

  const handleUpdateDay = (index, value) => {
    const newList = [...newProposal.itinerary];
    newList[index].content = value;
    setNewProposal({ ...newProposal, itinerary: newList });
  };

  const handleSubmitProposal = () => {
    if (!newProposal.title || !newProposal.region) {
      setFormError('제안 제목과 활동 지역은 필수입니다.');
      return;
    }
    setFormError('');

    const created = {
      id: Date.now(),
      designer: userName,
      ...newProposal,
      status: "검토중",
      date: new Date().toISOString().split('T')[0]
    };

    onAddProposal(created);
    setShowModal(false);
    setNewProposal({ title: '', region: '', price: '', youtubeUrl: '', description: '', itinerary: [{ day: 1, content: '' }] });
    setToast('새로운 제안서가 등록되었습니다.');
  };

  // 고객 매칭 의뢰를 수락하여 제안서를 작성하는 핸들러
  const handleCreateProposalForRequest = (req) => {
    // 매칭 신청 레코드의 실제 필드는 travel_date / contact 이며 name·date는 없다
    const theme = req.purpose || '맞춤 설계';
    setNewProposal({
      title: `${theme} 초개인화 맞춤 일정 제안`,
      region: theme.split(' ')[0] || '동남아',
      price: req.budget || '',
      youtubeUrl: '',
      description: `의뢰내용: ${theme} / ${req.people ?? '-'} / 일정: ${req.travel_date ?? '-'} / 연락처: ${req.contact ?? '-'}`,
      itinerary: [
        { day: 1, content: '공항 VIP 픽업 및 전용 리조트 체크인 후 휴식' },
        { day: 2, content: '현지 전문 설계사 동행 맞춤 투어 진행' },
        { day: 3, content: '자유 여정 설계 및 에스코트 마사지 케어' },
        { day: 4, content: '공항 샌딩 및 홈 케어 복귀 지원' }
      ]
    });
    setShowModal(true);
  };

  const handleSubmitTvVideo = async () => {
    if (!newTvVideo.title || !newTvVideo.youtubeUrl || !newTvVideo.category) {
      setFormError('영상 제목, 카테고리, YouTube 링크는 필수입니다.');
      return;
    }
    setFormError('');

    let finalThumbnail = newTvVideo.thumbnail;

    if (newTvVideo.file) {
      const formData = new FormData();
      formData.append("file", newTvVideo.file);
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
        const res = await fetch(`${API_URL}/api/upload`, {
          method: "POST",
          body: formData
        });
        const data = await res.json();
        if (data.url) {
          finalThumbnail = data.url;
        }
      } catch (e) {
        console.error("Image upload failed:", e);
        setToast('이미지 업로드에 실패해 기본 썸네일을 사용합니다.');
      }
    }

    let embedUrl = newTvVideo.youtubeUrl;
    if (embedUrl.includes('watch?v=')) {
      embedUrl = embedUrl.replace('watch?v=', 'embed/');
    } else if (embedUrl.includes('youtu.be/')) {
      embedUrl = embedUrl.replace('youtu.be/', 'youtube.com/embed/');
    }

    onAddTvVideo({
      ...newTvVideo,
      thumbnail: finalThumbnail,
      youtubeUrl: embedUrl,
      designer: userName
    });
    setShowTvModal(false);
    setNewTvVideo({ title: '', category: '', youtubeUrl: '', file: null, thumbnail: 'https://images.unsplash.com/photo-1552465011-b4e21bd6e79a?q=80&w=2039&auto=format&fit=crop' });
    setToast('새로운 TV 영상이 등록되었습니다.');
  };

  const settlements = [
    { id: 1, date: "2026-04-01", project: "방콕 럭셔리 효도 관광", amount: "₩2,500,000", status: "지급완료" },
    { id: 2, date: "2026-03-25", project: "다낭 패밀리 서머 투어", amount: "₩1,800,000", status: "지급완료" },
    { id: 3, date: "2026-04-10", project: "마닐라 비즈니스 트립", amount: "₩4,200,000", status: "정산대기" },
  ];

  const filteredProposals = myProposals.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.region && p.region.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const stats = [
    { label: "활성 제안서", value: myProposals.length, icon: "📄" },
    { label: "이번달 확정", value: "8건", icon: "✨" },
    { label: "예상 정산액", value: "₩8,420,000", icon: "💰" },
    { label: "평균 평점", value: "4.9", icon: "⭐" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'matching':
        return (
          <div className="elite-tab-container page-fade-in">
            <div className="elite-proposal-grid">
              {matchingRequests.map(req => (
                <article key={req.id} className="elite-proposal-card">
                  <div className="p-header">
                    <span className="p-tag">접수 {(req.created_at ?? '').slice(0, 10) || '—'}</span>
                    <span className="p-badge">{req.status}</span>
                  </div>

                  <h3 className="d-reqtitle">{req.purpose || '맞춤 설계'} 매칭 의뢰</h3>

                  <dl className="d-reqlist">
                    <div className="d-reqline"><dt>인원</dt><dd>{req.people || '—'}</dd></div>
                    <div className="d-reqline"><dt>일정</dt><dd>{req.travel_date || '—'}</dd></div>
                    <div className="d-reqline"><dt>예산</dt><dd>{req.budget || '—'}</dd></div>
                    <div className="d-reqline"><dt>연락처</dt><dd>{req.contact || '—'}</dd></div>
                  </dl>

                  <div className="d-reqfoot">
                    <button
                      type="button"
                      className="btn-p-view primary"
                      onClick={() => handleCreateProposalForRequest(req)}
                    >
                      이 고객에게 맞춤 제안 작성
                    </button>
                  </div>
                </article>
              ))}
              {matchingRequests.length === 0 && (
                <div className="d-empty">
                  <span aria-hidden="true">🔍</span>
                  <p>새로운 고객 매칭 의뢰가 없습니다.</p>
                </div>
              )}
            </div>
          </div>
        );
      case 'tv':
        return (
          <div className="elite-tab-container page-fade-in">
            <div className="elite-card-header-flex">
              <div />
              <button className="btn-elite-add" onClick={() => { setFormError(''); setShowTvModal(true); }}>+ 새로운 영상 등록</button>
            </div>
            <div className="elite-table-box glass-card" style={{ marginTop: '2rem' }}>
              <table className="elite-dashboard-table">
                <thead>
                  <tr>
                    <th>썸네일</th>
                    <th>제목</th>
                    <th>지역</th>
                    <th>조회수</th>
                    <th>관리</th>
                  </tr>
                </thead>
                <tbody>
                  {tvVideos.filter(v => v.designer === userName || v.designer === "Alex Kim").map(v => (
                    <tr key={v.id}>
                      <td><img src={v.thumbnail} alt="" style={{ width: '80px', borderRadius: '4px' }} loading="lazy" decoding="async" /></td>
                      <td className="bold">{v.title}</td>
                      <td>{v.category}</td>
                      <td>{v.views}</td>
                      <td><button className="btn-p-view">삭제</button></td>
                    </tr>
                  ))}
                  {tvVideos.length === 0 && (
                    <tr>
                      <td colSpan="5" style={{ textAlign: 'center', padding: '3rem', opacity: 0.5 }}>등록된 영상이 없습니다.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'account':
        return (
          <div className="elite-tab-container page-fade-in">

            <div className="elite-profile-grid-layout">
              <div className="elite-profile-form glass-card">
                <div className="elite-form-section">
                  <h3><span className="section-icon">👤</span> 기본 인적 사항</h3>
                  <div className="elite-form-row">
                    <div className="elite-input-wrap">
                      <label>성명 / 활동명</label>
                      <input type="text" defaultValue={userName} />
                    </div>
                    <div className="elite-input-wrap">
                      <label>전문 분야</label>
                      <input type="text" defaultValue="태국/베트남 프리미엄 투어" />
                    </div>
                  </div>
                  <div className="elite-form-row">
                    <div className="elite-input-wrap">
                      <label>연락처</label>
                      <input type="text" defaultValue="010-1234-5678" />
                    </div>
                    <div className="elite-input-wrap">
                      <label>활동 지역</label>
                      <input type="text" defaultValue="동남아 전역, 일본" />
                    </div>
                  </div>
                </div>

                <div className="elite-form-section" style={{ marginTop: '3rem' }}>
                  <h3><span className="section-icon">🎓</span> 보유 자격 및 전문 기술</h3>
                  <div className="elite-tag-input-wrap">
                    <label>보유 자격증 (콤마로 구분)</label>
                    <input type="text" defaultValue="관광통역안내사(영어), 국외여행인솔자, CPR 자격증, PADI 스쿠버다이빙 마스터" />
                  </div>
                  <div className="elite-tag-input-wrap" style={{ marginTop: '1.5rem' }}>
                    <label>주요 전문 역량</label>
                    <input type="text" defaultValue="럭셔리 호텔 큐레이션, VIP 의전 서비스, 미식 투어 기획, 골프 투어 전문가" />
                  </div>
                </div>
              </div>

              <div className="elite-profile-experience glass-card">
                <div className="elite-form-section">
                  <h3><span className="section-icon">⏳</span> 상세 경력 및 이력 (Timeline)</h3>
                  <div className="timeline-builder">
                    <div className="timeline-input-row">
                      <span className="year">2020 - 현재</span>
                      <textarea defaultValue="GIJO Tour LaB 시니어 여행설계사 (동남아 프리미엄 부문 총괄)" />
                    </div>
                    <div className="timeline-input-row">
                      <span className="year">2015 - 2019</span>
                      <textarea defaultValue="태국 현지 럭셔리 투어 에이전시 운영 및 VIP 맞춤 여행 기획 (방콕 본사)" />
                    </div>
                    <div className="timeline-input-row">
                      <span className="year">2010 - 2014</span>
                      <textarea defaultValue="하나투어 국외여행인솔자 팀장 (동남아시아 전략 노선 담당)" />
                    </div>
                  </div>
                </div>

                <div className="elite-form-section" style={{ marginTop: '3rem' }}>
                  <h3><span className="section-icon">🏆</span> 주요 프로젝트 및 성과</h3>
                  <div className="milestone-grid">
                    <div className="milestone-box">
                      <span className="m-label">누적 송출객 수</span>
                      <span className="m-value">12,500+</span>
                    </div>
                    <div className="milestone-box">
                      <span className="m-label">고객 만족도</span>
                      <span className="m-value">98.5%</span>
                    </div>
                    <div className="milestone-box">
                      <span className="m-label">연간 기획 건수</span>
                      <span className="m-value">150+</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="profile-action-bar">
              <p className="update-status">최근 업데이트: 2026-04-22 22:30</p>
              <button className="btn-elite-save">마스터 프로필 업데이트 적용</button>
            </div>
          </div>
        );
      case 'settlements':
        return (
          <div className="elite-tab-container page-fade-in">
            <div className="elite-card-header">
              <h2>정산 및 수익 보고서</h2>
            </div>
            <div className="elite-stats-mini-row">
              <div className="mini-stat-box glass-card">
                <span className="label">총 누적 수익</span>
                <span className="value">₩12,450,000</span>
              </div>
              <div className="mini-stat-box glass-card accent">
                <span className="label">정산 대기</span>
                <span className="value">₩4,200,000</span>
              </div>
            </div>
            <div className="elite-table-box glass-card" style={{ marginTop: '2rem' }}>
              <table className="elite-dashboard-table">
                <thead>
                  <tr>
                    <th>날짜</th>
                    <th>프로젝트</th>
                    <th>금액</th>
                    <th>상태</th>
                  </tr>
                </thead>
                <tbody>
                  {settlements.map(s => (
                    <tr key={s.id}>
                      <td>{s.date}</td>
                      <td className="bold">{s.project}</td>
                      <td>{s.amount}</td>
                      <td><span className={`elite-status-pill ${s.status === '정산대기' ? 'pending' : 'paid'}`}>{s.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'proposals':
      default:
        return (
          <div className="elite-tab-container page-fade-in">
            <div className="elite-stats-grid" style={{ marginBottom: '3rem' }}>
              {stats.map((s, i) => (
                <div key={i} className="elite-stat-card glass-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span className="stat-label">{s.label}</span>
                    <span style={{ fontSize: '1.2rem' }}>{s.icon}</span>
                  </div>
                  <span className="stat-value">{s.value}</span>
                  <div className="stat-glow"></div>
                </div>
              ))}
            </div>

            <div className="elite-card-header-flex">
              <div>
                <h2>나의 설계 제안 관리</h2>
                <p>현재 진행 중인 제안 및 매칭 상태를 확인하고 데이터를 직접 추가해 보세요.</p>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <input
                  type="text"
                  placeholder="제목 또는 지역 검색..."
                  className="table-search"
                  style={{ width: '250px' }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="btn-elite-add" onClick={() => setShowModal(true)}>+ 새로운 제안 등록</button>
              </div>
            </div>

            <div className="elite-proposal-grid">
              {filteredProposals.map(p => (
                <div key={p.id} className="elite-proposal-card glass-card">
                  <div className="p-header">
                    <span className="p-tag">{p.region}</span>
                    <span className={`p-badge ${p.status === '검토중' ? 'Pending' : p.status === '확정' ? 'Active' : 'Completed'}`}>{p.status}</span>
                  </div>
                  <h3 style={{ minHeight: '3em' }}>{p.title}</h3>
                  <div style={{ margin: '1rem 0', display: 'flex', justifyContent: 'space-between', opacity: 0.7, fontSize: '0.9rem' }}>
                    <span>예상 단가</span>
                    <span style={{ color: 'var(--accent-color)', fontWeight: '700' }}>{p.price || '상담 요청'}</span>
                  </div>
                  <div className="p-footer">
                    <span className="p-date">{p.date}</span>
                    <button className="btn-p-view">상세 편집</button>
                  </div>
                </div>
              ))}
              {filteredProposals.length === 0 && (
                <div className="empty-state-wrap glass-card" style={{ gridColumn: '1 / -1', padding: '5rem' }}>
                  <span style={{ fontSize: '3rem' }}>🔍</span>
                  <p style={{ marginTop: '1rem', opacity: 0.6 }}>검색 결과가 없거나 등록된 제안서가 없습니다.</p>
                </div>
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <DashboardShell
      brand="GIJO PARTNER"
      tabs={TABS}
      activeTab={activeTab}
      onLogout={onLogout}
      toast={toast}
      onCloseToast={() => setToast('')}
    >
      {renderContent()}

      {/* Proposal Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content glass-card elite-wide-modal animate-up">
            <div className="modal-header-elite">
              <h2>새로운 여행 설계 등록</h2>
              <p>프리미엄 고객을 위한 최적의 여정을 제안하세요.</p>
            </div>
            <div className="modal-body-elite custom-scrollbar">
              <div className="elite-form-group">
                <label>제안 제목 (핵심 상품명)</label>
                <input
                  type="text"
                  placeholder="예: 방콕 테마 투어 패키지"
                  value={newProposal.title}
                  onChange={(e) => setNewProposal({ ...newProposal, title: e.target.value })}
                />
              </div>
              <div className="elite-form-row">
                <div className="elite-form-group">
                  <label>활동 지역 (예: 필리핀 클락)</label>
                  <input
                    type="text"
                    placeholder="국가명을 포함하면 검색이 더 정확해집니다."
                    value={newProposal.region}
                    onChange={(e) => setNewProposal({ ...newProposal, region: e.target.value })}
                  />
                </div>
                <div className="elite-form-group">
                  <label>예상 1인 단가</label>
                  <input
                    type="text"
                    placeholder="예: ₩850,000"
                    value={newProposal.price}
                    onChange={(e) => setNewProposal({ ...newProposal, price: e.target.value })}
                  />
                </div>
              </div>
              <div className="elite-form-group">
                <label>상품 상세 설명 (간략히)</label>
                <textarea
                  placeholder="상품의 핵심 셀링 포인트를 입력하세요..."
                  value={newProposal.description}
                  onChange={(e) => setNewProposal({ ...newProposal, description: e.target.value })}
                />
              </div>
              <div className="elite-form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <label style={{ margin: 0 }}>여행 일정 구성</label>
                  <button className="btn-day-add-small" onClick={handleAddDay}>+ 일차 추가</button>
                </div>
                <div className="elite-itinerary-builder">
                  {newProposal.itinerary.map((item, index) => (
                    <div key={index} className="itinerary-row-elite">
                      <span className="day-count">Day {item.day}</span>
                      <textarea
                        placeholder="해당 일차의 상세 일정을 입력하세요..."
                        value={item.content}
                        onChange={(e) => handleUpdateDay(index, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {formError && <p className="d-formerror" role="alert">{formError}</p>}
            <div className="modal-footer-elite">
              <button className="btn-close-elite" onClick={() => { setShowModal(false); setFormError(''); }}>취소</button>
              <button className="btn-submit-elite" onClick={handleSubmitProposal}>데이터 등록하기</button>
            </div>
          </div>
        </div>
      )}

      {/* TV Video Modal */}
      {showTvModal && (
        <div className="modal-overlay">
          <div className="modal-content glass-card elite-wide-modal animate-up">
            <div className="modal-header-elite">
              <h2>새로운 여행설계사 TV 영상 등록</h2>
              <p>영상을 통해 더 많은 비즈니스 파트너와 연결되세요.</p>
            </div>
            <div className="modal-body-elite">
              <div className="elite-form-group">
                <label>영상 제목</label>
                <input
                  type="text"
                  placeholder="예: 다낭 럭셔리 리조트 실제 투숙기"
                  value={newTvVideo.title}
                  onChange={(e) => setNewTvVideo({ ...newTvVideo, title: e.target.value })}
                />
              </div>
              <div className="elite-form-row">
                <div className="elite-form-group">
                  <label>지역/카테고리</label>
                  <input
                    type="text"
                    placeholder="예: 베트남"
                    value={newTvVideo.category}
                    onChange={(e) => setNewTvVideo({ ...newTvVideo, category: e.target.value })}
                  />
                </div>
                <div className="elite-form-group">
                  <label>실제 썸네일 이미지 업로드 (FastAPI 연동)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setNewTvVideo({ ...newTvVideo, file: e.target.files[0] });
                      }
                    }}
                    style={{ padding: '0.8rem', background: 'rgba(0,0,0,0.2)', border: '1px dashed var(--glass-border)' }}
                  />
                  {newTvVideo.file && <span style={{ fontSize: '0.8rem', color: '#00d2ff', marginTop: '0.5rem', display: 'block' }}>✓ 파일 선택됨: {newTvVideo.file.name}</span>}
                </div>
              </div>
              <div className="elite-form-row">
                <div className="elite-form-group" style={{ flex: 1 }}>
                  <label>YouTube 링크</label>
                  <input
                    type="text"
                    placeholder="https://www.youtube.com/watch?v=..."
                    value={newTvVideo.youtubeUrl}
                    onChange={(e) => setNewTvVideo({ ...newTvVideo, youtubeUrl: e.target.value })}
                  />
                </div>
              </div>
            </div>
            {formError && <p className="d-formerror" role="alert">{formError}</p>}
            <div className="modal-footer-elite">
              <button className="btn-close-elite" onClick={() => { setShowTvModal(false); setFormError(''); }}>취소</button>
              <button className="btn-submit-elite" onClick={handleSubmitTvVideo}>영상 등록하기</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .d-formerror {
          margin: 0 1.5rem 0.75rem;
          padding: 0.75rem 0.875rem;
          border-radius: var(--t-radius-sm);
          border: 1px solid rgba(255,128,149,.35);
          background: rgba(255,128,149,.1);
          color: var(--t-danger) !important;
          font-size: 0.875rem !important;
        }
        .d-toast {
          position: fixed; left: 50%; bottom: 1.5rem; transform: translateX(-50%);
          z-index: 1200; display: flex; align-items: center; gap: 1rem;
          padding: 0.875rem 1.25rem; border-radius: 10px;
          background: var(--t-surface-3); border: 1px solid var(--t-accent-line);
          color: var(--t-fg); font-size: 0.9375rem; max-width: calc(100% - 2rem);
        }
        .d-toast button {
          background: transparent; border: 0; color: var(--t-fg-subtle);
          cursor: pointer; font-size: 0.875rem;
        }
        .d-reqtitle { font-size: 1.0625rem; margin: 0.25rem 0 0.875rem; color: var(--t-fg); }
        .d-reqlist { display: flex; flex-direction: column; gap: 0.375rem; margin: 0 0 1rem; }
        .d-reqfoot { margin-top: auto; padding-top: 0.875rem; border-top: 1px solid var(--t-line); }
        .d-empty {
          grid-column: 1 / -1;
          padding: 3.5rem 1rem;
          text-align: center;
          border: 1px solid var(--t-line);
          border-radius: var(--t-radius);
          background: var(--t-surface-1);
        }
        .d-empty span { font-size: 2rem; }
        .d-empty p { margin: 0.75rem 0 0; color: var(--t-fg-subtle); }
        .d-reqline { display: flex; gap: 0.5rem; font-size: 0.875rem; }
        .d-reqline dt { color: var(--t-fg-subtle); min-width: 4.5rem; flex-shrink: 0; }
        .d-reqline dd { margin: 0; color: var(--t-fg-muted); }
        .btn-p-view {
          padding: 0.4375rem 0.75rem; border-radius: 8px;
          border: 1px solid var(--t-line-strong); background: transparent;
          color: var(--t-fg); font: inherit; font-size: 0.8125rem; font-weight: 600;
          cursor: pointer; white-space: nowrap;
        }
        .btn-p-view:hover { border-color: var(--t-accent-line); background: var(--t-accent-weak); }
        .btn-p-view.primary {
          width: 100%; background: var(--t-accent);
          border-color: var(--t-accent); color: var(--t-accent-ink); font-weight: 650;
        }
        .btn-p-view.primary:hover { background: #5ee0ff; border-color: #5ee0ff; }
        .elite-profile-grid-layout { display: grid; grid-template-columns: 1fr 1.2fr; gap: 2rem; margin-top: 2rem; }
        .elite-profile-experience { padding: 2.5rem; }
        .timeline-builder { display: flex; flex-direction: column; gap: 1.5rem; margin-top: 1rem; }
        .timeline-input-row { display: flex; gap: 1.5rem; align-items: flex-start; }
        .timeline-input-row .year { font-size: 0.85rem; font-weight: 800; color: var(--accent-color, #00d2ff); white-space: nowrap; padding-top: 12px; width: 100px; }
        .timeline-input-row textarea { flex: 1; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 15px; color: #fff; font-size: 0.95rem; resize: none; line-height: 1.5; }
        
        .milestone-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 1rem; }
        .milestone-box { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 15px; text-align: center; }
        .milestone-box .m-label { display: block; font-size: 0.75rem; opacity: 0.5; margin-bottom: 0.5rem; letter-spacing: 0.5px; }
        .milestone-box .m-value { font-size: 1.3rem; font-weight: 900; color: var(--accent-color, #00d2ff); }
        
        .profile-action-bar { margin-top: 3rem; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 2rem; }
        .update-status { font-size: 0.8rem; opacity: 0.3; }
        .section-icon { margin-right: 10px; }
        .elite-tag-input-wrap label { font-size: 0.8rem; opacity: 0.5; font-weight: 700; margin-bottom: 8px; display: block; }
        .elite-tag-input-wrap input { width: 100%; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 14px; color: #fff; font-size: 1rem; }

        @media (max-width: 1200px) {
          .elite-profile-grid-layout { grid-template-columns: 1fr; }
        }

        @media (max-width: 600px) {
          .elite-form-row { flex-direction: column; gap: 1rem; }
          .milestone-grid { grid-template-columns: 1fr; }
          .profile-action-bar { flex-direction: column; gap: 1.5rem; align-items: stretch; }
        }
      `}</style>
    </DashboardShell>
  );
};

export default DesignerDashboard;
