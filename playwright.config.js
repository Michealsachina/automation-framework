// playwright.config.js
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  // Tests எங்க இருக்குன்னு சொல்றோம்
  testDir: './tests',

  // Test fail ஆனா screenshot எடு
  use: {
    baseURL: 'https://automationexercise.com',
    timeout: 60000,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
    headless: false, // Browser திறந்து காட்டும் (நாம் பார்க்க)
  },

  // Retry — fail ஆனா ஒரு தடவை மறுபடியும் try பண்ணும்
  retries: 1,

  // Report
  reporter: [
    ['html', { outputFolder: 'reports/html-report' }],
    ['list'] // Terminal-ல progress காட்டும்
  ],

  // Cross-browser testing
  projects: [
    {
      name: 'Chrome',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'Safari',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});