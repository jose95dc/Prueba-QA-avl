import ProductsScreen from '../page-objects/ProductsScreen.js';
import { dismissAndroidCompatibilityDialog } from '../support/dismissAndroidCompatibilityDialog.js';

describe('Mobile - Navegación y cambio de estado', () => {
  beforeEach(async () => {
    await browser.reloadSession();
    await dismissAndroidCompatibilityDialog();
    await browser.pause(1500);
  });

  it('debe navegar al detalle de producto y agregarlo al carrito', async () => {
    await ProductsScreen.expectCatalogVisible();
    await ProductsScreen.openFirstProduct();
    await ProductsScreen.addCurrentProductToCart();
    await ProductsScreen.expectCartUpdated();
  });
});
