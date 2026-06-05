import MenuScreen from '../page-objects/MenuScreen.js';
import ProductsScreen from '../page-objects/ProductsScreen.js';
import { dismissAndroidCompatibilityDialog } from '../support/dismissAndroidCompatibilityDialog.js';

describe('Mobile - Agregar producto al carrito', () => {
  beforeEach(async () => {
    await browser.reloadSession();
    await dismissAndroidCompatibilityDialog();
    await browser.pause(1500);
  });

  it('debe agregar Sauce Labs Backpack al carrito', async () => {
    // 1. Abrir menú hamburguesa
    await MenuScreen.openMenu();
    await dismissAndroidCompatibilityDialog();
    await browser.pause(1000);

    // 2. Click en Catalog
    await MenuScreen.openCatalog();
    await dismissAndroidCompatibilityDialog();
    await browser.pause(1500);

    // 3. Validar catálogo
    await ProductsScreen.expectCatalogVisible();

    // 4. Click en Sauce Labs Backpack
    await ProductsScreen.openFirstProduct();

    // 5. Click en Add to cart
    await ProductsScreen.addCurrentProductToCart();

    // 6. Click en icono carrito superior derecho
    await ProductsScreen.openCart();

    // 7. Validar producto en My Cart
    await ProductsScreen.expectProductInCart();

    await browser.pause(5000);
  });
});
