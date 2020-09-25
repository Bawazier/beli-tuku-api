const router = require('express').Router();
const roles = require('../controllers/roles');

router.post('/', roles.create);
router.get('/', roles.findAll);
router.patch('/:id', roles.update);
router.delete('/:id', roles.delete);

module.exports = router;