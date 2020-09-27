const router = require('express').Router();
const user = require('../controllers/user');

const uploadHelper = require('../helper/upload');

router.post('/login', user.login);
router.post('/register/', uploadHelper.single('picture'), user.create);

module.exports = router;