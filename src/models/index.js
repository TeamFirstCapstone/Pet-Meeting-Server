import Sequelize from 'sequelize';
import { Comment } from './Comment';
import { Worry } from './Worry';

let sequelize = null;

function connectDatabase() {
  sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD, {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: 'mysql',
      logging: false,
      timezone: '+09:00'
    }
  );
  const models = [Worry, Comment];
  models.forEach((model) => {
    model.load(sequelize);
  })
  models.forEach((model) => {
    model.link(sequelize);
  })
}

function getConnection() {
  return sequelize;
}

function sync() {
  if (!sequelize) {
    connectDatabase();
  }
  sequelize.sync();
}

export {
    Worry,
    Comment,
    sequelize,
    getConnection,
    sync,
    connectDatabase
}

export default {
    Worry,
    Comment,
    sequelize,
    getConnection,
    sync,
    connectDatabase
}
