const { Router } = require('express');
const service = require('../services');
const auth = require('../middlewares/auth');

const orderDetails = Router();

orderDetails.get('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const details = await service.orderDetails.getDetails(id);
  res.status(200).json({ details });
});

module.exports = orderDetails;
