const router = require("express").Router();
const profile = require("../controllers/profile");
const cart = require("../controllers/cart");
const order = require("../controllers/order");
const address = require("../controllers/address");
const products = require("../controllers/products");

router.get("/account", profile.getAccount);
router.patch("/account", profile.patchAccount);
router.put("/account", profile.putAccount);

router.post("/address", address.postAddress);
router.patch("/address/:id", address.patchAddress);
router.get("/address/:id", address.getAddressId);
router.get("/address", address.listAddress);
router.delete("/address/:id", address.deleteAddress);

router.post("/rating/product/:id", products.postRating);

router.post("/cart/:id", cart.postCart);
router.patch("/cart/:id", cart.pathCart);
router.get("/cart", cart.listCart);
router.put("/cart/out", cart.chekoutCart);
router.get("/cart/out", cart.listChekoutCart);
router.get("/cart/order", cart.listOrderCart);

router.post("/order", order.postOrder);
router.get("/order/:id", order.getOrder);
router.get("/order", order.listOrder);

module.exports = router;