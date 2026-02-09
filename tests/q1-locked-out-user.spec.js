const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const TestData = require('../utils/testData');

test.describe('Q1: Locked Out User Login Test', () => {

  test('Should display error message when logging in with locked_out_user', async ({ page }) => {
    // Step 1: Navigate to the login page
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    // Step 2: Attempt login with locked_out_user credentials
    await loginPage.login(
      TestData.users.lockedOutUser.username,
      TestData.users.lockedOutUser.password
    );

    // Step 3: Verify the error message is displayed
    const isErrorDisplayed = await loginPage.isErrorDisplayed();
    expect(isErrorDisplayed).toBeTruthy();

    // Step 4: Verify the exact error message text
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBe(TestData.errorMessages.lockedOut);

    // Additional verification: Ensure we are still on the login page
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });

});