import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Login = ({ onBack, onLoginSuccess, onDesignerSignup, pendingRequests = [], activeDesigners = [] }) => {
  const location = useLocation();
  const [viewMode, setViewMode] = useState(location.state?.initialView || 'login'); // 'login', 'signup', 'waiting'
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [signupData, setSignupData] = useState({ name: '', email: '', region: '', bio: '' });
  const [loginError, setLoginError] = useState('');

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
      return alert('필수 정보를 모두 입력해 주세요.');
    }
    onDesignerSignup(signupData);
    setViewMode('waiting');
  };

  if (viewMode === 'waiting') {
    return (
      <div className="login-screen-wrapper">
        <div className="login-cinema-container animate-up">
          <div className="login-card-elite glass-card centered" style={{ padding: '4rem', textAlign: 'center' }}>
            <div className="waiting-icon animate-pulse">⏳</div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>가입 승인 대기 중</h2>
            <p style={{ opacity: 0.7, lineHeight: 1.8, marginBottom: '2.5rem' }}>
              {signupData.name || id} 여행설계사님, 반갑습니다!<br />
              현재 관리자가 가입 정보를 검토하고 있습니다.<br />
              승인이 완료되면 등록하신 이메일로 안내해 드리겠습니다.
            </p>
            <div className="waiting-steps">
              <div className="step active">신청 완료</div>
              <div className="step-line"></div>
              <div className="step">정보 검토</div>
              <div className="step-line"></div>
              <div className="step">최종 승인</div>
            </div>
            <button className="btn-primary" style={{ marginTop: '3rem', width: '100%' }} onClick={onBack}>홈으로 돌아가기</button>
          </div>
        </div>
        <div className="cinema-overlay"></div>
        <style>{`
          .waiting-icon { font-size: 5rem; margin-bottom: 2rem; }
          .waiting-steps { display: flex; align-items: center; justify-content: center; gap: 1rem; margin-top: 2rem; }
          .step { font-size: 0.8rem; padding: 8px 16px; border-radius: 20px; background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.3); }
          .step.active { background: var(--accent-color); color: white; font-weight: 700; box-shadow: 0 0 15px var(--accent-glow); }
          .step-line { width: 30px; height: 1px; background: rgba(255,255,255,0.1); }
        `}</style>
      </div>
    );
  }

  return (
    <div className="login-screen-wrapper">
      <button className="btn-back-home" onClick={onBack}>
        <span>←</span> BACK TO MAIN
      </button>

      <div className="login-cinema-container animate-up">
        <div className="login-card-elite glass-card">
          {viewMode === 'login' ? (
            <>
              <div className="login-header-elite">
                <div className="elite-badge">GIJO PARTNER ACCESS</div>
                <h2>여행설계사 포털 로그인</h2>
                <p>보안 인증을 통해 여행설계사 계정으로 접속하세요.</p>
              </div>

              <form className="login-form-elite" onSubmit={handleLogin}>
                <div className="elite-input-group">
                  <label>ID / EMAIL</label>
                  <input
                    type="text"
                    placeholder="이름 또는 이메일 (테스트 ID: demo / admin)"
                    value={id}
                    onChange={(e) => { setId(e.target.value); setLoginError(''); }}
                    aria-invalid={loginError ? true : undefined}
                    aria-describedby={loginError ? 'login-error' : undefined}
                    required
                  />
                </div>
                <div className="elite-input-group">
                  <label>PASSWORD</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={pw}
                    onChange={(e) => { setPw(e.target.value); setLoginError(''); }}
                    aria-invalid={loginError ? true : undefined}
                    required
                  />
                </div>
                {loginError && (
                  <p
                    id="login-error"
                    role="alert"
                    style={{ margin: '0 0 1rem', color: '#ff6b81', fontSize: '0.9rem', lineHeight: 1.6 }}
                  >
                    {loginError}
                  </p>
                )}
                <button type="submit" className="btn-login-elite">SECURE LOGIN</button>
              </form>

              <div className="login-footer-elite" style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <p>아직 파트너가 아니신가요?</p>
                <button className="btn-apply-designer" onClick={() => setViewMode('signup')}>여행설계사 제휴 신청</button>
              </div>
            </>
          ) : (
            <>
              <div className="login-header-elite">
                <div className="elite-badge">PARTNERSHIP</div>
                <h2>여행설계사 회원가입</h2>
                <p>GIJO Tour LaB의 프리미엄 설계사로 등록하여 비즈니스를 시작하세요.</p>
              </div>

              <form className="login-form-elite" onSubmit={handleSignupSubmit}>
                <div className="elite-input-group">
                  <label>성함 (실명)</label>
                  <input type="text" placeholder="홍길동" value={signupData.name} onChange={(e) => setSignupData({...signupData, name: e.target.value})} required />
                </div>
                <div className="elite-input-group">
                  <label>이메일 주소 (ID로 사용)</label>
                  <input type="email" placeholder="example@mail.com" value={signupData.email} onChange={(e) => setSignupData({...signupData, email: e.target.value})} required />
                </div>
                <div className="elite-input-group">
                  <label>주요 전문 지역</label>
                  <input type="text" placeholder="베트남 다낭, 필리핀 등" value={signupData.region} onChange={(e) => setSignupData({...signupData, region: e.target.value})} required />
                </div>
                <div className="elite-input-group">
                  <label>경력 및 자기소개</label>
                  <textarea rows="3" placeholder="간단한 이력을 입력해 주세요." value={signupData.bio} onChange={(e) => setSignupData({...signupData, bio: e.target.value})} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '1rem', color: 'white' }}></textarea>
                </div>
                <button type="submit" className="btn-login-elite">가입 신청하기</button>
                <button type="button" className="btn-link" style={{ marginTop: '1rem', width: '100%' }} onClick={() => setViewMode('login')}>이미 계정이 있으신가요? 로그인</button>
              </form>
            </>
          )}
        </div>
      </div>
      <div className="cinema-overlay"></div>
    </div>
  );
};

export default Login;
