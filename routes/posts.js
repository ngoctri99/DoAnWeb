var express = require('express');
var router = express.Router();
const postsControllers = require('../controllers/posts');
const posts = require('../models/posts');
/* GET home page. */

router.get('/post=:id', postsControllers.indexPost);

router.get('/up', postsControllers.indexUpload);
router.post('/up', postsControllers.upload);

router.get('/up-img', postsControllers.indexUploadimg);
router.post('/up-img', postsControllers.uploadimg);

module.exports = router;