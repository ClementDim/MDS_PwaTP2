import { Sequelize, DataTypes, Model } from 'sequelize';

// DB Connexion
const sequelize = new Sequelize('db_tp2', 'admin', 'password', {
  host: 'mariadb',
  dialect: 'mariadb'
});

export class Task extends Model {}

Task.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  detail: {
    type: DataTypes.STRING,
    allowNull: false
  },
  link: {
    type: DataTypes.STRING
  },
  image: {
    type: DataTypes.STRING
  },
  is_done: {
    type: DataTypes.BOOLEAN,
    default: false
  },
}, {
  sequelize,
  modelName: 'Task'
});

await Task.sync({ force: true });