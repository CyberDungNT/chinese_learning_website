import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// `npm run build`        → bản build thường (dist/), deploy lên Vercel, Netlify, GitHub Pages...
// `npm run build:single` → gộp toàn bộ thành 1 file dist-single/index.html
export default defineConfig(({ mode }) => ({
  base: './',
  plugins: [react(), ...(mode === 'single' ? [viteSingleFile()] : [])],
  build: { outDir: mode === 'single' ? 'dist-single' : 'dist' },
}))
