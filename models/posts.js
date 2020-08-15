const db = require('../utils/db');
const TBL_POSTS = 'posts';

module.exports = {
    all: function () {
      return db.load(`select * from ${TBL_POSTS} where post_status = 1`);
    },
    getNumbers: function(post_id=0,category_id=0,views=false,news=false){
      plug = false;
      sql = "select * from posts ";
      //get one post
      if(post_id != 0) {
        sql += " where post_status = 1 and post_id =  "+ post_id;
        return db.load( sql);
      }
      sql+= " where post_status = 1 ";
      if(category_id != 0) sql+=  " and category_id = " + category_id;
      if(views) {
        sql += " order by post_view";
        plug = true;
      }
      if(news){
        if(plug) sql += ", post_view";
        else sql += " order by post_view"
      }
      return db.load(sql);
    },
    getHot: function(limit = 3){
      var sql = "SELECT * FROM `posts` AS p WHERE p.post_id IN (SELECT p1.post_id "+
                        "FROM `posts` as p1 JOIN `comments` as c ON p1.post_id = c.post_id "+
                         "GROUP BY p1.post_id "+
                         "ORDER BY COUNT(*) DESC) "+
      "ORDER BY p.post_created "+
      "LIMIT 0,"+limit;
      return db.load(sql);
    },
    add: function(entity){
      db.add(TBL_POSTS,entity);
    },

    categori: function()
    {
      return db.load(`select * from categories where category_status = 1`);
    },

    upload: function(entity1, entity2)
    {
      return db.load(`update ${TBL_POSTS} set post_image = '${entity1}' where post_slug = '${entity2}'`)
    },
    updateViews: function(entity){
      return db.load(`update ${TBL_POSTS} set post_views = post_views + 1 where post_id = ${entity}`);
    }
  };