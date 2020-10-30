const jwt = require('jsonwebtoken');

const secret = 'trybeer-grupo9';

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, secret);
    req.userEmail = decoded.userEmail;
    next();
  } catch (err) {
    return res.status(400).send('não logado');
  }
};
