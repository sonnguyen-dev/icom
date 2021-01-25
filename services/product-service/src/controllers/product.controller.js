const Sequelize = require('sequelize');
const { ProductArrayValidator } = require('../validators/product.validator');
const { Product } = require('../models');

async function create(req, res, next) {
  const validateResult = ProductArrayValidator.validate(req.body);
  if (validateResult.error) {
    next(validateResult.error);
  } else {
    Product.bulkCreate(validateResult.value)
      .then((inserted) => {
        res.json(inserted);
      })
      .catch((e) => next(e));
  }
}

async function show(req, res, next) {
  const { id } = req.params;
  if (id) {
    Product.findByPk(id)
      .then((product) => {
        if (product) {
          res.json(product);
        } else {
          res.status(404).json({ error: 'product id not found' });
        }
      })
      .catch((e) => next(e));
  } else {
    res.status(400).json({ error: 'missing product id' });
  }
}

function getOpsValue(value) {
  return value instanceof Array ? { [Sequelize.Op.in]: value } : value;
}

async function find(req, res, next) {
  const {
    query, color, brand, limit = 10, offset = 0,
  } = req.query;

  if (query) {
    if (query.length <= 2) {
      res.status(400).json({ error: 'query to short' });
    } else {
      const where = { name: { [Sequelize.Op.iLike]: `%${query}%` } };
      if (color) where.color = getOpsValue(color);
      if (brand) where.brand = getOpsValue(brand);

      try {
        const {
          count: totalProducts,
          rows: products,
        } = await Product.findAndCountAll({
          where,
          limit,
          offset,
        });

        res.json({
          products,
          page: Math.floor(offset / limit),
          totalPages: Math.floor(totalProducts / limit) + 1,
        });
      } catch (e) {
        next(e);
      }
    }
  } else {
    res.status(400).json({ error: 'missing filter' });
  }
}

// eslint-disable-next-line no-unused-vars
async function update(req, res) {
  // dummy
}

// eslint-disable-next-line no-unused-vars
async function destroy(req, res) {
  // dummy
}

module.exports = {
  create, show, find, update, destroy,
};
