import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.VERCEL === '1' ? '/' : '/portfolio/',
  plugins: [react()],
  server: { watch: { usePolling: true } },
})
