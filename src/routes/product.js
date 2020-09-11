const router = require('express').Router();
const product = require('../controllers/product');

router.post('/', product.create);

module.exports = router;