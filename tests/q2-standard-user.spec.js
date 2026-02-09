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

    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(
      TestData.users.standardUser.username,
      TestData.users.standardUser.password
    );


    const inventoryPage = new InventoryPage(page);
    await inventoryPage.waitForPageLoad();
    await expect(page).toHaveURL(/.*inventory.*/);


    await inventoryPage.resetAppState();



    await inventoryPage.addSpecificItemsToCart([0, 1, 2]);


    const item1Name = await inventoryPage.getItemNameByIndex(0);
    const item2Name = await inventoryPage.getItemNameByIndex(1);
    const item3Name = await inventoryPage.getItemNameByIndex(2);
    const expectedItemNames = [item1Name, item2Name, item3Name];


    const cartBadge = inventoryPage.shoppingCartBadge;
    await expect(cartBadge).toHaveText('3');


    await inventoryPage.goToCart();

    const cartPage = new CartPage(page);
    await cartPage.waitForPageLoad();


    const cartItemCount = await cartPage.getCartItemCount();
    expect(cartItemCount).toBe(3);


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
    expect(checkoutProductNames.length).toBe(3);

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
