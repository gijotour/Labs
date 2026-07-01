import React, { useState } from 'react';

const monthlyRevenue = [
  { month: '1월', value: 5200, growth: '+12%' },
  { month: '2월', value: 4800, growth: '-8%' },
  { month: '3월', value: 6100, growth: '+27%' },
  { month: '4월', value: 7300, growth: '+20%' },
  { month: '5월', value: 8500, growth: '+16%' },
  { month: '6월', value: 9200, growth: '+8%' }
];

const designerRankings = [
  { name: 'Alex Kim', revenue: 15800, proposals: 14, rating: 4.9, region: '태국 방콕/푸켓' },
  { name: 'David Park', revenue: 12400, proposals: 12, rating: 5.0, region: '스위스/이탈리아' },
  { name: 'GIJO AUTO', revenue: 9600, proposals: 8, rating: 4.8, region: '필리핀 클락/세부' },
  { name: 'Sofia Jung', revenue: 6200, proposals: 5, rating: 4.9, region: '일본 교토/료칸' }
];

const regionData = [
  { name: '동남아시아', percent: 42, color: '#00d2ff' },
  { name: '일본', percent: 25, color: '#3a7bd5' },
  { name: '유럽', percent: 18, color: '#d6b36a' },
  { name: '기타', percent: 15, color: '#4CAF50' }
];

const AdminPerformance = () => {
  const [period, setPeriod] = useState('monthly');

  const maxRevenue = Math.max(...monthlyRevenue.map(m => m.value));
  const maxDesignerRev = Math.max(...designerRankings.map(d => d.revenue));
  const totalRevenue = monthlyRevenue.reduce((s, m) => s + m.value, 0);
  const avgGrowth = '+14.2%';
  const conversionRate = '23.5%';
  const avgOrderValue = '₩1,740,000';

  const kpiCards = [
    { label: '총 매출 (6개월)', value: `₩${(totalRevenue).toLocaleString()}만`, icon: '💰', accent: '#00d2ff' },
    { label: '월간 평균 성장률', value: avgGrowth, icon: '📈', accent: '#4CAF50' },
    { label: '전환율', value: conversionRate, icon: '🎯', accent: '#d6b36a' },
    { label: '평균 주문 가치', value: avgOrderValue, icon: '💎', accent: '#3a7bd5' }
  ];

  // conic-gradient 생성
  let conicParts = [];
  let accumulated = 0;
  regionData.forEach(r => {
    conicParts.push(`${r.color} ${accumulated}% ${accumulated + r.percent}%`);
    accumulated += r.percent;
  });
  const conicGradient = `conic-gradient(${conicParts.join(', ')})`;

  return (
    <>
      {/* 기간 토글 */}
      <div style={toggleBarStyle}>
        {['monthly', 'quarterly'].map(p => (
          <button key={p} onClick={() => setPeriod(p)} style={{
            ...toggleBtnStyle,
            background: period === p ? 'rgba(0, 210, 255, 0.15)' : 'transparent',
            color: period === p ? '#00d2ff' : '#b0c4de',
            borderColor: period === p ? 'rgba(0, 210, 255, 0.3)' : 'rgba(255,255,255,0.08)'
          }}>
            {p === 'monthly' ? '📅 월간' : '📊 분기별'}
          </button>
        ))}
      </div>

      {/* KPI 카드 */}
      <div className="elite-stats-grid">
        {kpiCards.map((k, i) => (
          <div key={i} className="elite-stat-card glass-card" style={{ position: 'relative' }}>
            <span className="stat-label">{k.icon} {k.label}</span>
            <span className="stat-value" style={{ color: k.accent }}>{k.value}</span>
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: '70px', height: '70px', background: `radial-gradient(circle, ${k.accent}22 0%, transparent 70%)` }}></div>
          </div>
        ))}
      </div>

      {/* 매출 추이 막대 그래프 */}
      <div className="glass-card" style={chartCardStyle}>
        <h3 style={chartTitleStyle}>📊 월별 매출 추이</h3>
        <div style={barChartContainerStyle}>
          {monthlyRevenue.map((m, i) => (
            <div key={i} style={barColumnStyle}>
              <span style={{ fontSize: '0.75rem', color: m.growth.startsWith('+') ? '#4CAF50' : '#ff5252', fontWeight: 800, marginBottom: '6px' }}>{m.growth}</span>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, marginBottom: '8px', color: '#fff' }}>₩{m.value.toLocaleString()}만</span>
              <div style={{
                width: '100%',
                height: `${(m.value / maxRevenue) * 200}px`,
                background: `linear-gradient(180deg, #00d2ff ${100 - (i * 10)}%, #3a7bd5 100%)`,
                borderRadius: '8px 8px 4px 4px',
                transition: 'height 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                boxShadow: '0 0 20px rgba(0, 210, 255, 0.15)'
              }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '50%', background: 'linear-gradient(180deg, rgba(255,255,255,0.15), transparent)', borderRadius: '8px 8px 0 0' }}></div>
              </div>
              <span style={{ fontSize: '0.85rem', marginTop: '10px', color: '#b0c4de', fontWeight: 700 }}>{m.month}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1.5rem' }}>
        {/* 설계사별 실적 순위 */}
        <div className="glass-card" style={chartCardStyle}>
          <h3 style={chartTitleStyle}>🏆 설계사별 매출 순위</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {designerRankings.map((d, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{
                      width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.75rem', fontWeight: 900,
                      background: i === 0 ? 'linear-gradient(135deg, #d6b36a, #f4d58d)' : 'rgba(255,255,255,0.08)',
                      color: i === 0 ? '#000' : '#b0c4de'
                    }}>
                      {i + 1}
                    </span>
                    <div>
                      <span style={{ fontWeight: 800, fontSize: '0.95rem' }}>{d.name}</span>
                      <span style={{ fontSize: '0.75rem', opacity: 0.5, display: 'block' }}>{d.region}</span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontWeight: 900, color: '#00d2ff', fontSize: '0.95rem' }}>₩{d.revenue.toLocaleString()}만</span>
                    <span style={{ fontSize: '0.75rem', opacity: 0.5, display: 'block' }}>⭐ {d.rating} · {d.proposals}건</span>
                  </div>
                </div>
                <div style={{ height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', width: `${(d.revenue / maxDesignerRev) * 100}%`,
                    background: i === 0 ? 'linear-gradient(90deg, #d6b36a, #f4d58d)' : 'linear-gradient(90deg, #00d2ff, #3a7bd5)',
                    borderRadius: '999px',
                    transition: 'width 0.8s ease',
                    boxShadow: `0 0 10px ${i === 0 ? 'rgba(214, 179, 106, 0.3)' : 'rgba(0, 210, 255, 0.3)'}`
                  }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 지역별 매출 비중 도넛 */}
        <div className="glass-card" style={chartCardStyle}>
          <h3 style={chartTitleStyle}>🌏 지역별 매출 비중</h3>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            {/* 도넛 차트 */}
            <div style={{
              width: '180px', height: '180px', borderRadius: '50%',
              background: conicGradient,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative',
              boxShadow: '0 0 40px rgba(0, 210, 255, 0.1)'
            }}>
              <div style={{
                width: '110px', height: '110px', borderRadius: '50%',
                background: 'rgba(10, 17, 40, 0.95)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                border: '2px solid rgba(255,255,255,0.05)'
              }}>
                <span style={{ fontSize: '0.7rem', opacity: 0.5 }}>총 매출</span>
                <span style={{ fontSize: '1.1rem', fontWeight: 900, color: '#00d2ff' }}>₩4.2억</span>
              </div>
            </div>
            {/* 범례 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {regionData.map((r, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: r.color, flexShrink: 0 }}></div>
                  <span style={{ fontSize: '0.9rem', fontWeight: 700, minWidth: '80px' }}>{r.name}</span>
                  <span style={{ fontSize: '0.85rem', color: r.color, fontWeight: 800 }}>{r.percent}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .perf-two-col { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
};

// Styles
const toggleBarStyle = {
  display: 'flex', gap: '8px', marginBottom: '1.5rem'
};
const toggleBtnStyle = {
  padding: '8px 18px', border: '1px solid', borderRadius: '999px',
  fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer', transition: 'all 0.3s ease'
};
const chartCardStyle = {
  padding: '2rem', borderRadius: '16px',
  background: 'rgba(10, 17, 40, 0.7)',
  border: '1px solid rgba(255,255,255,0.08)',
  marginTop: '1.5rem'
};
const chartTitleStyle = {
  fontSize: '1.1rem', fontWeight: 900, marginBottom: '1.5rem', color: '#fff'
};
const barChartContainerStyle = {
  display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
  gap: '1rem', height: '300px', padding: '0 0.5rem'
};
const barColumnStyle = {
  flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end'
};

export default AdminPerformance;
