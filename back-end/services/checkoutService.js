const { createOrder } = require('../models/salesModel');
const { saveOrderWithProductDetails } = require('../models/saveOrderDetails');

const checkoutService = async (req, res) => {
  const {
    userId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    deliveryDistrict,
    deliveryCity,
    saleDate,
    status,
    store,
  } = req.body;

  // Validações
  const finalStore = store.reduce((acc, e) => {
    if (acc.find((el) => el.name === e.name)) {
      return [...acc.filter((el) => el.name !== e.name),
        { name: e.name, quantity: acc.filter((el) => el.name === e.name)[0].quantity + 1 }];
    }
    return [...acc, { name: e.name, quantity: 1 }];
  }, []);

  // Salva no banco
  const response = await createOrder(
    userId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    deliveryDistrict,
    deliveryCity,
    saleDate,
    status,
  );
  await saveOrderWithProductDetails(finalStore);
  res.status(201).send(response);
};

module.exports = checkoutService;
