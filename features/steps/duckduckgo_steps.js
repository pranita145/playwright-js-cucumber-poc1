const { Given, When, Then } = require('@cucumber/cucumber');
const { DuckDuckGoPage } = require('../../pages/DuckDuckGoPage');
const { playwright } = require('../hooks');

let ddg;

Given('I open the browser and go to DuckDuckGo', async () => {
  ddg = new DuckDuckGoPage(playwright.page);
  await ddg.navigate();
});

When('I search for {string}', async (query) => {
  await ddg.search(query);
});

Then('I should see {string} in the results', async (expected) => {
  const visible = await ddg.isResultVisible(expected);
  if (!visible) {
    throw new Error(`Expected "${expected}" not found in results`);
  }
});
