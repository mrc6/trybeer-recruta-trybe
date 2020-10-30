const jwt = require('jsonwebtoken');
const login = require('../services/login');
const loginModel = require('../models/login');

const secret = 'trybeer-grupo9';
const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const token = jwt.sign({ id: 2, role: 'user', userEmail: 'teste@teste', name: 'Teste' }, secret, jwtConfig);

const returnedObject = { id: 2, name: 'Teste', email: 'teste@teste', password: '124234', role: 'user' };
const filteredObject = { id: 2, name: 'Teste', email: 'teste@teste', role: 'user' };

describe('testing de login service', () => {
  test('invalid email', async () => {
    expect(await login.validateLogin('fabiano')).toEqual({ code: 400, message: 'Email deve ter o formato tal' });
  });
  test('invalid password', async () => {
    expect(await login.validateLogin('fabiano@gmail.com', '124')).toEqual({ code: 400, message: 'Senha no formato incorreto' });
  });
  test('user not found', async () => {
    loginModel.getUserInfo = jest.fn().mockReturnValue({ id: undefined });
    expect(await login.validateLogin('fabiano@gmail.com', '124234')).toEqual({ code: 404, message: 'usuário não encontrado' });
  });
  test('wrong password', async () => {
    loginModel.getUserInfo = jest.fn().mockReturnValue(returnedObject);
    expect(await login.validateLogin('fabiano@gmail.com', '124236')).toEqual({ code: 401, message: 'senha incorreta' });
  });
  test('all valid', async () => {
    loginModel.getUserInfo = jest.fn().mockReturnValue(returnedObject);
    expect(await login.validateLogin('fabiano@gmail.com', '124234')).toEqual(filteredObject);
  });
  test('testing token creation', async () => {
    loginModel.getUserInfo = jest.fn().mockReturnValue(returnedObject);
    expect(await login.login({ email: 'teste@teste', password: '124234' })).toEqual({ name: 'Teste', email: 'teste@teste', role: 'user', token });
  });
});
