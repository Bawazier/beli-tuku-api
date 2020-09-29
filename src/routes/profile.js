const router = require('express').Router();
const profile = require('../controllers/profile');

const uploadHelper = require('../helper/upload');


router.get('/account', profile.findAccount);
router.patch('/account', uploadHelper.single('picture'), profile.updateAccount);
router.put('/account', uploadHelper.single('picture'), profile.updateAccountAll);

router.get('/address', profile.findAddress);
router.post('/address', profile.createAddress);
router.patch('/address/:id', profile.updateAddress);
router.put('/address/:id', profile.updateAddressAll);

module.exports = router;