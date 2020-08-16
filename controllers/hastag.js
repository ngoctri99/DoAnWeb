var postsModel = require('../models/posts');
var categoriesModel = require('../models/categories');
var indexController = require('./indexs');
var categoriesController = require('./categories');

module.exports={
    searchHastag: async function(req, res, next) {
        //get category
        var list_cate = await categoriesController.loadCategories();
        var hastag = req.query.name;
        //xu li hastag
        var Slug = await categoriesModel.getAllSlug();
        for(var i = 0; i < Slug.length; i++){
            var item =  Slug[i].category_slug.toLowerCase();
            var token = item.split("-");
            var check = token[0];
            for(var j = 1; j < token.length; j++){
                check = check + token[j];
            }
            console.log(check);
            if(hastag == check){
                var category_id = Slug[i].category_id;
                break;
            }
        }

        //kiem tra category cos phai Parent
        var checkParent = categoriesModel.checkParent(category_id);
        if(checkParent.length == 0){
          var list_posts = await postsModel.getPostWithCategory(0,category_id);
        }else{
          var list_posts = await postsModel.getPostWithCategory(category_id);
        }
        console.log();
        //get post hot
        var list_post_hot = await postsModel.getHot(indexController.LIMIT_POSTS_HOT);
        var url = "/hastag?name="+req.query.name+"&";
        var pageCurrent = req.query.page;
        var page = await indexController.loadPage(list_posts,indexController.LIMIT_POSTS,list_post_hot,indexController.LIMIT_POSTS_HOT,list_cate,pageCurrent,url);
        res.render('index', { page: page});
  },
  
};