const router = require('express').Router();
const products = require('../controllers/products');

router.get('/:id', products.findAllProducts);

module.exports = router;