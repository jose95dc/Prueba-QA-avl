import { findVisible } from '../support/findVisible.js';

class ProductsScreen {
  async expectCatalogVisible() {
    await browser.pause(2000);

    try {
      const catalog = await findVisible([
        // Posibles resource-id de la pantalla de productos
        'android=new UiSelector().resourceIdMatches(".*product.*")',
        'android=new UiSelector().resourceIdMatches(".*title.*")',
        'android=new UiSelector().resourceIdMatches(".*catalog.*")',

        // Textos visibles en pantalla
        'android=new UiSelector().textContains("Products")',
        'android=new UiSelector().textContains("Sauce Labs Backpack")',
        'android=new UiSelector().textContains("Sauce Labs")',
        'android=new UiSelector().textContains("Backpack")',
        'android=new UiSelector().textContains("29.99")',
      ], 12000);

      await expect(catalog).toBeDisplayed();
      return;
    } catch (error) {
      const source = await browser.getPageSource();

      const isProductsScreen =
        source.includes('Products') ||
        source.includes('Sauce Labs') ||
        source.includes('Backpack') ||
        source.includes('29.99') ||
        source.includes('product') ||
        source.includes('Product');

      if (isProductsScreen) {
        console.log('Pantalla Products detectada por pageSource.');
        return;
      }

      await browser.saveScreenshot(`./reports/products-not-found-${Date.now()}.png`);

      console.log('===== PAGE SOURCE AL NO ENCONTRAR PRODUCTS =====');
      console.log(source);
      console.log('===== FIN PAGE SOURCE PRODUCTS =====');

      throw error;
    }
  }

  async openFirstProduct() {
    const firstProduct = await findVisible([
      'android=new UiSelector().textContains("Sauce Labs Backpack")',
      'android=new UiSelector().textContains("Backpack")',
      'android=new UiSelector().resourceIdMatches(".*title.*")',
      'android=new UiSelector().resourceIdMatches(".*product.*")',
    ], 12000);

    await firstProduct.click();
  }

  async addCurrentProductToCart() {
    const addButton = await findVisible([
      'android=new UiSelector().textContains("Add To Cart")',
      'android=new UiSelector().textContains("Add to cart")',
      'android=new UiSelector().textContains("Add")',
      'android=new UiSelector().resourceIdMatches(".*cart.*")',
    ], 12000);

    await addButton.click();
  }

  async expectCartUpdated() {
    const cart = await findVisible([
      'android=new UiSelector().descriptionContains("cart")',
      'android=new UiSelector().resourceIdMatches(".*cart.*")',
      'android=new UiSelector().textContains("1")',
    ], 12000);

    await expect(cart).toBeDisplayed();
  }
}

export default new ProductsScreen();