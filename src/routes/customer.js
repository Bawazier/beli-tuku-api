const router = require('express').Router();
const profile = require('../controllers/profile');
const cart = require('../controllers/cart');
const address = require('../controllers/address');

router.get('/profile/account', profile.findAccountById);
router.patch('/profile/account', profile.updateAccountById);
router.put('/profile/account', profile.updateAccountAllById);

router.get('/profile/address', address.findAddressByUserId);
router.post('/profile/address', address.createAddressByUserId);
router.patch('/profile/address/:id', address.updateAddressByUserId);
router.put('/profile/address/:id', address.updateAddressAllByUserId);
router.put('/profile/address/primary/:id', address.updatePrimaryAddress);

router.get('/cart/in', cart.findByStatusIn);
router.get('/cart/out', cart.findByStatusOut);
router.post('/cart/product/:id', cart.addCart);
router.patch('/cart/in/:id', cart.createCart);
router.patch('/cart/out/', cart.chekOut);

module.exports = router;