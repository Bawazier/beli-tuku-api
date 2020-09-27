const router = require('express').Router();
const user = require('../controllers/user');
const product = require('../controllers/product');
const productImages = require('../controllers/productImages');
const productColors = require('../controllers/productColors');

const uploadHelper = require('../helper/upload');

router.get('/user/:id', user.findById);
router.patch('/user/:id', uploadHelper.single('picture'), user.update);
router.delete('/user/:id', user.deleteById);

router.get('/product/user/:id', product.findByUserId);
router.post('/product/', product.create);
router.patch('/product/:id', product.update);
router.delete('/product/:id', product.deleteById);
router.delete('/product/user/:id', product.deleteByUserId);

router.get('/images/product/:id', productImages.findByProductId);
router.post('/images/product/', uploadHelper.single('picture'), productImages.create);
router.patch('/images/product/:id', uploadHelper.single('picture'), productImages.update);
router.delete('/images/product/:id', productImages.delete);
router.delete('/images/:id', productImages.deleteByProductId);

router.get('/colors/product/:id', productColors.findByProductId);
router.post('/colors/product/', productColors.create);
router.patch('/colors/product/:id', productColors.update);
router.delete('/colors/product/:id', productColors.delete);
router.delete('/colors/:id', productColors.deleteByProductId);

module.exports = router;