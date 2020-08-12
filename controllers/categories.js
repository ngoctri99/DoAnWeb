var posts = require('../models/posts');
 var limit = 3;
var categoriesModel = require('../models/categories');
module.exports={
    searchCategory: async function(req, res, next) {
        var page=[];
        var list_posts = await posts.getNumbers(0,req.query.id);
    var list_cate = await categoriesModel.all();
    page.categories = list_cate;
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
    res.render('index',{page:page});
  },
};