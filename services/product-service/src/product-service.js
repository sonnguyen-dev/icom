const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const log = require('@sonnguyen/log')(__filename);
const { sequelize } = require('./models');
const productRoute = require('./routes/product.route');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(compression());
app.use(helmet());

const { APP_PORT } = process.env;

app.use('/api/v1/products', productRoute);

(async () => {
  await sequelize.authenticate();
  await sequelize.sync({ alter: true });

  log.info('Connected to database');
  app.listen(APP_PORT, () => {
    log.info(`Product service was started on port ${APP_PORT}`);
  });
})();
