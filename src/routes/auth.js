const router = require('express').Router();
const auth = require('../controllers/auth');

router.post('/login', auth.login);
router.post('/register/customer', auth.registerCustomer);
router.post('/register/saller', auth.registerSaller);

module.exports = router;