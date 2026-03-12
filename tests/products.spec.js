// tests/products.spec.js

const { test, expect } = require('@playwright/test');
const { ProductsPage } = require('../pages/ProductsPage');
const { CartPage } = require('../pages/CartPage');

test.describe('Products & Cart Tests', () => {

  // TC_004: Products page load ஆகுதான்னு check
  test('TC_004: Products page successfully load ஆகணும்', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.navigate();

    // Products list visible ஆகுதான்னு check
    const isVisible = await productsPage.isProductsListVisible();
    expect(isVisible).toBeTruthy();

    // URL correct-ஆ இருக்கான்னு check
    await expect(page).toHaveURL(/.*products.*/);

    console.log('✅ TC_004: Products page load — PASSED');
  });

  // TC_005: Product search பண்றோம்
  test('TC_005: Product search correctly work ஆகணும்', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.navigate();

    // "Top" என்று search பண்றோம்
    await productsPage.searchProduct('Top');

    // Search results வருதான்னு check
    const count = await productsPage.getSearchedProductsCount();
    expect(count).toBeGreaterThan(0);

    // Search results page-ல இருக்கான்னு check
    await expect(page.locator('h2.title.text-center'))
      .toContainText('Searched Products');

    console.log('✅ TC_005: Product search — PASSED');
  });

  // TC_006: Cart-ல product add பண்றோம்
  test('TC_006: Product cart-ல add ஆகணும்', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await productsPage.navigate();

    // முதல் product-ஐ cart-ல add பண்றோம்
    await productsPage.addFirstProductToCart();

    // View Cart click பண்றோம்
    await productsPage.clickViewCart();

    // Cart-ல item இருக்கான்னு check
    const itemsCount = await cartPage.getCartItemsCount();
    expect(itemsCount).toBeGreaterThan(0);

    console.log('✅ TC_006: Add to cart — PASSED');
  });

  // TC_007: Cart-ல இருக்க product delete பண்றோம்
  test('TC_007: Cart-ல இருக்க product delete ஆகணும்', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    // முதல்ல product add பண்றோம்
    await productsPage.navigate();
    await productsPage.addFirstProductToCart();
    await productsPage.clickViewCart();

    // Delete பண்றோம்
    await cartPage.deleteFirstProduct();

    // Cart empty ஆச்சான்னு check
    const isEmpty = await cartPage.isCartEmpty();
    expect(isEmpty).toBeTruthy();

    console.log('✅ TC_007: Delete from cart — PASSED');
  });

});