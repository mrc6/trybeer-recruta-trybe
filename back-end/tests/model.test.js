const login = require('../services/login');
const productList = require('../services/productList');
const profile = require('../services/profile');

describe('testing models', () => {
  test('testing loginModel', async () => {
    expect(await login.validateLogin('fabiano@gmail.com', '124234')).toEqual({ code: 404, message: 'usuário não encontrado' });
  });
  test('testing ProductList', async () => {
    expect(await productList.getPurchases('fabiano@gmail.com')).toEqual([]);
  });
  test('testing Profile', async () => {
    expect(profile.setNewName({ name: 'Fabiano', email: 'fab.emiliano@gmail.com' })).toBeUndefined();
  });
});
