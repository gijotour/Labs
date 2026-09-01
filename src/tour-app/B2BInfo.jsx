import { useNavigate } from 'react-router-dom';
import './tour-theme.css';

const FEATURES = [
  {
    title: '후불 정산 시스템',
    description: '상품 만족도와 서비스에 이상이 없음을 확인한 후 가이드에게 비용을 지급합니다. 최고의 품질을 보장합니다.'
  },
  {
    title: '최소 선불 부킹비',
    description: '예약 시 발생하는 선불 결제는 최소화하였습니다. 기업의 자금 유동성을 고려한 최적의 시스템입니다.'
  },
  {
    title: '완벽한 증빙 처리',
    description: '법인 카드 결제는 물론, 투명한 세금계산서 발행 시스템을 통해 기업 회계 처리를 완벽하게 지원합니다.'
  },
  {
    title: '가이드 전문성 관리',
    description: "검증된 '여행설계사'들이 직접 비대면으로 선택지를 제안하며, 전문적인 관리팀이 뒤를 받쳐줍니다."
  }
];

const B2BInfo = () => {
  const navigate = useNavigate();

  return (
    <main className="tour-surface t-page">
      <section className="t-section">
        <div className="t-shell">
          <span className="t-eyebrow">B2B Partnership</span>
          <h1>여행설계사를 위한 차별화된 플랫폼 서비스</h1>
          <p className="t-lead">
            GIJO Tour LaB의 여행 서비스는 전문 여행설계사들이 자신의 역량을 마음껏 펼칠 수 있는
            안전하고 투명한 엔터프라이즈 환경을 제공합니다.
          </p>

          <div className="t-b2b-grid">
            {FEATURES.map((feature) => (
              <article key={feature.title} className="t-card">
                <h3>{feature.title}</h3>
                <p className="t-b2b-desc">{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="t-section">
        <div className="t-shell">
          <div className="t-card t-b2b-cta">
            <div>
              <span className="t-eyebrow">Join as a partner</span>
              <h2>글로벌 여행 시장의 새로운 기준이 되세요</h2>
              <p>지금 바로 GIJO Tour LaB와 함께 프리미엄 여행 설계의 미래를 시작하세요.</p>
            </div>
            <button
              type="button"
              className="t-btn t-btn--primary"
              onClick={() => navigate('/gijotour/login', { state: { initialView: 'signup' } })}
            >
              여행설계사 제휴 문의하기
            </button>
          </div>
        </div>
      </section>

      <style>{`
        .t-b2b-grid {
          margin-top: var(--t-gap-lg);
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--t-gap);
        }
        .t-b2b-desc {
          font-size: var(--t-small);
          margin: 0;
        }
        .t-b2b-cta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--t-gap-lg);
          flex-wrap: wrap;
        }
        .t-b2b-cta p { margin: 0; }
        @media (max-width: 900px) {
          .t-b2b-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </main>
  );
};

export default B2BInfo;
