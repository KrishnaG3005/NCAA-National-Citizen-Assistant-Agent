import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Let Vite open the browser; the specific browser is controlled
    // via the BROWSER env var in the .env file below.
    open: true,
  },
});
