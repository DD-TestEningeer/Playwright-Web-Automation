# 📑 Playwright Automation Training

## **Framework Overview**

* **Language:** JavaScript
* **Scope:** Web UI only (Chromium)
* **Design Pattern:** Page Object Model (POM)
* **Reporting:** Allure Reports (screenshots, videos, steps)
* **Test Data:** Static JSON files
* **Environment:** Single environment in `playwright.config.js`
* **CI/CD:** GitHub Actions
* **Execution:** Sequential
* **Retries:** Automatic retries for flaky tests
* **Locator Strategy:** Mix of CSS, text, XPath
* **Logging:** Playwright built-in + Allure steps
* **Coding Standards:** ESLint + Prettier
* **Hooks:** Basic `beforeEach`/`afterEach`

---

## **Folder Structure**

```
playwright-training/
│
├─ tests/                # Test spec files
│   ├─ example.spec.js
│   ├─ login.spec.js
│   └─ endToEnd.spec.js
│
├─ pages/                # Page Object Model classes
│   ├─ loginPage.js
│   └─ homePage.js
│
├─ utils/                # Custom wrapper methods
│   └─ helpers.js
│
├─ data/                 # Static test data JSON files
│   ├─ loginData.json
│   └─ endToEndData.json
│
├─ config/               # Playwright configuration & timeouts
│   └─ playwright.config.js
│
├─ reports/              # Allure / screenshots / videos
│   ├─ screenshots/
│   └─ videos/
│
├─ package.json
└─ node_modules/
```

---


# 📑 Playwright Training – Day 1 Detailed Notes

## **Objective**

By the end of Day 1, learners will:

* Understand what Playwright is and why it’s used in industry
* Set up a Playwright project in JavaScript
* Run their first test (`page.goto`, `page.title()`)
* Understand the layered folder structure for the framework

---

## **1. Introduction to Playwright**

### **What is Playwright?**

* Playwright is a **Node.js library** to automate browsers (Chromium, Firefox, WebKit)
* Supports **end-to-end testing** for modern web apps
* Provides **reliable auto-waiting** for elements
* Can capture **screenshots, videos, and trace logs**
* Integrates well with **CI/CD pipelines**

### **Why Playwright over Selenium/Cypress?**

| Feature              | Selenium                  | Cypress               | Playwright                |
| -------------------- | ------------------------- | --------------------- | ------------------------- |
| Language Support     | Java, Python, JS, C#      | JS                    | JS, TS, Python, Java, C#  |
| Browser Coverage     | Chrome, Firefox, IE, Edge | Chrome-family only    | Chromium, Firefox, WebKit |
| Auto-waiting         | Manual                    | Automatic             | Automatic                 |
| Parallel Execution   | Limited                   | Yes (via test runner) | Yes, per project          |
| CI/CD Friendly       | Yes                       | Yes                   | Yes                       |
| Network Interception | Limited                   | Yes                   | Yes (advanced)            |
| Mobile Emulation     | Limited                   | Chrome only           | Full mobile simulation    |

> **Industry note:** Playwright is widely used for **modern web applications** because of its **speed, reliability, and cross-browser support**.

---

## **2. Environment Setup**

### **Step 1: Install Node.js**

* Download Node.js LTS version from [https://nodejs.org/](https://nodejs.org/)
* Verify installation:

```bash
node -v
npm -v
```

### **Step 2: Setup Project Folder**

1. Create a folder:

How you can create the **Playwright project folder structure** using **CMD or Terminal or Git Bash or PowerShell** with simple commands.

# Note - Use any one way

---

**1. Windows CMD**

```cmd
mkdir playwright-training && cd playwright-training && mkdir tests pages utils data config reports\screenshots reports\videos
```

* Creates the main folder and subfolders including `reports\screenshots` and `reports\videos`.

---

**2. Linux / Mac Terminal**

```bash
mkdir -p playwright-training/{tests,pages,utils,data,config,reports/{screenshots,videos}} && cd playwright-training
```

* `-p` creates **parent directories automatically**.
* Nested folders under `reports` are created in one command.

---

**3. Git Bash (Windows)**

```bash
mkdir -p playwright-training/{tests,pages,utils,data,config,reports/{screenshots,videos}} && cd playwright-training
```

* Same syntax as Linux/Mac terminal.
* Works on Windows if Git Bash is installed.

---

**4. PowerShell**

```powershell
New-Item -Path playwright-training -ItemType Directory; Set-Location playwright-training; New-Item -ItemType Directory -Name tests, pages, utils, data, config, reports; New-Item -ItemType Directory -Path reports -Name screenshots, videos
```

* Creates the main folder, subfolders, and nested `reports/screenshots` and `reports/videos`.
* `Set-Location` moves into the project folder.

---

2. Initialize npm:

```bash
npm init -y
```

### **Step 3: Install Playwright**

```bash
npm install -D @playwright/test
npx playwright install
```

* Installs browsers automatically (Chromium, Firefox, WebKit)
* For Day 1, we’ll use **Chromium only**


### **Step 4: Install Allure CLI (for reporting later)**

```bash
npm install -D allure-commandline
```

* Add to PATH if required for CLI usage

---


### **Create Config File**

Path: `config/playwright.config.js`

```javascript
// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,          // Global test timeout
  retries: 1,              // Retry once on failure
  reporter: [['list'], ['allure-playwright']], // Allure + list reporter
  use: {
    browserName: 'chromium', // Run in Chromium only
    headless: false,          // Show browser UI for demo
    screenshot: 'only-on-failure', // Capture screenshots on failure
    video: 'retain-on-failure',    // Record video on failure
    ignoreHTTPSErrors: true,
    viewport: { width: 1280, height: 720 },
  },
});
```

### **Explanation**

* `testDir` → folder where tests reside
* `timeout` → custom global timeout
* `retries` → automatically retry flaky tests once
* `reporter` → built-in + Allure reporting
* `use` → default browser settings for all tests

---

## **3. First Playwright Test**

### **Create a Test File**

* Path: `tests/example.spec.js`

```javascript
const { test, expect } = require('@playwright/test');

test('Verify page title of example.com', async ({ page }) => {
    await page.goto('https://example.com');
    const title = await page.title();
    console.log('Page Title:', title);
    expect(title).toBe('Example Domain');
});
```

### **Run the Test**

1) UI Mode 
```bash
npx playwright test --ui
```

2) UI Mode with Browser only
```bash
npx playwright test --headed
```
3) Headless Mode
```bash
npx playwright test 
```

* Output shows test execution in console
* Playwright automatically launches **Chromium**

### **Test CLI Commands**

* Run all tests: `npx playwright test`
* Run a specific file: `npx playwright test tests/example.spec.js`
* Open test in interactive mode: `npx playwright test --ui`

---

## **4. Project Folder Structure (Layered)**

**Proposed structure for the framework:**

```
playwright-training/
│
├─ tests/                # Test spec files
│   └─ example.spec.js
│
├─ pages/                # Page Object Model classes
│   └─ loginPage.js
│
├─ utils/                # Custom wrapper methods
│   └─ helpers.js
│
├─ data/                 # Static test data JSON files
│   └─ loginData.json
│
├─ config/               # Playwright configuration & timeouts
│   └─ playwright.config.js
│
├─ reports/              # Allure / screenshots / videos
│   └─ screenshots/
│
├─ package.json
└─ node_modules/
```

### **Why layered structure?**

* Separates **tests, pages, data, utilities, and reports**
* Makes framework **scalable and maintainable**
* Helps learners **follow best practices** from Day 1

---

## **5. Summary of Day 1**

By the end of Day 1, learners should be able to:

1. Explain **Playwright features and benefits**
2. Set up **Node.js and Playwright project**
3. Run **first simple test**
4. Understand **layered folder structure** for framework scalability

---

# 📑 Playwright Training – Day 2 Detailed Notes

## **Objective**

By the end of Day 2, learners will be able to:

* Configure Playwright settings for sequential execution and custom timeouts
* Implement **Page Object Model (POM)** for clean test design
* Use **static JSON files** for test data
* Create **custom wrapper methods** for reusable actions

---

## **1. Playwright Configuration (`playwright.config.js`)**

### **Create Config File**

Path: `config/playwright.config.js`

```javascript
// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,          // Global test timeout
  retries: 1,              // Retry once on failure
  reporter: [['list'], ['allure-playwright']], // Allure + list reporter
  use: {
    browserName: 'chromium', // Run in Chromium only
    headless: false,          // Show browser UI for demo
    screenshot: 'only-on-failure', // Capture screenshots on failure
    video: 'retain-on-failure',    // Record video on failure
    ignoreHTTPSErrors: true,
    viewport: { width: 1280, height: 720 },
  },
});
```

### **Explanation**

* `testDir` → folder where tests reside
* `timeout` → custom global timeout
* `retries` → automatically retry flaky tests once
* `reporter` → built-in + Allure reporting
* `use` → default browser settings for all tests

---

## **2. Page Object Model (POM)**

### **Why POM?**

* Keeps **locators separate from test logic**
* Makes **tests reusable and maintainable**
* Easier to **update locators** without touching tests

### **Create a Page Class**

Path: `pages/loginPage.js`

```javascript
class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = 'input[name="username"]';
        this.passwordInput = 'input[name="password"]';
        this.loginButton = 'button[type="submit"]';
    }

    async navigate() {
        await this.page.goto('https://example.com/login');
    }

    async enterUsername(username) {
        await this.page.fill(this.usernameInput, username);
    }

    async enterPassword(password) {
        await this.page.fill(this.passwordInput, password);
    }

    async clickLogin() {
        await this.page.click(this.loginButton);
    }
}

module.exports = { LoginPage };
```

### **Using POM in Test**

Path: `tests/login.spec.js`

```javascript
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');
const loginData = require('../data/loginData.json');

test('Login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.enterUsername(loginData.username);
    await loginPage.enterPassword(loginData.password);
    await loginPage.clickLogin();

    expect(await page.title()).toBe('Dashboard');
});
```

---

## **3. Static Test Data (JSON Files)**

### **Create JSON File**

Path: `data/loginData.json`

```json
{
    "username": "testuser",
    "password": "Test@123"
}
```

### **Usage in Tests**

* Import JSON into test file
* Pass values to POM methods
* Allows **data-driven testing** without hardcoding

---

## **4. Custom Wrapper Methods**

### **Why Use Wrappers?**

* Standardize actions across all pages
* Reduce repetitive code
* Easier to maintain tests

### **Create Helpers**

Path: `utils/helpers.js`

```javascript
async function clickElement(page, locator) {
    await page.waitForSelector(locator, { state: 'visible' });
    await page.click(locator);
}

async function enterText(page, locator, text) {
    await page.waitForSelector(locator, { state: 'visible' });
    await page.fill(locator, text);
}

async function waitForElement(page, locator) {
    await page.waitForSelector(locator, { state: 'visible' });
}

module.exports = { clickElement, enterText, waitForElement };
```

### **Using Helpers in POM**

```javascript
const { clickElement, enterText } = require('../utils/helpers');

class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = 'input[name="username"]';
        this.passwordInput = 'input[name="password"]';
        this.loginButton = 'button[type="submit"]';
    }

    async login(username, password) {
        await enterText(this.page, this.usernameInput, username);
        await enterText(this.page, this.passwordInput, password);
        await clickElement(this.page, this.loginButton);
    }
}
```

---

## **5. Summary of Day 2**

By the end of Day 2, learners should be able to:

1. Configure Playwright with **custom global settings**
2. Implement **Page Object Model** for modular test design
3. Use **static JSON data** for input values
4. Create **custom helper methods** for reusable actions
5. Run tests using **POM + JSON + wrappers** with **Allure reporting enabled**

---

# 📑 Playwright Training – Day 3 Detailed Notes

## **Objective**

By the end of Day 3, learners will be able to:

* Configure **automatic retries** for flaky tests
* Capture **screenshots and videos on failure**
* Use **before/after hooks** for setup and teardown
* Apply **effective locator strategies**

---

## **1. Retries for Flaky Tests**

### **Why Retries?**

* Web tests can fail due to **network issues, slow loading, or intermittent UI changes**
* Retry helps **stabilize tests without changing core logic**

### **Configure Retries**

`config/playwright.config.js`

```javascript
module.exports = {
    testDir: './tests',
    retries: 1,  // Retry once if test fails
    use: {
        browserName: 'chromium',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
    },
};
```

### **Demo Test**

```javascript
const { test, expect } = require('@playwright/test');

test('Flaky test demo', async ({ page }) => {
    await page.goto('https://example.com');
    expect(Math.random() > 0.5).toBe(true); // 50% chance of failure
});
```

* Playwright will **automatically retry once** before marking it as failed

---

## **2. Screenshots and Videos**

### **Screenshots**

* Capture **only on failure** (reduces storage)

```javascript
await page.screenshot({ path: 'reports/screenshots/failure.png' });
```

### **Videos**

* Capture **only on failure**
  `config/playwright.config.js` (already set)

```javascript
use: {
    video: 'retain-on-failure',
}
```

* Videos stored in `reports/videos/` folder
* Useful for **debugging UI failures**

---

## **3. Before/After Hooks**

### **Global Hooks (Config Level)**

`playwright.config.js`

```javascript
module.exports = {
    globalSetup: require.resolve('./utils/globalSetup'),
    globalTeardown: require.resolve('./utils/globalTeardown'),
};
```

### **Local Hooks (Test File Level)**

```javascript
const { test } = require('@playwright/test');

test.describe('Login Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://example.com/login');
    });

    test.afterEach(async ({ page }, testInfo) => {
        if (testInfo.status !== testInfo.expectedStatus) {
            await page.screenshot({ path: `reports/screenshots/${testInfo.title}.png` });
        }
    });

    test('Valid login', async ({ page }) => {
        // test steps
    });
});
```

**Explanation**

* `beforeEach` → runs **before each test** in the block
* `afterEach` → runs **after each test**, capture screenshot if test fails

---

## **4. Locator Strategies**

### **Importance**

* Stable locators reduce **flaky tests**
* Choose locators that **don’t change frequently**

### **Recommended Locator Types**

| Locator Type   | Usage Example                              | Notes                               |
| -------------- | ------------------------------------------ | ----------------------------------- |
| `data-testid`  | `page.getByTestId('login-btn')`            | Most stable, preferred              |
| CSS selectors  | `page.locator('button.submit')`            | Good for classes or IDs             |
| Text selectors | `page.getByText('Login')`                  | Simple but can break on text change |
| XPath          | `page.locator('//button[text()="Login"]')` | Use only if others fail             |

### **Best Practices**

* Prefer **data attributes** over CSS/text/XPath
* Avoid **dynamic IDs** or auto-generated class names
* Use **page.locator()** with `waitFor` or wrapper methods

---

## **5. Summary of Day 3**

By the end of Day 3, learners should be able to:

1. Configure **automatic retries** for flaky tests
2. Capture **screenshots/videos on failure** for debugging
3. Use **before/after hooks** to setup and teardown tests
4. Apply **robust locator strategies** for stable tests
5. Combine **wrapper methods + POM + hooks + retries** for reliable framework tests

---

# 📑 Playwright Training – Day 4 Detailed Notes

## **Objective**

By the end of Day 4, learners will be able to:

* Configure and use **Allure Reports**
* Utilize **Playwright built-in logging** and integrate with Allure
* Run **tagged tests** selectively (`@smoke`, `@regression`)
* Apply **coding standards** using ESLint and Prettier

---

## **1. Reporting**

### **Built-in HTML Reporter**

* Playwright has a **default HTML reporter**
* Run tests with HTML report:

```bash
npx playwright test --reporter=html
npx playwright show-report
```

* Report shows **test results, duration, and errors**

### **Allure Reporter Integration**

1. **Install Allure Playwright**

```bash
npm install -D allure-playwright
```

2. **Add to playwright.config.js**

```javascript
reporter: [
    ['list'], 
    ['allure-playwright']
],
```

3. **Run tests with Allure reporting**

```bash
npx playwright test
allure serve reports/allure-results
```

4. **Benefits**

* Test steps visible in report
* Screenshots/videos automatically linked
* Supports **severity, tags, attachments**

---

## **2. Logging**

### **Playwright Built-in Logging**

* Playwright automatically logs test steps, page events, network failures
* Example:

```javascript
page.on('console', msg => console.log(msg.text()));
page.on('pageerror', error => console.log(error));
```

### **Integrate Logging with Allure**

* Use `allure.step()` to log actions in reports

```javascript
const { allure } = require('allure-playwright');

await allure.step('Enter username', async () => {
    await page.fill('input[name="username"]', 'testuser');
});
```

---

## **3. Test Tagging and Filtering**

### **Why Tags?**

* Run **specific groups of tests** without executing all
* Useful for **smoke, regression, or critical tests**

### **Implementation**

1. Use `test.describe` with a tag

```javascript
const { test } = require('@playwright/test');

test.describe('@smoke Login Tests', () => {
    test('Valid login', async ({ page }) => {
        // test steps
    });
});
```

2. Run tagged tests via CLI

```bash
npx playwright test --grep @smoke
```

### **Tips**

* Keep tags consistent (`@smoke`, `@regression`, `@critical`)
* Combine multiple tags with regex:

```bash
npx playwright test --grep "@smoke|@regression"
```

---

## **4. Coding Standards (ESLint + Prettier)**

### **Why Coding Standards?**

* Ensures **consistent code formatting**
* Reduces **bugs and readability issues**
* Important in **team collaboration**

### **Setup ESLint**

```bash
npm install -D eslint
npx eslint --init
```

* Select: JavaScript, Node, CommonJS, recommended rules
* Create `.eslintrc.js`

### **Setup Prettier**

```bash
npm install -D prettier eslint-config-prettier eslint-plugin-prettier
```

* Add to `.eslintrc.js`

```javascript
extends: ["eslint:recommended", "plugin:prettier/recommended"]
```

* Format all JS files:

```bash
npx prettier --write .
```

### **Best Practices**

* Use **consistent naming conventions** for pages, tests, and helpers
* Keep **one action per method** in POM
* Separate **test data from test logic**

---

## **5. Summary of Day 4**

By the end of Day 4, learners should be able to:

1. Generate **HTML and Allure reports**
2. Integrate **logging with Allure** for step-level visibility
3. Run **tagged tests** selectively
4. Apply **ESLint + Prettier** for consistent coding standards
5. Combine **POM + wrapper methods + reporting + tags + coding standards** for a professional framework

---

# 📑 Playwright Training – Day 5 Detailed Notes

## **Objective**

By the end of Day 5, learners will be able to:

* Integrate the Playwright framework with **GitHub Actions CI/CD**
* Debug tests using **Playwright Trace Viewer**
* Execute a **full end-to-end scenario** using POM, JSON data, wrapper methods, retries, screenshots, and Allure reporting

---

## **1. GitHub Actions Integration (CI/CD)**

### **Why CI/CD?**

* Run automated tests on every **push or pull request**
* Ensure **code quality** and **early bug detection**
* Integrate **Allure reports** for visibility

### **Setup GitHub Actions**

1. Create `.github/workflows/playwright.yml`

```yaml
name: Playwright Tests

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
      - name: Install dependencies
        run: npm install
      - name: Install Playwright Browsers
        run: npx playwright install
      - name: Run Playwright Tests
        run: npx playwright test --reporter=allure-playwright
      - name: Upload Allure Results
        uses: actions/upload-artifact@v3
        with:
          name: allure-results
          path: reports/allure-results
```

### **Explanation**

* Checkout repo and setup Node.js
* Install dependencies & browsers
* Run tests using **Playwright + Allure**
* Upload **Allure results as artifacts** for viewing

---

## **2. Debugging Tests**

### **Playwright Trace Viewer**

* Helps **analyze failures step-by-step**
* Enable tracing in config or test:

```javascript
await page.context().tracing.start({ screenshots: true, snapshots: true });
await page.goto('https://example.com');
// test steps
await page.context().tracing.stop({ path: 'reports/trace.zip' });
```

* Open trace:

```bash
npx playwright show-trace reports/trace.zip
```

* Features: timeline of actions, screenshots, DOM snapshots

### **Other Debugging Tips**

* `page.pause()` → pause test execution and open inspector
* `console.log()` → view runtime values in terminal
* Check **Allure reports** for failed step screenshots/videos

---

## **3. Final End-to-End Scenario**

### **Scenario Example**

**Login → Create Item → Logout**

#### **1. Test Data (JSON)**

Path: `data/endToEndData.json`

```json
{
  "username": "testuser",
  "password": "Test@123",
  "itemName": "Playwright Tutorial Item"
}
```

#### **2. Page Objects**

* `loginPage.js` → login actions
* `homePage.js` → create item, logout actions

#### **3. Wrapper Methods**

* `clickElement`, `enterText`, `waitForElement`

#### **4. Test File**

`tests/endToEnd.spec.js`

```javascript
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');
const { HomePage } = require('../pages/homePage');
const data = require('../data/endToEndData.json');

test('End-to-End Scenario: Login → Create Item → Logout', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    // Login
    await loginPage.navigate();
    await loginPage.login(data.username, data.password);

    // Create Item
    await homePage.createItem(data.itemName);

    // Verify item creation
    expect(await homePage.getItemName()).toBe(data.itemName);

    // Logout
    await homePage.logout();
});
```

### **5. Execution**

* Run locally:

```bash
npx playwright test
```

* View **Allure report**:

```bash
allure serve reports/allure-results
```

* Run via GitHub Actions automatically on push/PR

---

## **4. Summary of Day 5**

By the end of Day 5, learners will be able to:

1. Execute tests in **CI/CD using GitHub Actions**
2. Debug failures using **Playwright Trace Viewer and screenshots/videos**
3. Run a **full end-to-end scenario** with all framework features
4. Generate **Allure reports** with step-level visibility
5. Understand **how the framework scales to real-world projects**

---

✅ **Day 5 completes the 5-day Playwright training** with a full framework built from scratch, covering:

* Foundations & setup
* POM + config + static JSON data + wrapper methods
* Retries, hooks, screenshots/videos
* Reporting, logging, tagging, coding standards
* CI/CD, debugging, and end-to-end project

---

