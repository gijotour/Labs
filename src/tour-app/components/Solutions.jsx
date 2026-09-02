const VERIFICATION_STEPS = [
  { no: '01', title: '자격 및 인증 검증', desc: '공인 자격증 및 사업자 실태 조사 완료' },
  { no: '02', title: '현지 운영 레코드', desc: '최소 5년 이상의 현지 송출 실적 및 이력 검토' },
  { no: '03', title: '에스크로 안전 정산', desc: '고객이 최종 여정 완료 후 만족 시 대금 지급' },
  { no: '04', title: '24H 비상 긴급 대응', desc: '이슈 발생 시 본사 비상 상황실과 연동된 현지 케어' }
];

const Solutions = () => {
  return (
    <section className="t-section">
      <div className="t-shell t-split">
        <div>
          <h2>GIJO 전문가 안심 검증 시스템</h2>
          <p>
            플랫폼에 등록된 모든 현지 전문가(여행설계사)는 엄격한 신원 및 전문성 검증 단계를 거쳐
            선발됩니다. 단순 가이드 수준을 넘어, 고객님의 소중한 일정과 안전을 책임질 최고 수준의
            파트너만을 매칭합니다.
          </p>
        </div>

        <ol className="t-steps">
          {VERIFICATION_STEPS.map((step) => (
            <li key={step.no} className="t-step">
              <span className="t-step__no">{step.no}</span>
              <div>
                <h3>{step.title}</h3>
                <p className="t-step__desc">{step.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Solutions;
