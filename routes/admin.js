var express = require('express');
var adminController = require('../controllers/admin');
var router = express.Router();

/* GET home page. */

//index
router.get('/',  adminController.index);


module.exports = router;
