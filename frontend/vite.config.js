import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Proxy setup: any request the frontend makes to "/api" is
    // automatically forwarded to our Express backend.
    // In development this defaults to localhost:5000.
    // In production, Vite only uses this for local previews.
    proxy: {
      "/api": {
        target: (process.env.VITE_API_URL || "http://localhost:5000").replace(/\/$/, ""),
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
