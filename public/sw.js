// GIJO Tour LaB 서비스 워커.
// 하는 일이 없다. 삼성 인터넷처럼 서비스 워커가 있어야 「앱으로 설치」를 해 주는 브라우저 때문에 둔다.
// 아무것도 캐시하지 않고 요청에 끼어들지도 않는다. 그래서 새로 배포한 판이 옛 판에 가려질 일이 없다.
// 여기에 캐시를 넣지 말 것 — 넣으면 배포할 때마다 버전을 올려야 하고, 잊으면 옛 화면이 계속 뜬다.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));
self.addEventListener('fetch', () => {});
