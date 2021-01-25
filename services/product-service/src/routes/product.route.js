const router = require('express').Router();
const controller = require('../controllers/product.controller');

router.get('/:id', controller.show);
router.get('/', controller.find);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
