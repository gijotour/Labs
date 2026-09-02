/**
 * public/assets 의 지역 사진을 PNG -> JPEG 로 재인코딩한다.
 *
 * 사진이라 PNG 는 압축이 거의 안 먹는다(장당 0.8~1MB). 표시 크기는
 * 카드 200px / 모달 기준이라 1024px 원본을 유지해도 품질 78 이면 충분하다.
 * jimp 1.6 은 WebP 인코딩을 지원하지 않아 JPEG 를 쓴다.
 *
 * 실행: node scripts/compress-assets.mjs
 */
import { Jimp } from 'jimp';
import { stat } from 'node:fs/promises';
import path from 'node:path';

const DIR = 'public/assets';
const QUALITY = 78;
const TARGETS = ['bangkok.png', 'danang.png', 'laos.png', 'tagaytay.png'];

let saved = 0;
for (const name of TARGETS) {
  const src = path.join(DIR, name);
  const out = path.join(DIR, name.replace(/\.png$/, '.jpg'));
  const before = (await stat(src)).size;
  const img = await Jimp.read(src);
  await img.write(out, { quality: QUALITY });
  const after = (await stat(out)).size;
  saved += before - after;
  console.log(
    `${name.padEnd(14)} ${img.bitmap.width}x${img.bitmap.height}  ` +
      `${(before / 1024).toFixed(0).padStart(5)}KB -> ${(after / 1024).toFixed(0).padStart(4)}KB  ` +
      `(-${(100 - (after / before) * 100).toFixed(1)}%)`
  );
}
console.log(`총 ${(saved / 1024 / 1024).toFixed(2)}MB 절감`);
