import React from 'react';

const DesignerShowcaseCard = ({ designer }) => {
  return (
    <div className="designer-showcase-card">
      <div className="designer-avatar-wrap">
        <img src={designer.avatar} alt={`${designer.name} 프로필 이미지`} className="designer-avatar" />
        <span className="designer-badge-pill">검증 파트너</span>
      </div>
      <div className="designer-info-body">
        <span className="designer-region-tag">{designer.region}</span>
        <h3>{designer.name}</h3>
        <p className="designer-specialty">{designer.specialty}</p>
        
        <div className="designer-stats-row">
          <div className="designer-stat-item">
            <span className="designer-stat-val">⭐ {designer.rating}</span>
            <span className="designer-stat-lbl">만족도</span>
          </div>
          <div className="designer-stat-item">
            <span className="designer-stat-val">{designer.customers}</span>
            <span className="designer-stat-lbl">누적 송출</span>
          </div>
          <div className="designer-stat-item">
            <span className="designer-stat-val">{designer.experience}</span>
            <span className="designer-stat-lbl">경력</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignerShowcaseCard;
