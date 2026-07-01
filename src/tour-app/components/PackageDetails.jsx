import React from 'react';

const PackageDetails = () => {
  return (
    <section className="premium-section premium-product">
      <div className="premium-container">
        <p className="premium-badge">MVP Package</p>
        <h2>필리핀 프리미엄 3박4일 프라이빗 투어</h2>
        <p className="premium-subtitle small">아무것도 신경 안 써도 되는 여행</p>
        <div className="premium-days">
          <div>
            <strong>DAY 1</strong>
            <h3>도착하자마자 쉬는 여행</h3>
            <p>공항 도착 → 대기 없이 픽업 → 호텔 체크인 → 첫날은 무리하지 않고 휴식합니다.</p>
          </div>
          <div>
            <strong>DAY 2</strong>
            <h3>우리만의 프라이빗 일정</h3>
            <p>호핑, 현지 스팟, 식사 동선까지 가이드가 케어합니다.</p>
          </div>
          <div>
            <strong>DAY 3</strong>
            <h3>예약 스트레스 없는 하루</h3>
            <p>마사지, 자유 일정, 맛집 예약까지 고객 취향에 맞춰 설계합니다.</p>
          </div>
          <div>
            <strong>DAY 4</strong>
            <h3>공항까지 끝까지 케어</h3>
            <p>체크아웃부터 공항 이동까지 마지막 순간까지 편하게 마무리합니다.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PackageDetails;
