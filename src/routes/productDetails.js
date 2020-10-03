const router = require('express').Router();
const productDetails = require('../controllers/productDetails');

router.get('/products/search', productDetails.findProductBySearch);
router.get('/:id', productDetails.findProductDetails);

module.exports = router;