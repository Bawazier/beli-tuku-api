const router = require("express").Router();
// const profile = require("../controllers/profile");
const products = require("../controllers/products");

router.post("/product", products.postProduct);

module.exports = router;