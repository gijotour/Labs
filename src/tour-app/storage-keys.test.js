import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

/**
 * CLAUDE.md 서비스 경계 규칙 3: 투어의 localStorage 키는 gijotour_ 로 시작한다.
 * 접두사 없는 gijo_* 는 서비스가 늘면 다른 서비스와 충돌한다.
 */
const dir = resolve(import.meta.dirname);
const files = [];
const walk = (d) => {
  for (const name of readdirSync(d)) {
    const p = join(d, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(jsx?|tsx?)$/.test(name) && !name.includes('.test.')) files.push(p);
  }
};
walk(dir);

describe('투어 localStorage 키', () => {
  const keys = [];
  for (const f of files) {
    for (const m of readFileSync(f, 'utf8').matchAll(/localStorage\.(?:get|set|remove)Item\(\s*['"`]([^'"`]+)['"`]/g)) {
      keys.push({ file: f.slice(dir.length + 1), key: m[1] });
    }
  }

  it('키를 실제로 모았다(헛통과 방지)', () => {
    expect(keys.length).toBeGreaterThanOrEqual(5);
  });

  it('모든 키가 gijotour_ 로 시작한다', () => {
    expect(keys.filter((k) => !k.key.startsWith('gijotour_'))).toEqual([]);
  });
});
