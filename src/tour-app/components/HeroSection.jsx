import MatchingForm from './MatchingForm';

const PROOF = ['자격 검증 완료', '1:1 전담 매칭', '투명한 에스크로 정산', '24시간 안심 케어'];

const HeroSection = ({ formProps }) => {
  return (
    <section className="t-hero" id="request">
      <div className="t-shell t-hero__grid">
        <div className="t-hero__copy">
          <span className="t-eyebrow">GIJO Matching Platform</span>
          <h1>검증된 현지 전문가와 함께하는 실패 없는 맞춤형 여정</h1>
          <p className="t-lead">
            정형화된 상품을 고르지 마세요. 현지 사정에 정통한 나만의 전담 설계사를
            직접 매칭받고 무료로 여정을 설계받을 수 있습니다.
          </p>

          <ul className="t-hero__proof">
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
