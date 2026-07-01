import React, { useState } from 'react';

const initialSettings = {
  siteName: 'GIJO LABS',
  currency: 'KRW',
  feeRate: '25',
  sessionTimeout: '30',
  ipWhitelist: '',
  twoFactor: true,
  paypal: true,
  kakaopay: false,
  toss: true,
  emailNotif: true,
  smsNotif: false,
  kakaoNotif: true,
  maintenanceMode: false,
  autoApprove: false
};

const initialLogs = [
  { id: 1, action: '설계사 승인', user: 'Admin', target: 'Emma Watson', time: '2026-06-27 14:30', type: 'success' },
  { id: 2, action: '결제 게이트웨이 연동', user: 'System', target: 'Toss Payments', time: '2026-06-27 12:00', type: 'info' },
  { id: 3, action: '설계사 계정 정지', user: 'Admin', target: 'David Park', time: '2026-06-26 16:45', type: 'warning' },
  { id: 4, action: '시스템 백업 완료', user: 'System', target: 'Database Full Backup', time: '2026-06-26 03:00', type: 'success' },
  { id: 5, action: '비정상 로그인 시도', user: 'System', target: 'IP: 192.168.x.x', time: '2026-06-25 22:15', type: 'danger' },
  { id: 6, action: '수수료율 변경', user: 'Admin', target: '20% → 25%', time: '2026-06-25 10:30', type: 'info' },
  { id: 7, action: '신규 제안서 등록', user: 'Alex Kim', target: '방콕 루프탑 3박4일', time: '2026-06-24 15:20', type: 'success' },
  { id: 8, action: 'SSL 인증서 갱신', user: 'System', target: 'gijotour.com', time: '2026-06-24 01:00', type: 'info' }
];

const AdminSettings = () => {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('gijo_admin_settings');
    return saved ? JSON.parse(saved) : initialSettings;
  });
  const [saved, setSaved] = useState(false);
  const [logs] = useState(initialLogs);

  const update = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const saveSettings = () => {
    localStorage.setItem('gijo_admin_settings', JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const resetSettings = () => {
    if (window.confirm('모든 설정을 초기값으로 되돌리시겠습니까?')) {
      setSettings(initialSettings);
      localStorage.removeItem('gijo_admin_settings');
      setSaved(false);
    }
  };

  const logTypeColors = {
    success: '#4CAF50', info: '#00d2ff', warning: '#d6b36a', danger: '#ff5252'
  };
  const logTypeIcons = {
    success: '✅', info: 'ℹ️', warning: '⚠️', danger: '🚨'
  };

  return (
    <>
      {/* 저장 상태 알림 */}
      {saved && (
        <div style={savedBannerStyle}>
          ✅ 설정이 성공적으로 저장되었습니다.
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* 플랫폼 기본 설정 */}
        <div className="glass-card" style={sectionStyle}>
          <h3 style={sectionTitleStyle}>🏢 플랫폼 기본 설정</h3>
          <div style={fieldGroupStyle}>
            <label style={labelStyle}>사이트명</label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => update('siteName', e.target.value)}
              style={inputStyle}
            />
          </div>
          <div style={fieldGroupStyle}>
            <label style={labelStyle}>기본 통화</label>
            <select value={settings.currency} onChange={(e) => update('currency', e.target.value)} style={inputStyle}>
              <option value="KRW">🇰🇷 KRW (원)</option>
              <option value="USD">🇺🇸 USD (달러)</option>
              <option value="JPY">🇯🇵 JPY (엔)</option>
            </select>
          </div>
          <div style={fieldGroupStyle}>
            <label style={labelStyle}>플랫폼 수수료율 (%)</label>
            <input
              type="number"
              min="0"
              max="50"
              value={settings.feeRate}
              onChange={(e) => update('feeRate', e.target.value)}
              style={inputStyle}
            />
          </div>
          <div style={fieldGroupStyle}>
            <ToggleSwitch
              label="유지보수 모드"
              desc="활성화 시 일반 사용자 접근이 차단됩니다"
              checked={settings.maintenanceMode}
              onChange={(v) => update('maintenanceMode', v)}
              accent="#ff5252"
            />
          </div>
          <div style={fieldGroupStyle}>
            <ToggleSwitch
              label="자동 설계사 승인"
              desc="신규 설계사 가입 시 자동 승인"
              checked={settings.autoApprove}
              onChange={(v) => update('autoApprove', v)}
            />
          </div>
        </div>

        {/* 결제 게이트웨이 */}
        <div className="glass-card" style={sectionStyle}>
          <h3 style={sectionTitleStyle}>💳 결제 게이트웨이 연동</h3>
          <GatewayCard
            name="PayPal"
            icon="🌐"
            desc="해외 결제 및 환불 처리"
            connected={settings.paypal}
            onToggle={(v) => update('paypal', v)}
          />
          <GatewayCard
            name="카카오페이"
            icon="💛"
            desc="국내 간편결제 연동"
            connected={settings.kakaopay}
            onToggle={(v) => update('kakaopay', v)}
          />
          <GatewayCard
            name="토스페이먼츠"
            icon="💙"
            desc="신용카드 / 계좌이체 결제"
            connected={settings.toss}
            onToggle={(v) => update('toss', v)}
          />
        </div>

        {/* 알림 설정 */}
        <div className="glass-card" style={sectionStyle}>
          <h3 style={sectionTitleStyle}>🔔 알림 설정</h3>
          <ToggleSwitch
            label="이메일 알림"
            desc="예약 확인, 결제 완료 등 이메일 발송"
            checked={settings.emailNotif}
            onChange={(v) => update('emailNotif', v)}
          />
          <div style={{ height: '12px' }}></div>
          <ToggleSwitch
            label="SMS 알림"
            desc="긴급 알림 및 인증 코드 발송"
            checked={settings.smsNotif}
            onChange={(v) => update('smsNotif', v)}
          />
          <div style={{ height: '12px' }}></div>
          <ToggleSwitch
            label="카카오톡 알림"
            desc="카카오 알림톡으로 예약 안내"
            checked={settings.kakaoNotif}
            onChange={(v) => update('kakaoNotif', v)}
          />
        </div>

        {/* 보안 설정 */}
        <div className="glass-card" style={sectionStyle}>
          <h3 style={sectionTitleStyle}>🔒 보안 설정</h3>
          <ToggleSwitch
            label="2단계 인증 (2FA)"
            desc="관리자 로그인 시 OTP 인증 필수"
            checked={settings.twoFactor}
            onChange={(v) => update('twoFactor', v)}
          />
          <div style={{ height: '12px' }}></div>
          <div style={fieldGroupStyle}>
            <label style={labelStyle}>세션 타임아웃 (분)</label>
            <input
              type="number"
              min="5"
              max="120"
              value={settings.sessionTimeout}
              onChange={(e) => update('sessionTimeout', e.target.value)}
              style={inputStyle}
            />
          </div>
          <div style={fieldGroupStyle}>
            <label style={labelStyle}>IP 화이트리스트</label>
            <input
              type="text"
              value={settings.ipWhitelist}
              onChange={(e) => update('ipWhitelist', e.target.value)}
              placeholder="192.168.1.0/24, 10.0.0.1"
              style={inputStyle}
            />
            <span style={{ fontSize: '0.75rem', opacity: 0.4, marginTop: '4px' }}>쉼표로 구분하여 입력 (빈 값 = 모든 IP 허용)</span>
          </div>
        </div>
      </div>

      {/* 저장/초기화 버튼 */}
      <div style={{ display: 'flex', gap: '12px', marginTop: '2rem', justifyContent: 'flex-end' }}>
        <button onClick={resetSettings} style={resetBtnStyle}>초기화</button>
        <button onClick={saveSettings} style={saveBtnStyle}>
          💾 설정 저장
        </button>
      </div>

      {/* 시스템 로그 */}
      <div className="glass-card" style={{ ...sectionStyle, marginTop: '2rem' }}>
        <h3 style={sectionTitleStyle}>📜 최근 시스템 활동 로그</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {logs.map((log) => (
            <div key={log.id} style={logRowStyle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                <span style={{ fontSize: '1.1rem' }}>{logTypeIcons[log.type]}</span>
                <div>
                  <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{log.action}</span>
                  <span style={{ fontSize: '0.8rem', opacity: 0.5, display: 'block' }}>
                    {log.user} → {log.target}
                  </span>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.8rem', opacity: 0.5 }}>{log.time}</span>
                <span style={{
                  display: 'block', fontSize: '0.7rem', fontWeight: 800, marginTop: '2px',
                  color: logTypeColors[log.type]
                }}>{log.type.toUpperCase()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .settings-grid-2col { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
};

// 토글 스위치 서브컴포넌트
const ToggleSwitch = ({ label, desc, checked, onChange, accent = '#00d2ff' }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
    <div>
      <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{label}</span>
      {desc && <span style={{ display: 'block', fontSize: '0.75rem', opacity: 0.4, marginTop: '2px' }}>{desc}</span>}
    </div>
    <button
      onClick={() => onChange(!checked)}
      style={{
        width: '50px', height: '28px', borderRadius: '999px', border: 0, cursor: 'pointer',
        background: checked ? accent : 'rgba(255,255,255,0.1)',
        position: 'relative', transition: 'all 0.3s ease', flexShrink: 0,
        boxShadow: checked ? `0 0 12px ${accent}44` : 'none'
      }}
    >
      <div style={{
        width: '22px', height: '22px', borderRadius: '50%', background: '#fff',
        position: 'absolute', top: '3px',
        left: checked ? '25px' : '3px',
        transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
      }}></div>
    </button>
  </div>
);

// 결제 게이트웨이 카드
const GatewayCard = ({ name, icon, desc, connected, onToggle }) => (
  <div style={{
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '16px', background: 'rgba(255,255,255,0.02)',
    border: `1px solid ${connected ? 'rgba(0, 210, 255, 0.2)' : 'rgba(255,255,255,0.06)'}`,
    borderRadius: '12px', marginBottom: '10px',
    transition: 'all 0.3s ease'
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <span style={{ fontSize: '1.5rem' }}>{icon}</span>
      <div>
        <span style={{ fontWeight: 800, fontSize: '0.95rem' }}>{name}</span>
        <span style={{ display: 'block', fontSize: '0.75rem', opacity: 0.5 }}>{desc}</span>
      </div>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <span style={{
        padding: '3px 8px', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 800,
        background: connected ? 'rgba(76, 175, 80, 0.15)' : 'rgba(255, 82, 82, 0.15)',
        color: connected ? '#4CAF50' : '#ff5252'
      }}>{connected ? 'CONNECTED' : 'DISCONNECTED'}</span>
      <button
        onClick={() => onToggle(!connected)}
        style={{
          width: '50px', height: '28px', borderRadius: '999px', border: 0, cursor: 'pointer',
          background: connected ? '#4CAF50' : 'rgba(255,255,255,0.1)',
          position: 'relative', transition: 'all 0.3s ease',
          boxShadow: connected ? '0 0 12px rgba(76, 175, 80, 0.3)' : 'none'
        }}
      >
        <div style={{
          width: '22px', height: '22px', borderRadius: '50%', background: '#fff',
          position: 'absolute', top: '3px',
          left: connected ? '25px' : '3px',
          transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
        }}></div>
      </button>
    </div>
  </div>
);

// Styles
const sectionStyle = {
  padding: '2rem', borderRadius: '16px',
  background: 'rgba(10, 17, 40, 0.7)',
  border: '1px solid rgba(255,255,255,0.08)'
};
const sectionTitleStyle = {
  fontSize: '1.1rem', fontWeight: 900, marginBottom: '1.5rem', color: '#fff'
};
const fieldGroupStyle = {
  marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '6px'
};
const labelStyle = {
  fontSize: '0.85rem', fontWeight: 700, color: '#b0c4de'
};
const inputStyle = {
  padding: '10px 14px', background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.12)', borderRadius: '10px',
  color: '#fff', fontSize: '0.9rem', outline: 'none', transition: 'border-color 0.3s ease'
};
const saveBtnStyle = {
  padding: '12px 28px', background: 'linear-gradient(90deg, #00d2ff 0%, #3a7bd5 100%)',
  border: 0, borderRadius: '12px', color: '#000', fontWeight: 800,
  cursor: 'pointer', fontSize: '0.95rem', transition: 'all 0.3s ease',
  boxShadow: '0 4px 20px rgba(0, 210, 255, 0.2)'
};
const resetBtnStyle = {
  padding: '12px 28px', background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px',
  color: '#b0c4de', fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem', transition: 'all 0.3s ease'
};
const savedBannerStyle = {
  padding: '14px 20px', background: 'rgba(76, 175, 80, 0.15)',
  border: '1px solid rgba(76, 175, 80, 0.3)', borderRadius: '12px',
  color: '#4CAF50', fontWeight: 700, marginBottom: '1.5rem',
  animation: 'fadeIn 0.3s ease', textAlign: 'center'
};
const logRowStyle = {
  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
  padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)',
  transition: 'background 0.2s ease'
};

export default AdminSettings;
