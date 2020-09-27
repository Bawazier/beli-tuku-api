const router = require('express').Router();
const products = require('../controllers/products');
const category = require('../controllers/category');

router.get('/products/', products.findAll);
router.get('/category/', category.findAll);

module.exports = router;