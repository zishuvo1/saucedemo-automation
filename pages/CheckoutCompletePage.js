class CheckoutCompletePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.completeHeader = page.locator('.complete-header');
    this.completeText = page.locator('.complete-text');
    this.backHomeButton = page.locator('#back-to-products');
    this.pageTitle = page.locator('.title');
    this.ponyExpressImage = page.locator('.pony_express');
  }

  async waitForPageLoad() {
    await this.pageTitle.waitFor({ state: 'visible', timeout: 10000 });
  }

  async getSuccessMessage() {
    await this.completeHeader.waitFor({ state: 'visible', timeout: 10000 });
    return await this.completeHeader.textContent();
  }

  async getCompleteText() {
    return await this.completeText.textContent();
  }

  async clickBackHome() {
    await this.backHomeButton.click();
    await this.page.waitForLoadState('domcontentloaded');
  }
}

module.exports = CheckoutCompletePage;