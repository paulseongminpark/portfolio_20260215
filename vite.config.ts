import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/portfolio_ui_test_v2/',
  plugins: [react()],
  server: { watch: { usePolling: true } },
})
