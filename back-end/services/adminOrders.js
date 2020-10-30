const model = require('../models/adminOrders');

const getOrdersAdmin = async () => model.getOrdersAdmin();

module.exports = { getOrdersAdmin };
