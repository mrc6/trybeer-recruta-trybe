const { getDetailByOrderId, getStatusOrderById } = require('../models/salesModel');
const { getAllProducts } = require('../models/products');

const adminOrderDetailService = async (req, res) => {
  const { id } = req.params;
  const result = await getDetailByOrderId(id);

  if (result) {
    const products = await getAllProducts();
    const orderStatus = await getStatusOrderById(id);
    let orderProducts = [];
    result.map((e) => {
      orderProducts = [
        ...orderProducts,
        Object.assign(
          ...products.filter((p) => p.id === e.productId),
          { quantity: e.quantity },
        ),
      ];
      return orderProducts;
    });
    res.status(200).send({ orderProducts, orderStatus });
  } else {
    res.status(404).send({ message: 'Order not found', code: 'not_found' });
  }
};

module.exports = adminOrderDetailService;
