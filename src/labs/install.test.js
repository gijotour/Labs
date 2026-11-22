import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

/**
 * 「홈 화면에 추가」 감시.
 *
 * 폰 설치는 매니페스트·아이콘·index.html 의 연결이 하나라도 끊기면 조용히 안 된다.
 * 화면에는 아무 오류도 안 뜨므로 여기서 잡는다.
 */
const root = resolve(import.meta.dirname, '../..');
const manifest = JSON.parse(readFileSync(resolve(root, 'public/manifest.json'), 'utf8'));
const html = readFileSync(resolve(root, 'index.html'), 'utf8');

describe('홈 화면에 추가(설치) 정보', () => {
  it('매니페스트가 설치에 필요한 칸을 갖춘다', () => {
    expect(manifest.name).toBe('GIJO Tour LaB');
    expect(manifest.short_name.length).toBeLessThanOrEqual(12);
    expect(manifest.start_url).toBe('/');
    expect(manifest.scope).toBe('/');
    expect(manifest.display).toBe('standalone');
  });

  it('192·512 아이콘이 있고 파일이 실제로 있다', () => {
    const sizes = manifest.icons.map((i) => i.sizes);
    expect(sizes).toContain('192x192');
    expect(sizes).toContain('512x512');
    expect(manifest.icons.some((i) => i.purpose === 'maskable')).toBe(true);
    for (const icon of manifest.icons) {
      expect(icon.src.startsWith('/')).toBe(true);
      expect(existsSync(resolve(root, 'public', icon.src.slice(1)))).toBe(true);
    }
  });

  it('index.html 이 매니페스트와 아이폰용 아이콘을 가리킨다', () => {
    expect(html).toContain('<link rel="manifest" href="/manifest.json" />');
    const touch = html.match(/<link rel="apple-touch-icon" href="\/([^"]+)"/);
    expect(touch).not.toBeNull();
    expect(existsSync(resolve(root, 'public', touch[1]))).toBe(true);
  });

  it('서비스워커를 등록하지 않는다 — 새로 배포한 판이 캐시에 가려지지 않게', () => {
    expect(html).not.toContain('serviceWorker');
  });
});
