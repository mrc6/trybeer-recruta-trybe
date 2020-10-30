const { Router } = require('express');
const service = require('../services/products');

const products = Router();

products.get('/', async (req, res) => {
  const allProducts = await service.getAllProducts();
  return res.status(200).json(allProducts);
});

module.exports = products;
