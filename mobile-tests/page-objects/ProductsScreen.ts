import { findVisible, tapFirstVisible } from '../support/findVisible.js';

export class ProductsScreen {
  private productsTitleSelectors = [
    '~Products',
    'android=new UiSelector().textContains("Products")'
  ];

  private firstProductSelectors = [
    '~Sauce Labs Backpack',
    'android=new UiSelector().textContains("Backpack")'
  ];

  private addToCartSelectors = [
    '~Add To Cart button',
    '~Add To Cart',
    'android=new UiSelector().textMatches("(?i).*add.*cart.*")'
  ];

  private cartBadgeSelectors = [
    '~cart badge',
    'android=new UiSelector().descriptionContains("cart")',
    'android=new UiSelector().text("1")'
  ];

  async expectCatalogVisible() {
    const title = await findVisible(this.productsTitleSelectors, 12_000);
    await expect(title).toBeDisplayed();
  }

  async openFirstProduct() {
    await tapFirstVisible(this.firstProductSelectors);
  }

  async addCurrentProductToCart() {
    await tapFirstVisible(this.addToCartSelectors);
  }

  async expectCartUpdated() {
    const badge = await findVisible(this.cartBadgeSelectors, 10_000);
    await expect(badge).toBeDisplayed();
  }
}

export default new ProductsScreen();
