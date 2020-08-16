const db = require('../utils/db');
const TBL_POSTS = 'posts';

module.exports = {
    all: function () {
      return db.load(`select p.*, c.category_name from posts p join categories c on p.post_cate = c.category_id where p.post_status = 1 order by p.post_level DESC, p.post_browse DESC`);
    },
    getNumbers: function(post_id=0,category_id=0,views=false,news=true,limit=0){
      plug = false;
      sql = "select p.*, c.category_name from posts p, categories c where p.post_cate = c.category_id and p.post_status = 1 ";
      //get one post
      if(post_id != 0) {
        sql += " and p.post_id =  "+ post_id;
        return db.load(sql);
      }


      if(category_id != 0){
         sql+=  " and c.category_id = " + category_id;
      }


      if(views) {
        sql += " order by p.post_views DESC";
        plug = true;
      }
      if(news){
        if(plug) sql += ", p.post_browse DESC";
        else sql += " order by p.post_browse DESC";
      }
      if(limit != 0) sql+=" LIMIT 0,"+limit;
      return db.load(sql);
    },
    getHot: function(limit = 3){
      var sql = "SELECT p1.*,c.category_name FROM (posts as p1 JOIN comments as c1 ON p1.post_id = c1.post_id) join categories c ON c.category_id = p1.post_cate and DATEDIFF( CURDATE(), p1.post_browse ) <= 7 "+
      " GROUP BY p1.post_id "+
       " ORDER BY COUNT(*) DESC, p1.post_browse DESC LIMIT 0,"+limit;
      return db.load(sql);
    },
    add: function(entity){
      db.add(TBL_POSTS,entity);
    },

    categori: function()
    {
      return db.load(`select * from categories where category_status = 1`);
    },

    getPostWithCategory: function(categoriesParent = 0,categoriesSub = 0){
      if(categoriesParent != 0){
        return db.load(`select * from categories c, posts p where c.category_id = p.post_cate and (c.category_id = ${categoriesParent} or c.category_cate = ${categoriesParent}) order by p.post_browse DESC `);
      }
      if(categoriesSub != 0){
        return db.load(`select * from categories c, posts p where c.category_id = p.post_cate and c.category_id = ${categoriesSub} order by p.post_browse DESC`);
      }
    },

    upload: function(entity1, entity2)
    {
      return db.load(`update ${TBL_POSTS} set post_image = '${entity1}' where post_slug = '${entity2}'`)
    },

    updateViews: function(entity){
      return db.load(`update ${TBL_POSTS} set post_views = post_views + 1 where post_id = ${entity}`);
    },
    getCategoriesNewst(limit = 10){
      return db.load(`SELECT DISTINCT post_cate from posts ORDER by post_browse DESC, post_views DESC LIMIT 0, ${limit}`);
    },
    getPostNewByCategory(category_id,limit =1){
      return db.load(`SELECT p.*, c.category_name from posts p join categories c on p.post_cate = c.category_id where post_cate = ${category_id} and p.post_status = 1 ORDER by p.post_browse DESC, p.post_level DESC,p.post_views DESC LIMIT 0, ${limit}`);
    }
  };