var express = require('express');
var categoriesController = require('../controllers/categories');
var router = express.Router();

/* GET home page. */

router.get('/', categoriesController.searchCategory);
module.exports = router;