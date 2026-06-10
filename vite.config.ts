import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

export default defineConfig(({ mode }) => {
  // Load .env files (including .env.local) for the current mode
  const env = loadEnv(mode, process.cwd())
  const allowed = env.VITE_ALLOWED_HOSTS
    ? env.VITE_ALLOWED_HOSTS.split(',').map((h) => h.trim())
    : []

  return {
    base: './',
    plugins: [inspectAttr(), react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      host: true,
      allowedHosts: allowed,
    },
  }
})
