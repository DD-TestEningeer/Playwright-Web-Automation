// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,          // Global test timeout
  retries: 1,              // Retry once on failure
  reporter: [['list'], ['allure-playwright']], // Allure + list reporter
  use: {
    browserName: 'chromium', // Run in Chromium only
    headless: false,          // Show browser UI for demo
    screenshot: 'only-on-failure', // Capture screenshots on failure
    video: 'retain-on-failure',    // Record video on failure
    ignoreHTTPSErrors: true,
    viewport: { width: 1280, height: 720 },
  },
});