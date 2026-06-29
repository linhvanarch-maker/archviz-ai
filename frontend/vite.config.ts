import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  // Build output — đặt base URL cho production
  base: "/",
  server: {
    port: 5173,
    // Dev mode: proxy về backend local
    proxy: mode === "development" ? {
      "/api": "http://localhost:8101",
      "/media": "http://localhost:8101",
      "/ws": {
        target: "ws://localhost:8101",
        ws: true,
      },
    } : undefined,
  },
}));
