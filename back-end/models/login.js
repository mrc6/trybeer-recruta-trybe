const connection = require('./connection');

const getUserInfo = async (_email) => {
  const userInfo = await connection()
    .then((db) => db.getTable('users')
      .select()
      .where('email = :email')
      .bind('email', _email)
      .execute())
    .then((result) => result.fetchAll()[0] || []);
  const [id, name, email, password, street, number, district, city, role] = userInfo;
  return ({ id, name, email, password, street, number, district, city, role });
};

module.exports = {
  getUserInfo,
};
