var postsModel = require('../models/posts');
var categoriesModel = require('../models/categories');
var limit = 3;

module.exports.index = async function(req, res, next) {
    var page = [];
    var entity={
      limit:limit,
    };
    var list_posts = await postsModel.all();
    var list_cate = await categoriesModel.all();
    var list_post_hot = await postsModel.getHot(entity.limit);
    page.categories = list_cate;
    page.posts_hot = list_post_hot;
    page.pageCurrent = req.query.page || 1;

    var start = (page.pageCurrent - 1)*limit;
    var end = page.pageCurrent * limit

    page.count_items = [];

    var count = Math.ceil(list_posts.length/limit);
    for(var i = 1; i <= count; i++){
      var item = {'id':i};
      page.count_items.push(item);
    }

    page.posts = list_posts.slice(start,end);
    page.last = count;
    page.first = 1;
    page.previous = (page.pageCurrent==1)?1:page.pageCurrent--;
    page.next = (page.pageCurrent==count)?count:page.pageCurrent++;

    res.render('index', { title: 'Express', page: page});
  };