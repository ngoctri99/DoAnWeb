var postsModel = require('../models/posts');
var categoriesModel = require('../models/categories');
var indexController = require('./indexs');

module.exports={
  loadCategories: async function(){
    var list_cate = [];
    var list_cateParent = await categoriesModel.getAllParent();
    for(var i = 0; i < list_cateParent.length; i++){
      var list_cateSub = await categoriesModel.getAllSub(list_cateParent[i].category_id);
        var item = {
          categoryParent: list_cateParent[i],
          categoriesSub: list_cateSub,
          empty: list_cateSub.length !== 0
      };
        list_cate.push(item);
      }
      return list_cate;
    },
    searchCategory: async function(req, res, next) {
        //get category
        var list_cate = [];
    var list_cateParent = await categoriesModel.getAllParent();
    for(var i = 0; i < list_cateParent.length; i++){
      var list_cateSub = await categoriesModel.getAllSub(list_cateParent[i].category_id);
        var item = {
          categoryParent: list_cateParent[i],
          categoriesSub: list_cateSub,
          empty: list_cateSub.length !== 0
      };
        list_cate.push(item);
      }
        //get all post
        //kiem tra category cos phai Parent
        var checkParent = categoriesModel.checkParent(req.query.id);
        if(checkParent.length == 0){
          var list_posts = await postsModel.getPostWithCategory(0,req.query.id);
        }else{
          var list_posts = await postsModel.getPostWithCategory(req.query.id);
        }
        //get post hot
        var list_post_hot = await postsModel.getHot(indexController.LIMIT_POSTS_HOT);
        var url = "/category?id="+req.query.id+"&name="+req.query.name+"&";
        var pageCurrent = req.query.page;
        var page = await indexController.loadPage(list_posts,indexController.LIMIT_POSTS,list_post_hot,indexController.LIMIT_POSTS_HOT,list_cate,pageCurrent,url);
        res.render('index', { page: page});
  },
  
};