const router = require("express").Router();
const home = require("../controllers/Home/home");

router.get("/products", home.listProducts);
router.get("/categories", home.listCategories);
router.get("/products/:id", home.detailsProduct);
router.get("/product/reviews", home.detailsProductReview);

module.exports = router;