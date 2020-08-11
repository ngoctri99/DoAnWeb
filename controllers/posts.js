const postsModels = require('../models/posts');
const multer = require('multer');

module.exports = {
  // upload chuan khong can sua
  indexUpload: async function(req, res){

    const result = await postsModels.categori();
    res.render('posts/upload', { categori: result });
  },

  upload: function(req, res){

    const entity={
      post_decs: req.body.fulldes,
      post_name: req.body.txtTieude,
      post_cate: req.body.txtChuyenmuc,
      post_image: req.body.fullimg,
    };

    const storage = multer.diskStorage({
      filename(req, file, cb) {
        cb(null, file.originalname);
      },
      destination(req, file, cb) {
        cb(null, './public/images');
      }
    });

    console.log(req.body.fulldes);
    console.log(req.body.txtTieude,);
    console.log(req.body.txtChuyenmuc);
    console.log(req.body.fullimg);

    const upload = multer({ storage });
    upload.array('fullimg', 3)(req, res, async function (err) {
      if (!err)
      {
        await postsModels.add(entity);
      }
      else res.send('err');
    })
  },


};
