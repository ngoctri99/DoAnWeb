var express = require('express');
var adminvipController = require('../controllers/adminvip');
var router = express.Router();

router.get('/',  adminvipController.index);
router.get('/editer', adminvipController.indexediteradmin);
router.get('/editer/duyet', adminvipController.editerduyet);



module.exports = router;