const router = require('express').Router();
const user = require('../controllers/user');

router.post('/login', user.login);
router.post('/', user.create);
router.get('/:id', user.findById);
router.get('/', user.findAll);
router.put('/:id', user.updateAll);
router.patch('/:id', user.updateById);
router.delete('/:id', user.deleteById);

module.exports = router;