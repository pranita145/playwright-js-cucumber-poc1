const { Before, After } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const { takeScreenshot } = require('../utils/helpers');
const { mkdirSync } = require('fs');
const path = require('path');

// Directory for traces
const tracesDir = 'traces';
mkdirSync(tracesDir, { recursive: true });

// Shared object for cross-step state
const playwright = {
  browser: null,
  context: null,
  page: null,
};

Before(async function ({ pickle }) {
  const isCI = process.env.CI === 'true';

  playwright.browser = await chromium.launch({
    headless: isCI, // Run headless only in CI environments
  });

  if (isCI) {
    playwright.context = await playwright.browser.newContext({
      userAgent:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      viewport: { width: 1280, height: 720 },
    });
  } else {
    playwright.context = await playwright.browser.newContext();
  }

  playwright.page = await playwright.context.newPage();

  await playwright.context.tracing.start({
    screenshots: true,
    snapshots: true,
    sources: true,
    title: pickle.name,
  });
});

After(async function ({ result, pickle }) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const scenarioName = pickle.name.replace(/[^a-zA-Z0-9]/g, '_');

  if (playwright.context) {
    await playwright.context.tracing.stop({
      path: path.join(tracesDir, `${timestamp}_${scenarioName}.zip`),
    });
  }

  if (result && result.status === 'FAILED' && playwright.page) {
    await takeScreenshot(playwright.page, `${timestamp}_${scenarioName}`, 'reports/failures');
  }

  if (playwright.page) await playwright.page.close();
  if (playwright.context) await playwright.context.close();
  if (playwright.browser) await playwright.browser.close();
});

module.exports = { playwright };
