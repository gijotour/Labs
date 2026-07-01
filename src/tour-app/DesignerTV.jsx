import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function DesignerTV({ videos }) {
  const navigate = useNavigate();
  const [selectedVideo, setSelectedVideo] = useState(null);
  
  // 댓글 상태 관리 (로컬 스토리지 연동)
  const [comments, setComments] = useState(() => {
    const saved = localStorage.getItem('gijo_tv_comments');
    return saved ? JSON.parse(saved) : {};
  });
  
  const [newComment, setNewComment] = useState('');
  const [nickname, setNickname] = useState('익명고객');

  useEffect(() => {
    localStorage.setItem('gijo_tv_comments', JSON.stringify(comments));
  }, [comments]);

  const handleAddComment = (videoId) => {
    if (!newComment.trim()) return;
    const commentObj = {
      id: Date.now(),
      nickname: nickname || '익명고객',
      text: newComment,
      date: new Date().toLocaleDateString()
    };
    
    setComments(prev => ({
      ...prev,
      [videoId]: [commentObj, ...(prev[videoId] || [])]
    }));
    setNewComment('');
  };

  const currentComments = selectedVideo ? (comments[selectedVideo.id] || []) : [];

  return (
    <div className="designer-tv-container">

      <section className="tv-hero">
        <div className="container">
          <span className="section-badge animate-up">Elite Insights</span>
          <h1 className="hero-main-title animate-up delay-1">여행설계사 <span className="highlight">TV</span></h1>
          <p className="hero-description animate-up delay-2">
            전문 여행설계사들이 직접 전하는 생생한 현지 소식과 호텔 리뷰를 확인하세요. 
            영상을 통해 여행설계사의 전문성을 직접 경험해 보실 수 있습니다.
          </p>
        </div>
      </section>

      <section className="tv-gallery-section">
        <div className="container">
          <div className="tv-grid">
            {videos?.map((video, idx) => (
              <div 
                key={video.id || idx} 
                className={`glass-card tv-card animate-up delay-${(idx % 5) + 1}`}
                onClick={() => setSelectedVideo(video)}
              >
                <div className="tv-thumbnail-wrap">
                  <img src={video.thumbnail} alt={video.title} className="tv-thumbnail" />
                  <div className="tv-play-overlay">
                    <span className="play-icon">▶</span>
                  </div>
                  <span className="tv-duration">{video.duration}</span>
                </div>
                <div className="tv-info">
                  <span className="tv-category">{video.category}</span>
                  <h3 className="tv-title">{video.title}</h3>
                  <div className="tv-meta">
                    <span className="tv-designer">{video.designer} 여행설계사</span>
                    <span className="tv-views">조회수 {video.views}</span>
                  </div>
                </div>
              </div>
            )) || (
              <div className="empty-state-wrap" style={{ gridColumn: '1 / -1' }}>
                <p>현재 등록된 영상이 없습니다.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Video Modal with Comments */}
      {selectedVideo && (
        <div className="modal-overlay" onClick={() => setSelectedVideo(null)}>
          <div className="elite-tv-modal glass-card" onClick={e => e.stopPropagation()}>
            <button className="btn-close-elite-round" onClick={() => setSelectedVideo(null)}>&times;</button>
            
            <div className="tv-modal-content-split">
              {/* Left: Video Player */}
              <div className="tv-modal-video-side">
                <div className="video-container-elite">
                  <iframe 
                    src={`${selectedVideo.youtubeUrl}?autoplay=1`} 
                    title={selectedVideo.title}
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="tv-modal-info">
                  <span className="elite-region-badge">{selectedVideo.category}</span>
                  <h2 className="tv-modal-title">{selectedVideo.title}</h2>
                  
                  <div className="tv-designer-bar">
                    <div className="mini-profile">
                      <div className="mini-avatar" style={{ backgroundImage: `url(https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedVideo.designer})` }}></div>
                      <div className="mini-info">
                        <span className="name">{selectedVideo.designer} 여행설계사</span>
                        <span className="status">전문 컨설턴트</span>
                      </div>
                    </div>
                    <button className="btn-consult" onClick={() => navigate('/gijotour')}>상담 신청</button>
                  </div>
                </div>
              </div>

              {/* Right: Comments Side */}
              <div className="tv-modal-comments-side">
                <h3>의견 나누기 <span className="count">{currentComments.length}</span></h3>
                
                <div className="comment-form">
                  <input 
                    type="text" 
                    placeholder="닉네임" 
                    className="nickname-input"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                  />
                  <div className="comment-input-wrap">
                    <textarea 
                      placeholder="영상에 대한 의견을 남겨주세요..." 
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button className="btn-send-comment" onClick={() => handleAddComment(selectedVideo.id)}>등록</button>
                  </div>
                </div>

                <div className="comments-list custom-scrollbar">
                  {currentComments.length > 0 ? currentComments.map(c => (
                    <div key={c.id} className="comment-item">
                      <div className="comment-meta">
                        <span className="c-name">{c.nickname}</span>
                        <span className="c-date">{c.date}</span>
                      </div>
                      <p className="c-text">{c.text}</p>
                    </div>
                  )) : (
                    <div className="no-comments">첫 번째 의견을 남겨보세요!</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="footer glass-card-no-hover">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="logo-text-small">GIJO TOUR</div>
              <p className="brand-desc">Elite B2B Travel Architecture. Connecting visionaries with the world's most exclusive experiences.</p>
            </div>
          </div>
          <div className="footer-bottom" style={{ textAlign: 'center', marginTop: '3rem', opacity: 0.4, fontSize: '0.8rem' }}>
            © 2026 GIJO TOUR. All rights reserved.
          </div>
        </div>
      </footer>

      <style>{`
        .designer-tv-container { background: var(--bg-color); min-height: 100vh; }
        .tv-hero { padding: 180px 0 60px; text-align: center; }
        .tv-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 2rem; margin-bottom: 5rem; }
        .tv-card { overflow: hidden; padding: 0; }
        .tv-thumbnail-wrap { position: relative; width: 100%; aspect-ratio: 16/9; overflow: hidden; }
        .tv-thumbnail { width: 100%; height: 100%; object-fit: cover; transition: 0.4s; }
        .tv-card:hover .tv-thumbnail { transform: scale(1.05); }
        .tv-play-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; opacity: 0; transition: 0.3s; }
        .tv-card:hover .tv-play-overlay { opacity: 1; }
        .tv-duration { position: absolute; bottom: 10px; right: 10px; background: rgba(0,0,0,0.7); padding: 2px 8px; border-radius: 4px; font-size: 0.7rem; color: #fff; }
        .tv-info { padding: 1.5rem; }
        .tv-title { font-size: 1.1rem; margin: 0.5rem 0 1rem; line-height: 1.4; height: 3rem; overflow: hidden; }
        
        /* Modal Enhanced */
        .elite-tv-modal { width: 90vw; max-width: 1200px; height: 85vh; background: rgba(10,12,20,0.95); border: 1px solid rgba(255,255,255,0.1); position: relative; overflow: hidden; padding: 0; }
        .tv-modal-content-split { display: grid; grid-template-columns: 1.8fr 1fr; height: 100%; }
        
        .tv-modal-video-side { padding: 2rem; overflow-y: auto; }
        .video-container-elite { position: relative; padding-bottom: 56.25%; height: 0; border-radius: 12px; overflow: hidden; background: #000; }
        .video-container-elite iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
        
        .tv-modal-info { margin-top: 1.5rem; }
        .tv-modal-title { font-size: 1.8rem; font-weight: 800; margin: 1rem 0; color: #fff; }
        .tv-designer-bar { display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.03); padding: 1rem 1.5rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05); }
        .mini-profile { display: flex; gap: 1rem; align-items: center; }
        .mini-avatar { width: 45px; height: 45px; border-radius: 50%; background-size: cover; border: 2px solid var(--accent-color); }
        .mini-info .name { display: block; font-weight: 700; font-size: 0.95rem; }
        .mini-info .status { font-size: 0.75rem; opacity: 0.5; }
        .btn-consult { background: var(--accent-brand); color: #000; border: none; padding: 10px 20px; border-radius: 30px; font-weight: 800; font-size: 0.85rem; cursor: pointer; transition: 0.3s; }
        
        /* Comments side */
        .tv-modal-comments-side { background: rgba(255,255,255,0.02); border-left: 1px solid rgba(255,255,255,0.05); padding: 2rem; display: flex; flex-direction: column; }
        .tv-modal-comments-side h3 { margin-bottom: 1.5rem; font-size: 1.2rem; }
        .tv-modal-comments-side .count { font-size: 0.9rem; color: var(--accent-color); margin-left: 8px; opacity: 0.7; }
        
        .comment-form { margin-bottom: 2rem; }
        .nickname-input { width: 100%; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 8px 12px; color: #fff; margin-bottom: 10px; font-size: 0.85rem; }
        .comment-input-wrap { position: relative; }
        .comment-input-wrap textarea { width: 100%; height: 100px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 1rem; color: #fff; resize: none; font-size: 0.9rem; }
        .btn-send-comment { position: absolute; bottom: 10px; right: 10px; background: var(--accent-color); color: #000; border: none; padding: 6px 15px; border-radius: 8px; font-weight: 800; cursor: pointer; font-size: 0.8rem; }
        
        .comments-list { flex: 1; overflow-y: auto; padding-right: 5px; }
        .comment-item { background: rgba(255,255,255,0.03); padding: 1.2rem; border-radius: 12px; margin-bottom: 1rem; border: 1px solid rgba(255,255,255,0.03); }
        .comment-meta { display: flex; justify-content: space-between; margin-bottom: 0.5rem; }
        .c-name { font-weight: 700; font-size: 0.9rem; color: var(--accent-color); }
        .c-date { font-size: 0.75rem; opacity: 0.3; }
        .c-text { font-size: 0.9rem; line-height: 1.5; opacity: 0.8; }
        .no-comments { text-align: center; opacity: 0.3; padding: 3rem 0; font-size: 0.9rem; }

        @media (max-width: 1000px) {
          .tv-modal-content-split { grid-template-columns: 1fr; overflow-y: auto; }
          .tv-modal-comments-side { border-left: none; border-top: 1px solid rgba(255,255,255,0.05); }
          .elite-tv-modal { height: 95vh; }
        }
      `}</style>
    </div>
  );
}

export default DesignerTV;
