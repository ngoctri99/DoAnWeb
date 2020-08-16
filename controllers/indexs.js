var postsModel = require('../models/posts');
var categoriesModel = require('../models/categories');
var limit = 3;
var limitPostHot = 5;
var categoriesController = require('./categories');

module.exports.LIMIT_POSTS = 3;
module.exports.LIMIT_POSTS_HOT = 5;

module.exports.loadPage = async function(posts, limitPost, postsHot,limitPostHot,categories,pageCurrent = 1,url){
  var page = [];
  var index = 0;
  page.limit = limitPost + limitPostHot;
  //get category
  var list_cate = categories;
  //get all post
  var list_posts = posts;
  //get post hot
  var list_post_hot = postsHot;
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
  page.posts = [];
  var newListPost = list_posts.slice(start,end);
  for(index; index < newListPost.length; index++){
    var item = {
      id: index,
      post:newListPost[index]
    }
    page.posts.push(item);
  }
  //list hot post
  page.posts_hot = [];
  for(var i = 0; i < list_post_hot.length ; i++){
    var item = {
      id: index,
      postHot:list_post_hot[i]
    }
    page.posts_hot.push(item);
    index++;
  }
  // page
  page.categories = list_cate;
  page.last = count;
  page.first = 1;
  page.previous = (page.pageCurrent==1)?1:page.pageCurrent--;
  page.next = (page.pageCurrent==count)?count:page.pageCurrent++;
  page.previous = (page.pageCurrent==1)?1:page.pageCurrent - 1;
  page.next = (page.pageCurrent==count)?count:page.pageCurrent + 1;
  page.url = url;
  return page;
}

module.exports.index = async function(req, res, next) {
  var page = [];
  var index = 0;
  page.limit = limit+limitPostHot;
  //get category
  var list_cate = await categoriesController.loadCategories();
  //get all post
  var list_posts = await postsModel.all();
  //get post hot
  var list_post_hot = await postsModel.getHot(limitPostHot);
 
  //set count page
  page.pageCurrent = req.query.page || 1;

  var start = (page.pageCurrent - 1)*limit;
  var end = page.pageCurrent * limit
    //count page
  page.count_items = [];
  
  var count = Math.ceil(list_posts.length/limit);
  for(var i = 1; i <= count; i++){
    var item = {'id':i};
    page.count_items.push(item);
  }
  //list post
  page.posts = [];
  var newListPost = list_posts.slice(start,end);
  for(index; index < newListPost.length; index++){
    var item = {
      id: index,
      post:newListPost[index]
    }
    page.posts.push(item);
  }
  //list hot post
  page.posts_hot = [];
  for(var i = 0; i < list_post_hot.length ; i++){
    var item = {
      id: index,
      postHot:list_post_hot[i]
    }
    page.posts_hot.push(item);
    index++;
  }
  // page
  page.categories = list_cate;
  page.last = count;
  page.first = 1;
  page.previous = (page.pageCurrent==1)?1:page.pageCurrent - 1;
  page.next = (page.pageCurrent==count)?count:page.pageCurrent + 1;
  page.url = "/index?";
  res.render('index', { page: page});
  };