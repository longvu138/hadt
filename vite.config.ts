import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"
import tsconfigPaths from "vite-tsconfig-paths"
export default defineConfig(({ mode }) => {
  const env: any = loadEnv(mode, process.cwd(), "")

  return {
    plugins: [react(), tsconfigPaths()],
    envPrefix: "APP_",
    server: {
      port: env.PORT || 3000,
    },
    build: {
      outDir: path.join(__dirname, "build"),
    },
  }
})
