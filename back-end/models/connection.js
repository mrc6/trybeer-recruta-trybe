require('dotenv').config();
const msqlx = require('@mysql/xdevapi');

let connect;

const config = {
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.HOSTNAME,
  port: process.env.PORTDB || 33060,
};

module.exports = () => {
  if (connect) return Promise.resolve(connect);
  return msqlx.getSession(config)
    .then(async (session) => {
      connect = await session.getSchema('Trybeer');
      return connect;
    })
    .catch((err) => console.error(err) && process.exit(1));
};
