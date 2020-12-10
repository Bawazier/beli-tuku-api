const router = require("express").Router();
const profile = require("../controllers/Customer/profile");
const address = require("../controllers/Customer/address");
const transaction = require("../controllers/Customer/transaction");
const rating = require("../controllers/Customer/rating");

router.get("/account", profile.getUser);
router.patch("/account", profile.patchUser);
router.put("/account", profile.putUser);

router.post("/address", address.postAddress);
router.patch("/address/:id", address.patchAddress);
router.get("/address/:id", address.getAddressId);
router.get("/address", address.listAddress);
router.delete("/address/:id", address.deleteAddress);

router.post("/rating/product/:id", rating.postRating);

router.get("/topup", transaction.listTopup);
router.post("/topup/:id", transaction.topupCredit);

router.post("/cart/:id", transaction.addProductToCart);
// router.patch("/cart/:id", cart.pathCart);
router.get("/cart", transaction.listCart);
router.put("/cart/out/:id", transaction.checkOutCart);
// router.get("/cart/out", cart.listChekoutCart);
router.get("/cart/order", transaction.orderByCredit);

// router.post("/order", order.postOrder);
// router.get("/order/:id", order.getOrder);
// router.get("/order", order.listOrder);

module.exports = router;