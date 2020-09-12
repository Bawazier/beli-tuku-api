const router = require('express').Router();
const category = require('../controllers/category');

router.post('/', category.create);
router.get('/', category.findAll);

module.exports = router;