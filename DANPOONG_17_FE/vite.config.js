import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://52.78.33.37:8080', // 백엔드 API 주소
        rewrite: (path) => path.replace(/^\/api/, ''), // "/api" 제거
      },
    },
  },
});