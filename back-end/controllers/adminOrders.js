const { Router } = require('express');
const service = require('../services/adminOrders');

const adminOrders = Router();

adminOrders.get('/', async (req, res) => {
  const orders = await service.getOrdersAdmin();
  res.status(200).json(orders);
});

module.exports = adminOrders;
