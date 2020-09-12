const router = require('express').Router();
const category = require('../controllers/category');

router.post('/', category.create);
router.get('/', category.findAll);
router.get('/:id', category.findById);

module.exports = router;