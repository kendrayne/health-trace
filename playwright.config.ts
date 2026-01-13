import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  use: {
    baseURL: 'http://localhost:3000',
    headless: true,
    trace: 'off',
    video: 'off',
    screenshot: 'off',
  },
   workers: 1,
})

 
