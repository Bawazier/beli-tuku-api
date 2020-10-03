const router = require('express').Router();
const profile = require('../controllers/profile');
const products = require('../controllers/products');

router.get('/profile/account', profile.findAccountById);
router.patch('/profile/account', profile.updateAccountById);
router.put('/profile/account', profile.updateAccountAllById);

router.get('/products', products.findProductByUserId);
router.post('/products', products.createProductByUserId);
router.patch('/products', products.updateProductByUserId);
router.put('/products', products.updateProductAllByUserId);

module.exports = router;