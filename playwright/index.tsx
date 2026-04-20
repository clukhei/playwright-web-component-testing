/**
 * Playwright Component Testing entry point.
 * This file runs in the browser before each component test.
 * Use it to register global setup: SGDS registration, global styles, etc.
 */
import "@govtechsg/sgds-web-component/themes/day.css";
import "@govtechsg/sgds-web-component/css/sgds.css";
import "@govtechsg/sgds-web-component";
import { beforeMount, afterMount } from "@playwright/experimental-ct-react/hooks";

beforeMount(async ({ App }) => {
  // Add any app-level providers here (Router, Redux store, theme context, etc.)
  // e.g. return <ThemeProvider><App /></ThemeProvider>
});

afterMount(async () => {
  // Runs after each component is mounted
});
