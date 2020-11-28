const router = require("express").Router();
const auth = require("../controllers/auth");

router.post("/signup", auth.signup);
router.post("/signin", auth.signin);
router.get("/forgot/password", auth.validateForgotPass);
router.post("/forgot/password/:id", auth.forgotPass);

module.exports = router;
