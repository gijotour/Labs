import { Link, Navigate, useLocation } from 'react-router-dom';
import { GAMES, GROUPS, playUrl } from './games';
import './games.css';

/**
 * 게임 목록 (/games).
 *
 * GIJO Arcade · GIJO Drink 에 든 게임을 하나씩 목록으로 보여 주고, 누르면 그 게임이 바로 열린다.
 * 게임 자체는 각자의 앱(다른 저장소)에 있다. 이 화면은 목록과 바로가기만 가진다.
 * 내비·푸터·스타일(.gm-*)은 이 폴더가 소유한다. 게임을 더하는 법은 games.js 머리에 있다.
 */
const GamesApp = () => {
  const { pathname } = useLocation();
  // 하위 주소는 없다. /games/아무거나 → /games
  if (pathname.replace(/\/+$/, '') !== '/games') return <Navigate to="/games" replace />;

  return (
    <div className="gm-surface">
      <title>게임 목록 — GIJO Tour</title>

      <div className="gm-shell">
        <nav className="gm-nav" aria-label="게임 목록 내비게이션">
          <Link className="gm-nav__back" to="/travel">
            <span aria-hidden="true">←</span> 투어 서비스
          </Link>
          <span className="gm-nav__count">게임 {GAMES.length}개</span>
        </nav>

        <header className="gm-hero">
          <h1 className="gm-hero__title">게임 목록</h1>
          <p className="gm-hero__lead">
            설치 없이 브라우저에서 바로 엽니다. 누르면 새 탭에서 그 게임이 열립니다.
            게임 앱을 연 뒤 브라우저 메뉴에서 「홈 화면에 추가」를 누르면 폰에 담겨 인터넷 없이도 열립니다.
          </p>
        </header>

        {GROUPS.map((group) => {
          const games = GAMES.filter((g) => g.group === group.id);
          return (
            <section className="gm-group" key={group.id} aria-labelledby={`gm-${group.id}`}>
              <div className="gm-group__head">
                <h2 className="gm-group__title" id={`gm-${group.id}`}>
                  {group.title} <span className="gm-group__num">{games.length}</span>
                </h2>
                <p className="gm-group__note">
                  {group.note} ·{' '}
                  <Link className="gm-group__intro" to={group.intro}>
                    소개 보기
                  </Link>
                </p>
              </div>

              <ul className="gm-list">
                {games.map((game) => (
                  <li key={game.id}>
                    <a
                      className="gm-row"
                      href={playUrl(game)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${game.name} 열기 (새 탭)`}
                    >
                      <span className="gm-row__icon" aria-hidden="true">
                        {game.icon}
                      </span>
                      <span className="gm-row__text">
                        <span className="gm-row__name">{game.name}</span>
                        <span className="gm-row__desc">{game.desc}</span>
                      </span>
                      <span className="gm-row__go" aria-hidden="true">
                        열기 →
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}

        <footer className="gm-foot">
          <span>GIJO Tour</span>
          <span>© {new Date().getFullYear()} GIJO Tour. All rights reserved.</span>
        </footer>
      </div>
    </div>
  );
};

export default GamesApp;
