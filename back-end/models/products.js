const connection = require('./connection');

const getAllProducts = async () => connection()
  .then((db) => db.getTable('products')
    .select('id', 'name', 'price', 'url_image')
    .execute())
  .then((res) => res.fetchAll())
  .then((result) => result.map(([id, name, price, urlImage]) => ({ id, name, price, urlImage })));

module.exports = {
  getAllProducts,
};
