const faker = require('faker');
const axios = require('axios');
const log = require('@sonnguyen/log')(__filename);
require('dotenv').config();

const URL = `http://localhost:${process.env.APP_PORT}/api/v1`;

function seedProducts() {
  const products = [];
  const brands = ['Brand A', 'Brand B', 'Brand C', 'Brand D'];
  const colors = ['White', 'Black', 'Gray', 'Pink', 'Blue', 'Gold'];

  for (let i = 0; i < 1000; i += 1) {
    products.push({
      name: faker.commerce.productName(),
      price: faker.commerce.price() / 10,
      brand: brands[faker.random.number(brands.length - 1)],
      color: colors[faker.random.number(colors.length - 1)],
    });
  }

  axios.post(`${URL}/products`, products)
    .then((res) => {
      log.info(res.data);
    })
    .catch((e) => {
      log.error(e.message);
    });
}

seedProducts();
