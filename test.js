const { chromium } = require('playwright');

(
  async () => {

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  
  await page.goto('https://www.saucedemo.com/');

  
  await page.fill('#user-name', 'standard_user'); 
  await page.fill('#password', 'secret_sauce');   
  await page.click('#login-button');

  
  await page.click('.inventory_item:first-child button'); 

  
  await page.click('.shopping_cart_link'); 
  const productName = await page.textContent('.inventory_item_name');
  console.log('Product in cart:', productName);

  
  await page.click('#react-burger-menu-btn'); 
  await page.click('#logout_sidebar_link');

  
  await browser.close();
})();
