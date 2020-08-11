var express = require('express');
var indexController = require('../controllers/indexs');
var router = express.Router();
var searchController = require("../controllers/search");


/* GET home page. */

router.get('/', indexController.index);
router.get('/index', indexController.index);
router.get('/home', indexController.index);
router.post('/search', searchController.search);
module.exports = router;
