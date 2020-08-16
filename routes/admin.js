var express = require('express');
var adminController = require('../controllers/admin');
var router = express.Router();

/* GET home page. */

//index
router.get('/',  adminController.index);

router.get('/editer', adminController.indexediter);
router.get('/editer/duyet', adminController.editerduyet);

router.get('/vip',  adminController.indexvip);
router.get('/vip-editer',  adminController.indexvipediter);
router.get('/editer-duyet', adminController.editerduyetvip);





module.exports = router;
