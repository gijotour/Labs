import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    // 현재 테스트는 순수 로직만 다루므로 jsdom이 필요 없다.
    // 컴포넌트 렌더링 테스트를 추가할 때 'jsdom'으로 바꾸고 jsdom을 설치한다.
    environment: 'node',
    include: ['src/**/*.test.{js,jsx}'],
    // 백엔드 테스트는 pytest가 담당한다
    exclude: ['node_modules', 'dist', 'backend'],
  },
})
