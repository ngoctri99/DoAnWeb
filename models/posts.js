const db = require('../utils/db');
const TBL_POSTS = 'posts';

module.exports = {
  all: function () {
    return db.load(`select p.*, c.category_name from posts p join categories c on p.post_cate = c.category_id where post_status = 1`);
  },
  getNumbers: function(post_id=0,category_id=0,views=false,news=false){
    plug = false;
    sql = "select p.*, c.category_name from posts p, categories c where (p.post_cate = c.category_id or p.post_cate = c.category_cate) ";
    //get one post
    if(post_id != 0) {
      sql += " and p.post_status = 1 and p.post_id = " + post_id;
      return db.load(sql);
    }
    sql+= " and p.post_status = 1 ";
    //hien thi danh muc va cac chuyen muc con cua no
    if(category_id != 0) sql+=  " and (c.category_id = " + category_id + " or c.category_cate = "+category_id +")";
    if(views) {
      sql += " order by p.post_view";
      plug = true;
    }
    if(news){
      if(plug) sql += ", p.post_view";
      else sql += " order by p.post_view";
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
    }
  };