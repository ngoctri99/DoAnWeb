const db = require('../utils/db');
var account = require('../controllers/accounts');
const TBL_POSTS = 'account';
const ERROR = 0;
module.exports = {
    all: function() {
        return db.load(`select * from ${TBL_POSTS} where account_status = 1`);
    },
    getAccount: async function(email, pass) {
        return db.load(`select account_phone, account_address, account_birthday, account_email,account_id,account_name,account_level,account_image from ${TBL_POSTS} where account_email = '${email}' and account_password = '${pass}'`);
    },
    getEmailExist: function(entity) {
        return db.load(`select account_email from ${TBL_POSTS} where account_status = 1 and account_email = '${entity.account_email}'`);
    },
    add: function(entity) {
        return db.add(TBL_POSTS, entity);
    },
    allWithDetails: function() {
        return db.load(`
        select c.*, count(p.ProID) as num_of_products
        from ${TBL_CATEGORIES} c left join products p on c.CatID = p.CatID
        group by c.CatID, c.CatName`);
    },
    getIdacccount: function(entity){
        return db.load(`select account_id from account where account_email = '${entity}'`)
    },
    addvip: function(entity){
        return db.add('vip_registration', entity);
    },
    upload: function(entity)
    {
        const condition ={
            account_id: entity.account_id,
        }
        delete entity.account_id;
        db.patch(TBL_POSTS,entity,condition)
    },
    uploadquenpass:  function(entity)
    {
        const condition ={
            account_email: entity.account_email,
        }
        delete entity.account_email;
        db.patch(TBL_POSTS,entity,condition)
    },

    getpassword: function(entity){
        return db.load(`select account_password from account where account_id = '${entity}'`)
    },
    indexbaivietcuaminh: function(entity)
    {
        return db.load(`select p.post_name as post_name, p.post_id as post_id, p.post_status as post_status,pl.stt as stt, pl.noidung as noidung
        from posts p, post_status pl
        where p.post_status = pl.stt and  p.post_idaccount = ${entity}`)
    },
    indexsuabaiviet: function(entity)
    {
        return db.load(`select * from posts where post_id = ${entity}`);
    },
    patch1: function (entity) {
        const condition = {
          post_id: entity.post_id,
        }
        delete entity.post_id;
        return db.patch('posts', entity, condition);
    },
};