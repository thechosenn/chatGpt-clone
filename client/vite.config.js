import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    port: 4173,
    strictPort: true,
  },
   server: {
    port: 4173,
    strictPort: true,
    host: true,
    origin: "http://localhost:4173/",
  },
})
