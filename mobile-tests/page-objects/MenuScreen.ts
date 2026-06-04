import { tapFirstVisible } from '../support/findVisible.js';

export class MenuScreen {
  private openMenuSelectors = [
    '~open menu',
    '~Open Menu',
    'android=new UiSelector().descriptionContains("menu")'
  ];

  private loginMenuSelectors = [
    '~menu item log in',
    '~Log In',
    'android=new UiSelector().textContains("Log")'
  ];

  async openLogin() {
    await tapFirstVisible(this.openMenuSelectors);
    await tapFirstVisible(this.loginMenuSelectors);
  }
}

export default new MenuScreen();
