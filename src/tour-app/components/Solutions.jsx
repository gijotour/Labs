import React from 'react';

const Solutions = () => {
  return (
    <section className="premium-section premium-solution">
      <div className="premium-container split">
        <div>
          <p className="premium-badge">Verification</p>
          <h2>GIJO 전문가 안심 검증 시스템</h2>
          <p>
            플랫폼에 등록된 모든 현지 전문가(여행설계사)는 엄격한 신원 및 전문성 검증 단계를 거쳐 선발됩니다. 
            단순 가이드 수준을 넘어, 고객님의 소중한 일정과 안전을 책임질 최고 수준의 파트너만을 매칭합니다.
          </p>
        </div>
        <div className="premium-card-list">
          <div>
            <strong>01</strong>
            <div>
              <span style={{ display: 'block', fontSize: '18px', fontWeight: '800', color: '#fff' }}>자격 및 인증 검증</span>
              <span style={{ fontSize: '14px', color: 'var(--text-secondary)', display: 'block', marginTop: '4px' }}>공인 자격증 및 사업자 실태 조사 완료</span>
            </div>
          </div>
          <div>
            <strong>02</strong>
            <div>
              <span style={{ display: 'block', fontSize: '18px', fontWeight: '800', color: '#fff' }}>현지 운영 레코드</span>
              <span style={{ fontSize: '14px', color: 'var(--text-secondary)', display: 'block', marginTop: '4px' }}>최소 5년 이상의 현지 송출 실적 및 이력 검토</span>
            </div>
          </div>
          <div>
            <strong>03</strong>
            <div>
              <span style={{ display: 'block', fontSize: '18px', fontWeight: '800', color: '#fff' }}>에스크로 안전 정산</span>
              <span style={{ fontSize: '14px', color: 'var(--text-secondary)', display: 'block', marginTop: '4px' }}>고객이 최종 여정 완료 후 만족 시 대금 지급</span>
            </div>
          </div>
          <div>
            <strong>04</strong>
            <div>
              <span style={{ display: 'block', fontSize: '18px', fontWeight: '800', color: '#fff' }}>24H 비상 긴급 대응</span>
              <span style={{ fontSize: '14px', color: 'var(--text-secondary)', display: 'block', marginTop: '4px' }}>이슈 발생 시 본사 비상 상황실과 연동된 현지 케어</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solutions;
