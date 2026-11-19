import { Navigate, useLocation } from 'react-router-dom';
import ProductPage from './ProductPage';
import { findPage } from './content';

/**
 * 제품 소개 페이지 서비스 (/aster · /gster).
 *
 * 이 폴더가 내비·푸터·스타일·글을 전부 소유한다. Labs 셸(App.jsx)과 투어에서 아무것도 가져오지 않는다.
 * 상태가 없는 읽기 전용 화면이라 localStorage 를 쓰지 않는다(쓰게 되면 접두사는 `gijopp_`).
 *
 * App.jsx 의 SERVICES 가 `<ProductPagesApp page="aster" />` 처럼 어느 글을 보일지 넘긴다.
 * App.jsx 는 하위 경로(/aster/무엇)도 전부 이 컴포넌트로 보낸다. 소개 페이지는 한 장뿐이므로
 * 하위 경로는 정본 주소로 되돌린다(같은 글이 여러 주소로 검색에 잡히지 않게).
 */
const ProductPagesApp = ({ page: pageId }) => {
  const { pathname, hash } = useLocation();
  const page = findPage(pageId);
  if (!page) return <Navigate to="/" replace />;
  if (pathname.replace(/\/+$/, '') !== page.path) {
    return <Navigate to={{ pathname: page.path, hash }} replace />;
  }
  return <ProductPage page={page} />;
};

export default ProductPagesApp;
