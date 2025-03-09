import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Đổi sang cổng khác
    strictPort: true, // Không tự động đổi cổng
  },
});
