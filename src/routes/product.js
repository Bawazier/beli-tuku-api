const router = require('express').Router();
const product = require('../controllers/product');
const productBrands = require('../controllers/productBrands');
const productColors = require('../controllers/productColors');
const productImages = require('../controllers/productImages');
const productRatings = require('../controllers/productRatings');

router.get('/product/:id', product.findById);
router.get('/brands/product/:id', productBrands.findById);
router.get('/colors/product/:id', productColors.findById);
router.get('/images/product/:id', productImages.findById);
router.get('/ratings/product/:id', productRatings.findById);

module.exports = router;