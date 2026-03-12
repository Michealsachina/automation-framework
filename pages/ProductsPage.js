// pages/ProductsPage.js

class ProductsPage {

  constructor(page) {
    this.page = page;

    // Products page elements
    this.productsList = page.locator('.features_items');
    this.firstProduct = page.locator('.features_items .col-sm-4').first();
    this.firstProductName = page.locator('.features_items .productinfo p').first();
    this.firstAddToCartBtn = page.locator('.features_items .add-to-cart').first();
    this.viewCartLink = page.locator('p.text-center a[href="/view_cart"]');
    this.continueShoppingBtn = page.locator('button:has-text("Continue Shopping")');
    this.searchInput = page.locator('#search_product');
    this.searchBtn = page.locator('#submit_search');
    this.searchedProducts = page.locator('.features_items .col-sm-4');
  }

  async navigate() {
    await this.page.goto('/products');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async isProductsListVisible() {
    return await this.productsList.isVisible();
  }

  async addFirstProductToCart() {
    // Product-ஓட மேல hover பண்றோம்
    await this.firstProduct.hover();
    // Add to cart button click பண்றோம்
    await this.firstAddToCartBtn.click();
  }

  async clickViewCart() {
    await this.viewCartLink.click();
  }

  async clickContinueShopping() {
    await this.continueShoppingBtn.click();
  }

  async searchProduct(productName) {
    await this.searchInput.fill(productName);
    await this.searchBtn.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async getSearchedProductsCount() {
    return await this.searchedProducts.count();
  }

}

module.exports = { ProductsPage };