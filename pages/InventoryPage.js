class InventoryPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.hamburgerMenu = page.locator('#react-burger-menu-btn');
    this.resetAppStateLink = page.locator('#reset_sidebar_link');
    this.logoutLink = page.locator('#logout_sidebar_link');
    this.closeMenuButton = page.locator('#react-burger-cross-btn');
    this.shoppingCartLink = page.locator('.shopping_cart_link');
    this.shoppingCartBadge = page.locator('.shopping_cart_badge');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.inventoryItems = page.locator('.inventory_item');
    this.inventoryItemNames = page.locator('.inventory_item_name');
    this.addToCartButtons = page.locator('[data-test^="add-to-cart"]');
    this.pageTitle = page.locator('.title');
  }

  async waitForPageLoad() {
    await this.pageTitle.waitFor({ state: 'visible', timeout: 30000 });
  }

  async openHamburgerMenu() {
    await this.hamburgerMenu.click();
    // Wait for the menu to be fully open
    await this.page.waitForTimeout(500);
    await this.resetAppStateLink.waitFor({ state: 'visible', timeout: 10000 });
  }

  async resetAppState() {
    await this.openHamburgerMenu();
    await this.resetAppStateLink.click();
    await this.page.waitForTimeout(500);
    await this.closeMenuButton.click();
    await this.page.waitForTimeout(500);
  }

  async logout() {
    await this.openHamburgerMenu();
    await this.logoutLink.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async addItemToCartByIndex(index) {
    const addButton = this.addToCartButtons.nth(index);
    await addButton.waitFor({ state: 'visible', timeout: 10000 });
    await addButton.click();
  }

  async addThreeItemsToCart() {
    // Get all add-to-cart buttons currently visible
    const buttons = this.page.locator('[data-test^="add-to-cart"]');
    await buttons.first().waitFor({ state: 'visible', timeout: 10000 });

    // Click the first three add-to-cart buttons
    await buttons.nth(0).click();
    await this.page.waitForTimeout(300);
    await buttons.nth(0).click(); // After first click, button changes, so nth(0) is now the next available
    await this.page.waitForTimeout(300);
    await buttons.nth(0).click();
    await this.page.waitForTimeout(300);
  }

  async addSpecificItemsToCart(indices) {
    // We need to click items by their original position
    // After clicking "Add to cart", the button changes to "Remove"
    // So we need to target items by their inventory_item index
    for (const index of indices) {
      const item = this.inventoryItems.nth(index);
      const addButton = item.locator('button:has-text("Add to cart")');
      await addButton.click();
      await this.page.waitForTimeout(300);
    }
  }

  async getItemNameByIndex(index) {
    return await this.inventoryItemNames.nth(index).textContent();
  }

  async getAllItemNames() {
    return await this.inventoryItemNames.allTextContents();
  }

  async goToCart() {
    await this.shoppingCartLink.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async sortByNameZToA() {
    await this.sortDropdown.selectOption('za');
    await this.page.waitForTimeout(1000);
  }

  async addFirstItemToCart() {
    const firstItem = this.inventoryItems.first();
    const addButton = firstItem.locator('button:has-text("Add to cart")');
    await addButton.waitFor({ state: 'visible', timeout: 10000 });
    await addButton.click();
    await this.page.waitForTimeout(300);
  }

  async getFirstItemName() {
    return await this.inventoryItemNames.first().textContent();
  }
}

module.exports = InventoryPage;