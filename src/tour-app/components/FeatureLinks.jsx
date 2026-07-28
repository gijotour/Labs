import { Link } from 'react-router-dom';

const LINKS = [
  {
    to: '/gijotour/proposals',
    label: '제안서',
    title: '상담 후 고객에게 보여줄 맞춤 제안',
    hint: '지역별 전문 설계사의 실제 제안 사례'
  },
  {
    to: '/gijotour/reviews',
    label: '후기·공지',
    title: '신뢰 확보용 후기와 운영 소식',
    hint: '고객 후기와 플랫폼 안내사항'
  },
  {
    to: '/gijotour/tv',
    label: '설계사 TV',
    title: '콘텐츠와 영상으로 신뢰 강화',
    hint: '설계사가 직접 촬영한 현지 영상'
  },
  {
    to: '/gijotour/about',
    label: '기업 워크샵',
    title: 'B2B 지역 선택과 문의 흐름',
    hint: '법인 단체·인센티브 투어 안내'
  }
];

const FeatureLinks = () => {
  return (
    <section className="t-section">
      <div className="t-shell">
        <span className="t-eyebrow">Explore</span>
        <h2>더 둘러보기</h2>

        <div className="t-link-grid">
          {LINKS.map((link) => (
            <Link key={link.to} to={link.to} className="t-card t-link-card">
              <span className="t-link-card__label">{link.label}</span>
              <strong className="t-link-card__title">{link.title}</strong>
              <span className="t-link-card__hint">{link.hint}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureLinks;
