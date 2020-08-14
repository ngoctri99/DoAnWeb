const postsModels = require('../models/posts');
const multer = require('multer');
const slug = require('slug')
module.exports = {
  // upload chuan khong can sua
  indexUpload: async function(req, res){

    const result = await postsModels.categori();
    res.render('posts/upload', { categori: result });
  },

  upload: async function(req, res){

    const entity={
      post_decs: req.body.fulldes,
      post_name: req.body.txtTieude,
      post_meta: req.body.txtTomtat,
      post_cate: req.body.txtChuyenmuc,
      post_slug: slug(req.body.txtTieude),
    };

    console.log(req.body.fulldes);
    console.log(req.body.txtTieude);
    console.log(req.body.txtTomtat);
    console.log(req.body.txtChuyenmuc);
    console.log(slug(req.body.txtTieude));

    await postsModels.add(entity);

    res.redirect('/post/up-img?slug='+entity.post_slug);
  },

  indexUploadimg: function(req, res)
  {
    return res.render('posts/uploadimg')
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
    await this.updateView(entity.post_id);
    res.render('posts/post',{post:post[0]});
  },
  updateView: async function(req, res, next){
    const entity = {
      post_id : req.params.id
    };
    await postsModels.getNumbers(entity.post_id);
  }

};
