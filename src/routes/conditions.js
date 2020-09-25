const router = require('express').Router();
const conditions = require('../controllers/conditions');

router.post('/', conditions.create);
router.get('/', conditions.findAll);
router.patch('/:id', conditions.update);
router.delete('/:id', conditions.delete);

module.exports = router;