var express = require('express');
var router = express.Router();
const postsControllers = require('../controllers/posts');

/* GET home page. */

router.get('/post=:id', async function(req, res, next) {
    const entity = {
      post_id : req.params.id
    };
    var post = await posts.getNumbers(entity);
    res.render('posts/post',{post:post[0]});
});

router.get('/up', postsControllers.indexUpload);
router.post('/up', postsControllers.upload);

module.exports = router;