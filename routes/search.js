var posts = require("../models/posts");
var MiniSearch = require("minisearch");
var  categoriesModel = require('../models/categories');
var limit = 3;
module.exports ={
  search : async function(req,res,next){
    var list_post = await posts.all();
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
        fields: ['title', 'text','categor'], // fields to index for full-text search
        storeFields: ['post'] // fields to return with search results
      })
      // Index all documents
      miniSearch.addAll(documents)
       
      // Search with default options
      var search = req.body.search;
      let results = miniSearch.search(search);
      var page = [];
    var limit = 3;
    var list_cate = await categoriesModel.all();
    page.categories = list_cate;
    page.pageCurrent = req.query.page || 1;
    
    var start = (page.pageCurrent - 1)*limit;
    var end = page.pageCurrent * limit
  
    page.count_items = [];
    
    var count = Math.ceil(results.length/limit);
    for(var i = 1; i <= count; i++){
      var item = {'id':i};
      page.count_items.push(item);
    }
    
    page.posts =[];
     results.slice(start,end).forEach(element => {
    var item = {
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
       page.posts.push(item);
     });
    page.last = count;
    page.first = 1;
    page.previous = (page.pageCurrent==1)?1:page.pageCurrent--;
    page.next = (page.pageCurrent==count)?count:page.pageCurrent++;
  
    res.render('index',{ page: page})
},
};

