const model = require('../models/products');

const getAllProducts = async () => model.getAllProducts();

module.exports = { getAllProducts };
