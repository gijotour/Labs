import React from 'react';

const RegionSelector = ({ selectedRegion, onSelectRegion }) => {
  const regions = [
    { name: "전체", cities: ["모든 지역 보기"] },
    { name: "필리핀", cities: ["따가이다이", "마닐라", "클락"] },
    { name: "베트남", cities: ["다낭", "호이안", "호치민", "하노이"] },
    { name: "라오스", cities: ["비엔티엔"] },
    { name: "태국", cities: ["방콕", "푸켓"] }
  ];

  return (
    <section id="regions" className="region-section">
      <div className="container">
        <div className="section-header centered animate-up">
          <div className="section-badge">GLOBAL NETWORK</div>
          <h2>글로벌 <span className="highlight">서비스 지역</span></h2>
          <p>전담 여행설계사가 상주하는 주요 거점 지역입니다. <br />지역을 선택하시면 전문가의 맞춤 제안을 즉시 확인하실 수 있습니다.</p>
        </div>

        <div className="region-grid animate-up delay-2">
          {regions.map((region, index) => (
            <div 
              key={index} 
              className={`region-card-landing glass-card ${selectedRegion === region.name ? 'active' : ''}`}
              onClick={() => onSelectRegion(region.name)}
            >
              <div className="region-main">
                <span className="region-name">{region.name}</span>
                <div className="city-list">
                  {region.cities.map((city, i) => (
                    <span key={i} className="city-tag">{city}</span>
                  ))}
                </div>
              </div>
              <div className="region-footer">
                <span className="region-cta">여행설계사 제안 보기 →</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default RegionSelector;
