const db = require('../utils/db');
const TBL_TABLE = 'posts';


module.exports = {
    single: function()
    {
        return db.load(`select * from ${TBL_TABLE} where post_id = 10`);
    }
}
