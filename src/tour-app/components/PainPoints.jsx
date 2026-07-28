const PAINS = [
  '공항에서 대기',
  '일정 짜느라 스트레스',
  '가이드 퀄리티 복불복',
  '현지 사기·바가지 걱정'
];

const PainPoints = () => {
  return (
    <section className="t-section">
      <div className="t-shell">
        <span className="t-eyebrow">Problem</span>
        <h2>여행이 아니라 노동이 되는 순간</h2>

        <ul className="t-pain-grid">
          {PAINS.map((pain) => (
            <li key={pain} className="t-card t-pain">{pain}</li>
          ))}
        </ul>

        <p className="t-pain-copy">
          그래서 여행은 쉬러 가는 게 아니라, 또 하나의 일이 됩니다.
        </p>
      </div>
    </section>
  );
};

export default PainPoints;
