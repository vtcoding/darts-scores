import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // 👇 Use '/' for dev and '/darts-scores/' for production builds
  base: command === "serve" ? "/" : "/darts-scores/",
}));
