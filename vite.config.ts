/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    name: "test",
    environment: "happy-dom",
    root: "src",
    include: ["./**/*.test.(ts|tsx)"],
    setupFiles: ["./src/test/setup.ts"],
  },
});
