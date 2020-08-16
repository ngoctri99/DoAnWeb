// var adminModel = require('../models/admin');



module.exports = {
    
    index: function(req, res)
    {
        if(req.session.isAuthenticated != null &&  res.locals.lcAuthUser.account_level > 3 )
        {
            res.render('admin/indexAdmin',{page:1})
        }
        else{
            res.redirect('/index')
        }
        
    }
};