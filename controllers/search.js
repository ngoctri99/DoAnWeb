var postsModel = require("../models/posts");
var MiniSearch = require("minisearch");
var  categoriesModel = require('../models/categories');
var index = require('./indexs');
var category = require('./categories');
var limit = 3;
var limitPostHot = 5;
module.exports ={
  search : async function(req,res,next){
    var list_post = await postsModel.all();
    const documents = [];

    list_post.forEach(element => {
        var item = {
            id:element.post_id,
            title:element.post_name,
            text: element.post_decs,
            category: element.categoru_name,
            post:element
        }
        documents.push(item)
    });    
      let miniSearch = new MiniSearch({
        fields: ['title', 'text','category'], // fields to index for full-text search
        storeFields: ['post'] // fields to return with search results
      })
      // Index all documents
      miniSearch.addAll(documents)
       
      // Search with default options
      search = req.query.search;
      let results = miniSearch.search(search);
      var page = [];
      
  //get category
  var list_cate = await category.loadCategories();
  //get post hot
  var list_post_hot = await postsModel.getHot(limitPostHot);
 
  //set count page
  page.pageCurrent = req.query.page || 1;

  var start = (page.pageCurrent - 1)*limit;
  var end = page.pageCurrent * limit
    //count page
  page.count_items = [];
  
  var count = Math.ceil(results.length/limit);
  for(var i = 1; i <= count; i++){
    var item = {'id':i};
    page.count_items.push(item);
  }
  //list post
  page.posts = [];
  var newListPost = results.slice(start,end);
  page.posts =[];
     results.slice(start,end).forEach(element => {
    var item = {
      post:{
      post_id:element.post.post_id,
      post_name: element.post.post_name,
      post_slug:element.post.post_slug,
      post_status:element.post.post_status,
      post_created:element.post.post_created,
      post_browse:element.post.post_browse,
      post_meta:element.post.post_meta,
      post_decs:element.post.post_decs,
      post_image:element.post.post_image,
      post_cate:element.post.post_cate,
      post_brand:element.post.post_brand,
      post_level:element.post.post_level,
      post_views:element.post.post_views,
      category_name:element.post.category_name
    }
  }
       page.posts.push(item[0]);
     });
  //list hot post
  page.posts_hot = list_post_hot;
  // page
  page.categories = list_cate;
  page.last = count;
  page.first = 1;
  page.previous = (page.pageCurrent==1)?1:page.pageCurrent--;
  page.next = (page.pageCurrent==count)?count:page.pageCurrent++;
  var url = "search?search="+req.query.id+"&btn-search=&";
  var pageCurrent = req.query.page;
  page = await index.loadPage(list_post,10,list_post_hot,5,list_cate,pageCurrent,url);
  if(results.length == 0){ res.render('notFound',{title:search});
}else{
  res.render('index', { page: page});
}
},
};