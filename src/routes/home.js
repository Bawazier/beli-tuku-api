const router = require("express").Router();
const home = require("../controllers/home");

router.get("/product/search", home.searchProduct);
router.get("/categories", home.findCategory);
router.get("/product/category/:id", home.searchCategory);
router.get("/product/news", home.searchNews);
router.get("/product/popular", home.searchPopular);

module.exports = router;