const router = require("express").Router();
const profile = require("../controllers/profile");
// const cart = require('../controllers/cart');
// const address = require('../controllers/address');
// const ratings = require('../controllers/ratings');

router.get("/profile/account", profile.getUser);
router.patch("/profile/account", profile.patchUser);
router.put("/profile/account", profile.putUser);

// router.get('/profile/address', address.findAddressByUserId);
// router.post('/profile/address', address.createAddressByUserId);
// router.patch('/profile/address/:id', address.updateAddressByUserId);
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