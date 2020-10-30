const { Router } = require('express');
const checkoutService = require('../services/checkoutService');

const checkout = Router();

checkout.post('/', checkoutService);

module.exports = checkout;
