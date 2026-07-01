import React from 'react';

const srOnlyStyle = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  border: 0
};

const AutoProposalForm = ({
  form,
  onUpdateForm,
  onSubmit,
  createdTitle,
  onOpenKakao
}) => {
  return (
    <section id="request" className="premium-section premium-request">
      <div className="premium-container split">
        <div>
          <p className="premium-badge">Matching Request</p>
          <h2>내 조건에 최적화된 전문가 무료 매칭받기</h2>
          <p>
            인원, 희망 일정, 원하시는 여행 분야(럭셔리 휴양, 액티비티, 부모님 효도 관광 등)를 입력해 주세요. 
            조건에 가장 부합하는 현지 전담 설계사를 매칭하여 전용 제안서와 견적을 자동으로 구성해 드립니다.
          </p>
          {createdTitle && (
            <div className="premium-created-box" style={{ background: 'rgba(214, 179, 106, 0.1)', border: '1px solid rgba(214, 179, 106, 0.3)', borderRadius: '12px', padding: '1.5rem', marginTop: '1.5rem' }}>
              <strong style={{ color: '#d6b36a', display: 'block', marginBottom: '0.5rem' }}>매칭 및 제안서 생성 완료</strong>
              <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>{createdTitle}</p>
              <div style={{ display: 'flex', gap: '10px' }}>
                <a href="/gijotour/proposals" style={{ color: '#00d2ff', textDecoration: 'underline', fontSize: '0.9rem' }}>생성된 맞춤 제안서 확인하기</a>
              </div>
            </div>
          )}
          <div className="premium-mini-actions">
            <a href="/gijotour/proposals">제안서 확인</a>
            <a href="/gijotour/reviews">후기 보기</a>
          </div>
        </div>
        
        <form className="premium-form" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
          <div>
            <label htmlFor="proposal-people" style={srOnlyStyle}>인원</label>
            <input
              id="proposal-people"
              placeholder="동반 인원 (예: 성인 2명, 아동 1명)"
              value={form.people}
              onChange={(e) => onUpdateForm('people', e.target.value)}
              required
            />
          </div>
          
          <div>
            <label htmlFor="proposal-date" style={srOnlyStyle}>여행 시기</label>
            <input
              id="proposal-date"
              placeholder="희망 여행 일정 (예: 2026년 8월 중순 3박4일)"
              value={form.date}
              onChange={(e) => onUpdateForm('date', e.target.value)}
              required
            />
          </div>
          
          <div>
            <label htmlFor="proposal-budget" style={srOnlyStyle}>예산 범위</label>
            <input
              id="proposal-budget"
              placeholder="희망 예산 (예: 1인당 150만원 내외)"
              value={form.budget}
              onChange={(e) => onUpdateForm('budget', e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="proposal-purpose" style={srOnlyStyle}>희망 설계 테마</label>
            <input
              id="proposal-purpose"
              placeholder="선호하는 여행 스타일 (예: 골프 투어, VIP 럭셔리, 미식)"
              value={form.purpose}
              onChange={(e) => onUpdateForm('purpose', e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="proposal-contact" style={srOnlyStyle}>연락처</label>
            <input
              id="proposal-contact"
              placeholder="연락처 (매칭 알림 수신용)"
              value={form.contact}
              onChange={(e) => onUpdateForm('contact', e.target.value)}
              required
            />
          </div>
          
          <button type="submit">나의 맞춤 설계사 매칭하기 (카톡 발송)</button>
          <button type="button" className="secondary-action" onClick={onOpenKakao}>
            카톡으로 바로 1:1 상담
          </button>
        </form>
      </div>
    </section>
  );
};

export default AutoProposalForm;
