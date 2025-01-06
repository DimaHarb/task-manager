require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 5000,
  DB_NAME: process.env.DB_NAME ,
  DB_USER: process.env.DB_USER ,
  DB_PASS: process.env.DB_PASS ,
  DB_HOST: process.env.DB_HOST ,
};
