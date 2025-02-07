import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["wpxs6r-5173.csb.app", "crr9g6-5173.csb.app"]
  }
})

