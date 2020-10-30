const connection = require('./connection');

const getPurchases = async (email) => {
  const userInfo = await connection()
    .then((db) => db.getTable('users')
      .select()
      .where('email = :email')
      .bind('email', email)
      .execute())
    .then((result) => result.fetchAll()[0] || []);
  const [id] = userInfo;
  const purchases = await connection()
    .then((db) => db.getTable('sales')
      .select()
      .where('user_id = :id')
      .bind('id', id)
      .execute())
    .then((result) => result.fetchAll() || []);
  return purchases.map(([saleId, userId, totalPrice, deliveryAddress, deliveryNumber,
    delivery_district, delivery_city, saleDate, status]) => ({
    id: saleId, userId, totalPrice, deliveryAddress, deliveryNumber, delivery_district, delivery_city, saleDate, status,
  }));
};

module.exports = {
  getPurchases,
};
