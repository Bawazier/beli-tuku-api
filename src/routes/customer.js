const router = require('express').Router();
const profile = require('../controllers/profile');
const cart = require('../controllers/cart');
const address = require('../controllers/address');

router.get('/profile/account', profile.findAccountById);
router.patch('/profile/account', profile.updateAccountById);
router.put('/profile/account', profile.updateAccountAllById);

router.get('/address', address.findAddressByUserId);
router.post('/address', address.createAddressByUserId);
router.patch('/address/:id', address.updateAddressByUserId);
router.put('/address/:id', address.updateAddressAllByUserId);

router.get('/cart', cart.findByStatusIn);
router.get('/chekout', cart.findByStatusOut);
router.post('/cart', cart.addCart);
router.patch('/cart', cart.createCart);

module.exports = router;