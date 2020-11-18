const router = require("express").Router();
const auth = require("../controllers/auth");

router.post("/login", auth.login);
router.post("/signup", auth.signup);
router.patch("/change/password/:id", auth.changePass);
router.get("/forgot/password", auth.forgotPass);

module.exports = router;
