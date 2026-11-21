import { Link, Navigate, useLocation } from 'react-router-dom';
import { RULES, playUrl } from './casino';
import './casino.css';

/**
 * 카지노 룰 이해하기 (/casino).
 *
 * 여행지 카지노에서 자주 보는 게임의 규칙을 쉬운 말로 설명하고, GIJO Arcade 의 연습판으로 보낸다.
 * 연습판 자체는 다른 저장소(gijoarcade)에 있다. 이 화면은 설명과 바로가기만 가진다.
 * 내비·푸터·스타일(.cs-*)은 이 폴더가 소유한다. 게임을 더하는 법은 casino.js 머리에 있다.
 */
const CasinoApp = () => {
  const { pathname } = useLocation();
  // 하위 주소는 없다. /casino/아무거나 → /casino
  if (pathname.replace(/\/+$/, '') !== '/casino') return <Navigate to="/casino" replace />;

  return (
    <div className="cs-surface">
      <title>카지노 룰 이해하기 — GIJO Tour</title>

      <div className="cs-shell">
        <nav className="cs-nav" aria-label="카지노 룰 내비게이션">
          <Link className="cs-nav__back" to="/games">
            <span aria-hidden="true">←</span> 게임 목록
          </Link>
          <span className="cs-nav__count">게임 {RULES.length}개</span>
        </nav>

        <header className="cs-hero">
          <p className="cs-hero__kicker">♠ ♥ ♣ ♦</p>
          <h1 className="cs-hero__title">카지노 룰 이해하기</h1>
          <p className="cs-hero__lead">
            여행지에서 처음 테이블 앞에 서도 당황하지 않게, 규칙을 쉬운 말로 정리했습니다. 읽고 나서
            연습판을 열면 가상 칩으로 직접 해 볼 수 있습니다.
          </p>
          <p className="cs-hero__note">가상 칩으로 규칙만 익히는 연습판입니다. 현금 거래와 환전은 없습니다.</p>

          <ul className="cs-jump" aria-label="게임 바로가기">
            {RULES.map((rule) => (
              <li key={rule.id}>
                <a className="cs-jump__chip" href={`#${rule.id}`}>
                  <span aria-hidden="true">{rule.icon}</span> {rule.name}
                </a>
              </li>
            ))}
          </ul>
        </header>

        {RULES.map((rule) => (
          <article className="cs-card" id={rule.id} key={rule.id} aria-labelledby={`cs-${rule.id}`}>
            <header className="cs-card__head">
              <span className="cs-card__icon" aria-hidden="true">
                {rule.icon}
              </span>
              <div className="cs-card__titles">
                <h2 className="cs-card__title" id={`cs-${rule.id}`}>
                  {rule.name} <span className="cs-card__en">{rule.en}</span>
                </h2>
                <p className="cs-card__one">{rule.oneLine}</p>
              </div>
            </header>

            <p className="cs-card__goal">{rule.goal}</p>

            <div className="cs-card__grid">
              <section className="cs-block">
                <h3 className="cs-block__title">알아 둘 것</h3>
                <dl className="cs-pairs">
                  {rule.values.map(([key, value]) => (
                    <div className="cs-pairs__row" key={key}>
                      <dt>{key}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
              </section>

              <section className="cs-block">
                <h3 className="cs-block__title">진행 순서</h3>
                <ol className="cs-steps">
                  {rule.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </section>

              <section className="cs-block">
                <h3 className="cs-block__title">배당</h3>
                <dl className="cs-pairs cs-pairs--pay">
                  {rule.payouts.map(([key, value]) => (
                    <div className="cs-pairs__row" key={key}>
                      <dt>{key}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            </div>

            <p className="cs-card__tip">
              <span aria-hidden="true">💡</span> {rule.tip}
            </p>

            <a
              className="cs-card__play"
              href={playUrl(rule)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${rule.name} 연습판 열기 (새 탭)`}
            >
              {rule.name} 연습판 열기 <span aria-hidden="true">→</span>
            </a>
          </article>
        ))}

        <footer className="cs-foot">
          <span>GIJO Tour</span>
          <span>© {new Date().getFullYear()} GIJO Tour. All rights reserved.</span>
        </footer>
      </div>
    </div>
  );
};

export default CasinoApp;
