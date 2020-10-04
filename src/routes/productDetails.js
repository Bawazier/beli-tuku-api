const router = require('express').Router();
const productDetails = require('../controllers/productDetails');

router.get('/:id', productDetails.findProductDetails);

module.exports = router;