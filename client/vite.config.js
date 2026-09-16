// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'


// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(),tailwindcss(),],
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Whenever frontend hits '/api', forward it to the Express backend
      '/api': {
        target: 'https://real-estate-at-gohpur-server.vercel.app/api',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})

