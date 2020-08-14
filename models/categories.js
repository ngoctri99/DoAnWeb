const db = require('../utils/db');
const TBL_CATEGORIES = 'categories';

module.exports = {
    all: function () {
      return db.load(`select * from ${TBL_CATEGORIES} where category_status = 1`);
    },
    getAllParent: function(){
      return db.load(`select * from ${TBL_CATEGORIES} where category_status = 1 and category_cate = 0`);
    },
    getAllSub: function(categories_Parent){
      return db.load(`select * from ${TBL_CATEGORIES} where category_status = 1 and category_cate = ${categories_Parent}`);
    }
  };