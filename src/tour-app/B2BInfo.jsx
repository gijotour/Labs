import { useNavigate } from 'react-router-dom';
import { TOUR_DEMO } from './demo';
import './tour-theme.css';
// 2026-11-24: 아직 열지 않은 체험판이라, 하고 있는 것처럼 읽히는 문구를 「준비하는 것」 투로 바꿨다(사장님 결정).
// 실제 서비스가 열리면 그때 실제로 하는 것만 다시 적는다.

const FEATURES = [
  {
    title: '후불 정산 구조',
    description: '상품 만족도와 서비스에 이상이 없음을 확인한 뒤 가이드에게 비용을 정산하려 합니다.'
  },
  {
    title: '최소 선불 예약금',
    description: '예약할 때 내는 선불 부담을 줄여, 기업의 자금 흐름을 고려한 정산 구조를 마련할 계획입니다.'
  },
  {
    title: '기업 증빙 처리',
    description: '법인카드 결제와 세금계산서 발행을 준비해 기업 회계 처리를 돕고자 합니다.'
  },
  {
    title: '가이드 전문성 관리',
    description: '검증을 거친 여행설계사가 비대면으로 선택지를 제안하고, 전담 관리팀이 뒷받침하는 운영을 준비하고 있습니다.'
  }
];

const B2BInfo = () => {
  const navigate = useNavigate();

  return (
    <main className="tour-surface t-page">
      <section className="t-section">
        <div className="t-shell">
          <span className="t-eyebrow">B2B Partnership</span>
          <h1>여행설계사를 위한 새 플랫폼을 준비합니다</h1>
          <p className="t-lead">
            GIJO Tour LaB은 전문 여행설계사가 역량을 마음껏 펼칠 수 있는 안전하고 투명한
            비즈니스 환경을 준비하고 있습니다.
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
              <h2>함께할 여행설계사를 찾습니다</h2>
              <p>제휴 신청은 서비스를 열 때 받습니다.</p>
            </div>
            {/* 체험판인 동안 제휴 신청은 받지 않는다. 받아 둘 서버가 없다(demo.js). */}
            <button
              type="button"
              className="t-btn t-btn--primary"
              onClick={() => navigate('/gijotour/login', { state: { initialView: 'signup' } })}
              disabled={TOUR_DEMO}
            >
              {TOUR_DEMO ? '제휴 신청 준비 중' : '여행설계사 제휴 문의하기'}
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
