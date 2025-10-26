import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // 👇 Use '/' for dev and '/darts-scores/' for production builds
  base: command === "serve" ? "/" : "/darts-scores/",
}));
