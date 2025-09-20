// @ts-check
import { defineConfig, devices } from '@playwright/test';
import path from 'path';

require('dotenv').config({
  path: `.env.${process.env.ENV || 'qa1'}`
});

/**
 * @see https://playwright.dev/docs/test-configuration
 */

// єдиний спільний шлях до state-файлу
const storageStatePath = path.resolve(process.cwd(), 'playwright', '.auth', 'user.json');

export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',

  /* Shared settings for all the projects below. */
  use: {
    baseURL: `https://${process.env.HTTP_CREDENTIALS_USERNAME}:${process.env.HTTP_CREDENTIALS_PASSWORD}@${process.env.BASE_URL}`,
    video: 'on',
    trace: 'on',
  },

  projects: [
    // Проєкт, що генерує storageState (має прогнатися першим)
    { name: 'setup', testMatch: /.*\.setup\.(js|ts)$/ },

    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // Підключаємо підготовлений auth state
        storageState: storageStatePath,
      },
      dependencies: ['setup'],
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        storageState: storageStatePath,
      },
      dependencies: ['setup'],
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        storageState: storageStatePath,
      },
      dependencies: ['setup'],
    },

    // Мобільні/брендовані — за потреби
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'], storageState: storageStatePath },
    //   dependencies: ['setup'],
    // },
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge', storageState: storageStatePath },
    //   dependencies: ['setup'],
    // },
  ],
});
