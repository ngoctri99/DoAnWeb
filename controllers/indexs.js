var postsModel = require('../models/posts');
var categoriesModel = require('../models/categories');
var limit = 10;
var limitPostHot = 5;
var categoriesController = require('./categories');

module.exports.LIMIT_POSTS = 10;
module.exports.LIMIT_POSTS_HOT = 5;

module.exports.loadPage = async function(posts, limitPost, postsHot,limitPostHot,categories,pageCurrent = 1,url){
  var page = [];
  //get category
  var list_cate = categories;
  //get all post
  var list_posts = posts;
  //get post hot
  var list_post_hot = postsHot;
  //get danh muc hot

  //set count page
  page.pageCurrent = pageCurrent;

  var start = (page.pageCurrent - 1)*limitPost;
  var end = page.pageCurrent * limitPost;
    //count page
  page.count_items = [];
  
  var count = Math.ceil(list_posts.length/limitPost);
  for(var i = 1; i <= count; i++){
    var item = {'id':i};
    page.count_items.push(item);
  }
  //list post
  page.posts =  list_posts.slice(start,end);
  //list hot post
  page.posts_hot =list_post_hot;

  // page
  page.categories = list_cate;
  page.last = count;
  page.first = 1;
  page.previous = (page.pageCurrent==1)?1:page.pageCurrent--;
  page.next = (page.pageCurrent==count)?count:page.pageCurrent++;
  page.previous = (page.pageCurrent==1)?1:page.pageCurrent - 1;
  page.next = (page.pageCurrent==count)?count:page.pageCurrent + 1;
  page.url = url;
  page.emptyPostView = false;
  page.emptyPostCategoryNew = false;
  return page;
}

module.exports.index = async function(req, res, next) {
  var page = [];
  //get category
  var list_cate = await categoriesController.loadCategories();
  //get all post
  var list_posts = await postsModel.all();
  //get post hot
  var list_post_hot = await postsModel.getHot(limitPostHot);
 //get post views
 var list_post_view = await postsModel.getNumbers(0,0,true,false,limit);
 //get category hot

  //set count page
  page.pageCurrent = req.query.page || 1;

  var start = (page.pageCurrent - 1)*limit;
  var end = page.pageCurrent * limit;
    //count page
  page.count_items = [];
  
  var count = Math.ceil(list_posts.length/limit);
  for(var i = 1; i <= count; i++){
    var item = {'id':i};
    page.count_items.push(item);
  }
  //list post
  page.posts =  list_posts.slice(start,end);
  //list hot post
  page.posts_hot = list_post_hot;

  page.posts_view = list_post_view;

  page.posts_categories = [];

   // get post newst cua category
   var categoriesViewMore = await postsModel.getCategoriesNewst();
   for(var i = 0 ; i < categoriesViewMore.length ; i++){
     var item = await postsModel.getPostNewByCategory(categoriesViewMore[i].post_cate);
     page.posts_categories.push(item[0]);
   };
   page.emptyPostCategoryNew = categoriesViewMore.length > 0;
  // page
  page.categories = list_cate;
  page.last = count;
  page.first = 1;
  page.previous = (page.pageCurrent==1)?1:page.pageCurrent - 1;
  page.next = (page.pageCurrent==count)?count:page.pageCurrent + 1;
  page.url = "/index?";
  page.emptyPostView = list_post_view.length > 0;

  res.render('index', { page: page});
  };