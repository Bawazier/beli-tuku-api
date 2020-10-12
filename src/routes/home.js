const router = require('express').Router();
const home = require('../controllers/home');

router.get('/products/search', home.findProductBySearch);
router.get('/categories', home.findCategory);
router.get('/products/category/:id', home.findProductByCategoryId);
router.get('/products/new', home.findProductSortByCreatedAt);
router.get('/products/populer', home.findProductSortByRatings);

module.exports = router;