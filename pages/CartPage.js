// pages/CartPage.js

class CartPage {

  constructor(page) {
    this.page = page;

    // Cart page elements
    this.cartItems = page.locator('#cart_info_table tbody tr');
    this.cartProductName = page.locator('.cart_description h4 a');
    this.cartProductPrice = page.locator('.cart_price p');
    this.cartProductQuantity = page.locator('.cart_quantity button');
    this.deleteProductBtn = page.locator('.cart_quantity_delete').first();
    this.emptyCartMsg = page.locator('#empty_cart');
    this.proceedToCheckoutBtn = page.locator('.btn.btn-default.check_out');
  }

  async navigate() {
    await this.page.goto('/view_cart');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async getCartItemsCount() {
    return await this.cartItems.count();
  }

  async getFirstProductName() {
    return await this.cartProductName.first().textContent();
  }

  async getFirstProductPrice() {
    return await this.cartProductPrice.first().textContent();
  }

  async deleteFirstProduct() {
    await this.deleteProductBtn.click();
    // Delete ஆகும் வரை wait பண்றோம்
    await this.page.waitForTimeout(1000);
  }

  async isCartEmpty() {
    return await this.emptyCartMsg.isVisible();
  }

  async clickProceedToCheckout() {
    await this.proceedToCheckoutBtn.click();
  }

}

module.exports = { CartPage };