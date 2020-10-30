const connection = require('./connection');

const setNewName = ({ name, email }) => connection()
  .then((db) => db.getTable('users')
    .update()
    .set('name', name)
    .where('email = :email')
    .bind('email', email)
    .execute());

module.exports = {
  setNewName,
};
