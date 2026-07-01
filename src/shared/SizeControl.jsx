import React, { useState } from 'react';

const SizeControl = ({ uiScale, onScaleChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const scales = [
    { label: 'S', value: 0.9, title: '기본보다 작게' },
    { label: 'M', value: 1.0, title: '표준 크기' },
    { label: 'L', value: 1.15, title: '크게 보기' },
    { label: 'XL', value: 1.3, title: '아주 크게 보기' }
  ];

  return (
    <div className={`size-control-wrapper ${isOpen ? 'active' : ''}`}>
      <button 
        className="size-toggle-btn" 
        onClick={() => setIsOpen(!isOpen)}
        title="화면 크기 조정"
      >
        <span className="icon">Aa</span>
      </button>

      {isOpen && (
        <div className="size-modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="size-menu-centered glass-card animate-up" onClick={(e) => e.stopPropagation()}>
            <div className="menu-header">
              <h3>화면 및 글자 크기 가이드</h3>
              <button className="close-btn" onClick={() => setIsOpen(false)}>&times;</button>
            </div>
            
            <div className="scale-guide-grid">
              {[
                { label: '작게', value: 0.9, desc: '촘촘한 정보 확인' },
                { label: '보통', value: 1.0, desc: '표준 권장 크기' },
                { label: '크게', value: 1.15, desc: '편안한 가독성' },
                { label: '최대', value: 1.3, desc: '시원한 큰 글씨' }
              ].map((s) => (
                <button
                  key={s.label}
                  className={`guide-btn ${uiScale === s.value ? 'active' : ''}`}
                  onClick={() => {
                    onScaleChange(s.value);
                  }}
                >
                  <span className="g-label">{s.label}</span>
                  <span className="g-desc">{s.desc}</span>
                </button>
              ))}
            </div>
            
            <div className="menu-footer">
              <p>선택하신 가이드에 맞춰 화면 전체가 중앙 정렬됩니다.</p>
              <button className="btn-confirm" onClick={() => setIsOpen(false)}>적용 완료</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SizeControl;
