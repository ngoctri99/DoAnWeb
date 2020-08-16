const db = require('../utils/db');


module.exports = {

  category: function(entity)
  {
    return db.load(`select id_cate from editer_level where account_id = ${entity}`)
  },
  posts: function(entity)
  {
    return db.load(`select p.post_id as post_id, ps.stt as stt, ps.noidung as noidung ,ac.account_name as account_name, p.post_name as post_name, c.category_name as category_name
    from posts p, categories c, account ac, post_status ps
    where p.post_cate = c.category_id and c.category_cate = ${entity} and p.post_idaccount = ac.account_id and ps.stt = p.post_status
    order by stt ASC `)
  },
  patch: function (entity) {
    const condition = {
      post_id: entity.post_id,
    }
    delete entity.post_id;
    return db.patch('posts', entity, condition);
  },
  postsvip: function()
  {
    return db.load(`select *
    from posts p, post_status ps, categories c,  account ac
    where p.post_cate = c.category_id and p.post_idaccount = ac.account_id and ps.stt = p.post_status
    order by stt ASC `)
  },
};