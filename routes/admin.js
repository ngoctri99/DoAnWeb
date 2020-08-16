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

router.get('/vip-user',  adminController.indexvipuser);
router.get('/vip-edituser', adminController.edituser);

router.get('/vip-giahan', adminController.indexgiahan);
router.get('/vip-giahan-duyet', adminController.xlgiahan);


router.get('/vip-phancong', adminController.indexphancong);
router.get('/vip-editchuyenmuc', adminController.indexdoichuyenmuc);
router.get('/vip-editchuyenmucthuc', adminController.xlindexdoichuyenmuc);







module.exports = router;
