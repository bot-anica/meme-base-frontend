import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react(), tsconfigPaths()],
  preview: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 4173,
    host: "0.0.0.0",
    allowedHosts: ["healthcheck.railway.app"],
  },
});
