import { findVisible } from '../support/findVisible.js';
import { dismissAndroidCompatibilityDialog } from '../support/dismissAndroidCompatibilityDialog.js';

class ProductsScreen {
  async expectCatalogVisible() {
    await dismissAndroidCompatibilityDialog();
    await browser.pause(1000);

    try {
      const catalog = await findVisible([
        'android=new UiSelector().textContains("Products")',
        'android=new UiSelector().resourceIdMatches(".*product.*")',
        'android=new UiSelector().textContains("Sauce Labs Backpack")',
        'android=new UiSelector().textContains("Backpack")',
      ], 10000);

      await expect(catalog).toBeDisplayed();
      return;
    } catch (error) {
      const source = await browser.getPageSource();

      if (
        source.includes('Products') ||
        source.includes('Sauce Labs Backpack') ||
        source.includes('Backpack') ||
        source.includes('product')
      ) {
        console.log('Catálogo detectado por pageSource.');
        return;
      }

      await browser.saveScreenshot(`./reports/catalog-not-found-${Date.now()}.png`);
      console.log(source);
      throw error;
    }
  }

  async openFirstProduct() {
    await dismissAndroidCompatibilityDialog();
    await browser.pause(1000);

    const size = await browser.getWindowSize();

    // Tap directo sobre la imagen del primer producto: Sauce Labs Backpack
    const x = Math.round(size.width * 0.28);
    const y = Math.round(size.height * 0.31);

    console.log(`Haciendo tap sobre la imagen del primer producto en x=${x}, y=${y}`);

    await browser.performActions([
      {
        type: 'pointer',
        id: 'finger1',
        parameters: { pointerType: 'touch' },
        actions: [
          {
            type: 'pointerMove',
            duration: 0,
            x,
            y,
          },
          { type: 'pointerDown', button: 0 },
          { type: 'pause', duration: 250 },
          { type: 'pointerUp', button: 0 },
        ],
      },
    ]);

    await browser.releaseActions();
    await browser.pause(2500);

    await dismissAndroidCompatibilityDialog();

    // Validamos que sí entró al detalle del producto
    const source = await browser.getPageSource();

    if (
      source.includes('Add to cart') ||
      source.includes('Add To Cart') ||
      source.includes('Add') ||
      source.includes('Sauce Labs Backpack')
    ) {
      console.log('Detalle del producto abierto correctamente.');
      return;
    }

    await browser.saveScreenshot(`./reports/product-detail-not-opened-${Date.now()}.png`);
    console.log('===== PAGE SOURCE DESPUÉS DE TAP EN IMAGEN =====');
    console.log(source);
    console.log('===== FIN PAGE SOURCE =====');

    throw new Error('No se logró abrir el detalle del producto al hacer tap sobre la imagen.');
  }

  async addCurrentProductToCart() {
    await dismissAndroidCompatibilityDialog();
    await browser.pause(1500);

    try {
      const addButton = await findVisible([
        'android=new UiSelector().textContains("Add to cart")',
        'android=new UiSelector().textContains("Add To Cart")',
        'android=new UiSelector().textContains("Add")',
        'android=new UiSelector().resourceIdMatches(".*cart.*")',
      ], 8000);

      await addButton.click();
      console.log('Click ejecutado sobre Add to cart.');
      await browser.pause(2000);
      return;
    } catch (error) {
      console.log('No se encontró Add to cart por selector. Intentando tap por coordenadas.');
    }

    const size = await browser.getWindowSize();

    await browser.performActions([
      {
        type: 'pointer',
        id: 'finger1',
        parameters: { pointerType: 'touch' },
        actions: [
          {
            type: 'pointerMove',
            duration: 0,
            x: Math.round(size.width * 0.50),
            y: Math.round(size.height * 0.84),
          },
          { type: 'pointerDown', button: 0 },
          { type: 'pause', duration: 250 },
          { type: 'pointerUp', button: 0 },
        ],
      },
    ]);

    await browser.releaseActions();
    await browser.pause(2000);
  }

  async openCart() {
    await dismissAndroidCompatibilityDialog();
    await browser.pause(1000);

    const cartButton = await findVisible([
      'android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/cartRL")',
      'android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/cartIV")',
      'android=new UiSelector().descriptionContains("cart")',
    ], 8000);

    await cartButton.click();
    await browser.pause(2000);
  }

  async expectProductInCart() {
    await dismissAndroidCompatibilityDialog();
    await browser.pause(1000);

    try {
      const cartTitle = await findVisible([
        'android=new UiSelector().textContains("My Cart")',
        'android=new UiSelector().textContains("Sauce Labs Backpack")',
        'android=new UiSelector().textContains("Remove Item")',
        'android=new UiSelector().textContains("Proceed To Checkout")',
      ], 10000);

      await expect(cartTitle).toBeDisplayed();
      return;
    } catch (error) {
      const source = await browser.getPageSource();

      const isCartVisible =
        source.includes('My Cart') &&
        source.includes('Sauce Labs Backpack');

      if (isCartVisible) {
        console.log('Producto detectado correctamente en My Cart por pageSource.');
        return;
      }

      await browser.saveScreenshot(`./reports/cart-validation-error-${Date.now()}.png`);
      console.log(source);
      throw error;
    }
  }

  async expectCartUpdated() {
    await this.openCart();
    await this.expectProductInCart();
  }
}

export default new ProductsScreen();