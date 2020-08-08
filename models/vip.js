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
    single: function()
    {
        return db.load(`select hour(TIMEDIFF(account_date, NOW())) as hour, minute(TIMEDIFF(account_date, NOW())) as minute, second(TIMEDIFF(account_date, NOW())) as second
        from vip_registration where account_id = 1`);
    }
};