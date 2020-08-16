var express = require('express');
var adminController = require('../controllers/admin');
var router = express.Router();

/* GET home page. */

//index
router.get('/',  adminController.index);

router.get('/editer', adminController.indexediter);
router.get('/editer/duyet', adminController.editerduyet);



module.exports = router;
