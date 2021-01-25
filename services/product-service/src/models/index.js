const Sequelize = require('sequelize');
const Product = require('./product.model');
require('dotenv').config();

const {
  DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME,
} = process.env;

const sequelize = new Sequelize(
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  {
    dialect: 'mysql',
    host: DB_HOST,
    port: DB_PORT,
  },
);

const models = {
  Product: Product.init(sequelize),
};

Object.values(models)
  .filter((model) => typeof model.associate === 'function')
  .forEach((model) => model.associate(models));

const db = {
  ...models,
  sequelize,
};

module.exports = db;
