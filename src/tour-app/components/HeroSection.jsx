import React from 'react';

const HeroSection = ({ onOpenKakao }) => {
  return (
    <section className="premium-hero">
      <div className="premium-hero-bg" />
      <div className="premium-container premium-hero-inner">
        <p className="premium-badge">GIJO MATCHING PLATFORM</p>
        <h1>검증된 현지 전문가와 함께하는 실패 없는 맞춤형 여정</h1>
        <p className="premium-subtitle">
          이제 정형화된 상품을 고르지 마세요. 현지 사정에 정통한 나만의 전담 설계사를 직접 매칭받고 무료로 여정을 설계받을 수 있습니다.
        </p>
        <div className="premium-cta-row">
          <a href="#request">1:1 맞춤 전문가 매칭받기</a>
          <button type="button" onClick={onOpenKakao} className="ghost">카톡으로 3분 간편 상담</button>
          <a href="/gijotour/login" className="ghost">파트너(설계사) 제휴 신청</a>
        </div>
        <div className="premium-proof-row">
          <span>자격 검증 완료</span>
          <span>1:1 전담 매칭</span>
          <span>투명한 에스크로 정산</span>
          <span>24시간 안심 케어</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
