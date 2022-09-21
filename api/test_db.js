const { Sequelize } = require('sequelize');
//const sequelize = new Sequelize('mariadb://admin:admin@mariadb/db_tp2');

const sequelize = new Sequelize('db_tp2', 'admin', 'password', {
  host: 'mariadb',
  dialect: 'mariadb'
});

(async () => {

  //await new Promise((resolve, reject) => {setTimeout(resolve, 1000000)});
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.log('Unable to connect to the database:', error);
  }
})();