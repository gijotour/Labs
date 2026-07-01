import React, { useState } from 'react';

const initialTickets = [
  {
    id: 'CS-2026-001',
    reporter: '김민준',
    type: '긴급',
    category: '여행 중 사고',
    subject: '방콕 투어 중 숙소 변경 요청 (긴급)',
    status: '대기',
    assignee: 'Alex Kim',
    createdAt: '2026-06-27 14:30',
    messages: [
      { sender: '김민준', text: '현재 예약된 호텔의 에어컨이 고장났습니다. 대체 숙소 변경이 가능한가요?', time: '14:30' },
      { sender: 'System', text: '티켓이 긴급으로 접수되었습니다. 담당자 배정 중...', time: '14:31' },
      { sender: 'Alex Kim', text: '확인 중입니다. 인근 5성급 호텔 잔여 객실을 조회하겠습니다.', time: '14:35' }
    ]
  },
  {
    id: 'CS-2026-002',
    reporter: '이서연',
    type: '일반',
    category: '결제 문의',
    subject: '결제 완료 후 확인 메일 미수신',
    status: '처리중',
    assignee: 'Sofia Jung',
    createdAt: '2026-06-26 09:15',
    messages: [
      { sender: '이서연', text: '어제 결제를 완료했는데 확인 메일이 오지 않았습니다.', time: '09:15' },
      { sender: 'Sofia Jung', text: '스팸 폴더를 확인해 주세요. 재발송 처리하겠습니다.', time: '09:40' }
    ]
  },
  {
    id: 'CS-2026-003',
    reporter: 'David Park',
    type: '문의',
    category: '일정 변경',
    subject: '출발일 1주일 연기 가능 여부 문의',
    status: '해결',
    assignee: 'GIJO AUTO',
    createdAt: '2026-06-25 16:00',
    messages: [
      { sender: 'David Park', text: '개인 사정으로 출발일을 1주일 늦추고 싶은데 가능할까요?', time: '16:00' },
      { sender: 'GIJO AUTO', text: '항공권 및 호텔 변경 가능 여부를 확인하여 안내드리겠습니다.', time: '16:20' },
      { sender: 'GIJO AUTO', text: '변경 완료되었습니다. 변경 수수료 5만원이 발생하며, 새로운 일정표를 메일로 발송했습니다.', time: '17:00' }
    ]
  },
  {
    id: 'CS-2026-004',
    reporter: '박지현',
    type: '긴급',
    category: '가이드 불만',
    subject: '세부 투어 가이드 불친절 신고',
    status: '대기',
    assignee: null,
    createdAt: '2026-06-27 11:20',
    messages: [
      { sender: '박지현', text: '오늘 세부 호핑투어 가이드가 매우 불친절했습니다. 일정 설명도 없이 끌고 다녔습니다.', time: '11:20' }
    ]
  },
  {
    id: 'CS-2026-005',
    reporter: '최영호',
    type: '문의',
    category: '환불 문의',
    subject: '취소 시 환불 정책 문의',
    status: '처리중',
    assignee: 'Alex Kim',
    createdAt: '2026-06-26 13:45',
    messages: [
      { sender: '최영호', text: '출발 14일 전 취소 시 환불 비율이 어떻게 되나요?', time: '13:45' },
      { sender: 'Alex Kim', text: '출발 14일 전 취소 시 예약금의 90%가 환불됩니다. 상세 정책을 안내드리겠습니다.', time: '14:00' }
    ]
  }
];

const AdminCSCenter = () => {
  const [tickets, setTickets] = useState(initialTickets);
  const [filter, setFilter] = useState('all');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [replyText, setReplyText] = useState('');

  const typeColor = { '긴급': '#ff5252', '일반': '#d6b36a', '문의': '#4CAF50' };
  const typeIcon = { '긴급': '🔴', '일반': '🟡', '문의': '🟢' };
  const statusColor = { '대기': '#d6b36a', '처리중': '#00d2ff', '해결': '#4CAF50' };

  const filtered = filter === 'all' ? tickets : tickets.filter(t => t.type === filter);

  const csStats = [
    { label: '전체 티켓', value: tickets.length, icon: '🎫' },
    { label: '미해결', value: tickets.filter(t => t.status !== '해결').length, icon: '⏳' },
    { label: '평균 응답', value: '12분', icon: '⚡' },
    { label: 'CS 만족도', value: '94%', icon: '💯' }
  ];

  const advanceStatus = (id) => {
    setTickets(prev => prev.map(t => {
      if (t.id === id) {
        const flow = ['대기', '처리중', '해결'];
        const idx = flow.indexOf(t.status);
        if (idx < flow.length - 1) {
          return { ...t, status: flow[idx + 1] };
        }
      }
      return t;
    }));
    if (selectedTicket?.id === id) {
      setSelectedTicket(prev => {
        const flow = ['대기', '처리중', '해결'];
        const idx = flow.indexOf(prev.status);
        if (idx < flow.length - 1) return { ...prev, status: flow[idx + 1] };
        return prev;
      });
    }
  };

  const sendReply = () => {
    if (!replyText.trim() || !selectedTicket) return;
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const newMsg = { sender: 'Admin', text: replyText, time: timeStr };
    setTickets(prev => prev.map(t => {
      if (t.id === selectedTicket.id) {
        return { ...t, messages: [...t.messages, newMsg] };
      }
      return t;
    }));
    setSelectedTicket(prev => ({ ...prev, messages: [...prev.messages, newMsg] }));
    setReplyText('');
  };

  return (
    <>
      {/* CS 통계 */}
      <div className="elite-stats-grid">
        {csStats.map((s, i) => (
          <div key={i} className="elite-stat-card glass-card">
            <span className="stat-label">{s.icon} {s.label}</span>
            <span className="stat-value">{s.value}</span>
            <div className="stat-glow"></div>
          </div>
        ))}
      </div>

      {/* 필터 바 */}
      <div style={filterBarStyle}>
        {['all', '긴급', '일반', '문의'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              ...filterBtnStyle,
              background: filter === f ? 'rgba(0, 210, 255, 0.15)' : 'rgba(255,255,255,0.03)',
              color: filter === f ? '#00d2ff' : '#b0c4de',
              borderColor: filter === f ? 'rgba(0, 210, 255, 0.3)' : 'rgba(255,255,255,0.08)'
            }}
          >
            {f === 'all' ? '📋 전체' : `${typeIcon[f]} ${f}`}
          </button>
        ))}
      </div>

      {/* 티켓 리스트 */}
      <div className="elite-data-table glass-card" style={{ marginTop: '1rem' }}>
        <table className="elite-dashboard-table">
          <thead>
            <tr>
              <th>티켓 ID</th>
              <th>유형</th>
              <th>카테고리</th>
              <th>제목</th>
              <th>신고자</th>
              <th>담당자</th>
              <th>상태</th>
              <th>접수일</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(t => (
              <tr key={t.id} style={{ cursor: 'pointer' }} onClick={() => setSelectedTicket(t)}>
                <td data-label="티켓 ID" style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>{t.id}</td>
                <td data-label="유형">
                  <span style={{
                    padding: '4px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: '800',
                    background: `${typeColor[t.type]}22`, color: typeColor[t.type]
                  }}>{typeIcon[t.type]} {t.type}</span>
                </td>
                <td data-label="카테고리" style={{ fontSize: '0.85rem', opacity: 0.8 }}>{t.category}</td>
                <td data-label="제목" style={{ fontWeight: 700, maxWidth: '250px' }}>{t.subject}</td>
                <td data-label="신고자">{t.reporter}</td>
                <td data-label="담당자">{t.assignee || <span style={{ opacity: 0.4 }}>미배정</span>}</td>
                <td data-label="상태">
                  <span style={{
                    padding: '4px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: '800',
                    background: `${statusColor[t.status]}22`, color: statusColor[t.status]
                  }}>{t.status}</span>
                </td>
                <td data-label="접수일" style={{ fontSize: '0.85rem', opacity: 0.7 }}>{t.createdAt}</td>
                <td data-label="관리">
                  {t.status !== '해결' && (
                    <button
                      onClick={(e) => { e.stopPropagation(); advanceStatus(t.id); }}
                      style={actionBtnStyle}
                    >
                      {t.status === '대기' ? '처리 시작' : '해결 완료'}
                    </button>
                  )}
                  {t.status === '해결' && <span style={{ opacity: 0.5, fontSize: '0.85rem' }}>✅ 완료</span>}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="9" style={{ textAlign: 'center', padding: '4rem', opacity: 0.5 }}>해당 유형의 티켓이 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 티켓 상세 모달 */}
      {selectedTicket && (
        <div style={modalOverlayStyle} onClick={() => setSelectedTicket(null)}>
          <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
            <div style={modalHeaderStyle}>
              <div>
                <span style={{
                  padding: '4px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: '800',
                  background: `${typeColor[selectedTicket.type]}22`, color: typeColor[selectedTicket.type], marginRight: '10px'
                }}>{typeIcon[selectedTicket.type]} {selectedTicket.type}</span>
                <span style={{
                  padding: '4px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: '800',
                  background: `${statusColor[selectedTicket.status]}22`, color: statusColor[selectedTicket.status]
                }}>{selectedTicket.status}</span>
                <h3 style={{ marginTop: '12px', fontSize: '1.2rem', fontWeight: 900 }}>{selectedTicket.subject}</h3>
                <p style={{ opacity: 0.5, fontSize: '0.85rem', marginTop: '4px' }}>{selectedTicket.id} · {selectedTicket.createdAt} · 담당: {selectedTicket.assignee || '미배정'}</p>
              </div>
              <button onClick={() => setSelectedTicket(null)} style={closeBtnStyle}>✕</button>
            </div>

            {/* 대화 타임라인 */}
            <div style={chatAreaStyle}>
              {selectedTicket.messages.map((msg, i) => (
                <div key={i} style={{
                  ...chatBubbleStyle,
                  alignSelf: msg.sender === 'Admin' || msg.sender === 'System' ? 'flex-end' : 'flex-start',
                  background: msg.sender === 'System' ? 'rgba(100, 100, 100, 0.15)' :
                    msg.sender === 'Admin' ? 'rgba(0, 210, 255, 0.12)' : 'rgba(255, 255, 255, 0.06)',
                  borderColor: msg.sender === 'Admin' ? 'rgba(0, 210, 255, 0.2)' : 'rgba(255,255,255,0.08)'
                }}>
                  <span style={{ fontSize: '0.75rem', color: msg.sender === 'Admin' ? '#00d2ff' : '#d6b36a', fontWeight: 800 }}>{msg.sender}</span>
                  <p style={{ margin: '6px 0 0', fontSize: '0.9rem', lineHeight: 1.6 }}>{msg.text}</p>
                  <span style={{ fontSize: '0.7rem', opacity: 0.4, marginTop: '6px', display: 'block', textAlign: 'right' }}>{msg.time}</span>
                </div>
              ))}
            </div>

            {/* 답변 입력 */}
            {selectedTicket.status !== '해결' && (
              <div style={replyBarStyle}>
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendReply()}
                  placeholder="답변을 입력하세요..."
                  style={replyInputStyle}
                />
                <button onClick={sendReply} style={replySendBtnStyle}>전송</button>
              </div>
            )}

            {/* 상태 변경 */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '16px', justifyContent: 'flex-end' }}>
              {selectedTicket.status !== '해결' && (
                <button onClick={() => advanceStatus(selectedTicket.id)} style={{
                  ...actionBtnStyle,
                  padding: '10px 20px',
                  background: 'linear-gradient(90deg, #00d2ff 0%, #3a7bd5 100%)',
                  color: '#000'
                }}>
                  {selectedTicket.status === '대기' ? '▶ 처리 시작' : '✅ 해결 완료'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Styles
const filterBarStyle = {
  display: 'flex', gap: '8px', marginTop: '1.5rem', flexWrap: 'wrap'
};
const filterBtnStyle = {
  padding: '8px 16px', border: '1px solid', borderRadius: '999px',
  fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer', transition: 'all 0.3s ease'
};
const actionBtnStyle = {
  padding: '6px 14px', background: 'rgba(0, 210, 255, 0.1)', border: '1px solid rgba(0, 210, 255, 0.25)',
  borderRadius: '8px', color: '#00d2ff', fontWeight: 700, cursor: 'pointer', fontSize: '0.8rem', transition: 'all 0.3s ease'
};
const modalOverlayStyle = {
  position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
  background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)',
  display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '2rem'
};
const modalStyle = {
  background: 'rgba(10, 17, 40, 0.95)', border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '20px', padding: '2rem', width: '100%', maxWidth: '650px', maxHeight: '80vh',
  display: 'flex', flexDirection: 'column', color: '#fff'
};
const modalHeaderStyle = {
  display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem',
  paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.08)'
};
const closeBtnStyle = {
  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
  color: '#fff', width: '36px', height: '36px', borderRadius: '10px', cursor: 'pointer',
  fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
};
const chatAreaStyle = {
  flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px',
  padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', minHeight: '200px', maxHeight: '350px'
};
const chatBubbleStyle = {
  maxWidth: '80%', padding: '12px 16px', borderRadius: '14px', border: '1px solid'
};
const replyBarStyle = {
  display: 'flex', gap: '10px', marginTop: '16px'
};
const replyInputStyle = {
  flex: 1, padding: '12px 16px', background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff',
  fontSize: '0.9rem', outline: 'none'
};
const replySendBtnStyle = {
  padding: '12px 24px', background: 'linear-gradient(90deg, #00d2ff 0%, #3a7bd5 100%)',
  border: 0, borderRadius: '12px', color: '#000', fontWeight: 800, cursor: 'pointer',
  fontSize: '0.9rem', transition: 'all 0.3s ease'
};

export default AdminCSCenter;
