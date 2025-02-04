import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.munhwahansang.com', // 백엔드 API 주소
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // "/api" 제거
      },
    },
  },
});