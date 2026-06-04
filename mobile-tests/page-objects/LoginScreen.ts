import { findVisible, tapFirstVisible } from '../support/findVisible.js';

export class LoginScreen {
  private usernameSelectors = [
    '~Username input field',
    'android=new UiSelector().resourceIdMatches(".*username.*")',
    'android=new UiSelector().className("android.widget.EditText").instance(0)'
  ];

  private passwordSelectors = [
    '~Password input field',
    'android=new UiSelector().resourceIdMatches(".*password.*")',
    'android=new UiSelector().className("android.widget.EditText").instance(1)'
  ];

  private loginButtonSelectors = [
    '~Login button',
    'android=new UiSelector().textMatches("(?i).*login.*")'
  ];

  private errorSelectors = [
    'android=new UiSelector().textContains("Provided credentials")',
    'android=new UiSelector().textContains("invalid")',
    'android=new UiSelector().textContains("Username and password")'
  ];

  async login(username: string, password: string) {
    const usernameInput = await findVisible(this.usernameSelectors);
    await usernameInput.setValue(username);

    const passwordInput = await findVisible(this.passwordSelectors);
    await passwordInput.setValue(password);

    await tapFirstVisible(this.loginButtonSelectors);
  }

  async expectLoginError() {
    const error = await findVisible(this.errorSelectors, 10_000);
    await expect(error).toBeDisplayed();
  }
}

export default new LoginScreen();
