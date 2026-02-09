const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const TestData = require('../utils/testData');

test.describe('Q1: Locked Out User Login Test', () => {

  test('Should display error message when logging in with locked_out_user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await loginPage.login(
      TestData.users.lockedOutUser.username,
      TestData.users.lockedOutUser.password
    );

    const isErrorDisplayed = await loginPage.isErrorDisplayed();
    expect(isErrorDisplayed).toBeTruthy();

    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBe(TestData.errorMessages.lockedOut);

    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });

});
