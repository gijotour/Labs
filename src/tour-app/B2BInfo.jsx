import React from 'react';
import { useNavigate } from 'react-router-dom';

const B2BInfo = () => {
  const navigate = useNavigate();
  const features = [
    {
      title: "후불 정산 시스템",
      description: "상품 만족도와 서비스에 이상이 없음을 확인한 후 가이드에게 비용을 지급합니다. 최고의 품질을 보장합니다.",
      icon: "💳"
    },
    {
      title: "최소 선불 부킹비",
      description: "예약 시 발생하는 선불 결제는 최소화하였습니다. 기업의 자금 유동성을 고려한 최적의 시스템입니다.",
      icon: "🛡️"
    },
    {
      title: "완벽한 증빙 처리",
      description: "법인 카드 결제는 물론, 투명한 세금계산서 발행 시스템을 통해 기업 회계 처리를 완벽하게 지원합니다.",
      icon: "📑"
    },
    {
      title: "가이드 전문성 관리",
      description: "검증된 '여행설계사'들이 직접 비대면으로 선택지를 제안하며, 전문적인 관리팀이 뒤를 받쳐줍니다.",
      icon: "👔"
    }
  ];

  return (
    <section id="b2b" className="b2b-section">
      <div className="container b2b-content">
        <div className="section-header centered animate-up">
          <div className="section-badge">B2B PARTNERSHIP</div>
          <h2>여행설계사를 위한 <br /><span className="highlight">차별화된 플랫폼 서비스</span></h2>
          <p>GIJO Labs의 메인 프로젝트인 GIJO TOUR는 전문 여행설계사들이 자신의 역량을 마음껏 펼칠 수 있는 <br />안전하고 투명한 엔터프라이즈 환경을 제공합니다.</p>
        </div>

        <div className="features-grid animate-up delay-2">
          {features.map((feature, index) => (
            <div key={index} className="feature-card glass-card">
              <div className="feature-icon-wrapper">
                <span className="feature-icon">{feature.icon}</span>
              </div>
              <div className="feature-text">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="b2b-cta-landing glass-card animate-up delay-4">
          <div className="cta-premium-content">
            <span className="cta-label">JOIN AS A PARTNER</span>
            <h3>글로벌 여행 시장의 <span className="highlight">새로운 기준</span>이 되세요</h3>
            <p>지금 바로 GIJO TOUR와 함께 프리미엄 여행 설계의 미래를 시작하세요.</p>
          </div>
          <button 
            className="btn-primary btn-large" 
            onClick={() => navigate('/gijotour/login', { state: { initialView: 'signup' } })}
          >
            여행설계사 제휴 문의하기
          </button>
        </div>
      </div>

    </section>
  );
};

export default B2BInfo;
