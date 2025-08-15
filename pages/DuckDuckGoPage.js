const { expect } = require('@playwright/test');
const { waitForVisibility } = require('../utils/helpers');

class DuckDuckGoPage {
  constructor(page) {
    this.page = page;
    this.searchInput = this.page.locator("//input[@id='searchbox_input']");
    this.resultLinks = this.page.locator("//a[@data-testid='result-extras-url-link']");
  }

  async navigate() {
    await this.page.goto('https://duckduckgo.com');
  }

  async search(query) {
    await this.searchInput.fill(query);
    await this.searchInput.press('Enter');
    await waitForVisibility(this.resultLinks.first());
  }

  async isResultVisible(text) {
    const hrefs = await this.resultLinks.evaluateAll(elements =>
      elements.map(el => el.getAttribute('href'))
    );
    return hrefs.some(href => href && href.includes(text));
  }
}

module.exports = { DuckDuckGoPage };
