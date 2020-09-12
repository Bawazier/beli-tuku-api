const router = require('express').Router();
const product = require('../controllers/product');

router.post('/', product.create);
router.get('/:id', product.findById);
router.get('/', product.findAll);

module.exports = router;