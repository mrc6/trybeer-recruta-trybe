const { Router } = require('express');
const service = require('../services');

const userInfo = Router();

userInfo.post('/', async (req, res) => {
  const { email } = req.body;
  const { code, message, id, street, city, district, number } = await service.login.collectInfo(email);
  if (message) return res.status(code).json({ message });
  return res.status(200).json({ id, street, city, district, number });
});

module.exports = userInfo;
