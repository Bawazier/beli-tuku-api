const router = require('express').Router();
const product = require('../controllers/product');

router.post('/', product.create);
router.get('/:id', product.findById);
router.get('/', product.findAll);
router.put('/:id', product.updateAll);

module.exports = router;