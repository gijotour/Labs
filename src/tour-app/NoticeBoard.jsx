import { useState, useEffect } from 'react';
import './tour-theme.css';

const CATEGORIES = [
  { value: 'NOTICE', label: '공지사항' },
  { value: 'NEWS', label: '뉴스' },
  { value: 'UPDATE', label: '업데이트' }
];

const emptyForm = { category: 'NOTICE', title: '', content: '', image: null };

const NoticeBoard = ({
  notices,
  isLoggedIn,
  userName,
  onAddNotice,
  onDeleteNotice,
  forceWrite,
  filterUserName,
  onClearFilter
}) => {
  const [isWriting, setIsWriting] = useState(Boolean(forceWrite));
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [formError, setFormError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  useEffect(() => {
    if (!selectedNotice) return;
    const onKey = (e) => e.key === 'Escape' && setSelectedNotice(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedNotice]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setFormData((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      setFormError('제목과 내용을 모두 입력해 주세요.');
      return;
    }
    setFormError('');
    onAddNotice(formData);
    setFormData(emptyForm);
    setImagePreview(null);
    setIsWriting(false);
  };

  const closeWriter = () => {
    setIsWriting(false);
    setFormError('');
  };

  const displayNotices = filterUserName
    ? (notices || []).filter((n) => n.author === filterUserName)
    : (notices || []);

  const totalPages = Math.ceil(displayNotices.length / itemsPerPage);
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentNotices = displayNotices.slice(firstIndex, lastIndex);

  return (
    <main className="tour-surface nb">
      <div className="t-shell">
        <header className="nb__head">
          <span className="t-eyebrow">GT Information</span>
          <h1>이모저모</h1>
          <p className="t-lead">플랫폼 운영 소식 및 주요 여행 정보를 공유합니다.</p>
        </header>

        {filterUserName && (
          <div className="nb__filter" role="status">
            <span><strong>{filterUserName}</strong>님이 작성한 글만 보고 있습니다.</span>
            <button type="button" className="t-btn t-btn--secondary nb__filterbtn" onClick={onClearFilter}>
              전체 보기
            </button>
          </div>
        )}

        {isLoggedIn && !isWriting && (
          <div className="nb__toolbar">
            <button type="button" className="t-btn t-btn--primary" onClick={() => setIsWriting(true)}>
              새 소식 등록
            </button>
          </div>
        )}

        {isWriting && (
          <section className="t-card nb__writer">
            <div className="nb__writerhead">
              <h2>새로운 소식 작성</h2>
              <span className="nb__author">작성자 {userName}</span>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="nb__row">
                <div className="t-field nb__cat">
                  <label htmlFor="nb-cat">카테고리</label>
                  <select
                    id="nb-cat"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                </div>

                <div className="t-field nb__titlefield">
                  <label htmlFor="nb-title">제목 <span className="t-req" aria-hidden="true">*</span></label>
                  <input
                    id="nb-title"
                    type="text"
                    placeholder="제목을 입력하세요"
                    value={formData.title}
                    onChange={(e) => { setFormData({ ...formData, title: e.target.value }); setFormError(''); }}
                  />
                </div>
              </div>

              <div className="t-field">
                <label htmlFor="nb-content">상세 내용 <span className="t-req" aria-hidden="true">*</span></label>
                <textarea
                  id="nb-content"
                  rows={5}
                  placeholder="공유할 내용을 입력하세요"
                  value={formData.content}
                  onChange={(e) => { setFormData({ ...formData, content: e.target.value }); setFormError(''); }}
                />
              </div>

              <div className="t-field">
                <span className="nb__label">사진 첨부</span>
                <input type="file" accept="image/*" onChange={handleImageChange} id="nb-img" hidden />
                <label htmlFor="nb-img" className="nb__upload">이미지 선택</label>

                {imagePreview && (
                  <div className="nb__preview">
                    <img src={imagePreview} alt="첨부 이미지 미리보기" />
                    <button
                      type="button"
                      onClick={() => { setImagePreview(null); setFormData({ ...formData, image: null }); }}
                      aria-label="첨부 이미지 제거"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>

              {formError && <p className="t-error" role="alert">{formError}</p>}

              <div className="nb__writerfoot">
                <button type="button" className="t-btn t-btn--secondary" onClick={closeWriter}>취소</button>
                <button type="submit" className="t-btn t-btn--primary">등록하기</button>
              </div>
            </form>
          </section>
        )}

        {currentNotices.length > 0 ? (
          <div className="nb__tablewrap">
            <table className="nb__table">
              <thead>
                <tr>
                  <th scope="col" className="nb__c-num">번호</th>
                  <th scope="col" className="nb__c-cat">구분</th>
                  <th scope="col">제목</th>
                  <th scope="col" className="nb__c-author">작성자</th>
                  <th scope="col" className="nb__c-date">날짜</th>
                  {isLoggedIn && <th scope="col" className="nb__c-act">관리</th>}
                </tr>
              </thead>
              <tbody>
                {currentNotices.map((notice, index) => (
                  <tr key={notice.id ?? index}>
                    <td data-label="번호" className="nb__num">
                      {displayNotices.length - (firstIndex + index)}
                    </td>
                    <td data-label="구분">
                      <span className={`nb__cat-badge nb__cat-badge--${(notice.category || 'NOTICE').toLowerCase()}`}>
                        {notice.category || 'NOTICE'}
                      </span>
                    </td>
                    <td data-label="제목">
                      <button type="button" className="nb__titlebtn" onClick={() => setSelectedNotice(notice)}>
                        {notice.title}
                      </button>
                    </td>
                    <td data-label="작성자">{notice.author || '운영팀'}</td>
                    <td data-label="날짜" className="nb__num">{notice.date || '—'}</td>
                    {isLoggedIn && (
                      <td data-label="관리">
                        {notice.author === userName && (
                          <button
                            type="button"
                            className="nb__del"
                            onClick={() => onDeleteNotice(notice.id)}
                          >
                            삭제
                          </button>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="nb__empty">등록된 소식이 없습니다.</p>
        )}

        {totalPages > 1 && (
          <nav className="nb__pager" aria-label="페이지">
            <button
              type="button"
              className="nb__page"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              이전
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                type="button"
                className={`nb__page ${currentPage === i + 1 ? 'is-active' : ''}`}
                aria-current={currentPage === i + 1 ? 'page' : undefined}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              type="button"
              className="nb__page"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              다음
            </button>
          </nav>
        )}
      </div>

      {/* ── 상세 ── */}
      {selectedNotice && (
        <div className="nb__overlay" onClick={() => setSelectedNotice(null)}>
          <div
            className="nb__modal"
            role="dialog"
            aria-modal="true"
            aria-label={selectedNotice.title}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="nb__close"
              onClick={() => setSelectedNotice(null)}
              aria-label="닫기"
            >
              ✕
            </button>

            <div className="nb__modalhead">
              <span className={`nb__cat-badge nb__cat-badge--${(selectedNotice.category || 'NOTICE').toLowerCase()}`}>
                {selectedNotice.category || 'NOTICE'}
              </span>
              <h2>{selectedNotice.title}</h2>
              <p className="nb__modalmeta">
                {selectedNotice.author || '운영팀'} · {selectedNotice.date || '—'}
              </p>
            </div>

            <div className="nb__modalbody">
              {selectedNotice.image && (
                <img src={selectedNotice.image} alt="" className="nb__modalimg" loading="lazy" decoding="async" />
              )}
              {(selectedNotice.content ?? '').split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>
        </div>
      )}

      <style>{`
        .nb { padding: 3rem 0 var(--t-section); }
        .nb__head { margin-bottom: var(--t-gap-lg); }
        .nb__head h1 { font-size: 2.25rem; margin: 0 0 var(--t-gap-sm); }

        .nb__filter {
          display: flex; align-items: center; justify-content: space-between;
          gap: var(--t-gap); flex-wrap: wrap;
          padding: 0.875rem 1rem;
          margin-bottom: var(--t-gap);
          border: 1px solid var(--t-accent-line);
          border-radius: var(--t-radius-sm);
          background: var(--t-accent-weak);
          font-size: var(--t-small);
          color: var(--t-fg-muted);
        }
        .nb__filter strong { color: var(--t-accent); }
        .nb__filterbtn { padding: 0.4375rem 0.75rem; font-size: 0.8125rem; }

        .nb__toolbar { display: flex; justify-content: flex-end; margin-bottom: var(--t-gap); }

        /* ── 작성 폼 ── */
        .nb__writer { margin-bottom: var(--t-gap-lg); }
        .nb__writerhead {
          display: flex; align-items: center; justify-content: space-between;
          gap: 1rem; flex-wrap: wrap; margin-bottom: var(--t-gap);
        }
        .nb__writerhead h2 { font-size: 1.125rem; margin: 0; }
        .nb__author { font-size: var(--t-small); color: var(--t-fg-subtle); }
        .nb__writer form { display: grid; gap: var(--t-gap); }
        .nb__row { display: grid; grid-template-columns: 180px 1fr; gap: var(--t-gap-sm); }
        .nb__label { font-size: var(--t-small); font-weight: 650; color: var(--t-fg); }

        .nb__writer select,
        .nb__writer textarea {
          width: 100%;
          padding: 0.8125rem 0.875rem;
          border-radius: var(--t-radius-sm);
          border: 1px solid var(--t-line);
          background: var(--t-surface-2);
          color: var(--t-fg);
          font: inherit;
          font-size: var(--t-body);
        }
        .nb__writer textarea { resize: vertical; }
        .nb__writer textarea::placeholder { color: var(--t-fg-subtle); }

        .nb__upload {
          display: inline-flex; align-items: center;
          padding: 0.5625rem 0.875rem;
          border: 1px dashed var(--t-line-strong);
          border-radius: var(--t-radius-sm);
          color: var(--t-fg-muted);
          font-size: var(--t-small); font-weight: 600;
          cursor: pointer; width: fit-content;
        }
        .nb__upload:hover { border-color: var(--t-accent-line); color: var(--t-accent); }
        .nb__preview { position: relative; width: fit-content; margin-top: 0.75rem; }
        .nb__preview img {
          max-width: 220px; border-radius: var(--t-radius-sm);
          border: 1px solid var(--t-line); display: block;
        }
        .nb__preview button {
          position: absolute; top: -8px; right: -8px;
          width: 24px; height: 24px; border-radius: 50%;
          border: 1px solid var(--t-line-strong);
          background: var(--t-surface-3); color: var(--t-fg);
          cursor: pointer; font-size: 0.75rem;
        }
        .nb__writerfoot { display: flex; justify-content: flex-end; gap: 0.5rem; }

        /* ── 표 ── */
        .nb__tablewrap {
          border: 1px solid var(--t-line);
          border-radius: var(--t-radius);
          background: var(--t-surface-1);
          overflow-x: auto;
        }
        .nb__table { width: 100%; border-collapse: collapse; text-align: left; font-size: 0.9375rem; }
        .nb__table th {
          padding: 0.75rem 1rem;
          background: var(--t-surface-2);
          border-bottom: 1px solid var(--t-line);
          font-size: 0.75rem; font-weight: 700;
          letter-spacing: 0.06em; text-transform: uppercase;
          color: var(--t-fg-subtle); white-space: nowrap;
        }
        .nb__table td {
          padding: 0.875rem 1rem;
          border-bottom: 1px solid var(--t-line);
          color: var(--t-fg-muted); vertical-align: middle;
        }
        .nb__table tbody tr:last-child td { border-bottom: 0; }
        .nb__table tbody tr:hover td { background: rgba(255,255,255,0.02); }
        .nb__c-num { width: 72px; }
        .nb__c-cat { width: 116px; }
        .nb__c-author, .nb__c-date { width: 120px; }
        .nb__c-act { width: 80px; }
        .nb__num { font-variant-numeric: tabular-nums; white-space: nowrap; }

        .nb__titlebtn {
          background: none; border: 0; padding: 0;
          font: inherit; font-weight: 600;
          color: var(--t-fg); text-align: left; cursor: pointer;
        }
        .nb__titlebtn:hover { color: var(--t-accent); text-decoration: underline; text-underline-offset: 3px; }

        .nb__cat-badge {
          display: inline-block;
          padding: 0.1875rem 0.5rem;
          border-radius: 4px;
          border: 1px solid var(--t-line-strong);
          font-size: 0.6875rem; font-weight: 700; letter-spacing: 0.04em;
          color: var(--t-fg-subtle);
        }
        .nb__cat-badge--notice { color: var(--t-accent); border-color: var(--t-accent-line); background: var(--t-accent-weak); }
        .nb__cat-badge--news { color: #e0b877; border-color: rgba(224,184,119,.3); background: rgba(224,184,119,.1); }
        .nb__cat-badge--update { color: #b6c2d2; }

        .nb__del {
          padding: 0.3125rem 0.625rem;
          border-radius: 6px;
          border: 1px solid var(--t-line-strong);
          background: transparent; color: var(--t-fg-subtle);
          font: inherit; font-size: 0.75rem; font-weight: 600; cursor: pointer;
        }
        .nb__del:hover { border-color: var(--t-danger); color: var(--t-danger); }

        .nb__empty { text-align: center; padding: 4rem 0; color: var(--t-fg-subtle); }

        /* ── 페이지네이션 ── */
        .nb__pager { display: flex; justify-content: center; gap: 0.25rem; margin-top: var(--t-gap-lg); flex-wrap: wrap; }
        .nb__page {
          min-width: 36px; padding: 0.4375rem 0.625rem;
          border-radius: 8px;
          border: 1px solid var(--t-line);
          background: transparent; color: var(--t-fg-muted);
          font: inherit; font-size: 0.875rem; cursor: pointer;
        }
        .nb__page:hover:not(:disabled) { border-color: var(--t-accent-line); color: var(--t-accent); }
        .nb__page.is-active { background: var(--t-accent); border-color: var(--t-accent); color: var(--t-accent-ink); font-weight: 650; }
        .nb__page:disabled { opacity: 0.4; cursor: not-allowed; }

        /* ── 상세 모달 ── */
        .nb__overlay {
          position: fixed; inset: 0; z-index: 1100;
          background: rgba(4, 7, 12, 0.82);
          display: grid; place-items: center; padding: 1.5rem;
        }
        .nb__modal {
          position: relative;
          width: min(680px, 100%); max-height: 88vh;
          display: flex; flex-direction: column;
          border: 1px solid var(--t-line);
          border-radius: var(--t-radius);
          background: var(--t-surface-1);
          overflow: hidden;
        }
        .nb__close {
          position: absolute; top: 0.75rem; right: 0.75rem;
          width: 32px; height: 32px; border-radius: 50%;
          border: 1px solid var(--t-line-strong);
          background: transparent; color: var(--t-fg); cursor: pointer;
        }
        .nb__close:hover { border-color: var(--t-accent-line); color: var(--t-accent); }
        .nb__modalhead { padding: var(--t-gap-lg); border-bottom: 1px solid var(--t-line); }
        .nb__modalhead h2 { font-size: 1.375rem; margin: 0.625rem 2rem 0.5rem 0; }
        .nb__modalmeta { margin: 0; font-size: var(--t-small); color: var(--t-fg-subtle); }
        .nb__modalbody { padding: var(--t-gap-lg); overflow-y: auto; }
        .nb__modalbody p { margin: 0 0 0.75rem; }
        .nb__modalbody p:last-child { margin-bottom: 0; }
        .nb__modalimg {
          width: 100%; border-radius: var(--t-radius-sm);
          border: 1px solid var(--t-line); margin-bottom: var(--t-gap);
        }

        @media (max-width: 700px) {
          .nb__row { grid-template-columns: 1fr; }
          .nb__tablewrap { border: 0; background: transparent; overflow-x: visible; }
          .nb__table thead { display: none; }
          .nb__table tbody tr {
            display: block;
            border: 1px solid var(--t-line);
            border-radius: var(--t-radius);
            background: var(--t-surface-1);
            padding: 0.5rem 1rem;
            margin-bottom: 0.75rem;
          }
          .nb__table td {
            display: flex; justify-content: space-between; align-items: center;
            gap: 1rem; padding: 0.5rem 0;
            border-bottom: 1px solid var(--t-line);
          }
          .nb__table tbody tr td:last-child { border-bottom: 0; }
          .nb__table td::before {
            content: attr(data-label);
            font-size: 0.75rem; font-weight: 700;
            color: var(--t-fg-subtle); flex-shrink: 0;
          }
          .nb__titlebtn { text-align: right; }
        }
      `}</style>
    </main>
  );
};

export default NoticeBoard;
