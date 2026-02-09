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
 
    test.setTimeout(120000);


    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(
      TestData.users.performanceGlitchUser.username,
      TestData.users.performanceGlitchUser.password
    );


    const inventoryPage = new InventoryPage(page);
    await inventoryPage.waitForPageLoad();
    await expect(page).toHaveURL(/.*inventory.*/);


    await inventoryPage.resetAppState();

 
    await inventoryPage.sortByNameZToA();


    await page.waitForTimeout(1000);


    const firstItemName = await inventoryPage.getFirstItemName();


    await inventoryPage.addFirstItemToCart();


    const cartBadge = inventoryPage.shoppingCartBadge;
    await expect(cartBadge).toHaveText('1');


    const expectedItemNames = [firstItemName];


    await inventoryPage.goToCart();

    const cartPage = new CartPage(page);
    await cartPage.waitForPageLoad();


    const cartItemCount = await cartPage.getCartItemCount();
    expect(cartItemCount).toBe(1);


    const cartItemNames = await cartPage.getCartItemNames();
    expect(cartItemNames).toContain(firstItemName);


    await cartPage.clickCheckout();


    const checkoutStepOne = new CheckoutStepOnePage(page);
    await checkoutStepOne.waitForPageLoad();
    await checkoutStepOne.fillCheckoutInfo(
      TestData.checkoutInfo.firstName,
      TestData.checkoutInfo.lastName,
      TestData.checkoutInfo.postalCode
    );
    await checkoutStepOne.clickContinue();

 
    const checkoutStepTwo = new CheckoutStepTwoPage(page);
    await checkoutStepTwo.waitForPageLoad();


    const checkoutProductNames = await checkoutStepTwo.getProductNames();
    expect(checkoutProductNames.length).toBe(1);

    for (const expectedName of expectedItemNames) {
      expect(checkoutProductNames).toContain(expectedName);
    }


    const productPrices = await checkoutStepTwo.getProductPrices();
    const subtotal = await checkoutStepTwo.getSubtotal();
    const tax = await checkoutStepTwo.getTax();
    const total = await checkoutStepTwo.getTotal();


    const calculatedSubtotal = productPrices.reduce((sum, price) => sum + price, 0);
    expect(subtotal).toBeCloseTo(calculatedSubtotal, 2);


    const calculatedTotal = subtotal + tax;
    expect(total).toBeCloseTo(calculatedTotal, 2);


    await checkoutStepTwo.clickFinish();


    const checkoutComplete = new CheckoutCompletePage(page);
    await checkoutComplete.waitForPageLoad();

    const successMessage = await checkoutComplete.getSuccessMessage();
    expect(successMessage).toBe(TestData.successMessage);


    await checkoutComplete.clickBackHome();


    await inventoryPage.waitForPageLoad();
    await inventoryPage.resetAppState();


    await inventoryPage.logout();


    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });

});
