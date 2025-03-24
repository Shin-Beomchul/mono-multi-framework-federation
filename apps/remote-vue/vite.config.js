import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: 'vue_app',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/bootstrap.js', // 노출할 컴포넌트
      },
      shared: ['vue'],
    }),
  ],
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: true,
  },
  server: {
    port: 3003,
    fs: {
      strict: false,
    },
  },
})
