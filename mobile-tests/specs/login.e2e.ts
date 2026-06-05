import MenuScreen from '../page-objects/MenuScreen.js';
import LoginScreen from '../page-objects/LoginScreen.js';
import ProductsScreen from '../page-objects/ProductsScreen.js';
import { dismissAndroidCompatibilityDialog } from '../support/dismissAndroidCompatibilityDialog.js';

describe('Mobile - Login', () => {
  beforeEach(async () => {
    await browser.reloadSession();
    await dismissAndroidCompatibilityDialog();
    await browser.pause(1000);
  });

  afterEach(async function () {
    if (this.currentTest?.state === 'failed') {
      const timestamp = Date.now();

      await browser.saveScreenshot(`./reports/login-error-${timestamp}.png`);

      const source = await browser.getPageSource();
      console.log('===== PAGE SOURCE AL FALLAR =====');
      console.log(source);
      console.log('===== FIN PAGE SOURCE =====');
    }
  });

  //Caso 1 Inicio de Sesión (Login): credenciales inválidas

  it('Caso 1 Inicio de Sesión (Login): credenciales inválidas', async () => {
  await MenuScreen.openLogin();
  await dismissAndroidCompatibilityDialog();
  await browser.pause(1000);

  await LoginScreen.login('usuario.invalidoexample.com', 'claveIncorrecta');

  await browser.pause(10000);

  await ProductsScreen.expectCatalogVisible();

  throw new Error(
    'BUG FUNCIONAL: la app permitió ingresar a Products con credenciales inválidas.'
  );
});

  //Caso 2 Inicio de Sesión (Login): credenciales validas
  it('Caso 2 Inicio de Sesión (Login): credenciales validas', async () => {
    await MenuScreen.openLogin();
    await dismissAndroidCompatibilityDialog();
    await browser.pause(1000);
    await LoginScreen.login('bob@example.com', '10203040');

    await browser.pause(4000);

    await ProductsScreen.expectCatalogVisible();
  });
});