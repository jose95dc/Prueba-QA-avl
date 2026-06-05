import { findVisible } from '../support/findVisible.js';
import { dismissAndroidCompatibilityDialog } from '../support/dismissAndroidCompatibilityDialog.js';

class LoginScreen {
  async typeText(element: ReturnType<typeof $>, value: string) {
    await element.click();
    await browser.pause(500);

    try {
      await element.setValue(value);
    } catch (error) {
      console.log(`setValue falló para "${value}". Usando browser.keys...`);
      await element.click();
      await browser.pause(500);
      await browser.keys(value);
    }

    await browser.pause(500);
  }

  async login(username: string, password: string) {
    await dismissAndroidCompatibilityDialog();
    await browser.pause(500);

    const usernameInput = await findVisible([
      'xpath=(//android.widget.EditText)[1]',
      'android=new UiSelector().className("android.widget.EditText").instance(0)',
      '~Username input field',
      '~Username',
      '~username',
    ], 5000);

    await this.typeText(usernameInput, username);

    const passwordInput = await findVisible([
      'xpath=(//android.widget.EditText)[2]',
      'android=new UiSelector().className("android.widget.EditText").instance(1)',
      '~Password input field',
      '~Password',
      '~password',
    ], 5000);

    await this.typeText(passwordInput, password);

    // Cerrar teclado
    try {
      await browser.hideKeyboard();
    } catch (error) {
      try {
        await browser.back();
      } catch (innerError) {
        // Continuar si no se pudo cerrar teclado
      }
    }

    await browser.pause(800);

    // Intentar primero por selector
    try {
      const loginButton = await findVisible([
        'android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/loginBtn")',
        'android=new UiSelector().description("Tap to login with given credentials")',
        'android=new UiSelector().text("Login")',
      ], 8000);

      await loginButton.click();

      console.log('Click ejecutado sobre el botón verde Login');

      await browser.pause(5000);

      await dismissAndroidCompatibilityDialog();
      
      return;
    } catch (error) {
      console.log('No se encontró el botón Login por selector. Intentando tap por coordenadas...');
    }

    await browser.releaseActions();
    await browser.pause(2000);

    await dismissAndroidCompatibilityDialog();
  }

  async expectLoginError() {
    try {
      const errorMessage = await findVisible([
        'android=new UiSelector().textContains("Provided credentials")',
        'android=new UiSelector().textContains("do not match")',
        'android=new UiSelector().textContains("Invalid")',
        'android=new UiSelector().textContains("Error")',
      ], 5000);

      await expect(errorMessage).toBeDisplayed();
    } catch (error) {
      try {
        const productsScreen = await findVisible([
          'android=new UiSelector().textContains("Products")',
          'android=new UiSelector().textContains("Sauce Labs Backpack")',
          'android=new UiSelector().textContains("Sauce Labs Backpack (green)")',
        ], 3000);

        if (await productsScreen.isDisplayed()) {
          throw new Error(
            'BUG FUNCIONAL: la app permitió ingresar al catálogo con credenciales inválidas.'
          );
        }
      } catch (innerError) {
        // Si tampoco encontró Products, dejamos caer el error original
      }

      await browser.saveScreenshot(`./reports/login-error-${Date.now()}.png`);
      console.log(await browser.getPageSource());

      throw error;
    }
  }
}

export default new LoginScreen();
