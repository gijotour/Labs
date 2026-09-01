/**
 * GIJO LABS 핵심 사업 - 취급 보안 솔루션.
 *
 * 출처: https://gijo.ai/gijohome/user/main/user_main 의 Best Brand 섹션.
 * 브랜드 목록은 그 페이지에서 실제로 확인한 것이고, 지어내지 않았다.
 *
 * `covers` 는 각 벤더의 대표 제품군을 일반적으로 알려진 범위로만 적는다.
 * 특정 계약이나 판권 범위를 여기서 주장하지 않는다. 그건 영업 문서의 영역이다.
 *
 * 로고를 쓰지 않는 이유:
 *   Simple Icons 에 이 벤더들이 없다(전부 404). 일부만 로고를 쓰면 더 지저분해진다.
 *   그리고 유통사 페이지에서는 "어느 브랜드인가"보다 "무슨 문제를 푸는가"가
 *   방문자에게 실제 정보다. 신뢰용 로고월과 성격이 다르다.
 */
export const VENDORS = [
  { id: 'tenable', name: 'Tenable', ko: '테너블', covers: '취약점 진단과 관리' },
  { id: 'thales', name: 'THALES', ko: '탈레스', covers: '데이터 암호화와 키 관리' },
  { id: 'crowdstrike', name: 'CrowdStrike', ko: '크라우드스트라이크', covers: '엔드포인트 탐지·대응' },
  { id: 'trellix', name: 'Trellix', ko: '트렐릭스', covers: '엔드포인트와 XDR' },
  { id: 'solarwinds', name: 'SolarWinds', ko: '솔라윈즈', covers: 'IT 인프라 모니터링' },
  { id: 'gradius', name: 'Gradius DLP', ko: '와이즈허브', covers: '정보 유출 방지' },
];

/** 상담 동선. gijo.ai 본사 사이트로 보낸다. */
export const CONTACT_URL = 'https://gijo.ai/gijohome/user/main/user_main';
