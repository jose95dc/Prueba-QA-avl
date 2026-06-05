import { findVisible } from '../support/findVisible.js';
import { dismissAndroidCompatibilityDialog } from '../support/dismissAndroidCompatibilityDialog.js';


class MenuScreen {
  async openMenu() {
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
            x: Math.round(size.width * 0.09),
            y: Math.round(size.height * 0.10),
          },
          { type: 'pointerDown', button: 0 },
          { type: 'pause', duration: 100 },
          { type: 'pointerUp', button: 0 },
        ],
      },
    ]);

    await browser.releaseActions();
    await browser.pause(800);
  }

   async openCatalog() {
    await dismissAndroidCompatibilityDialog();

    const catalogButton = await findVisible([
      'android=new UiSelector().text("Catalog")',
      'android=new UiSelector().textContains("Catalog")',
      '~Catalog',
    ], 8000);

    await catalogButton.click();
    await browser.pause(1500);
  }

  async openLogin() {
    await this.openMenu();

    const loginButton = await findVisible([
      'android=new UiSelector().textContains("Log In")',
      'android=new UiSelector().textContains("Login")',
      '~Login',
      '~Log In',
    ], 5000);

    await loginButton.click();
    await browser.pause(800);
  }
}

export default new MenuScreen();