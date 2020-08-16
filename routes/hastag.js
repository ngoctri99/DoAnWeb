var express = require('express');
var hastagController = require('../controllers/hastag');
var router = express.Router();


/* GET home page. */

router.get('/', hastagController.searchHastag);

module.exports = router;

