import React from 'react';

const FeatureLinks = () => {
  return (
    <section className="premium-section premium-linked">
      <div className="premium-container">
        <p className="premium-badge">Connected Features</p>
        <h2>기존 기능은 뒤에서 매출 흐름을 받칩니다</h2>
        <div className="premium-feature-links">
          <a href="/gijotour/proposals">
            <span>제안서 보기</span>
            <strong>상담 후 고객에게 보여줄 맞춤 제안</strong>
            <em>DesignerShowcase 연계</em>
          </a>
          <a href="/gijotour/reviews">
            <span>후기/공지</span>
            <strong>신뢰 확보용 후기와 운영 소식</strong>
            <em>NoticeBoard 연계</em>
          </a>
          <a href="/gijotour/tv">
            <span>여행설계사 TV</span>
            <strong>콘텐츠와 영상으로 신뢰 강화</strong>
            <em>DesignerTV 연계</em>
          </a>
          <a href="/gijotour/about">
            <span>기업 워크샵</span>
            <strong>B2B 지역 선택과 문의 흐름</strong>
            <em>B2B/Region 연계</em>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeatureLinks;
