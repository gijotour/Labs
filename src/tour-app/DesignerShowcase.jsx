import { useState, useEffect } from 'react';
import './tour-theme.css';

const formatYoutubeUrl = (url) => {
  if (!url) return null;
  if (url.includes('youtube.com/embed/')) return url;

  let videoId = '';
  if (url.includes('v=')) videoId = url.split('v=')[1].split('&')[0];
  else if (url.includes('youtu.be/')) videoId = url.split('youtu.be/')[1].split('?')[0];

  return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
};

const quoteOf = (pkg) =>
  (pkg?.detailedPlan?.pricing ?? '상담 후 제안')
    .replace('1인당 약 ', '')
    .replace(' (항공권 별도)', '');

const DesignerShowcase = ({ packages = [], onRate, selectedRegion = '전체', onStartPayment }) => {
  const [modal, setModal] = useState(null); // 'rating' | 'reviews' | 'detail'
  const [selected, setSelected] = useState(null);

  const [nickname, setNickname] = useState('');
  const [comment, setComment] = useState('');
  const [hoverRating, setHoverRating] = useState(0);
  const [rating, setRating] = useState(5);
  const [ratingError, setRatingError] = useState('');
  const [toast, setToast] = useState('');

  useEffect(() => {
    if (!modal) return;
    const onKey = (e) => e.key === 'Escape' && setModal(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [modal]);

  const open = (kind, pkg) => {
    setSelected(pkg);
    if (kind === 'rating') {
      setNickname('');
      setComment('');
      setRating(5);
      setRatingError('');
    }
    setModal(kind);
  };

  const submitRating = () => {
    if (!nickname.trim()) {
      setRatingError('닉네임을 입력해 주세요.');
      return;
    }
    setRatingError('');
    onRate?.(selected.designer, nickname, rating, comment);
    setModal(null);
    setToast(`${selected.designer} 여행설계사님께 후기를 남겼습니다.`);
  };

  const reviews = selected?.reviews ?? [];

  return (
    <main className="tour-surface ds">
      <div className="t-shell">
        <header className="ds__head">
          <span className="t-eyebrow">Travel Designer Proposals</span>
          {selectedRegion === '전체' ? (
            <>
              <h1>전문 여행설계사의 맞춤 제안</h1>
              <p className="t-lead">
                전문가들이 완벽한 여정을 위해 준비한 비대면 맞춤형 프리미엄 서비스입니다.
              </p>
            </>
          ) : (
            <>
              <h1>{selectedRegion} 지역 맞춤 제안</h1>
              <p className="t-lead">
                해당 지역의 여행설계사가 제안하는 총 {packages.length}건의 맞춤 일정입니다.
              </p>
            </>
          )}
        </header>

        {packages.length > 0 ? (
          <ul className="ds__list">
            {packages.map((pkg, index) => (
              <li key={pkg.id ?? index} className="ds__item">
                <button type="button" className="ds__main" onClick={() => open('detail', pkg)}>
                  <span className="ds__region">{pkg.region}</span>
                  <span className="ds__title">{pkg.title}</span>
                  <span className="ds__meta">
                    <span>{pkg.designer}</span>
                    <span className="ds__rating">★ {pkg.rating}</span>
                    <span>{quoteOf(pkg)}</span>
                  </span>
                  <span className="ds__arrow" aria-hidden="true">→</span>
                </button>

                <div className="ds__actions">
                  <button type="button" className="ds__act" onClick={() => open('reviews', pkg)}>
                    후기 {pkg.reviewCount ?? reviews.length}개
                  </button>
                  <button type="button" className="ds__act" onClick={() => open('rating', pkg)}>
                    평점 남기기
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="ds__empty">
            <span aria-hidden="true">🏝️</span>
            <h2>맞춤 제안을 준비 중입니다</h2>
            <p>여행설계사들이 정성껏 일정을 작성하고 있습니다.</p>
          </div>
        )}
      </div>

      {/* ── 평점 등록 ── */}
      {modal === 'rating' && (
        <div className="ds__overlay" onClick={() => setModal(null)}>
          <div className="ds__modal ds__modal--sm" role="dialog" aria-modal="true"
               aria-label="평점 등록" onClick={(e) => e.stopPropagation()}>
            <div className="ds__modalbody">
              <h2 className="ds__modaltitle">경험하신 서비스는 어떠셨나요?</h2>
              <p className="ds__modaldesc">
                <strong>{selected?.designer}</strong> 여행설계사님의 제안에 평점과 후기를 남겨주세요.
              </p>

              <div className="t-field">
                <label htmlFor="ds-nick">닉네임 <span className="t-req" aria-hidden="true">*</span></label>
                <input
                  id="ds-nick"
                  type="text"
                  placeholder="홍길동"
                  value={nickname}
                  onChange={(e) => { setNickname(e.target.value); setRatingError(''); }}
                  aria-invalid={ratingError ? true : undefined}
                />
              </div>

              <fieldset className="ds__stars">
                <legend>평점</legend>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={`ds__star ${(hoverRating || rating) >= star ? 'is-on' : ''}`}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                    aria-label={`${star}점`}
                    aria-pressed={rating === star}
                  >
                    ★
                  </button>
                ))}
                <span className="ds__starval">{hoverRating || rating}점</span>
              </fieldset>

              <div className="t-field">
                <label htmlFor="ds-comment">후기</label>
                <textarea
                  id="ds-comment"
                  rows={3}
                  placeholder="서비스에 대한 후기를 자유롭게 남겨주세요."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>

              {ratingError && <p className="t-error" role="alert">{ratingError}</p>}
            </div>

            <div className="ds__modalfoot">
              <button type="button" className="t-btn t-btn--secondary" onClick={() => setModal(null)}>취소</button>
              <button type="button" className="t-btn t-btn--primary" onClick={submitRating}>평점 등록</button>
            </div>
          </div>
        </div>
      )}

      {/* ── 후기 목록 ── */}
      {modal === 'reviews' && (
        <div className="ds__overlay" onClick={() => setModal(null)}>
          <div className="ds__modal ds__modal--sm" role="dialog" aria-modal="true"
               aria-label="후기 목록" onClick={(e) => e.stopPropagation()}>
            <div className="ds__modalbody">
              <h2 className="ds__modaltitle">{selected?.designer} 여행설계사 후기</h2>

              {reviews.length > 0 ? (
                <ul className="ds__reviews">
                  {reviews.map((rev, i) => (
                    <li key={i}>
                      <div className="ds__revmeta">
                        <strong>{rev.nickname}</strong>
                        <span className="ds__revstars" aria-label={`${rev.rating}점`}>
                          {'★'.repeat(rev.rating)}
                        </span>
                        <span>{rev.date}</span>
                      </div>
                      <p>{rev.comment || '상세 내용 없음'}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="ds__norev">아직 등록된 후기가 없습니다.</p>
              )}
            </div>

            <div className="ds__modalfoot">
              <button type="button" className="t-btn t-btn--secondary" onClick={() => setModal(null)}>닫기</button>
            </div>
          </div>
        </div>
      )}

      {/* ── 제안서 상세 ── */}
      {modal === 'detail' && selected?.detailedPlan && (
        <div className="ds__overlay" onClick={() => setModal(null)}>
          <div className="ds__modal" role="dialog" aria-modal="true"
               aria-label={selected.title} onClick={(e) => e.stopPropagation()}>
            <button type="button" className="ds__close" onClick={() => setModal(null)} aria-label="닫기">✕</button>

            <div className="ds__hero">
              <img src={selected.image} alt="" />
              <div className="ds__heroinfo">
                <span className="t-eyebrow">{selected.region} 전문 제안</span>
                <h2 className="ds__herotitle">{selected.title}</h2>
              </div>
            </div>

            <div className="ds__modalbody">
              <div className="ds__topbar">
                <div className="ds__profile">
                  <span className="ds__avatar" aria-hidden="true">{selected.designer?.[0] ?? '?'}</span>
                  <span>
                    <strong>{selected.designer}</strong>
                    <em>★ {selected.rating} · 후기 {selected.reviewCount ?? 0}개</em>
                  </span>
                </div>

                <div className="ds__quote">
                  <span className="t-eyebrow">예상 견적</span>
                  <strong>{quoteOf(selected)}</strong>
                  <em>1인 기준 · 항공권 별도 실비 정산</em>
                </div>
              </div>

              {selected.youtubeUrl && (
                <div className="ds__frame">
                  <iframe
                    src={formatYoutubeUrl(selected.youtubeUrl)}
                    title={`${selected.title} 소개 영상`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              )}

              <div className="ds__detailgrid">
                <section>
                  <h3 className="ds__panelhead">상세 일정</h3>
                  {selected.detailedPlan?.itinerary?.length ? (
                    <ol className="ds__timeline">
                      {selected.detailedPlan.itinerary.map((item, i) => (
                        <li key={i}>
                          <span className="ds__day">D{item.day}</span>
                          <div>
                            <h4>{item.title}</h4>
                            <p>{item.content}</p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <p className="ds__norev">상세 일정을 준비 중입니다.</p>
                  )}
                </section>

                <aside className="ds__side">
                  <section className="ds__panel">
                    <h3 className="ds__panelhead">포함 사항</h3>
                    <ul className="ds__marks ds__marks--in">
                      {selected.detailedPlan?.inclusions?.map((t, i) => <li key={i}>{t}</li>)
                        ?? <li>확인 중입니다.</li>}
                    </ul>
                  </section>

                  <section className="ds__panel">
                    <h3 className="ds__panelhead">불포함 사항</h3>
                    <ul className="ds__marks ds__marks--out">
                      {selected.detailedPlan?.exclusions?.map((t, i) => <li key={i}>{t}</li>)
                        ?? <li>확인 중입니다.</li>}
                    </ul>
                  </section>

                  {selected.detailedPlan?.proTip && (
                    <section className="ds__tip">
                      <h3 className="ds__panelhead">설계사 팁</h3>
                      <p>{selected.detailedPlan.proTip}</p>
                    </section>
                  )}
                </aside>
              </div>
            </div>

            <div className="ds__modalfoot">
              <button type="button" className="t-btn t-btn--secondary" onClick={() => setModal(null)}>닫기</button>
              <button type="button" className="t-btn t-btn--primary" onClick={() => onStartPayment?.(selected)}>
                상담 예약 및 결제 진행
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="ds__toast" role="status">
          <span>{toast}</span>
          <button type="button" onClick={() => setToast('')} aria-label="알림 닫기">✕</button>
        </div>
      )}

      <style>{`
        .ds { padding: 3rem 0 var(--t-section); }
        .ds__head { margin-bottom: var(--t-gap-xl); }
        .ds__head h1 { font-size: 2.25rem; margin: 0 0 var(--t-gap-sm); }

        /* ── 목록 ── */
        .ds__list { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.75rem; }
        .ds__item {
          border: 1px solid var(--t-line);
          border-radius: var(--t-radius);
          background: var(--t-surface-1);
          overflow: hidden;
          transition: border-color 0.18s ease;
        }
        .ds__item:hover { border-color: var(--t-accent-line); }
        .ds__main {
          position: relative;
          display: block; width: 100%;
          padding: 1.25rem 3rem 1.25rem 1.25rem;
          background: transparent; border: 0;
          font: inherit; color: inherit; text-align: left; cursor: pointer;
        }
        .ds__main:hover { background: rgba(255,255,255,0.02); }
        .ds__region {
          display: block;
          font-size: 0.6875rem; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--t-accent); margin-bottom: 0.375rem;
        }
        .ds__title {
          display: block;
          font-size: 1.0625rem; font-weight: 650; line-height: 1.45;
          color: var(--t-fg); margin-bottom: 0.5rem;
        }
        .ds__meta {
          display: flex; flex-wrap: wrap; gap: 0.875rem;
          font-size: var(--t-small); color: var(--t-fg-subtle);
        }
        .ds__rating { color: var(--t-fg-muted); }
        .ds__arrow {
          position: absolute; right: 1.25rem; top: 50%;
          transform: translateY(-50%); opacity: 0.4;
          transition: transform 0.18s ease;
        }
        .ds__main:hover .ds__arrow { transform: translateY(-50%) translateX(3px); opacity: 0.8; }

        .ds__actions {
          display: flex; gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          border-top: 1px solid var(--t-line);
        }
        .ds__act {
          padding: 0.4375rem 0.75rem;
          border-radius: 8px;
          border: 1px solid var(--t-line);
          background: transparent;
          color: var(--t-fg-muted);
          font: inherit; font-size: 0.8125rem; font-weight: 600;
          cursor: pointer;
          transition: border-color 0.18s ease, color 0.18s ease;
        }
        .ds__act:hover { border-color: var(--t-accent-line); color: var(--t-accent); }

        .ds__empty { text-align: center; padding: 5rem 0; }
        .ds__empty span { font-size: 2.5rem; }
        .ds__empty h2 { font-size: 1.25rem; margin: 1rem 0 0.5rem; }
        .ds__empty p { color: var(--t-fg-subtle); }

        /* ── 모달 공통 ── */
        .ds__overlay {
          position: fixed; inset: 0; z-index: 1100;
          background: rgba(4, 7, 12, 0.82);
          display: grid; place-items: center;
          padding: 1.5rem;
        }
        .ds__modal {
          position: relative;
          width: min(940px, 100%);
          max-height: 90vh;
          display: flex; flex-direction: column;
          border: 1px solid var(--t-line);
          border-radius: var(--t-radius);
          background: var(--t-surface-1);
          overflow: hidden;
        }
        .ds__modal--sm { width: min(520px, 100%); }
        .ds__modalbody { padding: var(--t-gap-lg); overflow-y: auto; display: grid; gap: var(--t-gap); }
        .ds__modalfoot {
          display: flex; justify-content: flex-end; gap: 0.5rem;
          padding: var(--t-gap);
          border-top: 1px solid var(--t-line);
          background: var(--t-surface-2);
        }
        .ds__modaltitle { font-size: 1.25rem; margin: 0; }
        .ds__modaldesc { margin: 0; font-size: var(--t-small); }
        .ds__close {
          position: absolute; top: 0.75rem; right: 0.75rem; z-index: 2;
          width: 32px; height: 32px; border-radius: 50%;
          border: 1px solid var(--t-line-strong);
          background: rgba(4, 7, 12, 0.7); color: var(--t-fg); cursor: pointer;
        }
        .ds__close:hover { border-color: var(--t-accent-line); color: var(--t-accent); }

        /* ── 평점 ── */
        .ds__stars { border: 0; padding: 0; margin: 0; display: flex; align-items: center; gap: 0.25rem; }
        .ds__stars legend {
          padding: 0; margin-bottom: 0.375rem;
          font-size: var(--t-small); font-weight: 650; color: var(--t-fg);
        }
        .ds__star {
          background: none; border: 0; cursor: pointer;
          font-size: 1.5rem; line-height: 1;
          color: var(--t-line-strong); padding: 0 0.0625rem;
          transition: color 0.12s ease;
        }
        .ds__star.is-on { color: var(--t-accent); }
        .ds__starval { margin-left: 0.5rem; font-size: var(--t-small); color: var(--t-fg-subtle); }
        .ds__modalbody textarea {
          width: 100%; padding: 0.75rem;
          border-radius: var(--t-radius-sm);
          border: 1px solid var(--t-line);
          background: var(--t-surface-2); color: var(--t-fg);
          font: inherit; font-size: var(--t-small); resize: vertical;
        }
        .ds__modalbody textarea::placeholder { color: var(--t-fg-subtle); }

        /* ── 후기 ── */
        .ds__reviews { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.75rem; }
        .ds__reviews li { padding: 0.875rem; border: 1px solid var(--t-line); border-radius: var(--t-radius-sm); }
        .ds__revmeta { display: flex; align-items: center; gap: 0.625rem; margin-bottom: 0.375rem; font-size: 0.75rem; }
        .ds__revmeta strong { color: var(--t-fg); font-weight: 650; }
        .ds__revmeta span:last-child { color: var(--t-fg-subtle); margin-left: auto; }
        .ds__revstars { color: var(--t-accent); }
        .ds__reviews p { margin: 0; font-size: var(--t-small); }
        .ds__norev { color: var(--t-fg-subtle); font-size: var(--t-small); margin: 0; }

        /* ── 상세 ── */
        .ds__hero { position: relative; aspect-ratio: 21 / 8; flex-shrink: 0; }
        .ds__hero img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .ds__heroinfo {
          position: absolute; inset: 0;
          display: flex; flex-direction: column; justify-content: flex-end;
          padding: var(--t-gap-lg);
          background: linear-gradient(180deg, rgba(7,11,18,.1), rgba(7,11,18,.92));
        }
        .ds__herotitle { font-size: 1.5rem; margin: 0.375rem 0 0; color: #fff; }

        .ds__topbar {
          display: flex; justify-content: space-between; align-items: flex-start;
          gap: var(--t-gap); flex-wrap: wrap;
          padding-bottom: var(--t-gap);
          border-bottom: 1px solid var(--t-line);
        }
        .ds__profile { display: flex; align-items: center; gap: 0.75rem; }
        .ds__avatar {
          display: grid; place-items: center;
          width: 40px; height: 40px; border-radius: 50%;
          background: var(--t-surface-3); color: var(--t-fg-muted); font-weight: 700;
        }
        .ds__profile strong { display: block; color: var(--t-fg); font-size: 0.9375rem; }
        .ds__profile em { font-style: normal; font-size: 0.8125rem; color: var(--t-fg-subtle); }
        .ds__quote { text-align: right; }
        .ds__quote strong {
          display: block; font-size: 1.5rem; font-weight: 700;
          color: var(--t-accent); letter-spacing: -0.02em; margin: 0.25rem 0;
        }
        .ds__quote em { font-style: normal; font-size: 0.75rem; color: var(--t-fg-subtle); }

        .ds__frame { position: relative; aspect-ratio: 16/9; border-radius: var(--t-radius-sm); overflow: hidden; background: #000; }
        .ds__frame iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }

        .ds__detailgrid { display: grid; grid-template-columns: 1.4fr 1fr; gap: var(--t-gap-lg); }
        .ds__panelhead {
          font-size: 0.75rem; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--t-fg-subtle); margin: 0 0 0.75rem;
        }
        .ds__timeline { list-style: none; margin: 0; padding: 0; display: grid; gap: 1rem; }
        .ds__timeline li { display: flex; gap: 0.875rem; }
        .ds__day {
          flex-shrink: 0;
          padding: 0.25rem 0.5rem; height: fit-content;
          border-radius: 6px;
          background: var(--t-accent-weak);
          border: 1px solid var(--t-accent-line);
          color: var(--t-accent);
          font-size: 0.75rem; font-weight: 700;
        }
        .ds__timeline h4 { margin: 0 0 0.25rem; font-size: 0.9375rem; color: var(--t-fg); }
        .ds__timeline p { margin: 0; font-size: var(--t-small); }

        .ds__side { display: grid; gap: var(--t-gap); align-content: start; }
        .ds__panel, .ds__tip {
          padding: var(--t-gap);
          border: 1px solid var(--t-line);
          border-radius: var(--t-radius-sm);
        }
        .ds__marks { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.375rem; }
        .ds__marks li {
          position: relative; padding-left: 1.25rem;
          font-size: var(--t-small); color: var(--t-fg-muted);
        }
        .ds__marks li::before { position: absolute; left: 0; font-weight: 700; }
        .ds__marks--in li::before { content: '✓'; color: var(--t-accent); }
        .ds__marks--out li::before { content: '✕'; color: var(--t-danger); }
        .ds__tip { background: var(--t-accent-weak); border-color: var(--t-accent-line); }
        .ds__tip p { margin: 0; font-size: var(--t-small); }

        .ds__toast {
          position: fixed; left: 50%; bottom: 1.5rem; transform: translateX(-50%);
          z-index: 1200; display: flex; align-items: center; gap: 1rem;
          padding: 0.875rem 1.25rem; border-radius: 10px;
          background: var(--t-surface-3); border: 1px solid var(--t-accent-line);
          color: var(--t-fg); font-size: 0.9375rem; max-width: calc(100% - 2rem);
        }
        .ds__toast button { background: none; border: 0; color: var(--t-fg-subtle); cursor: pointer; }

        @media (max-width: 900px) {
          .ds__detailgrid { grid-template-columns: 1fr; }
          .ds__hero { aspect-ratio: 16/9; }
        }
        @media (max-width: 600px) {
          .ds__modalbody { padding: var(--t-gap); }
          .ds__topbar { flex-direction: column; }
          .ds__quote { text-align: left; }
          .ds__modalfoot { flex-direction: column-reverse; }
        }
      `}</style>
    </main>
  );
};

export default DesignerShowcase;
