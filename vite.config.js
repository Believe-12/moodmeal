import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

export default defineConfig({
  base: '/moodmeal/',
  basePath: '/moodmeal', // <--- название репозитория
  assetPrefix: '/moodmeal',
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
