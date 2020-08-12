var express = require('express');
var indexController = require('../controllers/indexs');
var router = express.Router();


/* GET home page. */

router.get('/', indexController.index);
router.get('/index', indexController.index);
router.get('/home', indexController.index);
module.exports = router;
