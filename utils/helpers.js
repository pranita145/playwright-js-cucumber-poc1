const fs = require('fs');
const path = require('path');
const { expect } = require('@playwright/test');

async function waitForVisibility(locator, timeout = 10000) {
  await expect(locator).toBeVisible({ timeout });
}

function takeScreenshot(page, name = 'screenshot', folder = 'screenshots') {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const fileName = `${name}_${timestamp}.png`;
  const filePath = path.join(folder, fileName);
  fs.mkdirSync(folder, { recursive: true });
  return page.screenshot({ path: filePath });
}

module.exports = {
  waitForVisibility,
  takeScreenshot
};
