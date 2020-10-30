const connection = require('./connection');

const getDetails = async (id) => {
  const orderDetails = await connection()
    .then((db) => db.getTable('sales_products')
      .select()
      .where('sale_id = :id')
      .bind('id', id)
      .execute())
    .then((result) => result.fetchAll() || []);
  const orderDetailsWithNameIntermediate = await orderDetails
    .map(async ([orderId, productId, quantity]) => {
      const productInfo = await connection()
        .then((db) => db.getTable('products')
          .select()
          .where('id = :productId')
          .bind('productId', productId)
          .execute())
        .then((result) => result.fetchAll()[0] || []);
      const [prodId, name, price] = productInfo;
      return { orderId, prodId, name, price, quantity };
    });
  return Promise.all(orderDetailsWithNameIntermediate);
};

module.exports = {
  getDetails,
};
