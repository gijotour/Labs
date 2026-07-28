import { useEffect, useState } from 'react';
import { railwayApi, isRailwayApiEnabled } from '../services/railwayApi';
import './tour-theme.css';

const emptyGuide = { name: '', region: '', role: '', phone: '', memo: '' };
const emptyUser = { name: '', type: 'Customer', contact: '', request: '' };

const GUIDE_STATUS = ['Active', 'Pending', 'Suspended'];
const USER_STATUS = ['Lead', 'Consulting', 'Booked', 'Active', 'Suspended'];

const TONE = {
  Active: 'ok',
  Booked: 'ok',
  Pending: 'wait',
  Lead: 'wait',
  Consulting: 'wait',
  Suspended: 'off'
};

const AdminGuideUserManager = () => {
  const apiEnabled = isRailwayApiEnabled();

  const [guides, setGuides] = useState([]);
  const [users, setUsers] = useState([]);
  const [guideForm, setGuideForm] = useState(emptyGuide);
  const [userForm, setUserForm] = useState(emptyUser);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(apiEnabled);

  useEffect(() => {
    if (!apiEnabled) return;

    let cancelled = false;
    Promise.all([railwayApi.getGuides(), railwayApi.getUsers()])
      .then(([g, u]) => {
        if (cancelled) return;
        setGuides(g);
        setUsers(u);
      })
      // 이전에는 실패가 unhandled rejection으로 사라져 화면이 빈 채로 남았다
      .catch((err) => !cancelled && setError(err?.message || '데이터를 불러오지 못했습니다.'))
      .finally(() => !cancelled && setLoading(false));

    return () => { cancelled = true; };
  }, [apiEnabled]);

  const run = async (fn) => {
    setError('');
    try {
      await fn();
    } catch (err) {
      setError(err?.message || '요청을 처리하지 못했습니다.');
    }
  };

  const addGuide = (e) => {
    e.preventDefault();
    if (!guideForm.name.trim()) return setError('가이드 이름을 입력해 주세요.');
    return run(async () => {
      const saved = await railwayApi.createGuide(guideForm);
      setGuides((prev) => [saved, ...prev]);
      setGuideForm(emptyGuide);
    });
  };

  const addUser = (e) => {
    e.preventDefault();
    if (!userForm.name.trim()) return setError('사용자 이름을 입력해 주세요.');
    return run(async () => {
      const saved = await railwayApi.createUser(userForm);
      setUsers((prev) => [saved, ...prev]);
      setUserForm(emptyUser);
    });
  };

  const cycleGuide = (g) => run(async () => {
    const next = GUIDE_STATUS[(GUIDE_STATUS.indexOf(g.status) + 1) % GUIDE_STATUS.length];
    const updated = await railwayApi.updateGuide(g.id, { status: next });
    setGuides((prev) => prev.map((x) => (x.id === g.id ? updated : x)));
  });

  const cycleUser = (u) => run(async () => {
    const next = USER_STATUS[(USER_STATUS.indexOf(u.status) + 1) % USER_STATUS.length];
    const updated = await railwayApi.updateUser(u.id, { status: next });
    setUsers((prev) => prev.map((x) => (x.id === u.id ? updated : x)));
  });

  const removeGuide = (id) => run(async () => {
    await railwayApi.deleteGuide(id);
    setGuides((prev) => prev.filter((g) => g.id !== id));
  });

  const removeUser = (id) => run(async () => {
    await railwayApi.deleteUser(id);
    setUsers((prev) => prev.filter((u) => u.id !== id));
  });

  const Pill = ({ status }) => (
    <span className={`a-pill a-pill--${TONE[status] ?? 'wait'}`}>{status ?? '—'}</span>
  );

  return (
    <div className="tour-surface g-shell">
      <div className="g-content">
        <header className="g-intro">
          <h1>가이드 · 사용자 관리</h1>
          <p>Railway 백엔드에 저장된 가이드와 고객 데이터를 관리합니다.</p>
        </header>

        {!apiEnabled && (
          <p className="g-notice" role="status">
            <strong>백엔드 API가 설정되지 않았습니다.</strong>{' '}
            <code>VITE_API_URL</code> 환경변수를 등록하면 데이터를 불러옵니다.
          </p>
        )}

        {error && <p className="g-notice g-notice--error" role="alert">{error}</p>}

        <section className="g-panel">
          <h2>가이드 {loading ? '' : `${guides.length}명`}</h2>

          <form className="g-form" onSubmit={addGuide}>
            <input
              placeholder="이름"
              value={guideForm.name}
              onChange={(e) => setGuideForm({ ...guideForm, name: e.target.value })}
              disabled={!apiEnabled}
              aria-label="가이드 이름"
            />
            <input
              placeholder="지역"
              value={guideForm.region}
              onChange={(e) => setGuideForm({ ...guideForm, region: e.target.value })}
              disabled={!apiEnabled}
              aria-label="가이드 지역"
            />
            <button type="submit" className="a-btn a-btn--primary" disabled={!apiEnabled}>추가</button>
          </form>

          <ul className="g-list">
            {loading && <li className="g-empty">불러오는 중…</li>}
            {!loading && guides.length === 0 && <li className="g-empty">등록된 가이드가 없습니다.</li>}
            {guides.map((g) => (
              <li key={g.id}>
                <span className="g-name">{g.name}</span>
                <span className="g-meta">{g.region || '지역 미지정'}</span>
                <Pill status={g.status} />
                <span className="g-actions">
                  <button type="button" className="a-btn" onClick={() => cycleGuide(g)}>상태 변경</button>
                  <button type="button" className="a-btn a-btn--danger" onClick={() => removeGuide(g.id)}>삭제</button>
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="g-panel">
          <h2>사용자 {loading ? '' : `${users.length}명`}</h2>

          <form className="g-form" onSubmit={addUser}>
            <input
              placeholder="이름"
              value={userForm.name}
              onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
              disabled={!apiEnabled}
              aria-label="사용자 이름"
            />
            <input
              placeholder="연락처"
              value={userForm.contact}
              onChange={(e) => setUserForm({ ...userForm, contact: e.target.value })}
              disabled={!apiEnabled}
              aria-label="사용자 연락처"
            />
            <button type="submit" className="a-btn a-btn--primary" disabled={!apiEnabled}>추가</button>
          </form>

          <ul className="g-list">
            {loading && <li className="g-empty">불러오는 중…</li>}
            {!loading && users.length === 0 && <li className="g-empty">등록된 사용자가 없습니다.</li>}
            {users.map((u) => (
              <li key={u.id}>
                <span className="g-name">{u.name}</span>
                <span className="g-meta">{u.contact || '연락처 없음'}</span>
                <Pill status={u.status} />
                <span className="g-actions">
                  <button type="button" className="a-btn" onClick={() => cycleUser(u)}>상태 변경</button>
                  <button type="button" className="a-btn a-btn--danger" onClick={() => removeUser(u.id)}>삭제</button>
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <style>{`
        .g-shell { min-height: 100vh; padding: 2.5rem 1.5rem; }
        .g-content { max-width: 900px; margin: 0 auto; }
        .g-intro { margin-bottom: 1.5rem; }
        .g-intro h1 { font-size: 1.75rem; margin-bottom: 0.375rem; }
        .g-intro p { font-size: 0.9375rem; margin: 0; }

        .g-notice {
          padding: 0.875rem 1rem;
          border-radius: var(--t-radius-sm);
          border: 1px solid var(--t-accent-line);
          background: var(--t-accent-weak);
          font-size: 0.9375rem !important;
          margin-bottom: 1.5rem !important;
        }
        .g-notice code {
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 0.875rem;
          color: var(--t-accent);
        }
        .g-notice--error {
          border-color: rgba(255,128,149,.4);
          background: rgba(255,128,149,.1);
          color: var(--t-danger) !important;
        }

        .g-panel { margin-bottom: 2.5rem; }
        .g-panel h2 { font-size: 1.125rem; margin-bottom: 0.875rem; }

        .g-form { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1rem; }
        .g-form input {
          flex: 1 1 180px;
          min-width: 0;
          padding: 0.625rem 0.75rem;
          border-radius: 8px;
          border: 1px solid var(--t-line);
          background: var(--t-surface-2);
          color: var(--t-fg);
          font: inherit;
          font-size: 0.9375rem;
        }
        .g-form input::placeholder { color: var(--t-fg-subtle); }
        .g-form input:disabled { opacity: 0.5; cursor: not-allowed; }

        .g-list { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.5rem; }
        .g-list li {
          display: flex;
          align-items: center;
          gap: 0.875rem;
          flex-wrap: wrap;
          padding: 0.875rem 1rem;
          border: 1px solid var(--t-line);
          border-radius: var(--t-radius-sm);
          background: var(--t-surface-1);
        }
        .g-name { font-weight: 650; color: var(--t-fg); }
        .g-meta { font-size: 0.875rem; color: var(--t-fg-subtle); }
        .g-actions { margin-left: auto; display: flex; gap: 0.375rem; }
        .g-empty {
          justify-content: center;
          color: var(--t-fg-subtle);
          font-size: 0.9375rem;
        }

        .a-pill {
          display: inline-block; padding: 0.1875rem 0.625rem; border-radius: 999px;
          font-size: 0.75rem; font-weight: 700; border: 1px solid; white-space: nowrap;
        }
        .a-pill--ok { color: var(--t-accent); border-color: var(--t-accent-line); background: var(--t-accent-weak); }
        .a-pill--wait { color: #e0b877; border-color: rgba(224,184,119,.3); background: rgba(224,184,119,.1); }
        .a-pill--off { color: var(--t-danger); border-color: rgba(255,128,149,.3); background: rgba(255,128,149,.1); }

        .a-btn {
          padding: 0.4375rem 0.75rem; border-radius: 8px;
          border: 1px solid var(--t-line-strong); background: transparent;
          color: var(--t-fg); font: inherit; font-size: 0.8125rem; font-weight: 600;
          cursor: pointer; white-space: nowrap;
          transition: border-color .15s ease, background .15s ease;
        }
        .a-btn:hover { border-color: var(--t-accent-line); background: var(--t-accent-weak); }
        .a-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .a-btn--primary { background: var(--t-accent); border-color: var(--t-accent); color: var(--t-accent-ink); }
        .a-btn--primary:hover:not(:disabled) { background: #5ee0ff; border-color: #5ee0ff; }
        .a-btn--danger:hover { border-color: var(--t-danger); background: rgba(255,128,149,.1); color: var(--t-danger); }

        @media (max-width: 600px) {
          .g-shell { padding: 1.5rem 1rem; }
          .g-actions { margin-left: 0; width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default AdminGuideUserManager;
