// pages/LoginPage.js

class LoginPage {

  constructor(page) {
    this.page = page;

    this.loginEmail = page.locator('input[data-qa="login-email"]');
    this.loginPassword = page.locator('input[data-qa="login-password"]');
    this.loginBtn = page.locator('button[data-qa="login-button"]');
    this.loginErrorMsg = page.locator('p:has-text("Your email or password is incorrect!")');

    this.signupName = page.locator('input[data-qa="signup-name"]');
    this.signupEmail = page.locator('input[data-qa="signup-email"]');
    this.signupBtn = page.locator('button[data-qa="signup-button"]');
  }

  async navigate() {
    await this.page.goto('/login');
    await this.page.waitForLoadState('networkidle');
  }

  async login(email, password) {
    await this.loginEmail.fill(email);
    await this.loginPassword.fill(password);
    await this.loginBtn.click();
  }

  async signup(name, email) {
    await this.signupName.fill(name);
    await this.signupEmail.fill(email);
    await this.signupBtn.click();
  }

  async isLoginErrorVisible() {
    return await this.loginErrorMsg.isVisible();
  }
}

module.exports = { LoginPage };