const router = require("express").Router();
const auth = require("../controllers/Auth/auth");
const profile = require("../controllers/Customer/profile");
const address = require("../controllers/Customer/address");
const transaction = require("../controllers/Customer/transaction");
const rating = require("../controllers/Customer/rating");

router.get("/account", profile.getUser);
router.patch("/account", profile.patchUser);
router.put("/account", profile.putUser);
router.put("/change/pass", auth.changePass);

router.post("/address", address.postAddress);
router.patch("/address/:id", address.patchAddress);
router.get("/address/:id", address.getAddressId);
router.get("/address", address.listAddress);
router.delete("/address/:id", address.deleteAddress);

router.post("/rating/product/:id", rating.postRating);

router.get("/topup", transaction.listTopup);
router.post("/topup/:id", transaction.topupCredit);

router.post("/cart/:id", transaction.addProductToCart);
router.delete("/cart/:id", transaction.deleteCart);
router.get("/cart", transaction.listCart);
router.put("/cart/out/:id", transaction.checkOutCart);
router.put("/cart/in/", transaction.discardCheckoutCart);

router.post("/order", transaction.orderByCredit);
router.get("/order/:id", transaction.detailOrder);
router.get("/order", transaction.listOrder);

module.exports = router;