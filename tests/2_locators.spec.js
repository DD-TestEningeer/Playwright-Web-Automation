const { test, expect } = require("@playwright/test");

test("Locators Demo", async ({ page }) => {
  // page navigation
  await page.goto("https://dd-demo-tau.vercel.app/textbox.html");

  // 1) By ID locator

  // Target the input box and type the data

  await page.fill("#fullName", "Rahul Arora");

  await page.fill("#userEmail", "test@gmail.com");

  await page.fill("#currentAddress", "test address");

  await page.fill("#permanentAddress", "test new address");

  await page.locator('text="Submit"').click();
});
