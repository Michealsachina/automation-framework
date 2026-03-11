// tests/login.test.js

const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { LoginPage } = require('../pages/LoginPage');
const testData = require('../test-data/testData.json');

test.describe('Login Functionality Tests', () => {

  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();
    await homePage.clickSignupLogin();
  });

  test('TC_001: Valid credentials-ல successful login ஆகணும்', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(
      testData.validUser.email,
      testData.validUser.password
    );

    await expect(page).toHaveURL('https://automationexercise.com/');
    await expect(page.locator('a:has-text("Logged in as")')).toBeVisible();

    console.log('✅ TC_001: Valid login — PASSED');
  });

  test('TC_002: Invalid credentials-ல error message காட்டணும்', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(
      testData.invalidUser.email,
      testData.invalidUser.password
    );

    const isErrorVisible = await loginPage.isLoginErrorVisible();
    expect(isErrorVisible).toBeTruthy();

    console.log('✅ TC_002: Invalid login error — PASSED');
  });

  test('TC_003: Empty fields-ல form submit ஆகக்கூடாது', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login('', '');

    await expect(page).toHaveURL(/.*login.*/);

    console.log('✅ TC_003: Empty fields validation — PASSED');
  });

});