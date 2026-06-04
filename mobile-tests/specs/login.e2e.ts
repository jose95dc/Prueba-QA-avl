import MenuScreen from '../page-objects/MenuScreen.js';
import LoginScreen from '../page-objects/LoginScreen.js';
import ProductsScreen from '../page-objects/ProductsScreen.js';

describe('Mobile - Login', () => {
  beforeEach(async () => {
    await browser.reloadSession();
  });

  it('debe rechazar credenciales inválidas', async () => {
    await MenuScreen.openLogin();
    await LoginScreen.login('usuario.invalido@example.com', 'claveIncorrecta');
    await LoginScreen.expectLoginError();
  });

  it('debe permitir login exitoso y mostrar el catálogo', async () => {
    await MenuScreen.openLogin();
    await LoginScreen.login('bob@example.com', '10203040');
    await ProductsScreen.expectCatalogVisible();
  });
});
