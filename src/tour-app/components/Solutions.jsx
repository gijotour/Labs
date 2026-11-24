// 2026-11-24: 아직 열지 않은 체험판이라, 하고 있는 것처럼 읽히는 문구를 「준비하는 것」 투로 바꿨다(사장님 결정).
// 실제 서비스가 열리면 그때 실제로 하는 것만 다시 적는다.
const VERIFICATION_STEPS = [
  { no: '01', title: '자격 검증 기준', desc: '공인 자격증과 사업자 실태를 미리 확인하는 검증 절차를 도입할 계획입니다.' },
  { no: '02', title: '현지 운영 이력', desc: '5년 이상의 현지 송출 이력을 검토 기준으로 삼으려 합니다.' },
  { no: '03', title: '만족 후 정산', desc: '고객이 여정을 마치고 만족을 확인한 뒤 대금을 정산하는 방식을 준비하고 있습니다.' },
  { no: '04', title: '현지 비상 대응', desc: '여정 중 돌발 상황이 생기면 본사와 현지가 함께 대응하는 체계를 마련할 계획입니다.' }
];

const Solutions = () => {
  return (
    <section className="t-section">
      <div className="t-shell t-split">
        <div>
          <h2>GIJO가 준비하는 전문가 검증</h2>
          <p>
            플랫폼에 합류할 현지 여행설계사는 신원과 전문성을 꼼꼼히 확인하는 검증 절차를 거쳐
            선정할 계획입니다. 단순 안내를 넘어 고객의 일정과 안전을 세심히 챙길 수 있는 파트너와
            연결해 드리려 합니다.
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
