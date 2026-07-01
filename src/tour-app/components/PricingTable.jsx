import React from 'react';

const PricingTable = () => {
  return (
    <section className="premium-section premium-price">
      <div className="premium-container">
        <p className="premium-badge">Price</p>
        <h2>선택은 단순하게, 경험은 프리미엄하게</h2>
        <div className="premium-price-grid">
          <div>
            <span>BASIC</span>
            <strong>159만원~</strong>
            <p>4성급 숙소 / 기본 맞춤 일정 / 검증 가이드 케어</p>
          </div>
          <div className="premium-best">
            <span>PREMIUM</span>
            <strong>219만원~</strong>
            <p>5성급 또는 풀빌라 / VIP 일정 / 고급 커스터마이징</p>
          </div>
        </div>
        <p className="premium-note">항공 포함 여부는 상담 후 선택 가능합니다. 예약금 30%, 출발 7일 전 잔금 70% 구조로 운영합니다.</p>
      </div>
    </section>
  );
};

export default PricingTable;
