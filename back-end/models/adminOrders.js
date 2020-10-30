const connect = require('./connection');

const getOrdersAdmin = () => connect()
  .then((db) => db.getTable('sales')
    .select('id', 'total_price', 'delivery_address', 'delivery_number', 'status')
    .execute())
  .then((res) => res.fetchAll())
  .then((result) => result.map(([id, totalPrice, addressDelivery, numberDelivery, status]) => (
    { id, totalPrice, addressDelivery, numberDelivery, status }
  )));

module.exports = { getOrdersAdmin };
