const { test, expect } = require('@playwright/test');

// write a first test case to navigate to the google url and verify the page title

// async, page and await, test

test("Verify the google page navigation ", async ({page})=>{

await page.goto("https://www.google.com");

// Google 
await expect(page).toHaveTitle("Google"); // assertion

await expect(page).toHaveURL("https://www.google.com/");

});