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
  getaccount: function() {
    return db.load(`select * from account a, account_level al where account_status != 5 and a.account_level = al.level`);
  },
  getaccountvip: function() {
    return db.load(`select a.account_id, v.account_id, a.account_name, v.account_dateVip
    from account a, vip_registration v, status_vip s
    where (a.account_level = 1 or a.account_level = 2) and a.account_id = v.account_id and s.status_id = v.account_status and v.account_status = 1`);
  },
  getaccountediter: function(){
    return db.load(`select *
    from account a, account_cate ac, categories ct
    where a.account_level = 3 and a.account_status = 1 and a.account_id = ac.account_id
    and ac.cate_id = ct.category_id`);
  },
  getaccounteditersingle: function(entity){
    return db.load(`select *
    from account a, account_cate ac, categories ct
    where a.account_level = 3 and a.account_status = 1 and a.account_id = ac.account_id
    and ac.cate_id = ct.category_id and a.account_id = ${entity}`);
  },
  getchuyenmuc: function(){
    return db.load(`select * from categories where category_id = 1 or category_id = 2 or category_id = 3`)
  },
  patchcate: function (entity) {
    const condition = {
      account_id: entity.account_id,
    }
    delete entity.account_id;
    return db.patch('account_cate', entity, condition);
  },
};