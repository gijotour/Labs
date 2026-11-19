import { ASTER } from './aster';
import { GSTER } from './gster';

/** 소개 페이지 목록. 제품 소개를 더할 때 글 파일을 만들고 여기에 한 줄 넣는다. */
export const PAGES = [ASTER, GSTER];

export const findPage = (id) => PAGES.find((page) => page.id === id) ?? null;
