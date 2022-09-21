const { Sequelize } = require('sequelize');
//const sequelize = new Sequelize('mariadb://admin:admin@mariadb/db_tp2');

const sequelize = new Sequelize('db_tp2', 'admin', 'admin', {
  host: 'mariadb',
  dialect: 'mariadb'
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();