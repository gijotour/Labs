import React, { useState } from 'react';

const DesignerShowcase = ({ packages = [], onRate, selectedRegion = '전체', onStartPayment }) => {
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showReviewListModal, setShowReviewListModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedDesigner, setSelectedDesigner] = useState(null);
  
  // 평점 등록 상태
  const [nickname, setNickname] = useState('');
  const [comment, setComment] = useState('');
  const [hoverRating, setHoverRating] = useState(0);
  const [rating, setRating] = useState(5);
  const [ratingError, setRatingError] = useState('');
  const [toast, setToast] = useState('');

  const openRatingModal = (pkg) => {
    setSelectedDesigner(pkg);
    setNickname('');
    setComment('');
    setRating(5);
    setRatingError('');
    setShowRatingModal(true);
  };

  const openReviewList = (pkg) => {
    setSelectedDesigner(pkg);
    setShowReviewListModal(true);
  };

  const openDetailModal = (pkg) => {
    setSelectedDesigner(pkg);
    setShowDetailModal(true);
  };

  const submitRating = () => {
    if (!nickname.trim()) {
      setRatingError('닉네임을 입력해 주세요.');
      return;
    }
    setRatingError('');
    onRate?.(selectedDesigner.designer, nickname, rating, comment);
    setShowRatingModal(false);
    setToast(`${selectedDesigner.designer} 여행설계사님께 후기를 남겼습니다.`);
  };

  // 유튜브 URL 포맷팅 유틸리티
  const formatYoutubeUrl = (url) => {
    if (!url) return null;
    if (url.includes('youtube.com/embed/')) return url;
    
    let videoId = '';
    if (url.includes('v=')) {
      videoId = url.split('v=')[1].split('&')[0];
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0];
    }
    
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  return (
    <section id="designer" className="designer-section">
      <div className="container">
        {/* Rating Modal */}
        {showRatingModal && (
          <div className="modal-overlay">
            <div className="modal-content glass-card rating-modal">
              <h2>경험하신 서비스는 어떠셨나요?</h2>
              <p><strong>{selectedDesigner?.designer}</strong> 여행설계사님의 제안에 평점과 후기를 남겨주세요.</p>
              
              <div className="rating-form">
                <div className="form-group">
                  <label>닉네임</label>
                  <input 
                    type="text" 
                    placeholder="예: 홍길동" 
                    value={nickname} 
                    onChange={(e) => setNickname(e.target.value)} 
                  />
                </div>

                <div className="star-selection">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      className={`star-btn ${(hoverRating || rating) >= star ? 'active' : ''}`}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                    >
                      ★
                    </button>
                  ))}
                </div>

                <div className="form-group">
                  <label>리뷰 내용</label>
                  <textarea 
                    rows="3" 
                    placeholder="여행설계사님의 서비스에 대한 후기를 자유롭게 남겨주세요."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                </div>
              </div>

              {ratingError && (
                <p role="alert" className="rating-error">{ratingError}</p>
              )}

              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowRatingModal(false)}>취소</button>
                <button type="button" className="btn-submit-rating" onClick={submitRating}>평점 등록하기</button>
              </div>
            </div>
          </div>
        )}

        {/* Review List Modal */}
        {showReviewListModal && (
          <div className="modal-overlay">
            <div className="modal-content glass-card review-list-modal">
              <div className="modal-header">
                <h2>{selectedDesigner?.designer} 여행설계사 리뷰 목록</h2>
                <button className="btn-close-modal" onClick={() => setShowReviewListModal(false)}>&times;</button>
              </div>
              <div className="review-list custom-scrollbar">
                {selectedDesigner?.reviews && selectedDesigner.reviews.length > 0 ? (
                  (selectedDesigner.reviews ?? []).map((rev, i) => (
                    <div key={i} className="review-item">
                      <div className="rev-header">
                        <span className="rev-name">{rev.nickname}</span>
                        <span className="rev-stars">{'★'.repeat(rev.rating)}</span>
                        <span className="rev-date">{rev.date}</span>
                      </div>
                      <p className="rev-comment">{rev.comment || '상세 내용 없음'}</p>
                    </div>
                  ))
                ) : (
                  <div className="empty-state-wrap mini">
                    <span className="empty-icon">💬</span>
                    <p>아직 등록된 리뷰가 없습니다.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Detailed Proposal Modal (Elite Redesign) */}
        {showDetailModal && selectedDesigner?.detailedPlan && (
          <div className="modal-overlay">
            <div className="modal-content glass-card elite-proposal-modal wide-modal">
              <div className="elite-modal-header-img">
                <img src={selectedDesigner.image} alt={selectedDesigner.title} />
                <div className="header-glass-overlay">
                  <button className="btn-close-elite-round" onClick={() => setShowDetailModal(false)}>&times;</button>
                  <div className="header-content-elite">
                    <span className="elite-region-badge">{selectedDesigner.region} 전문 제안</span>
                    <h1 className="elite-proposal-title">{selectedDesigner.title}</h1>
                  </div>
                </div>
              </div>

              {selectedDesigner.youtubeUrl && (
                <div className="elite-video-section">
                  <div className="video-container-elite">
                    <iframe
                      src={formatYoutubeUrl(selectedDesigner.youtubeUrl)}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}

              <div className="elite-detail-body custom-scrollbar">
                <div className="elite-detail-top-row">
                  <div className="elite-designer-profile">
                    <div className="elite-avatar-wrap">
                      <div className="elite-avatar"></div>
                    </div>
                    <div className="profile-info">
                      <div className="name-row">
                        <span className="label">여행설계사</span>
                        <span className="value">{selectedDesigner.designer}</span>
                      </div>
                      <div className="rating-row">
                        <span className="star">★</span>
                        <span className="rating-val">{selectedDesigner.rating}</span>
                        <span className="review-count">({selectedDesigner.reviewCount} Reviews)</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="elite-price-card">
                    <span className="price-label">ESTIMATED QUOTE</span>
                    <div className="price-value-row">
                      <span className="currency">₩</span>
                      <span className="amount">
                        {(selectedDesigner.detailedPlan?.pricing ?? '상담 후 제안')
                          .replace('1인당 약 ', '')
                          .replace(' (항공권 별도)', '')}
                      </span>
                      <span className="per-person">/ person</span>
                    </div>
                    <p className="price-note">* 항공권 별도 실비 정산</p>
                  </div>
                </div>

                <div className="elite-detail-content-grid">
                  <div className="elite-itinerary-panel">
                    <h3 className="panel-title">
                      <span className="icon">📅</span> DETAILED ITINERARY
                    </h3>
                    <div className="elite-timeline">
                      {selectedDesigner?.detailedPlan?.itinerary?.map((item, i) => (
                        <div key={i} className="elite-timeline-node">
                          <div className="node-marker">
                            <span className="day-pin">D{item.day}</span>
                            <div className="connector"></div>
                          </div>
                          <div className="node-content">
                            <h4>{item.title}</h4>
                            <p>{item.content}</p>
                          </div>
                        </div>
                      )) || (
                        <div className="empty-state-mini">상세 일정을 준비 중입니다.</div>
                      )}
                    </div>
                  </div>

                  <div className="elite-info-panel">
                    <div className="panel-section inclusion-box">
                      <h3 className="panel-title small">
                        <span className="icon green">✓</span> INCLUSIONS
                      </h3>
                      <ul className="elite-check-list">
                        {selectedDesigner?.detailedPlan?.inclusions?.map((text, i) => (
                          <li key={i}>{text}</li>
                        )) || <li>포함 사항을 확인 중입니다.</li>}
                      </ul>
                    </div>
                    
                    <div className="panel-section exclusion-box">
                      <h3 className="panel-title small">
                        <span className="icon red">✕</span> EXCLUSIONS
                      </h3>
                      <ul className="elite-cross-list">
                        {selectedDesigner?.detailedPlan?.exclusions?.map((text, i) => (
                          <li key={i}>{text}</li>
                        )) || <li>불포함 사항을 확인 중입니다.</li>}
                      </ul>
                    </div>

                    {selectedDesigner?.detailedPlan?.proTip && (
                      <div className="panel-section tip-box-elite">
                        <div className="tip-header">
                          <span className="icon">💡</span>
                          <span>여행설계사 전용 팁 (PRO TIP)</span>
                        </div>
                        <p>{selectedDesigner.detailedPlan?.proTip}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="elite-modal-footer">
                  <button className="btn-elite-action-primary" onClick={() => onStartPayment(selectedDesigner)}>
                    상담 예약 및 일정 맞춤화 (결제 진행)
                  </button>
                  <button className="btn-elite-action-secondary" onClick={() => setShowDetailModal(false)}>
                    닫기
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="section-header centered">
          <div className="section-badge">TRAVEL DESIGNER PROPOSALS</div>
          {selectedRegion === '전체' ? (
            <>
              <h2>전문 <span className="highlight">여행설계사</span>의 맞춤 제안</h2>
              <p>전문가들이 귀하의 완벽한 여정을 위해 준비한 <br />비대면 맞춤형 프리미엄 서비스를 지금 바로 만나보세요.</p>
            </>
          ) : (
            <>
              <h2><span className="highlight">[{selectedRegion}]</span> 지역 맞춤 제안</h2>
              <p>해당 지역의 여행설계사들이 제안하는 총 <strong>{packages.length}건</strong>의 맞춤 일정이 준비되어 있습니다.</p>
            </>
          )}
        </div>

        {packages.length > 0 ? (
          <div className="designer-grid animate-up">
            {packages.map((pkg, index) => (
              <article key={pkg.id ?? index} className="package-card board-style-item">
                <button
                  type="button"
                  className="board-item-main"
                  onClick={() => openDetailModal(pkg)}
                >
                  <span className="b-region">[{pkg.region}]</span>
                  <h3 className="b-title">{pkg.title}</h3>
                  <div className="b-meta">
                    <span className="b-designer">{pkg.designer}</span>
                    <span className="b-rating">★{pkg.rating}</span>
                  </div>
                  <span className="board-item-arrow" aria-hidden="true">〉</span>
                </button>

                <div className="board-item-actions">
                  <button type="button" onClick={() => openReviewList(pkg)}>
                    후기 {pkg.reviewCount ?? (pkg.reviews?.length ?? 0)}개
                  </button>
                  <button type="button" onClick={() => openRatingModal(pkg)}>
                    평점 남기기
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state-wrap animate-up">
            <span className="empty-icon">🏝️</span>
            <h3>선택하신 지역의 맞춤 제안을 준비 중입니다</h3>
            <p>현재 {selectedRegion} 지역에 대한 제안서를 여행설계사들이 정성껏 작성하고 있습니다. 곧 멋진 일정으로 찾아뵙겠습니다!</p>
          </div>
        )}
      </div>

      {toast && (
        <div className="ds-toast" role="status">
          <span>{toast}</span>
          <button type="button" onClick={() => setToast('')} aria-label="알림 닫기">✕</button>
        </div>
      )}

      <style>{`
        .package-card.board-style-item {
          display: flex;
          flex-direction: column;
          padding: 0;
          overflow: hidden;
        }
        .board-item-main {
          position: relative;
          display: block;
          width: 100%;
          text-align: left;
          padding: 1.25rem 2.5rem 1.25rem 1.25rem;
          background: transparent;
          border: 0;
          font: inherit;
          color: inherit;
          cursor: pointer;
        }
        .board-item-main:hover { background: rgba(255, 255, 255, 0.03); }
        .board-item-arrow {
          position: absolute;
          right: 1.25rem;
          top: 50%;
          transform: translateY(-50%);
          opacity: 0.5;
        }
        .board-item-actions {
          display: flex;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          border-top: 1px solid var(--t-line, rgba(255,255,255,0.09));
        }
        .board-item-actions button {
          padding: 0.4375rem 0.75rem;
          border-radius: 8px;
          border: 1px solid var(--t-line, rgba(255,255,255,0.09));
          background: transparent;
          color: var(--t-fg-muted, #b6c2d2);
          font: inherit;
          font-size: 0.8125rem;
          font-weight: 600;
          cursor: pointer;
          transition: border-color .18s ease, color .18s ease;
        }
        .board-item-actions button:hover {
          border-color: var(--t-accent-line, rgba(53,214,255,.32));
          color: var(--t-accent, #35d6ff);
        }
        .rating-error {
          margin: 0 0 1rem;
          color: var(--t-danger, #ff8095);
          font-size: 0.875rem;
        }
        .ds-toast {
          position: fixed;
          left: 50%;
          bottom: 1.5rem;
          transform: translateX(-50%);
          z-index: 1200;
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.875rem 1.25rem;
          border-radius: 10px;
          background: var(--t-surface-3, #1a2333);
          border: 1px solid var(--t-accent-line, rgba(53,214,255,.32));
          color: var(--t-fg, #f2f5f9);
          font-size: 0.9375rem;
          max-width: calc(100% - 2rem);
        }
        .ds-toast button {
          background: transparent;
          border: 0;
          color: var(--t-fg-subtle, #8b9bb4);
          cursor: pointer;
          font-size: 0.875rem;
        }
      `}</style>
    </section>
  );
};

export default DesignerShowcase;
