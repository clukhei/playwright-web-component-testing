import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { playwright } from "@vitest/browser-playwright";

export default defineConfig({
  plugins: [react()],
  test: {
    include: ["vitest/**/*.spec.tsx"],
    browser: {
      enabled: true,
      provider: playwright(),
      instances: [{ browser: "chromium" }],
      screenshotFailures: true,
      api: {
        port: 51204,
      },
    },
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
  },
  optimizeDeps: {
    exclude: ["playwright-core", "chromium-bidi", "fsevents"],
  },
  build: {
    rollupOptions: {
      external: ["playwright-core", "chromium-bidi", "fsevents", "@govtechsg/sgds-web-component"],
    },
  },
});
