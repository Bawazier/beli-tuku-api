const router = require('express').Router();
const category = require('../controllers/category');

const uploadHelper = require('../helper/upload');

router.post('/', uploadHelper.single('image'), category.create);
router.get('/', category.findAll);
router.patch('/:id', uploadHelper.single('image'), category.update);
router.delete('/:id', category.delete);

module.exports = router;