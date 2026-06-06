import fs from "fs"
import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

const ROOT = fs.realpathSync(process.cwd())

// https://vite.dev/config/
export default defineConfig({
  // base: './' removed — absolute paths prevent 404s on sub-routes
  root: ROOT,
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(ROOT, "./src"),
    },
  },
});
