import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'hostApp',
      remotes: {
        reactApp1: 'http://localhost:3001/assets/remoteEntry.js', // Remote 앱의 경로
        reactApp2: 'http://localhost:3002/assets/remoteEntry.js', // Remote 앱의 경로
      },
    }),
  ],
  server: {
    port: 3000, // Host 앱이 실행될 포트
    fs: {
      strict: false, // 파일 시스템 제약 해제
    },
  },
})
