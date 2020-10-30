const { getByEmail, createUser } = require('../models/userRegisterModel');

const validateEntries = (name, email, password) => {
  // Ref. https://stackoverflow.com/questions/4745112/javascript-regex-for-alphanumeric-string-with-length-of-3-5-chars
  const nameVerify = new RegExp(/^([a-zA-Z\s]){12,100}$/);
  // Ref. Regex email obtida em https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address
  const emailVerify = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);
  // Regex criada por mim mesmo
  const passwordVerify = new RegExp(/([0-9]){6,50}$/);

  if (!nameVerify.test(name)) {
    return {
      status: 403,
      message: 'Name must be only letters and greather than 12 characters length',
      code: 'invalid_data',
    };
  }
  if (!emailVerify.test(email)) {
    return {
      status: 403,
      message: 'Email must be a valid email',
      code: 'invalid_data',
    };
  }
  if (!passwordVerify.test(password)) {
    return {
      status: 403,
      message: 'Password must be a number and greather than 6 characters length',
      code: 'invalid_data',
    };
  }
  return { status: 200 };
};

const userRegisterService = async (req, res) => {
  const { name, email, password, role, street, number, city, district } = req.body;
  console.log(req.body);
  // Validações
  const validate = validateEntries(name, email, password);
  if (validate.status !== 200) {
    return res.status(validate.status).send({ message: validate.message, code: validate.code });
  }
  // Verifica se email já está no banco de dados
  const request = await getByEmail(email);
  if (request) {
    if (request.email === email) {
      return res.status(403).send({ message: 'E-mail already in database.', code: 'invalid_data' });
    }
  }
  const response = await createUser(name, email, password, role, street, number, city, district);
  console.log(response);
  res.status(201).send(response);
};

module.exports = userRegisterService;
