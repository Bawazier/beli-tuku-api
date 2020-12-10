const router = require("express").Router();
const auth = require("../controllers/Auth/auth");

router.post("/signup/:id", auth.signup);
router.post("/signin", auth.signin);
router.get("/forgot/password", auth.validateForgotPass);
router.put("/forgot/password/:id", auth.forgotPass);

module.exports = router;
