const { Router } = require('express');
const adminOrderDetailService = require('../services/adminOrderDetailService');
const adminOrderDetailChangeStatusService = require('../services/adminOrderDetailChangeStatusService');

const admin = Router();

admin.get('/orders/:id', adminOrderDetailService);
admin.put('/orders/:id', adminOrderDetailChangeStatusService);

module.exports = admin;
