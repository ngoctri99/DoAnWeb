const postsModels = require('../models/posts');
const vipModels = require('../models/vip');
const multer = require('multer');
const slug = require('slug')
module.exports = {
  // upload chuan khong can sua
  indexUpload: async function(req, res){

    if(req.session.isAuthenticated)
    {
      if(req.session.authUser.account_id == 3)
      {
        const result = await postsModels.categori();
        res.render('posts/upload', { categori: result });
      }
      else{
        res.redirect();
      }
    }
    else{
      res.redirect();
    }
  },

  upload: async function(req, res){

    const entity={
      post_decs: req.body.fulldes,
      post_name: req.body.txtTieude,
      post_tag: req.body.txtTag,
      post_meta: req.body.txtTomtat,
      post_cate: req.body.txtChuyenmuc,
      post_slug: slug(req.body.txtTieude),
    };

    await postsModels.add(entity);

    res.redirect('/post/up-img?slug='+entity.post_slug);
  },

  indexUploadimg: function(req, res)
  {

    if(req.session.isAuthenticated)
    {
      if(req.session.authUser.account_id == 3)
      {
        return res.render('posts/uploadimg')
      }
      else{
        res.redirect();
      }
    }
    else{
      res.redirect();
    }
  },

  uploadimg: async function(req, res)
  {

    const storage = multer.diskStorage({
      async filename(req, file, cb) {
        cb(null, file.originalname);

        const entity = {
          post_slug: req.query.slug,
          post_image: file.originalname,
        };
        await postsModels.upload(entity.post_image, entity.post_slug);
      },
      destination(req, file, cb) {
        cb(null, './public/images');
      },
    });
    //console.log(ten);

    const upload = multer({ storage });
    upload.array('fullimg', 3)(req, res, function (err) {
      if (!err){
        res.render('posts/upload');
      }
      else res.send('err');
    })
  },

  indexPost: async function(req, res, next) {
    const entity = {
      post_id : req.params.id
    };

    var post = await postsModels.getNumbers(entity.post_id);
	//get post connection moi nhat
    var postConnection = await postsModels.getNumbers(0,post["post_cate"],false,true,4);
    //get comment
    var postComment = await commentModels.loadComment(entity.post_id);
    var pagePost = [];
    pagePost.post = post[0];
    pagePost.postConnection = postConnection;
    pagePost.postComment = postComment;
    

    if(post[0].post_level == 2)
    {
      if(req.session.isAuthenticated != null)
      {
        if(req.session.authUser.account_level == 2)
        {
          const timediff = await vipModels.timediff(req.session.authUser.account_id);

          if(timediff[0].timediff.slice(0,1) == '-')
          {
            vipModels.updatehethang(req, res);
            res.redirect('/vip/kt');
          }
          else {
		await postsModels.updateViews(entity.post_id);
            res.render('posts/post',{post:pagePost});
          }
        }
        else
        {
          res.redirect('/vip/kt');
        }

      }
      else if(!req.session.isAuthenticated)
      {
        res.redirect('/vip/kt');
      }
    }
    else if(post[0].post_level != 2)
    {
	await postsModels.updateViews(entity.post_id);
      res.render('posts/post',{post:pagePost});
    }
  },

};
