import { Link } from 'react-router-dom';
// GIJO 공식 심볼. gijo.ai 의 logo_gijo_white.svg 에서 마크 부분만 잘라낸 것이다.
// 기존 logo.png 는 229KB 였는데 이건 3KB 다.
import markImg from '../assets/gijo-mark.png';
import { PRODUCTS } from './products';
import { SECTIONS } from './sections';
import { LAB_STYLES } from './labStyles';
// 이 화면은 .lab-surface 위에서 --t-* 토큰을 쓴다. 토큰 정의는 tour-theme.css 에 있다.
// 예전에는 App.jsx 가 GijoTourApp 을 정적 import 하는 바람에 이 CSS 가 우연히 딸려 왔다.
// 투어를 React.lazy 로 분할하면서 그 우연이 끊겨 Labs 허브의 카드 배경·테두리가 전부 사라졌다.
// 부모(Labs)가 자식(투어)의 CSS 에 의존하는 구조 자체는 여전히 잘못됐다 -> 05-next.md [N-8].
// 여기서는 의존을 명시만 한다. 분리는 CSS 캐스케이드 정리([N-5]) 뒤에 한다.
import '../tour-app/tour-theme.css';

/**
 * GIJO LABS 허브 (/).
 *
 * 2026-11-19 — 제품 타일 한 목록이던 화면을 **두 문**으로 바꿨다.
 *   보안·AI 기술(/tech)과 여행 서비스(/travel)는 찾는 사람이 다르다. 한 목록에 섞어 두면
 *   보안담당자는 술게임 타일을, 여행 고객은 보안 제품 타일을 지나쳐야 했다.
 *   타일 격자는 갈래 화면(LabsSection.jsx)으로 옮겼고, 스타일은 labStyles.js 가 쥔다.
 *
 * 디자인 기준 (design-taste-frontend 감사 후 재작성, 2026-09-02)
 *   · 모서리 반경 체계를 하나로 고정한다: 타일 14px, 배지/알약 999px, 입력·버튼 10px.
 *   · 액센트는 브랜드 시안(--t-accent) 하나만 쓴다. 페이지 어디서도 바꾸지 않는다.
 *   · 모션은 CSS 만 쓴다(이 저장소에 모션 라이브러리가 없다).
 *     transform/opacity 만 건드리고 prefers-reduced-motion 에서 전부 끈다.
 *   · 타일은 타이포만 쓴다. 가짜 div 목업은 만들지 않는다.
 */
const GijoLab = () => (
  <div className="lab-surface lab-hub page-fade-in">
    <div className="lab-shell">
      <header className="lab-intro">
        <div className="lab-intro__copy">
          {/* 마크만 둔다. 브랜드 이름은 아래 푸터와 문서 제목이 말한다. */}
          <div className="lab-intro__brand">
            <img src={markImg} alt="GIJO Tour LaB" className="lab-intro__logo" />
          </div>

          <h1 className="lab-intro__title">
            보안·AI 기술과
            <br />
            여행 서비스를 만듭니다
          </h1>
          <p className="lab-lead">두 갈래로 나눠 소개합니다. 찾으시는 쪽으로 들어가세요.</p>
        </div>
      </header>

      {/* ── 두 문 ── 어느 제품이 어느 갈래인지는 products.js 의 group 칸이 정한다. */}
      <nav aria-label="사업 분야">
        <ul className="lab-doors">
          {SECTIONS.map((section) => (
            <li key={section.id}>
              <Link
                className={`lab-door${section.accent ? ' lab-door--accent' : ''}`}
                to={section.path}
              >
                <span className={`lab-pill${section.accent ? ' lab-pill--accent' : ''}`}>
                  {section.door.pill}
                </span>
                <h2 className="lab-door__title">{section.door.title}</h2>
                <p className="lab-door__desc">{section.door.desc}</p>
                <ul className="lab-door__items">
                  {PRODUCTS.filter((p) => p.group === section.id && !p.hideOnDoor).map((p) => (
                    <li key={p.id}>{p.name}</li>
                  ))}
                </ul>
                <span className="lab-door__cta">
                  {section.door.cta} <span className="lab-arrow" aria-hidden="true">→</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <footer className="lab-foot">
        <span className="lab-foot__brand">GIJO Tour LaB</span>
        <span className="lab-foot__copy">
          © {new Date().getFullYear()} GIJO Tour LaB. All rights reserved.
        </span>
      </footer>
    </div>

    <style>{LAB_STYLES}</style>
  </div>
);

export default GijoLab;
