const { Router } = require('express');
const userRegisterService = require('../services/userRegisterService');

const userRegister = Router();

userRegister.post('/', userRegisterService);

module.exports = userRegister;
