const model = require('../models');

const getDetails = async (orderNumber) => {
  const orderDetails = await model.orderDetails.getDetails(orderNumber);
  return orderDetails;
};

module.exports = { getDetails };
