const router = require("express").Router();
const home = require("../controllers/home");

router.get("/products", home.listProducts);
router.get("/popular/products", home.listPopularProducts);
router.get("/categories", home.listCategories);
router.get("/products/categories/:id", home.listProductsByCategories);
router.get("/products/:id", home.getDetailsProduct);

module.exports = router;