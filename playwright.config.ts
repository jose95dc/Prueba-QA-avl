import { defineConfig } from '@playwright/test';
import 'dotenv/config';

export default defineConfig({
  testDir: '.',
  testMatch: ['api-tests/specs/**/*.spec.ts', 'event-tests/specs/**/*.spec.ts'],
  timeout: 60_000,
  expect: {
    timeout: 5_000
  },
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }]
  ],
  use: {
    baseURL: process.env.API_BASE_URL || 'https://restful-booker.herokuapp.com',
    extraHTTPHeaders: {
      Accept: 'application/json'
    }
  }
});
