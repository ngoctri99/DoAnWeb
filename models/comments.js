const db = require('../utils/db');
const TBL_POSTS = 'posts';

module.exports = {
    loadComment: function(post_id){
        return db.load(`select c.*, a.account_name, a.account_image from comments c join account a on a.account_id = c.account_id where c.post_id = ${post_id} order by c.comment_created DESC`)
    },
  };