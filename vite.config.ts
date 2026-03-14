import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],

  server: {
    host: true,
    allowedHosts: [
      "sundabot.tail17794.ts.net"
    ]
  },

  preview: {
    host: true
  }
})