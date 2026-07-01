import React, { useState } from 'react';

const NoticeBoard = ({ notices, isLoggedIn, userName, onAddNotice, onDeleteNotice, forceWrite, filterUserName, onClearFilter }) => {
  const [isWriting, setIsWriting] = React.useState(false);
  const [selectedNotice, setSelectedNotice] = React.useState(null); // 상세 팝업용
  const [imagePreview, setImagePreview] = React.useState(null); // 이미지 미리보기
  
  const [formData, setFormData] = React.useState({
    category: 'NOTICE',
    title: '',
    content: '',
    image: null
  });

  React.useEffect(() => {
    if (forceWrite) setIsWriting(true);
  }, [forceWrite]);

  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) return alert('제목과 내용을 입력해주세요.');
    onAddNotice(formData);
    setFormData({ category: 'NOTICE', title: '', content: '', image: null });
    setImagePreview(null);
    setIsWriting(false);
  };

  const displayNotices = filterUserName 
    ? (notices || []).filter(n => n.author === filterUserName)
    : (notices || []);

  const totalPages = Math.ceil(displayNotices.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNotices = displayNotices.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <section id="notice" className="notice-board-section">
      <div className="container">
        <div className="notice-header animate-up">
          <div className="notice-badge">GT INFORMATION</div>
          <h2 className="notice-title">이모저모</h2>
          <p className="notice-subtitle">플랫폼 운영 소식 및 주요 여행 정보를 공유합니다.</p>
          
          {filterUserName && (
            <div className="filter-status-box animate-up">
              <span>현재 <strong>{filterUserName}</strong>님이 작성하신 글만 보고 계십니다.</span>
              <button className="btn-clear-filter" onClick={onClearFilter}>전체 소식 보기</button>
            </div>
          )}

          {isLoggedIn && !isWriting && (
            <div className="board-actions animate-up delay-1">
              <button className="btn-write-notice" onClick={() => setIsWriting(true)}>
                📸 새 소식 등록하기
              </button>
            </div>
          )}
        </div>

        {isWriting && (
          <div className="notice-write-form glass-card animate-up">
            <div className="write-header">
              <h3 style={{ color: '#fff' }}>새로운 소식 작성</h3>
              <span className="author-badge">작성자: {userName}</span>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>카테고리</label>
                  <select 
                    value={formData.category} 
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    <option value="NOTICE">공지사항</option>
                    <option value="NEWS">뉴스</option>
                    <option value="UPDATE">업데이트</option>
                  </select>
                </div>
                <div className="form-group" style={{ flex: 3 }}>
                  <label>제목</label>
                  <input 
                    type="text" 
                    placeholder="제목을 입력하세요"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>상세 내용</label>
                <textarea 
                  rows="4" 
                  placeholder="공유할 내용을 입력하세요"
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                ></textarea>
              </div>

              <div className="form-group image-upload-group">
                <label>사진 첨부</label>
                <div className="image-upload-wrapper">
                  <input type="file" accept="image/*" onChange={handleImageChange} id="notice-img" hidden />
                  <label htmlFor="notice-img" className="btn-upload-trigger">
                    {imagePreview ? '다른 사진 선택' : '📸 사진 업로드'}
                  </label>
                  {imagePreview && (
                    <div className="upload-preview">
                      <img src={imagePreview} alt="Preview" />
                      <button type="button" className="btn-remove-img" onClick={() => { setImagePreview(null); setFormData({...formData, image: null}); }}>&times;</button>
                    </div>
                  )}
                </div>
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1.5rem', padding: '15px' }}>등록하기</button>
            </form>
          </div>
        )}

        <div className="notice-list-container animate-up delay-1">
          <div className="notice-table-wrapper glass-card">
            <table className="notice-elite-table">
              <thead>
                <tr>
                  <th style={{ width: '80px' }}>번호</th>
                  <th style={{ width: '120px' }}>구분</th>
                  <th>제목</th>
                  <th style={{ width: '120px' }}>작성자</th>
                  <th style={{ width: '120px' }}>날짜</th>
                  {isLoggedIn && <th style={{ width: '80px' }}>관리</th>}
                </tr>
              </thead>
              <tbody>
                {currentNotices.map((notice, index) => (
                  <tr key={notice.id || index} className="notice-row">
                    <td className="idx">{(displayNotices.length - (indexOfFirstItem + index))}</td>
                    <td>
                      <span className={`notice-cat-badge ${(notice.category || 'NOTICE').toLowerCase()}`}>
                        {notice.category || 'NOTICE'}
                      </span>
                    </td>
                    <td className="title-cell" onClick={() => setSelectedNotice(notice)}>
                      <div className="title-content">
                        {notice.title} <span className="view-more-hint">자세히 보기</span>
                      </div>
                    </td>
                    <td className="author">{notice.author || '운영팀'}</td>
                    <td className="date">{notice.date || '2026-04-22'}</td>
                    {isLoggedIn && (
                      <td className="action">
                        {notice.author === userName && (
                          <button className="btn-delete-row" onClick={(e) => { e.stopPropagation(); onDeleteNotice(notice.id); }}>삭제</button>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
            {currentNotices.length === 0 && (
              <div className="empty-notice-state">등록된 소식이 없습니다.</div>
            )}
          </div>

          {totalPages > 1 && (
            <div className="notice-pagination">
              <button 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
                className="page-btn"
              >
                이전
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button 
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
                >
                  {i + 1}
                </button>
              ))}
              <button 
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="page-btn"
              >
                다음
              </button>
            </div>
          )}
        </div>

        {/* 상세 보기 팝업 모달 */}
        {selectedNotice && (
          <div className="notice-detail-modal" onClick={() => setSelectedNotice(null)}>
            <div className="modal-content glass-card animate-up" onClick={(e) => e.stopPropagation()}>
              <button className="btn-close-modal" onClick={() => setSelectedNotice(null)}>&times;</button>
              
              <div className="modal-header">
                <span className={`notice-cat-badge ${(selectedNotice.category || 'NOTICE').toLowerCase()}`}>
                  {selectedNotice.category || 'NOTICE'}
                </span>
                <h2>{selectedNotice.title}</h2>
                <div className="modal-meta">
                  <span><i className="icon">👤</i> {selectedNotice.author}</span>
                  <span><i className="icon">📅</i> {selectedNotice.date}</span>
                </div>
              </div>

              <div className="modal-body custom-scrollbar">
                {selectedNotice.image && (
                  <div className="notice-image-box">
                    <img src={selectedNotice.image} alt="Post Content" />
                  </div>
                )}
                <div className="notice-text-content">
                  {selectedNotice.content.split('\n').map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn-primary" onClick={() => setSelectedNotice(null)}>확인</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .notice-board-section {
          padding: 100px 0;
          background: #030508;
          position: relative;
        }
        .notice-header {
          text-align: center;
          margin-bottom: 4rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .btn-write-notice {
          margin-top: 2rem;
          background: var(--accent-brand);
          color: #000;
          border: none;
          padding: 12px 30px;
          border-radius: 30px;
          font-weight: 800;
          cursor: pointer;
          font-size: 0.9rem;
          transition: 0.3s;
        }
        .btn-write-notice:hover {
          transform: scale(1.05);
          box-shadow: 0 0 25px var(--accent-glow);
        }

        .notice-write-form {
          max-width: 800px;
          margin: 0 auto 5rem;
          padding: 3rem;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
        }
        .form-row { display: flex; gap: 1.5rem; margin-bottom: 1.5rem; }
        .form-group { display: flex; flex-direction: column; gap: 0.5rem; flex: 1; }
        .form-group label { font-size: 0.8rem; opacity: 0.5; font-weight: 700; color: #fff; }
        .form-group input, .form-group select, .form-group textarea {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          padding: 12px;
          color: #fff;
          font-size: 1rem;
        }
        .form-group textarea { resize: none; }
        
        .notice-badge {
          display: inline-block;
          padding: 6px 14px;
          background: rgba(0, 210, 255, 0.1);
          border: 1px solid rgba(0, 210, 255, 0.2);
          color: #00d2ff;
          border-radius: 50px;
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 1px;
          margin-bottom: 1rem;
        }
        .notice-title { font-size: 3rem; font-weight: 900; margin-bottom: 1rem; color: #fff; }
        .notice-subtitle { opacity: 0.5; font-size: 1.1rem; color: #fff; margin-bottom: 1.5rem; }
        
        .filter-status-box {
          background: rgba(0, 210, 255, 0.08);
          border: 1px solid rgba(0, 210, 255, 0.2);
          padding: 12px 24px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 1rem;
        }
        .filter-status-box span { font-size: 0.9rem; color: #fff; opacity: 0.9; }
        .btn-clear-filter {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #fff;
          padding: 6px 14px;
          border-radius: 8px;
          font-size: 0.75rem;
          font-weight: 700;
          cursor: pointer;
          transition: 0.3s;
        }
        .btn-clear-filter:hover { background: #fff; color: #000; }
        .notice-list-container { max-width: 1100px; margin: 0 auto; }
        .notice-table-wrapper { 
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        .notice-elite-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }
        .notice-elite-table th {
          background: rgba(255, 255, 255, 0.04);
          padding: 1.5rem 1rem;
          font-size: 0.8rem;
          font-weight: 800;
          color: rgba(255, 255, 255, 0.5);
          text-transform: uppercase;
          letter-spacing: 1px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .notice-elite-table td {
          padding: 1.2rem 1rem;
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.8);
          border-bottom: 1px solid rgba(255, 255, 255, 0.03);
          transition: 0.2s;
        }
        .notice-row:hover td {
          background: rgba(255, 255, 255, 0.03);
          color: #fff;
        }

        .notice-row .idx { opacity: 0.3; font-weight: 700; text-align: center; }
        .title-cell { font-weight: 600; cursor: pointer; position: relative; }
        .title-content { 
          max-width: 450px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .view-more-hint {
          font-size: 0.65rem;
          background: rgba(0, 210, 255, 0.1);
          color: #00d2ff;
          padding: 2px 6px;
          border-radius: 4px;
          opacity: 0;
          transition: 0.3s;
          white-space: nowrap;
        }
        .notice-row:hover .view-more-hint { opacity: 1; transform: translateX(5px); }

        /* 이미지 업로드 스타일 */
        .image-upload-group { margin-top: 1.5rem; }
        .image-upload-wrapper { display: flex; align-items: center; gap: 1.5rem; }
        .btn-upload-trigger {
          display: inline-block;
          padding: 10px 20px;
          background: rgba(255,255,255,0.05);
          border: 1px dashed rgba(255,255,255,0.2);
          border-radius: 10px;
          color: #fff;
          font-size: 0.85rem;
          cursor: pointer;
          transition: 0.3s;
        }
        .btn-upload-trigger:hover { background: rgba(255,255,255,0.1); border-color: var(--accent-color); }
        .upload-preview { position: relative; width: 100px; height: 60px; border-radius: 8px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1); }
        .upload-preview img { width: 100%; height: 100%; object-fit: cover; }
        .btn-remove-img { position: absolute; top: 2px; right: 2px; background: rgba(0,0,0,0.5); color: #fff; border: none; border-radius: 50%; width: 18px; height: 18px; font-size: 12px; cursor: pointer; display: flex; align-items: center; justify-content: center; }

        /* 상세 팝업 모달 스타일 */
        .notice-detail-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.85);
          backdrop-filter: blur(10px);
          z-index: 30000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }
        .notice-detail-modal .modal-content {
          width: 100%;
          max-width: 800px;
          max-height: 90vh;
          background: #0a0c10;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 30px;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
        }
        .btn-close-modal {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          background: rgba(255,255,255,0.05);
          color: #fff;
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          font-size: 1.5rem;
          cursor: pointer;
          z-index: 10;
          transition: 0.3s;
        }
        .btn-close-modal:hover { background: #ff4d4d; transform: rotate(90deg); }

        .notice-detail-modal .modal-header { padding: 3rem 3rem 2rem; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .notice-detail-modal .modal-header h2 { font-size: 2rem; font-weight: 800; color: #fff; margin: 1rem 0; line-height: 1.3; }
        .modal-meta { display: flex; gap: 1.5rem; opacity: 0.5; font-size: 0.85rem; color: #fff; }
        .modal-meta .icon { margin-right: 6px; color: var(--accent-color); }

        .notice-detail-modal .modal-body { padding: 2rem 3rem; overflow-y: auto; flex: 1; }
        .notice-image-box { margin-bottom: 2rem; border-radius: 20px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
        .notice-image-box img { width: 100%; height: auto; display: block; }
        .notice-text-content { font-size: 1.1rem; line-height: 1.8; color: rgba(255,255,255,0.8); }
        .notice-text-content p { margin-bottom: 1.2rem; }

        .notice-detail-modal .modal-footer { padding: 2rem 3rem; border-top: 1px solid rgba(255,255,255,0.05); text-align: right; }
        .notice-cat-badge {
          padding: 4px 10px;
          border-radius: 4px;
          font-size: 0.65rem;
          font-weight: 900;
          letter-spacing: 0.5px;
        }
        .notice-cat-badge.notice { background: rgba(0, 123, 255, 0.15); color: #007bff; border: 1px solid rgba(0, 123, 255, 0.3); }
        .notice-cat-badge.news { background: rgba(40, 167, 69, 0.15); color: #28a745; border: 1px solid rgba(40, 167, 69, 0.3); }
        .notice-cat-badge.update { background: rgba(111, 66, 193, 0.15); color: #6f42c1; border: 1px solid rgba(111, 66, 193, 0.3); }
        
        .author { font-size: 0.85rem; opacity: 0.6; }
        .date { font-size: 0.85rem; opacity: 0.4; font-family: monospace; }
        
        .btn-delete-row {
          background: transparent;
          border: 1px solid rgba(255, 77, 77, 0.3);
          color: #ff4d4d;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 0.75rem;
          cursor: pointer;
          transition: 0.3s;
        }
        .btn-delete-row:hover { background: #ff4d4d; color: #fff; }

        .notice-pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.5rem;
          margin-top: 2.5rem;
        }
        .page-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #fff;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s;
        }
        .page-btn:hover:not(:disabled) { background: rgba(255, 255, 255, 0.15); border-color: rgba(255, 255, 255, 0.3); }
        .page-btn.active { background: var(--accent-color); color: #000; border-color: var(--accent-color); }
        .page-btn:disabled { opacity: 0.3; cursor: not-allowed; }

        .empty-notice-state {
          padding: 5rem;
          text-align: center;
          opacity: 0.3;
          font-size: 1.1rem;
        }

        @media (max-width: 900px) {
          .notice-elite-table th:nth-child(1), .notice-elite-table td:nth-child(1),
          .notice-elite-table th:nth-child(4), .notice-elite-table td:nth-child(4),
          .notice-elite-table th:nth-child(5), .notice-elite-table td:nth-child(5) { display: none; }
          .title-content { max-width: 250px; }
        }

        @media (max-width: 600px) {
          .notice-title { font-size: 1.8rem !important; margin-bottom: 0.5rem; }
          .notice-subtitle { font-size: 0.9rem !important; margin-bottom: 1rem; }
          .notice-detail-modal { padding: 1rem; }
          .notice-detail-modal .modal-content { border-radius: 20px; }
          .notice-detail-modal .modal-header { padding: 2rem 1.5rem 1.5rem; }
          .notice-detail-modal .modal-header h2 { font-size: 1.4rem; }
          .notice-detail-modal .modal-body { padding: 1rem 1.5rem; }
          .notice-detail-modal .modal-footer { padding: 1.5rem; }
          .modal-meta { flex-direction: column; gap: 0.5rem; }
          
          .image-upload-wrapper { flex-direction: column; align-items: flex-start; }
          .btn-upload-trigger { width: 100%; text-align: center; }
          
          .notice-elite-table th:nth-child(2), .notice-elite-table td:nth-child(2) { display: none; }
          .title-content { max-width: 100%; font-size: 0.9rem; }
        }
      `}</style>
      </section>
    </>
  );
};

export default NoticeBoard;
