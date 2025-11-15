const { chromium } = require('playwright');

(async () => {

  // Launch browser
  const browser = await chromium.launch({ headless: false }); // false হলে browser দেখাবে
  const context = await browser.newContext();
  const page = await context.newPage();

  // Open Saucedemo login page
  await page.goto('https://www.saucedemo.com/');

  // Login
  await page.fill('#user-name', 'standard_user'); 
  await page.fill('#password', 'secret_sauce');   
  await page.click('#login-button');

  // Add first product to cart
  await page.click('.inventory_item:first-child button'); 

  // Go to cart and verify product name
  await page.click('.shopping_cart_link'); 
  const productName = await page.textContent('.inventory_item_name');
  console.log('Product in cart:', productName);

  // Logout
  await page.click('#react-burger-menu-btn'); 
  await page.click('#logout_sidebar_link');

  // Close browser
  await browser.close();
})();
