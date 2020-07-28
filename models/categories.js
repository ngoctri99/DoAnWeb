const db = require('../utils/db');
const TBL_CATEGORIES = 'categories';

module.exports = {
    all: function () {
      return db.load(`select * from ${TBL_CATEGORIES} where category_status = 1`);
    }
  };