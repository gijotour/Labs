import { Link, Navigate } from 'react-router-dom';
import { PRODUCTS } from './products';
import { SECTIONS, findSection } from './sections';
import ProductGrid from './ProductGrid';
import { LAB_STYLES } from './labStyles';
// --t-* 토큰 정의. GijoLab.jsx 와 같은 이유로 의존을 명시한다(알려진 잔여 문제).
import '../tour-app/tour-theme.css';

/**
 * Labs 갈래 화면 (/tech · /travel).
 *
 * 허브(/)의 두 문 가운데 하나로 들어온 화면이다. 그 갈래의 제품 타일을 보여 주고,
 * 기술 쪽은 제품 구성(단계)과 도입 문의를 함께 둔다. 글은 sections.js 에 있다.
 */
const LabsSection = ({ section: sectionId }) => {
  const section = findSection(sectionId);
  if (!section) return <Navigate to="/" replace />;

  const products = PRODUCTS.filter((p) => p.group === section.id);
  const { hero, ladder, list, closing } = section;

  return (
    <div className="lab-surface lab-hub page-fade-in">
      <title>{section.docTitle}</title>

      <div className="lab-shell">
        <nav className="lab-topnav" aria-label="사업 분야">
          <span className="lab-topnav__brand">
            {section.brand}
            <small>{section.brandNote}</small>
          </span>
          <ul className="lab-topnav__links">
            <li>
              <Link to="/">
                <span aria-hidden="true">←</span> 처음으로
              </Link>
            </li>
            {SECTIONS.map((other) => (
              <li key={other.id}>
                <Link to={other.path} aria-current={other.id === section.id ? 'page' : undefined}>
                  {other.navLabel}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <header className="lab-intro">
          <span className={`lab-pill${section.accent ? ' lab-pill--accent' : ''}`}>{hero.pill}</span>
          <h1 className="lab-intro__title" style={{ marginTop: '1rem' }}>
            {hero.title.map((line, i) => (
              <span key={line}>
                {line}
                {i < hero.title.length - 1 && <br />}
              </span>
            ))}
          </h1>
          <p className="lab-lead">{hero.lead}</p>
        </header>

        {ladder && (
          <section className="lab-block" aria-label={ladder.title}>
            <p className="lab-kicker">{ladder.kicker}</p>
            <h2 className="lab-block__title">{ladder.title}</h2>
            <ol className="lab-ladder">
              {ladder.steps.map((step, i) => (
                <li key={step.name} className={`lab-step${step.accent ? ' lab-step--accent' : ''}`}>
                  <span className="lab-step__num">
                    {String(i + 1).padStart(2, '0')} · {step.label}
                  </span>
                  <h3 className="lab-step__name">{step.name}</h3>
                  <p className="lab-step__who">{step.who}</p>
                  <p className="lab-step__text">{step.text}</p>
                  <Link className="lab-step__cta" to={step.to} aria-label={`${step.name} 소개 보기`}>
                    소개 보기 <span className="lab-arrow" aria-hidden="true">→</span>
                  </Link>
                </li>
              ))}
            </ol>
            {ladder.note && <p className="lab-note">{ladder.note}</p>}
          </section>
        )}

        <section className="lab-block" aria-label={list.title}>
          <p className="lab-kicker">{list.kicker}</p>
          <h2 className="lab-block__title">{list.title}</h2>
          <ProductGrid products={products} />
        </section>

        {closing && (
          <section className="lab-block" aria-label={closing.title}>
            <div className="lab-closing">
              <div>
                <h2 className="lab-block__title">{closing.title}</h2>
                <p className="lab-closing__text">{closing.text}</p>
              </div>
              {closing.action.to ? (
                <Link className="lab-closing__btn" to={closing.action.to}>
                  {closing.action.label} <span aria-hidden="true">→</span>
                </Link>
              ) : (
                <a
                  className="lab-closing__btn"
                  href={closing.action.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {closing.action.label} <span aria-hidden="true">→</span>
                </a>
              )}
            </div>
          </section>
        )}

        <footer className="lab-foot">
          <span className="lab-foot__brand">{section.brand}</span>
          <span className="lab-foot__copy">
            © {new Date().getFullYear()} {section.brand}. All rights reserved.
          </span>
        </footer>
      </div>

      <style>{LAB_STYLES}</style>
    </div>
  );
};

export default LabsSection;
