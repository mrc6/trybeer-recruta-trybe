const connection = require('./connection');

const createOrder = async (
  userId,
  totalPrice,
  deliveryAddress,
  deliveryNumber,
  deliveryDistrict,
  deliveryCity,
  saleDate,
  status,
) => connection()
  .then((db) => db.getTable('sales')
    .insert([
      'user_id',
      'total_price',
      'delivery_address',
      'delivery_number',
      'delivery_district',
      'delivery_city',
      'sale_date',
      'status',
    ])
    .values([
      userId,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      deliveryDistrict,
      deliveryCity,
      saleDate,
      status,
    ])
    .execute())
  .then(() => ({
    userId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    saleDate,
    status,
  }))
  .catch((error) => error);

const getDetailByOrderId = async (id) => connection()
  .then((db) => db.getTable('sales_products')
    .select(['sale_id', 'product_id', 'quantity'])
    .where('sale_id = :id')
    .bind('id', id)
    .execute())
  .then((result) => result.fetchAll())
  .then((data) => data.map(([saleId, productId, quantity]) => ({ saleId, productId, quantity })))
  .catch((error) => error);

const getStatusOrderById = async (id) => connection()
  .then((db) => db.getTable('sales')
    .select(['id', 'status'])
    .where('id = :id')
    .bind('id', id)
    .execute())
  .then((result) => result.fetchAll())
  .then((data) => data.map(([_id, status]) => ({ status })))
  .catch((error) => error);

const changeStatusOrderById = async (id) => connection()
  .then((db) => db.getTable('sales')
    .update()
    .set('status', 'Entregue')
    .where('id = :id')
    .bind('id', id)
    .execute())
  .then(() => ({ saleId: id, status: 'Entregue' }))
  .catch((error) => error);

module.exports = {
  createOrder,
  getDetailByOrderId,
  getStatusOrderById,
  changeStatusOrderById,
};
