import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './tour-theme.css';

/**
 * 여행설계사 포털 로그인 / 제휴 신청 / 승인 대기.
 *
 * 2026-09-02 리디자인: 화면만 바꿨고 인증 로직은 한 줄도 건드리지 않았다.
 * 예전에는 index.css 의 구 언어(.login-card-elite / .glass-card / .btn-login-elite)를
 * 썼다. 시안 그라데이션 버튼과 글로우가 남아 있어 나머지 고객 화면과 톤이 끊겼다.
 * 지금은 .t-field / .t-btn / .t-error 같은 tour-theme.css 유틸을 그대로 쓴다.
 *
 * 주의: 여기 자격증명 비교는 목업이다. 클라이언트에서 하는 비교라 보안 장치가 아니다.
 * 실제 인증은 서버에서 검증해야 한다.
 */
const Login = ({ onBack, onLoginSuccess, onDesignerSignup, pendingRequests = [], activeDesigners = [] }) => {
  const location = useLocation();
  const [viewMode, setViewMode] = useState(location.state?.initialView || 'login'); // 'login', 'signup', 'waiting'
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [signupData, setSignupData] = useState({ name: '', email: '', region: '', bio: '' });
  const [loginError, setLoginError] = useState('');
  const [signupError, setSignupError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    const inputId = id.trim();

    // 1. 승인 대기 목록을 먼저 체크 (가장 높은 우선순위, TypeError 방지를 위해 안전한 옵셔널 체이닝 적용)
    const isPending = pendingRequests.find(req =>
      req.email?.toLowerCase() === inputId.toLowerCase() ||
      req.name?.toLowerCase() === inputId.toLowerCase()
    );

    if (isPending) {
      setViewMode('waiting');
      return;
    }

    // 2. 관리자 계정 (목업 단계 전용: admin / admin)
    //    주의: 클라이언트에서 비교하는 목업 자격증명이다. 실제 인증은 서버에서 검증해야 한다.
    if (inputId.toLowerCase() === 'admin') {
      if (pw !== 'admin') {
        setLoginError('관리자 비밀번호가 올바르지 않습니다.');
        return;
      }
      onLoginSuccess('admin', '관리자');
      return;
    }

    // 3. 이미 승인된 활성 설계사 목록 체크 (TypeError 방지를 위해 안전한 옵셔널 체이닝 적용)
    const isActive = activeDesigners.find(d =>
      d.name?.toLowerCase() === inputId.toLowerCase()
    );

    if (isActive || inputId === 'demo') {
      const finalName = isActive ? isActive.name : (inputId === 'demo' ? '데모설계사' : inputId);
      // 로그인 성공 시 'designer' 역할로 세션 성공 전달
      onLoginSuccess('designer', finalName);
    } else {
      setLoginError('등록되지 않은 계정이거나 승인 대기 중입니다. 가입 정보를 확인해 주세요. (테스트 ID: demo / admin)');
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (!signupData.name || !signupData.email || !signupData.region) {
      // 예전에는 alert() 를 띄웠다. 브라우저 모달이라 화면 밖으로 튀고 스크린리더 흐름도 끊긴다.
      // 폼 안에 인라인으로 표시한다.
      setSignupError('성함, 이메일, 주요 전문 지역은 필수입니다.');
      return;
    }
    setSignupError('');
    onDesignerSignup(signupData);
    setViewMode('waiting');
  };

  const updateSignup = (key) => (e) => {
    setSignupData((prev) => ({ ...prev, [key]: e.target.value }));
    setSignupError('');
  };

  const shell = (children) => (
    <div className="tour-surface t-auth">
      <div className="t-auth__inner">
        {/* onBack 이 이미 navigate('/gijotour') 를 한다. Link 로 감싸면 같은 곳으로 두 번 간다. */}
        <button type="button" className="t-auth__back" onClick={onBack}>
          지아이조 투어 홈으로
        </button>
        <div className="t-auth__card">{children}</div>
      </div>
      <AuthStyles />
    </div>
  );

  if (viewMode === 'waiting') {
    return shell(
      <>
        <header className="t-auth__head">
          <h1 className="t-auth__title">가입 승인 대기 중</h1>
          <p className="t-auth__sub">
            {signupData.name || id} 여행설계사님, 반갑습니다. 관리자가 가입 정보를
            검토하고 있습니다. 승인이 끝나면 등록하신 이메일로 안내해 드립니다.
          </p>
        </header>

        {/* 진행 단계. 현재 단계만 강조하고 나머지는 중성으로 둔다. */}
        <ol className="t-auth__steps">
          <li className="is-done">신청 완료</li>
          <li className="is-current">정보 검토</li>
          <li>최종 승인</li>
        </ol>

        <button type="button" className="t-btn t-btn--primary t-auth__full" onClick={onBack}>
          홈으로 돌아가기
        </button>
      </>
    );
  }

  if (viewMode === 'signup') {
    return shell(
      <>
        <header className="t-auth__head">
          <h1 className="t-auth__title">여행설계사 제휴 신청</h1>
          <p className="t-auth__sub">
            검증 절차를 거쳐 승인되면 제안서를 등록하고 고객 매칭을 받을 수 있습니다.
          </p>
        </header>

        <form onSubmit={handleSignupSubmit} noValidate>
          <div className="t-field">
            <label htmlFor="signup-name">성함 (실명)<span className="t-req">*</span></label>
            <input id="signup-name" type="text" placeholder="예: 김민서"
                   value={signupData.name} onChange={updateSignup('name')} />
          </div>
          <div className="t-field">
            <label htmlFor="signup-email">이메일 주소 (로그인 ID)<span className="t-req">*</span></label>
            <input id="signup-email" type="email" placeholder="example@mail.com"
                   value={signupData.email} onChange={updateSignup('email')} />
          </div>
          <div className="t-field">
            <label htmlFor="signup-region">주요 전문 지역<span className="t-req">*</span></label>
            <input id="signup-region" type="text" placeholder="베트남 다낭, 필리핀 세부"
                   value={signupData.region} onChange={updateSignup('region')} />
          </div>
          <div className="t-field">
            <label htmlFor="signup-bio">경력 및 자기소개</label>
            <textarea id="signup-bio" rows="3" placeholder="현지 송출 실적과 전문 분야를 적어 주세요."
                      value={signupData.bio} onChange={updateSignup('bio')} />
          </div>

          {signupError && <p className="t-error" role="alert">{signupError}</p>}

          <button type="submit" className="t-btn t-btn--primary t-auth__full">가입 신청하기</button>
        </form>

        <div className="t-auth__foot">
          <span>이미 계정이 있으신가요?</span>
          <button type="button" className="t-btn t-btn--quiet"
                  onClick={() => { setSignupError(''); setViewMode('login'); }}>
            로그인
          </button>
        </div>
      </>
    );
  }

  return shell(
    <>
      <header className="t-auth__head">
        <h1 className="t-auth__title">여행설계사 포털 로그인</h1>
        <p className="t-auth__sub">승인된 파트너 계정으로 접속하세요.</p>
      </header>

      <form onSubmit={handleLogin} noValidate>
        <div className="t-field">
          <label htmlFor="login-id">아이디 또는 이메일</label>
          <input
            id="login-id"
            type="text"
            autoComplete="username"
            placeholder="이름 또는 이메일 (테스트 ID: demo / admin)"
            value={id}
            onChange={(e) => { setId(e.target.value); setLoginError(''); }}
            aria-invalid={loginError ? true : undefined}
            aria-describedby={loginError ? 'login-error' : undefined}
          />
        </div>
        <div className="t-field">
          <label htmlFor="login-pw">비밀번호</label>
          <input
            id="login-pw"
            type="password"
            autoComplete="current-password"
            placeholder="비밀번호"
            value={pw}
            onChange={(e) => { setPw(e.target.value); setLoginError(''); }}
            aria-invalid={loginError ? true : undefined}
          />
        </div>

        {loginError && <p id="login-error" className="t-error" role="alert">{loginError}</p>}

        <button type="submit" className="t-btn t-btn--primary t-auth__full">로그인</button>
      </form>

      <div className="t-auth__foot">
        <span>아직 파트너가 아니신가요?</span>
        <button type="button" className="t-btn t-btn--quiet"
                onClick={() => { setLoginError(''); setViewMode('signup'); }}>
          여행설계사 제휴 신청
        </button>
      </div>
    </>
  );
};

/** 세 화면(로그인·가입·대기)이 같은 껍데기를 쓰므로 스타일도 한 벌만 둔다. */
/** 세 화면(로그인·가입·대기)이 같은 껍데기를 쓰므로 스타일도 한 벌만 둔다.
 *
 *  셀렉터에 .tour-surface 를 붙이는 이유:
 *  tour-theme.css 에 `.tour-surface h1 { font-size: var(--t-display) }` 이 있고
 *  이건 (0,1,1) 이라 클래스 하나짜리 `.t-auth__title` (0,1,0) 을 이긴다.
 *  스코프를 붙이지 않으면 카드 제목이 52px 로 나와 두 줄로 접힌다. */
const AuthStyles = () => (
  <style>{`
    .tour-surface.t-auth {
      min-height: 100dvh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 6rem 1.5rem 4rem;
      word-break: keep-all;
      overflow-wrap: anywhere;
    }
    .tour-surface .t-auth__inner {
      width: min(460px, 100%);
    }
    .tour-surface .t-auth__back {
      display: inline-block;
      margin-bottom: 1.25rem;
      background: none;
      border: 0;
      padding: 0;
      cursor: pointer;
      font: inherit;
      color: var(--t-fg-subtle);
      font-size: var(--t-small);
      transition: color 0.2s;
    }
    .tour-surface .t-auth__back:hover { color: var(--t-fg); }

    .tour-surface .t-auth__card {
      border: 1px solid var(--t-line);
      border-radius: var(--t-radius);
      background: var(--t-surface-1);
      padding: 2.5rem;
    }
    .tour-surface .t-auth__head { margin-bottom: 1.75rem; }
    .tour-surface .t-auth__title {
      margin: 0 0 0.5rem;
      font-size: 1.5rem;
      font-weight: 700;
      letter-spacing: -0.02em;
      line-height: 1.35;
    }
    .tour-surface .t-auth__sub {
      margin: 0;
      color: var(--t-fg-subtle);
      font-size: var(--t-small);
      line-height: 1.65;
    }

    /* .t-field 는 내부 간격만 정의한다. 필드 사이 간격은 폼이 준다. */
    .tour-surface .t-auth__card form {
      display: grid;
      gap: 1.125rem;
    }
    .tour-surface .t-auth__full {
      width: 100%;
      margin-top: 0.25rem;
    }

    .tour-surface .t-auth__foot {
      margin-top: 1.75rem;
      padding-top: 1.5rem;
      border-top: 1px solid var(--t-line);
      display: grid;
      gap: 0.75rem;
      justify-items: stretch;
      text-align: center;
      color: var(--t-fg-subtle);
      font-size: var(--t-small);
    }

    /* ── 승인 대기 단계 ── */
    .tour-surface .t-auth__steps {
      list-style: none;
      margin: 0 0 1.75rem;
      padding: 0;
      display: grid;
      gap: 1px;
      background: var(--t-line);
      border: 1px solid var(--t-line);
      border-radius: var(--t-radius-sm);
      overflow: hidden;
    }
    .tour-surface .t-auth__steps li {
      background: var(--t-surface-2);
      padding: 0.75rem 1rem;
      font-size: var(--t-small);
      color: var(--t-fg-subtle);
    }
    .tour-surface .t-auth__steps .is-done { color: var(--t-fg-muted); }
    .tour-surface .t-auth__steps .is-current {
      color: var(--t-fg);
      font-weight: 600;
      box-shadow: inset 2px 0 0 var(--t-accent);
    }

    @media (max-width: 520px) {
      .tour-surface.t-auth { padding: 5rem 1rem 3rem; }
      .tour-surface .t-auth__card { padding: 1.75rem 1.25rem; }
    }
  `}</style>
);

export default Login;
