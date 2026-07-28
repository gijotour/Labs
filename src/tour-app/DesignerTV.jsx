import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './tour-theme.css';

function DesignerTV({ videos = [] }) {
  const navigate = useNavigate();
  const [selectedVideo, setSelectedVideo] = useState(null);

  // 댓글 상태 관리 (로컬 스토리지 연동)
  const [comments, setComments] = useState(() => {
    const saved = localStorage.getItem('gijo_tv_comments');
    return saved ? JSON.parse(saved) : {};
  });

  const [newComment, setNewComment] = useState('');
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    localStorage.setItem('gijo_tv_comments', JSON.stringify(comments));
  }, [comments]);

  // 모달이 열려 있을 때 Esc로 닫기
  useEffect(() => {
    if (!selectedVideo) return;
    const onKey = (e) => e.key === 'Escape' && setSelectedVideo(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedVideo]);

  const handleAddComment = (videoId) => {
    if (!newComment.trim()) return;
    const commentObj = {
      id: Date.now(),
      nickname: nickname.trim() || '익명고객',
      text: newComment,
      date: new Date().toISOString().slice(0, 10)
    };

    setComments((prev) => ({
      ...prev,
      [videoId]: [commentObj, ...(prev[videoId] || [])]
    }));
    setNewComment('');
  };

  const currentComments = selectedVideo ? (comments[selectedVideo.id] || []) : [];

  return (
    <main className="tour-surface tv">
      <div className="t-shell">
        <header className="tv__head">
          <span className="t-eyebrow">Elite Insights</span>
          <h1>여행설계사 TV</h1>
          <p className="t-lead">
            전문 여행설계사들이 직접 전하는 생생한 현지 소식과 호텔 리뷰를 확인하세요.
          </p>
        </header>

        {videos.length > 0 ? (
          <ul className="tv__grid">
            {videos.map((video, idx) => (
              <li key={video.id ?? idx}>
                <button type="button" className="tv__card" onClick={() => setSelectedVideo(video)}>
                  <span className="tv__thumbwrap">
                    <img src={video.thumbnail} alt="" className="tv__thumb" loading="lazy" />
                    <span className="tv__play" aria-hidden="true">▶</span>
                    {video.duration && <span className="tv__dur">{video.duration}</span>}
                  </span>
                  <span className="tv__info">
                    <span className="tv__cat">{video.category}</span>
                    <span className="tv__title">{video.title}</span>
                    <span className="tv__meta">
                      <span>{video.designer} 여행설계사</span>
                      <span>조회 {video.views}</span>
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="tv__empty">현재 등록된 영상이 없습니다.</p>
        )}
      </div>

      {selectedVideo && (
        <div className="tv__overlay" onClick={() => setSelectedVideo(null)}>
          <div
            className="tv__modal"
            role="dialog"
            aria-modal="true"
            aria-label={selectedVideo.title}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="tv__close"
              onClick={() => setSelectedVideo(null)}
              aria-label="닫기"
            >
              ✕
            </button>

            <div className="tv__modalgrid">
              <div className="tv__player">
                <div className="tv__frame">
                  <iframe
                    src={`${selectedVideo.youtubeUrl}?autoplay=1`}
                    title={selectedVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                <div className="tv__playerinfo">
                  <span className="t-eyebrow">{selectedVideo.category}</span>
                  <h2 className="tv__modaltitle">{selectedVideo.title}</h2>

                  <div className="tv__designer">
                    <span className="tv__avatar" aria-hidden="true">
                      {selectedVideo.designer?.[0] ?? '?'}
                    </span>
                    <span className="tv__designerinfo">
                      <strong>{selectedVideo.designer} 여행설계사</strong>
                      <em>전문 컨설턴트</em>
                    </span>
                    <button
                      type="button"
                      className="t-btn t-btn--primary tv__consult"
                      onClick={() => navigate('/gijotour#request')}
                    >
                      상담 신청
                    </button>
                  </div>
                </div>
              </div>

              <aside className="tv__comments">
                <h3 className="tv__commentshead">
                  의견 나누기 <span>{currentComments.length}</span>
                </h3>

                <form
                  className="tv__commentform"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleAddComment(selectedVideo.id);
                  }}
                >
                  <div className="t-field">
                    <label htmlFor="tv-nick" className="sr-only">닉네임</label>
                    <input
                      id="tv-nick"
                      type="text"
                      placeholder="닉네임 (미입력 시 익명)"
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                    />
                  </div>
                  <div className="t-field">
                    <label htmlFor="tv-comment" className="sr-only">의견</label>
                    <textarea
                      id="tv-comment"
                      rows={3}
                      placeholder="영상에 대한 의견을 남겨주세요"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="t-btn t-btn--secondary" disabled={!newComment.trim()}>
                    등록
                  </button>
                </form>

                <ul className="tv__commentlist">
                  {currentComments.length > 0 ? currentComments.map((c) => (
                    <li key={c.id}>
                      <div className="tv__commentmeta">
                        <strong>{c.nickname}</strong>
                        <span>{c.date}</span>
                      </div>
                      <p>{c.text}</p>
                    </li>
                  )) : (
                    <li className="tv__nocomment">첫 번째 의견을 남겨보세요.</li>
                  )}
                </ul>
              </aside>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .tv { padding: 3rem 0 var(--t-section); }
        .tv__head { margin-bottom: var(--t-gap-xl); }
        .tv__head h1 { font-size: 2.25rem; margin: 0 0 var(--t-gap-sm); }

        .tv__grid {
          list-style: none; margin: 0; padding: 0;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: var(--t-gap);
        }
        .tv__card {
          display: block;
          width: 100%;
          padding: 0;
          border: 1px solid var(--t-line);
          border-radius: var(--t-radius);
          background: var(--t-surface-1);
          text-align: left;
          font: inherit;
          color: inherit;
          cursor: pointer;
          overflow: hidden;
          transition: border-color 0.18s ease;
        }
        .tv__card:hover { border-color: var(--t-accent-line); }

        .tv__thumbwrap { display: block; position: relative; aspect-ratio: 16 / 9; }
        .tv__thumb { width: 100%; height: 100%; object-fit: cover; display: block; }
        .tv__play {
          position: absolute; inset: 0;
          display: grid; place-items: center;
          background: rgba(4, 7, 12, 0.45);
          color: #fff;
          font-size: 1.5rem;
          opacity: 0;
          transition: opacity 0.18s ease;
        }
        .tv__card:hover .tv__play, .tv__card:focus-visible .tv__play { opacity: 1; }
        .tv__dur {
          position: absolute; right: 0.5rem; bottom: 0.5rem;
          padding: 0.125rem 0.375rem;
          border-radius: 4px;
          background: rgba(4, 7, 12, 0.8);
          color: #f2f5f9;
          font-size: 0.75rem;
          font-variant-numeric: tabular-nums;
        }

        .tv__info { display: block; padding: var(--t-gap); }
        .tv__cat {
          display: block;
          font-size: 0.6875rem; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--t-accent);
          margin-bottom: 0.375rem;
        }
        .tv__title {
          display: block;
          font-size: 1rem; font-weight: 650; line-height: 1.45;
          color: var(--t-fg);
          margin-bottom: 0.625rem;
        }
        .tv__meta {
          display: flex; justify-content: space-between; gap: 0.5rem;
          font-size: var(--t-small); color: var(--t-fg-subtle);
        }
        .tv__empty { text-align: center; padding: 4rem 0; color: var(--t-fg-subtle); }

        /* ── 모달 ── */
        .tv__overlay {
          position: fixed; inset: 0; z-index: 1100;
          background: rgba(4, 7, 12, 0.82);
          display: grid; place-items: center;
          padding: 1.5rem;
        }
        .tv__modal {
          position: relative;
          width: min(1040px, 100%);
          max-height: 90vh;
          overflow-y: auto;
          border: 1px solid var(--t-line);
          border-radius: var(--t-radius);
          background: var(--t-surface-1);
        }
        .tv__close {
          position: absolute; top: 0.75rem; right: 0.75rem; z-index: 2;
          width: 32px; height: 32px;
          border-radius: 50%;
          border: 1px solid var(--t-line-strong);
          background: rgba(4, 7, 12, 0.7);
          color: var(--t-fg);
          cursor: pointer;
        }
        .tv__close:hover { border-color: var(--t-accent-line); color: var(--t-accent); }

        .tv__modalgrid { display: grid; grid-template-columns: 1.6fr 1fr; }
        .tv__frame { position: relative; aspect-ratio: 16 / 9; background: #000; }
        .tv__frame iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }
        .tv__playerinfo { padding: var(--t-gap-lg); }
        .tv__modaltitle { font-size: 1.375rem; margin: 0.375rem 0 var(--t-gap); }

        .tv__designer {
          display: flex; align-items: center; gap: 0.75rem;
          padding-top: var(--t-gap);
          border-top: 1px solid var(--t-line);
        }
        .tv__avatar {
          display: grid; place-items: center;
          width: 36px; height: 36px; border-radius: 50%;
          background: var(--t-surface-3); color: var(--t-fg-muted);
          font-weight: 700; flex-shrink: 0;
        }
        .tv__designerinfo { display: grid; gap: 0.125rem; }
        .tv__designerinfo strong { font-size: 0.9375rem; color: var(--t-fg); font-weight: 650; }
        .tv__designerinfo em { font-style: normal; font-size: 0.8125rem; color: var(--t-fg-subtle); }
        .tv__consult { margin-left: auto; padding: 0.5rem 0.875rem; font-size: 0.875rem; }

        .tv__comments {
          border-left: 1px solid var(--t-line);
          padding: var(--t-gap-lg);
          display: flex; flex-direction: column; gap: var(--t-gap);
          min-width: 0;
        }
        .tv__commentshead { font-size: 1rem; margin: 0; }
        .tv__commentshead span { color: var(--t-accent); }
        .tv__commentform { display: grid; gap: 0.5rem; }
        .tv__commentform textarea {
          width: 100%;
          padding: 0.75rem;
          border-radius: var(--t-radius-sm);
          border: 1px solid var(--t-line);
          background: var(--t-surface-2);
          color: var(--t-fg);
          font: inherit;
          font-size: var(--t-small);
          resize: vertical;
        }
        .tv__commentform textarea::placeholder { color: var(--t-fg-subtle); }

        .tv__commentlist {
          list-style: none; margin: 0; padding: 0;
          display: grid; gap: 0.75rem;
          overflow-y: auto;
          max-height: 320px;
        }
        .tv__commentlist li {
          padding: 0.75rem;
          border: 1px solid var(--t-line);
          border-radius: var(--t-radius-sm);
        }
        .tv__commentmeta {
          display: flex; justify-content: space-between; gap: 0.5rem;
          margin-bottom: 0.375rem;
          font-size: 0.75rem;
        }
        .tv__commentmeta strong { color: var(--t-fg); font-weight: 650; }
        .tv__commentmeta span { color: var(--t-fg-subtle); }
        .tv__commentlist p { margin: 0; font-size: var(--t-small); }
        .tv__nocomment {
          border: 0 !important;
          text-align: center;
          color: var(--t-fg-subtle);
          font-size: var(--t-small);
          padding: 1.5rem 0 !important;
        }

        @media (max-width: 900px) {
          .tv__modalgrid { grid-template-columns: 1fr; }
          .tv__comments { border-left: 0; border-top: 1px solid var(--t-line); }
        }
        @media (max-width: 600px) {
          .tv__playerinfo, .tv__comments { padding: var(--t-gap); }
          .tv__designer { flex-wrap: wrap; }
          .tv__consult { margin-left: 0; width: 100%; }
        }
      `}</style>
    </main>
  );
}

export default DesignerTV;
