const router = require('express').Router();
const cart = require('../controllers/cart');

router.post('/', cart.create);
router.get('/:id', cart.findById);
router.get('/', cart.findAll);
router.put('/:id', cart.updateAll);
router.delete('/:id', cart.deleteById);

module.exports = router;