const db = require('../utils/db');
var account = require('../controllers/accounts');
const TBL_POSTS = 'account';
const ERROR = 0;
module.exports = {
    all: function() {
        return db.load(`select * from ${TBL_POSTS} where account_status = 1`);
    },
    getAccount: async function(email, pass) {
        return db.load(`select account_email,account_name,account_level,account_image from ${TBL_POSTS} where account_email = '${email}' and account_password = '${pass}'`);
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
};