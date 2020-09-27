const router = require('express').Router();
const user = require('../controllers/user');
const userAddress = require('../controllers/userAddress');
const productRatings = require('../controllers/productRatings');
const cart = require('../controllers/cart');

const uploadHelper = require('../helper/upload');

router.get('/user/:id', user.findById);
router.post('/user/', uploadHelper.single('picture'), user.create);
router.patch('/user/:id', uploadHelper.single('picture'), user.update);
router.delete('/user/:id', user.deleteById);

router.get('/address/user/:id', userAddress.findByUserId);
router.post('/address/', userAddress.create);
router.patch('/address/:id', userAddress.update);
router.delete('/address/:id', userAddress.delete);
router.delete('/address/user/:id', userAddress.deleteByUserId);

router.get('/cart/user/:id', cart.findByUserId);
router.post('/cart/', cart.create);
router.patch('/cart/:id', cart.update);
router.delete('/cart/:id', cart.delete);
router.delete('/cart/product/:id', cart.deleteByProductId);
router.delete('/cart/user/:id', cart.deleteByUserId);

router.get('/ratings/user/:id', productRatings.findByUserId);
router.post('/ratings/', productRatings.create);
router.patch('/ratings/:id', productRatings.update);
router.delete('/ratings/:id', productRatings.delete);
router.delete('/ratings/user/:id', productRatings.deleteByUserId);
router.delete('/ratings/product/:id', productRatings.deleteByProductId);

module.exports = router;