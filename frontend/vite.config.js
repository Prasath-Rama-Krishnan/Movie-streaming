import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Vercel build test - 2024
export default defineConfig({
  plugins: [react()],
})
