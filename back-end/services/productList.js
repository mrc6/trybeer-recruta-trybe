const model = require('../models');

const getPurchases = async (email) => {
  const products = await model.productList.getPurchases(email);
  return products;
};

module.exports = { getPurchases };
