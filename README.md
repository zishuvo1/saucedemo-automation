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
├── package.json # Project dependencies and scripts
├── playwright.config.js # Playwright configuration
├── README.md # Project documentation
├── .gitignore # Git ignore rules
├── pages/ # Page Object Model classes
│ ├── LoginPage.js # Login page actions and locators
│ ├── InventoryPage.js # Products page actions and locators
│ ├── CartPage.js # Cart page actions and locators
│ ├── CheckoutStepOnePage.js # Checkout info page actions and locators
│ ├── CheckoutStepTwoPage.js # Checkout overview page actions and locators
│ └── CheckoutCompletePage.js # Order complete page actions and locators
├── tests/ # Test specification files
│ ├── q1-locked-out-user.spec.js # Q1 test - Locked out user
│ ├── q2-standard-user.spec.js # Q2 test - Standard user full journey
│ └── q3-performance-glitch-user.spec.js # Q3 test - Performance glitch user
└── utils/ # Utility files
└── testData.js # Test data (credentials, messages, etc.)

text


---

## ⚙️ Prerequisites

Before running the tests, make sure you have the following installed:

1. **Node.js** (v16 or higher)
   - Download: [https://nodejs.org/](https://nodejs.org/)
   - Verify installation:
     ```bash
     node --version
     npm --version
     ```

2. **Java** (JDK 8 or higher) - Required for Allure Report
   - Download: [https://www.java.com/](https://www.java.com/)
   - Verify installation:
     ```bash
     java -version
     ```

3. **Git**
   - Download: [https://git-scm.com/](https://git-scm.com/)
   - Verify installation:
     ```bash
     git --version
     ```

---

## 🚀 Setup Instructions

### Step 1: Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/saucedemo-automation.git
cd saucedemo-automation
Step 2: Install Dependencies
Bash

npm install
Step 3: Install Playwright Browsers
Bash

npx playwright install
▶️ How to Run Tests
Run All Three Tests Together (Sequentially)
Bash

npm run test:all
Run Each Test Separately
Q1: Locked Out User Test
Bash

npm run test:q1
Q2: Standard User - Complete Purchase Journey
Bash

npm run test:q2
Q3: Performance Glitch User - Filter and Purchase
Bash

npm run test:q3
📊 Allure Report Generation
Allure report is generated after every test execution automatically.

Option 1: Run Tests and Open Report Together
Bash

# Run all tests and open Allure report
npm run test:all:report

# Run Q1 test and open Allure report
npm run test:q1:report

# Run Q2 test and open Allure report
npm run test:q2:report

# Run Q3 test and open Allure report
npm run test:q3:report
Option 2: Generate Report Manually After Test Execution
Bash

# First run the tests
npm run test:all

# Generate the Allure report
npm run allure:generate

# Open the Allure report in browser
npm run allure:open
Option 3: Serve Report Directly from Results
Bash

# First run the tests
npm run test:all

# Serve and open the Allure report
npm run allure:serve
