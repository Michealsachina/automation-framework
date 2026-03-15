// step-definitions/loginSteps.js

const { Given, When, Then, Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { LoginPage } = require('../pages/LoginPage');
const testData = require('../test-data/testData.json');

// Timeout 60 seconds-ஆ set பண்றோம்
setDefaultTimeout(60 * 1000);

// Browser + Page — global-ஆ வச்சிருக்கோம்
let browser;
let page;
let homePage;
let loginPage;

Before(async () => {
  browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  page = await context.newPage();
  homePage = new HomePage(page);
  loginPage = new LoginPage(page);
});

After(async () => {
  await browser.close();
});

Given('user is on the login page', async () => {
  await homePage.navigate();
  await homePage.clickSignupLogin();
});

When('user enters valid email and password', async () => {
  await loginPage.login(
    testData.validUser.email,
    testData.validUser.password
  );
});

When('user enters invalid email and password', async () => {
  await loginPage.login(
    testData.invalidUser.email,
    testData.invalidUser.password
  );
});

When('user submits login form with empty fields', async () => {
  await loginPage.login('', '');
});

Then('user should be redirected to homepage', async () => {
  const url = page.url();
  if (!url.includes('automationexercise.com/') || url.includes('login')) {
    throw new Error(`Expected homepage URL but got: ${url}`);
  }
});

Then('logged in username should be visible', async () => {
  const isVisible = await page.locator('a:has-text("Logged in as")').isVisible();
  if (!isVisible) {
    throw new Error('Logged in username is not visible!');
  }
});

Then('error message should be displayed', async () => {
  const isVisible = await loginPage.isLoginErrorVisible();
  if (!isVisible) {
    throw new Error('Error message is not visible!');
  }
});

Then('user should remain on login page', async () => {
  const url = page.url();
  if (!url.includes('login')) {
    throw new Error(`Expected login page but got: ${url}`);
  }
});