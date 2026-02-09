const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const InventoryPage = require('../pages/InventoryPage');
const CartPage = require('../pages/CartPage');
const CheckoutStepOnePage = require('../pages/CheckoutStepOnePage');
const CheckoutStepTwoPage = require('../pages/CheckoutStepTwoPage');
const CheckoutCompletePage = require('../pages/CheckoutCompletePage');
const TestData = require('../utils/testData');

test.describe('Q3: Performance Glitch User - Filter, Purchase and Verify', () => {

  test('Login, reset, filter Z-A, add first item, checkout, verify and logout', async ({ page }) => {
    // Increase timeout for performance_glitch_user as it has slower responses
    test.setTimeout(120000);

    // ============ Step 1: Login with performance_glitch_user ============
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(
      TestData.users.performanceGlitchUser.username,
      TestData.users.performanceGlitchUser.password
    );

    // ============ Step 2: Verify login success ============
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.waitForPageLoad();
    await expect(page).toHaveURL(/.*inventory.*/);

    // ============ Step 3: Reset the App State ============
    await inventoryPage.resetAppState();

    // ============ Step 4: Filter by name (Z to A) ============
    await inventoryPage.sortByNameZToA();

    // Wait for the sort to take effect
    await page.waitForTimeout(1000);

    // ============ Step 5: Get the first product name after sorting ============
    const firstItemName = await inventoryPage.getFirstItemName();

    // ============ Step 6: Add the first product to cart ============
    await inventoryPage.addFirstItemToCart();

    // Verify cart badge shows 1
    const cartBadge = inventoryPage.shoppingCartBadge;
    await expect(cartBadge).toHaveText('1');

    // Store expected item name
    const expectedItemNames = [firstItemName];

    // ============ Step 7: Navigate to Cart ============
    await inventoryPage.goToCart();

    const cartPage = new CartPage(page);
    await cartPage.waitForPageLoad();

    // Verify 1 item in cart
    const cartItemCount = await cartPage.getCartItemCount();
    expect(cartItemCount).toBe(1);

    // Verify the item name in cart
    const cartItemNames = await cartPage.getCartItemNames();
    expect(cartItemNames).toContain(firstItemName);

    // ============ Step 8: Proceed to Checkout ============
    await cartPage.clickCheckout();

    // ============ Step 9: Fill Checkout Information ============
    const checkoutStepOne = new CheckoutStepOnePage(page);
    await checkoutStepOne.waitForPageLoad();
    await checkoutStepOne.fillCheckoutInfo(
      TestData.checkoutInfo.firstName,
      TestData.checkoutInfo.lastName,
      TestData.checkoutInfo.postalCode
    );
    await checkoutStepOne.clickContinue();

    // ============ Step 10: Verify on final checkout page ============
    const checkoutStepTwo = new CheckoutStepTwoPage(page);
    await checkoutStepTwo.waitForPageLoad();

    // Verify all product names
    const checkoutProductNames = await checkoutStepTwo.getProductNames();
    expect(checkoutProductNames.length).toBe(1);

    for (const expectedName of expectedItemNames) {
      expect(checkoutProductNames).toContain(expectedName);
    }

    // Verify total price
    const productPrices = await checkoutStepTwo.getProductPrices();
    const subtotal = await checkoutStepTwo.getSubtotal();
    const tax = await checkoutStepTwo.getTax();
    const total = await checkoutStepTwo.getTotal();

    // Verify subtotal equals sum of individual prices
    const calculatedSubtotal = productPrices.reduce((sum, price) => sum + price, 0);
    expect(subtotal).toBeCloseTo(calculatedSubtotal, 2);

    // Verify total = subtotal + tax
    const calculatedTotal = subtotal + tax;
    expect(total).toBeCloseTo(calculatedTotal, 2);

    // ============ Step 11: Finish purchase ============
    await checkoutStepTwo.clickFinish();

    // ============ Step 12: Verify successful order message ============
    const checkoutComplete = new CheckoutCompletePage(page);
    await checkoutComplete.waitForPageLoad();

    const successMessage = await checkoutComplete.getSuccessMessage();
    expect(successMessage).toBe(TestData.successMessage);

    // Go back to products page
    await checkoutComplete.clickBackHome();

    // ============ Step 13: Reset the App State again ============
    await inventoryPage.waitForPageLoad();
    await inventoryPage.resetAppState();

    // ============ Step 14: Logout ============
    await inventoryPage.logout();

    // Verify we are back on the login page
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });

});