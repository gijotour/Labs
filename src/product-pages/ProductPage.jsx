import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PAGES } from './content';
import './product-pages.css';

/**
 * 제품 소개 페이지 틀. 글(content/*.js)을 받아 구획을 그린다.
 *
 * 구획 종류: split(제목 + 줄 목록) · cards(카드 격자) · list(짧은 줄 목록) · editions · closing.
 * 모든 클래스는 `pp-` 로 시작하고 `.pp-surface` 안에서만 스타일이 먹는다.
 * 전역 CSS(src/styles/01~08)에 `.btn`·`section`·`h1` 같은 요소·범용 셀렉터가 있어 이름을 피했다.
 */

/** 줄바꿈이 있는 제목. 배열의 각 항목이 한 줄이다. */
const Lines = ({ lines }) =>
  lines.map((line, i) => (
    <span key={line} className="pp-line">
      {line}
      {i < lines.length - 1 && ' '}
    </span>
  ));

/** 안쪽 주소는 router 로, 페이지 안 닻(#)과 바깥 주소는 a 로 연다. */
const Action = ({ action }) => {
  const className = `pp-btn${action.primary ? ' pp-btn--primary' : ''}`;
  if (action.external) {
    return (
      <a className={className} href={action.href} target="_blank" rel="noopener noreferrer">
        {action.label} <span aria-hidden="true">→</span>
      </a>
    );
  }
  if (action.href.startsWith('#')) {
    return (
      <a className={className} href={action.href}>
        {action.label}
      </a>
    );
  }
  return (
    <Link className={className} to={action.href}>
      {action.label} <span aria-hidden="true">→</span>
    </Link>
  );
};

const SectionHead = ({ section }) => (
  <>
    {section.kicker && <p className="pp-kicker">{section.kicker}</p>}
    <h2 className="pp-h2">
      <Lines lines={section.title} />
    </h2>
    {section.lead && <p className="pp-sec-lead">{section.lead}</p>}
  </>
);

const Rows = ({ rows }) => (
  <dl className="pp-rows">
    {rows.map((row) => (
      <div key={row.term} className="pp-row">
        <dt>{row.term}</dt>
        <dd>{row.text}</dd>
      </div>
    ))}
  </dl>
);

const renderSection = (section) => {
  switch (section.type) {
    case 'split':
      return (
        <div className="pp-shell pp-split">
          <div>
            <SectionHead section={section} />
          </div>
          <Rows rows={section.rows} />
        </div>
      );

    case 'cards':
      return (
        <div className="pp-shell">
          <SectionHead section={section} />
          <ul className={`pp-cards pp-cards--${section.columns}`}>
            {section.items.map((item, i) => (
              <li
                key={item.title}
                className={[
                  'pp-card',
                  item.wide ? 'pp-card--wide' : '',
                  item.accent ? 'pp-card--accent' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {section.numbered && (
                  <span className="pp-num" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                )}
                <h3 className="pp-h3">{item.title}</h3>
                <p className="pp-card__text">{item.text}</p>
                {item.flow && (
                  <ol className="pp-flow" aria-label={`${item.title} 단계`}>
                    {item.flow.map((step) => (
                      <li key={step}>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                )}
              </li>
            ))}
          </ul>
        </div>
      );

    case 'list':
      return (
        <div className="pp-shell">
          <SectionHead section={section} />
          <ul className="pp-nots">
            {section.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      );

    case 'editions':
      return (
        <div className="pp-shell">
          <SectionHead section={section} />
          <div className="pp-editions">
            {section.editions.map((edition) => (
              <article
                key={edition.name}
                className={`pp-edition${edition.accent ? ' pp-edition--accent' : ''}`}
              >
                <span className={`pp-pill${edition.accent ? ' pp-pill--accent' : ''}`}>
                  {edition.badge}
                </span>
                <h3 className="pp-edition__name">{edition.name}</h3>
                <p className="pp-edition__who">{edition.who}</p>
                <p className="pp-edition__summary">{edition.summary}</p>
                <ul className="pp-edition__points">
                  {edition.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                {edition.packs && (
                  <ul className="pp-packs" aria-label="기능 팩">
                    {edition.packs.map((pack) => (
                      <li key={pack}>{pack}</li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
          {section.note && <p className="pp-note">{section.note}</p>}
        </div>
      );

    case 'closing':
      return (
        <div className="pp-shell">
          <div className="pp-closing">
            <div>
              {section.kicker && <p className="pp-kicker">{section.kicker}</p>}
              <h2 className="pp-h2">{section.title}</h2>
              <p className="pp-closing__text">{section.text}</p>
            </div>
            {section.action && <Action action={section.action} />}
          </div>
        </div>
      );

    default:
      return null;
  }
};

const ProductPage = ({ page }) => {
  const { hero } = page;
  const { hash } = useLocation();

  // /aster#editions 처럼 닻이 붙은 주소로 들어온 경우. 이 화면은 지연 로드라 브라우저가 닻을 찾을 때
  // 아직 요소가 없고, 셸(App.jsx)이 주소가 바뀔 때 맨 위로 올린다. 그 뒤에 직접 찾아간다.
  // (requestAnimationFrame 은 탭이 가려져 있으면 돌지 않아 타이머를 쓴다.)
  useEffect(() => {
    if (!hash) return undefined;
    const timer = setTimeout(() => {
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView();
    }, 0);
    return () => clearTimeout(timer);
  }, [hash]);

  // 설명 meta 는 index.html 에 이미 하나 있다. 하나 더 올리면 둘이 되므로 있는 것의 값을 바꾸고,
  // 이 화면을 떠날 때 되돌린다.
  useEffect(() => {
    const meta = document.querySelector('meta[name="description"]');
    if (!meta) return undefined;
    const before = meta.getAttribute('content');
    meta.setAttribute('content', page.description);
    return () => meta.setAttribute('content', before ?? '');
  }, [page.description]);

  return (
    <div className="pp-surface">
      {/* React 19 는 title·meta 를 <head> 로 올려 준다. 이 화면을 떠나면 함께 걷힌다. */}
      <title>{page.docTitle}</title>
      {page.noindex && <meta name="robots" content="noindex" />}

      <nav className="pp-nav" aria-label="제품 소개">
        <div className="pp-shell pp-nav__inner">
          <Link className="pp-nav__back" to="/">
            <span aria-hidden="true">←</span> GIJO Tour LaB
          </Link>
          <ul className="pp-nav__links">
            {PAGES.map((other) => (
              <li key={other.id}>
                <Link to={other.path} aria-current={other.id === page.id ? 'page' : undefined}>
                  {other.navName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <header className="pp-hero">
        <div className="pp-shell">
          <ul className="pp-eyebrow">
            {hero.pills.map((pill) => (
              <li key={pill.text} className={`pp-pill${pill.accent ? ' pp-pill--accent' : ''}`}>
                {pill.text}
              </li>
            ))}
          </ul>
          <h1 className="pp-h1">
            {hero.title}{' '}
            <span className="pp-h1__sub">{hero.subtitle}</span>
          </h1>
          <p className="pp-lead">{hero.lead}</p>
          {hero.actions && (
            <div className="pp-actions">
              {hero.actions.map((action) => (
                <Action key={action.label} action={action} />
              ))}
            </div>
          )}
          {hero.notice && (
            <p className="pp-notice">
              <strong>{hero.notice.strong}</strong> {hero.notice.text}
            </p>
          )}
        </div>
      </header>

      {page.sections.map((section, i) => (
        <section
          key={section.id ?? `${section.type}-${i}`}
          id={section.id}
          className={`pp-section pp-section--${section.type}`}
        >
          {renderSection(section)}
        </section>
      ))}

      <footer className="pp-foot">
        <div className="pp-shell pp-foot__inner">
          <span className="pp-foot__brand">GIJO Tour LaB</span>
          <span>© {new Date().getFullYear()} GIJO Tour LaB. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
};

export default ProductPage;
