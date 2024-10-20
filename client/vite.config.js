import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server : {
    proxy : {
      "/api" : "https://quiz-app-du7w.onrender.com"
    }
  },
  plugins: [react()],
})
