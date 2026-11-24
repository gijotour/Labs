import MatchingForm from './MatchingForm';

// 2026-11-24: 아직 열지 않은 체험판이라, 하고 있는 것처럼 읽히는 문구를 「준비하는 것」 투로 바꿨다(사장님 결정).
// 실제 서비스가 열리면 그때 실제로 하는 것만 다시 적는다.
const PROOF = ['설계사 자격 검증', '1:1 전담 매칭', '만족 후 정산', '현지 비상 대응'];

const HeroSection = ({ formProps }) => {
  return (
    <section className="t-hero" id="request">
      <div className="t-shell t-hero__grid">
        <div className="t-hero__copy">
          <span className="t-eyebrow">GIJO Matching Platform</span>
          <h1>믿고 맡길 현지 전문가와 맞춤 여정을 준비합니다</h1>
          <p className="t-lead">
            정형화된 상품 대신, 현지 사정에 밝은 전담 설계사를 연결해 무료로 여정을
            설계받을 수 있도록 준비하고 있습니다.
          </p>

          <p className="t-hero__plan">준비하고 있는 것</p>
          <ul className="t-hero__proof" aria-label="준비하고 있는 서비스">
            {PROOF.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        {/* 신청폼을 첫 화면으로 끌어올려 전환까지의 거리를 없앤다 */}
        <div className="t-hero__form">
          <MatchingForm {...formProps} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
