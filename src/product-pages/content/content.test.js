import { describe, it, expect } from 'vitest';
import { PAGES, findPage } from './index';
import { ASTER } from './aster';
import { GSTER } from './gster';
import { MDSTUDIO } from './mdstudio';
import { SECTIONS } from '../../labs/sections';
import { PRODUCTS } from '../../labs/products';

/**
 * 공개 문안 감시.
 *
 * 이 글들은 gijo.co.kr 번들에 실려 누구나 읽는다. 승인된 표기 규칙이 조용히 깨지는 것을 막는다.
 * 헛통과 방지: 글을 하나도 못 모으면 「0건 발견」으로 늘 통과하므로, 모은 글의 양을 함께 확인한다.
 */

/** 객체 안의 모든 문자열을 모은다. */
const collect = (value, out = []) => {
  if (typeof value === 'string') out.push(value);
  else if (Array.isArray(value)) value.forEach((v) => collect(v, out));
  else if (value && typeof value === 'object') Object.values(value).forEach((v) => collect(v, out));
  return out;
};

const tiles = PRODUCTS.filter((p) => p.page);
const allText = [...collect(PAGES), ...collect(tiles), ...collect(SECTIONS)];
const joined = allText.join('\n');

describe('제품 소개 문안 — 공개 규칙', () => {
  it('글을 실제로 읽었다 (헛통과 방지)', () => {
    expect(PAGES).toHaveLength(7);
    expect(tiles).toHaveLength(7);
    expect(SECTIONS).toHaveLength(2);
    expect(allText.length).toBeGreaterThan(150);
  });

  it('이름 풀이는 「GIJO ASTER — 자율 보안 운영 시스템」으로 고정', () => {
    expect(ASTER.docTitle).toBe('GIJO ASTER — 자율 보안 운영 시스템');
    expect(ASTER.hero.title).toBe('GIJO ASTER');
    expect(ASTER.hero.subtitle).toBe('자율 보안 운영 시스템');
  });

  it('옛 이름 「GIJO AS」를 쓰지 않는다', () => {
    // 「GIJO ASTER」는 통과, 「GIJO AS」 단독은 실패
    expect(joined).not.toMatch(/GIJO AS(?!TER)/);
  });

  it('라이트는 「프로모션 버전」이고 「무료」라고 쓰지 않는다', () => {
    expect(joined).not.toMatch(/무료|공짜|free/i);
    const editions = ASTER.sections.find((s) => s.type === 'editions').editions;
    expect(editions.map((e) => e.name)).toEqual(['라이트', '표준']);
    expect(editions[0].badge).toBe('프로모션 버전');
  });

  it('내부 정보 꼴이 없다 (IP·포트·경로·원장 번호·기계 이름)', () => {
    expect(joined).not.toMatch(/\b\d{1,3}(\.\d{1,3}){3}\b/); // IP
    expect(joined).not.toMatch(/localhost|:\d{4,5}\b/); // 포트
    expect(joined).not.toMatch(/[A-Za-z]:\\|\/home\/|\.gguf/); // 경로·모델 파일
    expect(joined).not.toMatch(/\bT-\d{3,}\b/); // 원장 번호
    expect(joined).not.toMatch(/gb10|vpn|password|비밀번호/i);
  });

  it('Gster 는 사내 도구로만 소개한다', () => {
    expect(GSTER.noindex).toBe(true);
    expect(GSTER.hero.pills.map((p) => p.text)).toEqual(['사내 도구', '판매 상품 아님']);
    expect(GSTER.hero.actions).toBeUndefined(); // 문의·구매 동선 없음
    const gsterText = collect(GSTER).join('\n');
    expect(gsterText).not.toMatch(/가격|구매|도입 문의|파일럿|에디션/);
  });

  it('ASTER 는 검색에 노출하고 문의는 본업 사이트로만 보낸다', () => {
    expect(ASTER.noindex).toBe(false);
    const externals = collect(ASTER).filter((s) => /^https?:\/\//.test(s));
    expect(externals).toEqual(['https://gijo.ai/gijohome/user/productInquiries/product_inquiries']);
    expect(joined).not.toMatch(/@[a-z0-9-]+\.[a-z]{2,}|\d{2,3}-\d{3,4}-\d{4}/i); // 메일·전화
  });

  it('만든 곳 표기 — ASTER 는 회사 이름, Gster 는 허브 이름(기본값)', () => {
    expect(ASTER.maker).toBe('지아이조 테크놀로지');
    expect(GSTER.maker).toBeUndefined();
  });

  it('MD Studio 는 웹판과 저장소 릴리즈로만 내보내고, ASTER 로 이어 쓴다고 적지 않는다', () => {
    const externals = collect(MDSTUDIO).filter((s) => /^https?:\/\//.test(s));
    // 웹판(설치 없이 여는 주소)을 먼저, 데스크톱 설치판(릴리즈 목록)을 그다음에 둔다. 그 밖의 바깥 주소는 없다.
    expect(externals).toEqual([
      'https://gijotour.github.io/gijo-smart-md-studio/',
      'https://github.com/gijotour/gijo-smart-md-studio/releases',
    ]);
    const text = collect(MDSTUDIO).join('\n');
    expect(text).not.toMatch(/반입|이어 쓸 수|이어 쓰려면|연동|가격|유료/);
  });

  it('갈래 글에 가격이 없고 문의는 본업 사이트 제품문의로만 간다', () => {
    const text = collect(SECTIONS).join('\n');
    expect(text).not.toMatch(/\d+\s*(원|만원|달러)|₩|\$/);
    const externals = collect(SECTIONS).filter((s) => /^https?:\/\//.test(s));
    expect(externals).toEqual(['https://gijo.ai/gijohome/user/productInquiries/product_inquiries']);
  });

  it('주소와 글이 짝을 이룬다', () => {
    expect(findPage('aster').path).toBe('/aster');
    expect(findPage('gster').path).toBe('/gster');
    expect(findPage('없는것')).toBeNull();
    for (const tile of tiles) {
      expect(PAGES.map((p) => p.path)).toContain(tile.page);
    }
  });
});

describe('여행길 앱·BridgeAI 소개', () => {
  it('Drink 에 연령 표기를 쓰지 않는다', () => {
    const drink = collect([findPage('drink')]).join('\n');
    expect(drink).not.toMatch(/19\s*세|19금|18\+|성인|미성년/);
  });

  it('BridgeAI 에 기계·제품 이름을 쓰지 않는다', () => {
    const bridge = collect([findPage('bridgeai')]).join('\n');
    expect(bridge).not.toMatch(/GB10|RTX|Mac Studio|M4|4090/);
  });

  it('투어 쪽 소개는 투어 갈래로 돌아간다', () => {
    for (const id of ['talk', 'arcade', 'drink']) {
      expect(findPage(id).back.to).toBe('/travel');
    }
  });
});

describe('갈래와 타일 격자', () => {
  it('모든 제품이 갈래 하나에 속한다', () => {
    const groups = SECTIONS.map((s) => s.id);
    expect(groups).toEqual(['tech', 'travel']);
    for (const p of PRODUCTS) expect(groups).toContain(p.group);
  });

  it.each(['tech', 'travel'])('%s 갈래는 행마다 정확히 3칸을 채운다', (group) => {
    const list = PRODUCTS.filter((p) => p.group === group);
    expect(list.length).toBeGreaterThan(0);
    let row = 0;
    for (const p of list) {
      row += p.span ?? 1;
      expect(row).toBeLessThanOrEqual(3);
      if (row === 3) row = 0;
    }
    expect(row).toBe(0);
  });

  it('제품 구성(단계)의 링크는 실제 소개 페이지로 간다', () => {
    const steps = SECTIONS.find((s) => s.id === 'tech').ladder.steps;
    expect(steps).toHaveLength(3);
    for (const step of steps) {
      expect(PAGES.map((p) => p.path)).toContain(step.to.split('#')[0]);
    }
    expect(steps[1].label).toBe('프로모션 버전');
  });

  it('사내 도구는 허브의 문에 이름을 올리지 않는다', () => {
    expect(PRODUCTS.find((p) => p.id === 'gster').hideOnDoor).toBe(true);
  });
});
