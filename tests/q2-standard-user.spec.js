const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const InventoryPage = require('../pages/InventoryPage');
const CartPage = require('../pages/CartPage');
const CheckoutStepOnePage = require('../pages/CheckoutStepOnePage');
const CheckoutStepTwoPage = require('../pages/CheckoutStepTwoPage');
const CheckoutCompletePage = require('../pages/CheckoutCompletePage');
const TestData = require('../utils/testData');

test.describe('Q2: Standard User - Complete Purchase Journey', () => {

  test('Login, reset app state, add 3 items, checkout, verify and logout', async ({ page }) => {
    // ============ Step 1: Login with standard_user ============
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(
      TestData.users.standardUser.username,
      TestData.users.standardUser.password
    );

    // ============ Step 2: Verify login success - should be on inventory page ============
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.waitForPageLoad();
    await expect(page).toHaveURL(/.*inventory.*/);

    // ============ Step 3: Reset the App State from hamburger menu ============
    await inventoryPage.resetAppState();

    // ============ Step 4: Add any three items to the cart ============
    // Add first three items (index 0, 1, 2)
    await inventoryPage.addSpecificItemsToCart([0, 1, 2]);

    // Capture the names of the three added items for verification later
    const item1Name = await inventoryPage.getItemNameByIndex(0);
    const item2Name = await inventoryPage.getItemNameByIndex(1);
    const item3Name = await inventoryPage.getItemNameByIndex(2);
    const expectedItemNames = [item1Name, item2Name, item3Name];

    // Verify cart badge shows 3
    const cartBadge = inventoryPage.shoppingCartBadge;
    await expect(cartBadge).toHaveText('3');

    // ============ Step 5: Navigate to Cart ============
    await inventoryPage.goToCart();

    const cartPage = new CartPage(page);
    await cartPage.waitForPageLoad();

    // Verify 3 items in cart
    const cartItemCount = await cartPage.getCartItemCount();
    expect(cartItemCount).toBe(3);

    // ============ Step 6: Proceed to Checkout ============
    await cartPage.clickCheckout();

    // ============ Step 7: Fill Checkout Information ============
    const checkoutStepOne = new CheckoutStepOnePage(page);
    await checkoutStepOne.waitForPageLoad();
    await checkoutStepOne.fillCheckoutInfo(
      TestData.checkoutInfo.firstName,
      TestData.checkoutInfo.lastName,
      TestData.checkoutInfo.postalCode
    );
    await checkoutStepOne.clickContinue();

    // ============ Step 8: Verify products on final checkout page ============
    const checkoutStepTwo = new CheckoutStepTwoPage(page);
    await checkoutStepTwo.waitForPageLoad();

    // Verify product names
    const checkoutProductNames = await checkoutStepTwo.getProductNames();
    expect(checkoutProductNames.length).toBe(3);

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

    // ============ Step 9: Finish purchase ============
    await checkoutStepTwo.clickFinish();

    // ============ Step 10: Verify successful order message ============
    const checkoutComplete = new CheckoutCompletePage(page);
    await checkoutComplete.waitForPageLoad();

    const successMessage = await checkoutComplete.getSuccessMessage();
    expect(successMessage).toBe(TestData.successMessage);

    // Go back to products page
    await checkoutComplete.clickBackHome();

    // ============ Step 11: Reset the App State again ============
    await inventoryPage.waitForPageLoad();
    await inventoryPage.resetAppState();

    // ============ Step 12: Logout ============
    await inventoryPage.logout();

    // Verify we are back on the login page
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });

});