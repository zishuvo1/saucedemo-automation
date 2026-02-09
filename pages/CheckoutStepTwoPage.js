class CheckoutStepTwoPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.itemNames = page.locator('.inventory_item_name');
    this.itemPrices = page.locator('.inventory_item_price');
    this.subtotalLabel = page.locator('.summary_subtotal_label');
    this.taxLabel = page.locator('.summary_tax_label');
    this.totalLabel = page.locator('.summary_total_label');
    this.finishButton = page.locator('#finish');
    this.cancelButton = page.locator('#cancel');
    this.pageTitle = page.locator('.title');
  }

  async waitForPageLoad() {
    await this.pageTitle.waitFor({ state: 'visible', timeout: 10000 });
  }

  async getProductNames() {
    return await this.itemNames.allTextContents();
  }

  async getProductPrices() {
    const priceTexts = await this.itemPrices.allTextContents();
    return priceTexts.map(price => parseFloat(price.replace('$', '')));
  }

  async getSubtotal() {
    const text = await this.subtotalLabel.textContent();
    return parseFloat(text.replace('Item total: $', ''));
  }

  async getTax() {
    const text = await this.taxLabel.textContent();
    return parseFloat(text.replace('Tax: $', ''));
  }

  async getTotal() {
    const text = await this.totalLabel.textContent();
    return parseFloat(text.replace('Total: $', ''));
  }

  async clickFinish() {
    await this.finishButton.click();
    await this.page.waitForLoadState('domcontentloaded');
  }
}

module.exports = CheckoutStepTwoPage;