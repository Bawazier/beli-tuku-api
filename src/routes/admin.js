const router = require('express').Router();
const category = require('../controllers/category');
const conditions = require('../controllers/conditions');
const roles = require('../controllers/roles');

const uploadHelper = require('../helper/upload');

router.get('/category', category.findAll);
router.post('/category', uploadHelper.single('image'), category.create);
router.patch('/category/:id', uploadHelper.single('image'), category.update);
router.delete('/category/:id', category.delete);

router.get('/conditions', conditions.findAll);
router.post('/conditions', conditions.create);
router.patch('/conditions/:id', conditions.update);
router.delete('/conditions/:id', conditions.delete);

router.get('/roles', roles.findAll);
router.post('/roles', roles.create);
router.patch('/roles/:id', roles.update);
router.delete('/roles/:id', roles.delete);

module.exports = router;