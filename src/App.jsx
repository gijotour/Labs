import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import GijoLab from './labs/GijoLab';
import GijoTourApp from './tour-app/GijoTourApp';

/**
 * GIJO LABS 셸.
 *
 * GIJO LABS 가 상위 브랜드이고(랜딩: https://gijo.co.kr/ = 이 앱의 `/`),
 * 지아이조 투어는 그 아래 서비스 **하나**다. 서비스는 앞으로 늘어난다.
 *
 * 이 파일이 지켜야 할 규칙:
 *
 *  1. 여기에는 **어떤 서비스의 상태도 두지 않는다.**
 *     인증·세션·도메인 데이터는 각 서비스가 자기 안에서 소유한다.
 *     (예전에는 투어의 로그인 상태가 이 파일에 있어서, 서비스가 하나 더 붙으면
 *      투어 세션을 그대로 물려받는 구조였다.)
 *
 *  2. 내비게이션바·푸터 같은 **크롬도 서비스가 각자 렌더한다.**
 *     예전에는 여기서 투어 내비를 그리면서 "Labs 화면이 아니면 붙인다"는
 *     부정 목록(`pathname !== '/' && !== '/security' && …`)을 썼다.
 *     그 방식이면 새 서비스를 추가하는 순간 투어 내비가 조용히 따라붙는다.
 *
 *  3. 서비스를 추가할 때는 아래 SERVICES 에 한 줄 넣는 것으로 끝나야 한다.
 *     이 파일의 다른 곳을 고쳐야 한다면, 그건 경계가 새고 있다는 신호다.
 */

/** GIJO LABS 아래에 붙는 서비스 목록. 각 서비스는 자기 경로 하위를 전부 소유한다. */
const SERVICES = [
  {
    id: 'gijotour',
    name: '지아이조 투어',
    basePath: '/gijotour',
    element: <GijoTourApp />,
  },
  // 새 서비스는 여기에 추가한다. 예:
  // { id: 'gijopay', name: '지아이조 페이', basePath: '/gijopay', element: <GijoPayApp /> },
];

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="app-main">
      <main>
        <Routes location={location} key={location.pathname}>
          {/* ── GIJO LABS 자체 화면 ── */}
          <Route path="/" element={<GijoLab />} />

          {/* ── 서비스 ── 각 서비스가 자기 내비·푸터·인증을 소유한다 */}
          {SERVICES.map((service) => (
            <Route key={service.id} path={`${service.basePath}/*`} element={service.element} />
          ))}

          {/* 없는 주소는 Labs 허브로 되돌린다.
              /security 와 /llm 은 예전에 연구 포털이 쓰던 주소로 실제 서비스 중이었다.
              북마크나 외부 링크가 빈 화면을 받지 않게 한다. */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
export { SERVICES };
