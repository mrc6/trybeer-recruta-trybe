const { changeStatusOrderById } = require('../models/salesModel');

const adminOrderDetailService = async (req, res) => {
  const { id } = req.params;
  const result = await changeStatusOrderById(id);
  if (result) {
    res.status(202).send(result);
  } else {
    res.status(500).send({ message: 'Internal Server Error', code: 'server_error' });
  }
};

module.exports = adminOrderDetailService;
