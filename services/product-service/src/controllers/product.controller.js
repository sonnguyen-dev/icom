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

async function find(req, res, next) {
  const { filter } = req.query;
  if (filter) {

  } else {
    res.status(400).json({ error: 'missing filter' });
  }
}

module.exports = {
  create, show, find,
};
