var express = require('express');
var categoryController = require('../controllers/categories');
var router = express.Router();

/* GET home page. */
router.get('/', categoryController.searchCategory);
module.exports = router;