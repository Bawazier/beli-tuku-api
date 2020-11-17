const router = require("express").Router();
const profile = require("../controllers/profile");
// const cart = require('../controllers/cart');
const address = require("../controllers/address");
// const ratings = require('../controllers/ratings');
const products = require("../controllers/products");

router.get("/profile/account", profile.getUser);
router.patch("/profile/account", profile.patchUser);
router.put("/profile/account", profile.putUser);
router.post("/product/demo", products.postProduct);
router.post("/product/rating", products.postRating);

router.get("/profile/address", address.getAddress);
router.get("/profile/address/:id", address.getAddressId);
router.post("/profile/address", address.postAddress);
router.patch("/profile/address/:id", address.patchAddress);
// router.put('/profile/address/:id', address.updateAddressAllByUserId);
// router.put('/profile/address/primary/:id', address.updatePrimaryAddress);

// router.get('/cart/in', cart.findByStatusIn);
// router.get('/cart/out', cart.findByStatusOut);
// router.post('/cart/product/:id', cart.addCart);
// router.patch('/cart/in/:id', cart.createCart);
// router.patch('/cart/out/', cart.chekOut);

// router.get('/ratings/user', ratings.findByUserId);
// router.post('/ratings/product/:id', ratings.createRatings);
// router.patch('/ratings/product/:id', ratings.updateRatings);

module.exports = router;