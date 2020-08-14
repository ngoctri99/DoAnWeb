var postsModel = require('../models/posts');
var categoriesModel = require('../models/categories');
var limit = 3;

module.exports.index = async function(req, res, next) {
  var page = [];
  page.limit = limit;
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
  var list_posts = await postsModel.all();
  //get post hot
  var list_post_hot = await postsModel.getHot(page.limit);
 
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
  for(var i = 0; i < newListPost.length; i++){
    var item = {
      id: i,
      post:newListPost[i]
    }
    page.posts.push(item);
  }

  // page
  page.categories = list_cate;
  page.posts_hot = list_post_hot;
  page.last = count;
  page.first = 1;
  page.previous = (page.pageCurrent==1)?1:page.pageCurrent--;
  page.next = (page.pageCurrent==count)?count:page.pageCurrent++;

  res.render('index', { title: 'Express', page: page});
  };