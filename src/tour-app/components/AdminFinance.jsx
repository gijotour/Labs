import React, { useState } from 'react';

const initialSettlements = [
  { id: 'SET-001', designer: 'Alex Kim', amount: 15120000, fee: 3780000, net: 11340000, status: '정산완료', date: '2026-06-25', period: '2026년 5월' },
  { id: 'SET-002', designer: 'GIJO AUTO', amount: 8960000, fee: 2240000, net: 6720000, status: '정산완료', date: '2026-06-25', period: '2026년 5월' },
  { id: 'SET-003', designer: 'David Park', amount: 12400000, fee: 3100000, net: 9300000, status: '대기', date: '-', period: '2026년 6월' },
  { id: 'SET-004', designer: 'Sofia Jung', amount: 6200000, fee: 1550000, net: 4650000, status: '대기', date: '-', period: '2026년 6월' },
  { id: 'SET-005', designer: 'Alex Kim', amount: 9800000, fee: 2450000, net: 7350000, status: '대기', date: '-', period: '2026년 6월' }
];

const AdminFinance = () => {
  const [settlements, setSettlements] = useState(initialSettlements);
  const [feeRate, setFeeRate] = useState(25);

  const totalIncome = settlements.reduce((s, item) => s + item.amount, 0);
  const totalFee = settlements.reduce((s, item) => s + item.fee, 0);
  const totalNet = settlements.reduce((s, item) => s + item.net, 0);
  const pending = settlements.filter(s => s.status === '대기');
  const completed = settlements.filter(s => s.status === '정산완료');
  const pendingAmount = pending.reduce((s, item) => s + item.net, 0);

  const financeStats = [
    { label: '총 거래액', value: `₩${(totalIncome / 10000).toLocaleString()}만`, icon: '💰', accent: '#00d2ff' },
    { label: '설계사 정산액', value: `₩${(totalNet / 10000).toLocaleString()}만`, icon: '👤', accent: '#4CAF50' },
    { label: '플랫폼 수수료', value: `₩${(totalFee / 10000).toLocaleString()}만`, icon: '🏢', accent: '#d6b36a' },
    { label: '미정산 잔액', value: `₩${(pendingAmount / 10000).toLocaleString()}만`, icon: '⏳', accent: '#ff5252' }
  ];

  const processSettlement = (id) => {
    setSettlements(prev => prev.map(s => {
      if (s.id === id && s.status === '대기') {
        return { ...s, status: '정산완료', date: new Date().toISOString().split('T')[0] };
      }
      return s;
    }));
  };

  const processAll = () => {
    setSettlements(prev => prev.map(s => {
      if (s.status === '대기') {
        return { ...s, status: '정산완료', date: new Date().toISOString().split('T')[0] };
      }
      return s;
    }));
  };

  return (
    <>
      {/* 재무 요약 */}
      <div className="elite-stats-grid">
        {financeStats.map((f, i) => (
          <div key={i} className="elite-stat-card glass-card">
            <span className="stat-label">{f.icon} {f.label}</span>
            <span className="stat-value" style={{ color: f.accent }}>{f.value}</span>
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: '60px', height: '60px', background: `radial-gradient(circle, ${f.accent}22 0%, transparent 70%)` }}></div>
          </div>
        ))}
      </div>

      {/* 수익 분배 시각화 */}
      <div className="glass-card" style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h3 style={titleStyle}>💹 수익 분배 구조</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '0.85rem', opacity: 0.6 }}>수수료율:</span>
            <select
              value={feeRate}
              onChange={(e) => setFeeRate(Number(e.target.value))}
              style={selectStyle}
            >
              <option value={20}>20%</option>
              <option value={25}>25%</option>
              <option value={30}>30%</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          {/* 분배 바 */}
          <div style={{ flex: 1, minWidth: '250px' }}>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>👤 설계사 수익</span>
                <span style={{ fontSize: '0.9rem', fontWeight: 900, color: '#4CAF50' }}>{100 - feeRate}%</span>
              </div>
              <div style={{ height: '14px', background: 'rgba(255,255,255,0.05)', borderRadius: '999px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%', width: `${100 - feeRate}%`,
                  background: 'linear-gradient(90deg, #4CAF50, #81C784)',
                  borderRadius: '999px', transition: 'width 0.5s ease',
                  boxShadow: '0 0 12px rgba(76, 175, 80, 0.3)'
                }}></div>
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>🏢 플랫폼 수수료</span>
                <span style={{ fontSize: '0.9rem', fontWeight: 900, color: '#d6b36a' }}>{feeRate}%</span>
              </div>
              <div style={{ height: '14px', background: 'rgba(255,255,255,0.05)', borderRadius: '999px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%', width: `${feeRate}%`,
                  background: 'linear-gradient(90deg, #d6b36a, #f4d58d)',
                  borderRadius: '999px', transition: 'width 0.5s ease',
                  boxShadow: '0 0 12px rgba(214, 179, 106, 0.3)'
                }}></div>
              </div>
            </div>
          </div>

          {/* 정산 요약 카드 */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <div style={summaryBoxStyle}>
              <span style={{ fontSize: '2rem', fontWeight: 900, color: '#4CAF50' }}>{completed.length}</span>
              <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>정산 완료</span>
            </div>
            <div style={summaryBoxStyle}>
              <span style={{ fontSize: '2rem', fontWeight: 900, color: '#d6b36a' }}>{pending.length}</span>
              <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>정산 대기</span>
            </div>
          </div>
        </div>
      </div>

      {/* 정산 내역 테이블 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem', marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 900 }}>📋 정산 내역</h3>
        {pending.length > 0 && (
          <button onClick={processAll} style={batchBtnStyle}>
            ⚡ 일괄 정산 처리 ({pending.length}건)
          </button>
        )}
      </div>

      <div className="elite-data-table glass-card">
        <table className="elite-dashboard-table">
          <thead>
            <tr>
              <th>정산 ID</th>
              <th>설계사</th>
              <th>정산 기간</th>
              <th>거래 금액</th>
              <th>수수료 ({feeRate}%)</th>
              <th>정산 금액</th>
              <th>상태</th>
              <th>정산일</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {settlements.map(s => (
              <tr key={s.id}>
                <td data-label="정산 ID" style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>{s.id}</td>
                <td data-label="설계사" style={{ fontWeight: 700 }}>{s.designer}</td>
                <td data-label="정산 기간" style={{ fontSize: '0.85rem', opacity: 0.7 }}>{s.period}</td>
                <td data-label="거래 금액" style={{ fontWeight: 700 }}>₩{s.amount.toLocaleString()}</td>
                <td data-label="수수료" style={{ color: '#d6b36a', fontWeight: 700 }}>₩{s.fee.toLocaleString()}</td>
                <td data-label="정산 금액" style={{ color: '#4CAF50', fontWeight: 800 }}>₩{s.net.toLocaleString()}</td>
                <td data-label="상태">
                  <span style={{
                    padding: '4px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: '800',
                    background: s.status === '정산완료' ? 'rgba(76, 175, 80, 0.15)' : 'rgba(214, 179, 106, 0.15)',
                    color: s.status === '정산완료' ? '#4CAF50' : '#d6b36a'
                  }}>{s.status}</span>
                </td>
                <td data-label="정산일" style={{ fontSize: '0.85rem', opacity: 0.7 }}>{s.date}</td>
                <td data-label="관리">
                  {s.status === '대기' ? (
                    <button onClick={() => processSettlement(s.id)} style={processBtnStyle}>정산 처리</button>
                  ) : (
                    <span style={{ opacity: 0.5, fontSize: '0.85rem' }}>✅ 완료</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

// Styles
const cardStyle = {
  padding: '2rem', borderRadius: '16px',
  background: 'rgba(10, 17, 40, 0.7)',
  border: '1px solid rgba(255,255,255,0.08)',
  marginTop: '1.5rem'
};
const titleStyle = {
  fontSize: '1.1rem', fontWeight: 900, color: '#fff'
};
const selectStyle = {
  padding: '6px 12px', background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px',
  color: '#fff', fontSize: '0.85rem', cursor: 'pointer', outline: 'none'
};
const summaryBoxStyle = {
  padding: '1.2rem 1.5rem', background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px',
  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', minWidth: '100px'
};
const batchBtnStyle = {
  padding: '10px 20px', background: 'linear-gradient(90deg, #00d2ff 0%, #3a7bd5 100%)',
  border: 0, borderRadius: '10px', color: '#000', fontWeight: 800,
  cursor: 'pointer', fontSize: '0.85rem', transition: 'all 0.3s ease'
};
const processBtnStyle = {
  padding: '6px 14px', background: 'rgba(76, 175, 80, 0.1)',
  border: '1px solid rgba(76, 175, 80, 0.3)', borderRadius: '8px',
  color: '#4CAF50', fontWeight: 700, cursor: 'pointer', fontSize: '0.8rem',
  transition: 'all 0.3s ease'
};

export default AdminFinance;
