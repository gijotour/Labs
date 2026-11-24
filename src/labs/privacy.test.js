import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

/**
 * 플레이 스토어 등록용 개인정보처리방침(public/privacy/index.html)과 앱 주소(/games/secmusou) 감시.
 *
 * 스토어 심사는 이 주소가 열리고, 앱이 실제로 하는 일과 글이 맞는지 본다.
 * 앱이 정보를 모으기 시작했는데 이 글이 「수집 없음」으로 남으면 정책 위반이 된다.
 */
const root = resolve(import.meta.dirname, '../..');
const html = readFileSync(resolve(root, 'public/privacy/index.html'), 'utf8');
const toml = readFileSync(resolve(root, 'netlify.toml'), 'utf8');
const text = html.replace(/<!--[\s\S]*?-->/g, '').replace(/<[^>]+>/g, ' ');

describe('개인정보처리방침', () => {
  it('스크립트 없이 본문이 읽힌다(심사 크롤러용)', () => {
    expect(html).not.toMatch(/<script/i);
    expect(text).toMatch(/개인정보처리방침/);
    expect(text).toMatch(/시행일 \d{4}년 \d{1,2}월 \d{1,2}일/);
  });

  it('적용 앱과 운영 회사·문의처를 밝힌다', () => {
    expect(text).toMatch(/보안무쌍/);
    expect(text).toMatch(/\(주\)지아이조테크놀로지/);
    expect(html).toContain('mailto:gijo@gijo.co.kr');
  });

  it('내부 정보 꼴이 없다', () => {
    expect(text).not.toMatch(/\b\d{1,3}(\.\d{1,3}){3}\b/);
    expect(text).not.toMatch(/localhost|gb10|vpn|password|비밀번호/i);
    expect(text).not.toMatch(/\d{2,3}-\d{3,4}-\d{4}/); // 전화번호
  });
});

describe('보안무쌍 앱 주소', () => {
  it('/games/secmusou 를 GitHub Pages 로 대리 전송하고, SPA 폴백보다 먼저 온다', () => {
    const proxy = toml.indexOf('to = "https://gijotour.github.io/secmusou/:splat"');
    const fallback = toml.indexOf('from = "/*"');
    expect(proxy).toBeGreaterThan(-1);
    expect(proxy).toBeLessThan(fallback);
    expect(toml).toMatch(/from = "\/games\/secmusou\/\*"\s+to = "https:\/\/gijotour\.github\.io\/secmusou\/:splat"\s+status = 200/);
  });

  it('끝 빗금만 붙이는 넘기기 규칙이 없다(Netlify 에서는 자기 자신으로 도는 고리가 된다)', () => {
    expect(toml).not.toMatch(/from = "\/games\/secmusou"\s/);
  });
});
