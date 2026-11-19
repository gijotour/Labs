import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/**
 * 제품 타일 격자 + 실행 잠금.
 *
 * 원래 GijoLab.jsx 안에 있던 것을 그대로 옮겼다. 허브가 기술/투어 두 화면으로 나뉘면서
 * 두 화면이 같은 격자를 쓴다. 타일 크기와 순서 규칙은 products.js 주석 참조.
 */

/**
 * 실행 잠금 코드.
 *
 * 이건 보안 장치가 아니다. 이 값은 프론트 번들에 그대로 실려 나가므로
 * 개발자 도구를 열거나 소스를 보면 누구나 읽을 수 있다.
 * 지나가는 방문자가 바로 못 열게 하는 문턱일 뿐이다.
 * 진짜로 막아야 한다면 서버 인증이 필요하다.
 */
const ACCESS_CODE = '0070';

const ProductGrid = ({ products }) => {
  const navigate = useNavigate();

  const [gate, setGate] = useState(null); // { id, kind, target }
  const [pw, setPw] = useState('');
  const [gateError, setGateError] = useState('');

  const openGate = (proj) => {
    setGate(
      proj.internal
        ? { id: proj.id, kind: 'internal', target: proj.internal }
        : { id: proj.id, kind: 'external', target: proj.live }
    );
    setPw('');
    setGateError('');
  };

  const closeGate = () => {
    setGate(null);
    setPw('');
    setGateError('');
  };

  const submitGate = (e) => {
    e.preventDefault();
    if (pw !== ACCESS_CODE) {
      setGateError('비밀번호가 올바르지 않습니다.');
      return;
    }
    const { kind, target } = gate;
    closeGate();
    // window.open 은 이 제출 핸들러(사용자 제스처) 안에서 호출해야 팝업 차단을 피한다
    if (kind === 'internal') navigate(target);
    else window.open(target, '_blank', 'noopener,noreferrer');
  };

  return (
    <ul className="lab-products__grid">
      {products.map((proj, i) => (
        <li
          key={proj.id}
          className={[
            'lab-tile',
            proj.span === 2 ? 'lab-tile--wide' : '',
            proj.featured ? 'lab-tile--featured' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          style={{ '--i': i }}
        >
          <div className="lab-tile__body">
            <div className="lab-tile__top">
              <h3 className="lab-tile__name">{proj.name}</h3>
              {proj.status && <span className="lab-tile__tag">{proj.status}</span>}
            </div>

            <p className="lab-tile__desc">{proj.summary}</p>

            <p className="lab-tile__meta">
              {proj.lang}
              {proj.updated && ` · 업데이트 ${proj.updated}`}
            </p>

            {/* 사업 사이트는 잠금 없이 바로 연다. 상담 동선을 막을 이유가 없다. */}
            {proj.site && (
              <a className="lab-tile__cta" href={proj.site} target="_blank" rel="noopener noreferrer">
                바로가기 <span className="lab-arrow" aria-hidden="true">→</span>
              </a>
            )}

            {/* 소개 페이지는 잠금 없이 연다. 공개가 목적인 글이라 막을 이유가 없다. */}
            {proj.page && (
              <Link className="lab-tile__cta" to={proj.page} aria-label={`${proj.name} 소개 보기`}>
                소개 보기 <span className="lab-arrow" aria-hidden="true">→</span>
              </Link>
            )}

            {/* 코드(저장소) 링크는 노출하지 않는다. 실행 가능한 것만 잠금 뒤에 둔다. */}
            {(proj.internal || proj.live) &&
              (gate?.id === proj.id ? (
                <form className="lab-gate" onSubmit={submitGate}>
                  <input
                    type="password"
                    inputMode="numeric"
                    autoFocus
                    value={pw}
                    onChange={(e) => setPw(e.target.value)}
                    placeholder="비밀번호"
                    aria-label={`${proj.name} 비밀번호`}
                  />
                  <button type="submit" className="lab-gate__ok">확인</button>
                  <button type="button" className="lab-gate__cancel" onClick={closeGate}>
                    취소
                  </button>
                  {gateError && (
                    <span className="lab-gate__error" role="alert">{gateError}</span>
                  )}
                </form>
              ) : (
                <button
                  type="button"
                  className="lab-tile__cta"
                  onClick={() => openGate(proj)}
                  aria-label={`${proj.name} ${proj.internal ? '열기' : '실행'}`}
                >
                  {proj.internal ? '열기' : '실행'}{' '}
                  <span className="lab-arrow" aria-hidden="true">→</span>
                </button>
              ))}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ProductGrid;
