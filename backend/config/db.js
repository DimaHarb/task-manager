const { Sequelize } = require('sequelize');
const { DB_NAME, DB_USER, DB_PASS, DB_HOST } = require('./env');

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: 'postgres',
  logging: false, // Disable SQL logging for cleaner output
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });


module.exports = sequelize;
