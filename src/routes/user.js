const router = require('express').Router();
const user = require('../controllers/user');

const uploadHelper = require('../helper/upload');

router.post('/login', user.login);
router.post('/', uploadHelper.single('picture'), user.create);
router.get('/:id', user.findById);
router.get('/', user.findAll);
router.patch('/:id', uploadHelper.single('picture'), user.update);
router.delete('/:id', user.deleteById);

module.exports = router;