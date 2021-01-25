const router = require('express').Router();
const controller = require('../controllers/product.controller');

router.get('/:id', controller.show);
router.get('/', controller.find);
router.post('/', controller.create);

module.exports = router;
