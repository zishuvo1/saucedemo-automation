# SauceDemo Automation Tests

Automated end-to-end test suite for [https://www.saucedemo.com/](https://www.saucedemo.com/) built with **Playwright** (JavaScript) and **Allure** reporting framework using **Page Object Model (POM)** design pattern.

---

## 📋 Project Overview

This project contains three automated test scenarios for the SauceDemo e-commerce demo website:

| Test | Marks | Description |
|------|-------|-------------|
| **Q1** | 20 | Login with `locked_out_user` and verify the error message |
| **Q2** | 50 | Login with `standard_user`, reset app state, add 3 items to cart, complete checkout, verify product names & total price, verify success message, reset app state again and logout |
| **Q3** | 30 | Login with `performance_glitch_user`, reset app state, filter by name (Z to A), add the first product to cart, complete checkout, verify product names & total price, verify success message, reset app state again and logout |

---

## 🛠️ Tech Stack

- **Language:** JavaScript
- **Test Framework:** Playwright
- **Reporting:** Allure Report
- **Design Pattern:** Page Object Model (POM)
- **Browser:** Chromium

---
## 📁 Project Structure

    saucedemo-automation/
    ├── package.json
    ├── playwright.config.js
    ├── README.md
    ├── .gitignore
    ├── pages/
    │   ├── LoginPage.js
    │   ├── InventoryPage.js
    │   ├── CartPage.js
    │   ├── CheckoutStepOnePage.js
    │   ├── CheckoutStepTwoPage.js
    │   └── CheckoutCompletePage.js
    ├── tests/
    │   ├── q1-locked-out-user.spec.js
    │   ├── q2-standard-user.spec.js
    │   └── q3-performance-glitch-user.spec.js
    └── utils/
        └── testData.js
        
---

## ⚙️ Prerequisites

Before running the tests, make sure you have the following installed:

1. **Node.js** (v16 or higher)
   - Download: [https://nodejs.org/](https://nodejs.org/)
   - Verify: `node --version` and `npm --version`

2. **Java** (JDK 8 or higher) - Required for Allure Report
   - Download: [https://www.java.com/](https://www.java.com/)
   - Verify: `java -version`

3. **Git**
   - Download: [https://git-scm.com/](https://git-scm.com/)
   - Verify: `git --version`

---

## 🚀 Setup Instructions

### Step 1: Clone the Repository
git clone https://github.com/zishuvo1/saucedemo-automation.git
cd saucedemo-automation




### Step 2: Install Dependencies
npm install




### Step 3: Install Playwright Browsers
npx playwright install




---

## ▶️ How to Run Tests

### ✅ Run All Three Tests Together (Sequentially)
npm run test:all




### ✅ Run Each Test Separately

**Q1: Locked Out User Test**
npm run test:q1




**Q2: Standard User - Complete Purchase Journey**
npm run test:q2




**Q3: Performance Glitch User - Filter and Purchase**
npm run test:q3




---

## 📊 Allure Report Generation

Allure report is generated after every test execution automatically.

### Option 1: Run Tests and Open Report Together
npm run test:all:report
npm run test:q1:report
npm run test:q2:report
npm run test:q3:report




### Option 2: Generate Report Manually After Test Execution
npm run test:all
npm run allure:generate
npm run allure:open




### Option 3: Serve Report Directly from Results
npm run test:all
npm run allure:serve


## 🔑 Test Credentials

| User | Username | Password |
|------|----------|----------|
| Locked Out User | `locked_out_user` | `secret_sauce` |
| Standard User | `standard_user` | `secret_sauce` |
| Performance Glitch User | `performance_glitch_user` | `secret_sauce` |

---

## 📸 Test Configuration

| Setting | Value |
|---------|-------|
| Browser | Chromium (headless mode) |
| Viewport | 1280 x 720 |
| Screenshots | Captured on every test |
| Video | Recorded for every test |
| Trace | Enabled for debugging |
| Timeout | 60 seconds (120s for Q3) |
| Workers | 1 (sequential execution) |
| Retries | 0 |

---

## 👤 Author

- Name: Md Zahidul Islam
- GitHub: [https://github.com/zishuvo1](https://github.com/zishuvo1)
