const db = require('../utils/db');
var account = require('../controllers/accounts');
const TBL_CATEGORIES = "vip_registration";

module.exports = {

    patch: function (entity) {
        const condition = {
          account_id: entity.account_id,
        }
        delete entity.account_id;
        return db.patch(TBL_CATEGORIES, entity, condition);
    },
    patch1: function (entity) {
        const condition = {
          account_id: entity.account_id,
        }
        delete entity.account_id;
        return db.patch('account', entity, condition);
    },
    single: function(entity)
    {
        return db.load(`select account_status, hour(TIMEDIFF(account_date, NOW())) as hour, minute(TIMEDIFF(account_date, NOW())) as minute, second(TIMEDIFF(account_date, NOW())) as second
        from vip_registration where account_id = ${entity}`);
    },
    timediff: function(entity)
    {
        return db.load(`select TIMEDIFF(account_date, NOW()) as timediff
        from vip_registration where account_id = ${entity}`)
    }
};