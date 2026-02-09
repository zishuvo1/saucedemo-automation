class CartPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.cartItemNames = page.locator('.inventory_item_name');
    this.cartItemPrices = page.locator('.inventory_item_price');
    this.checkoutButton = page.locator('#checkout');
    this.continueShoppingButton = page.locator('#continue-shopping');
    this.pageTitle = page.locator('.title');
  }

  async waitForPageLoad() {
    await this.pageTitle.waitFor({ state: 'visible', timeout: 10000 });
  }

  async getCartItemNames() {
    return await this.cartItemNames.allTextContents();
  }

  async getCartItemCount() {
    return await this.cartItems.count();
  }

  async clickCheckout() {
    await this.checkoutButton.click();
    await this.page.waitForLoadState('domcontentloaded');
  }
}

module.exports = CartPage;