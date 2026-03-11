// pages/HomePage.js

class HomePage {
  
  constructor(page) {
    this.page = page;

    this.logo = page.locator('img[alt="Website for automation practice"]');
    this.signupLoginBtn = page.locator('a[href="/login"]');
    this.productsBtn = page.locator('a[href="/products"]');
    this.cartBtn = page.locator('a[href="/view_cart"]');
  }

  async navigate() {
    await this.page.goto('/');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async clickSignupLogin() {
    await this.signupLoginBtn.click();
  }

  async clickProducts() {
    await this.productsBtn.click();
  }

  async clickCart() {
    await this.cartBtn.click();
  }

  async isLogoVisible() {
    return await this.logo.isVisible();
  }
}

module.exports = { HomePage };