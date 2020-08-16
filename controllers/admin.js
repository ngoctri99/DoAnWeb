var adminModel = require('../models/admin');



module.exports = {

    index: function(req, res)
    {
        if(req.session.isAuthenticated )
        {
            if(req.session.authUser.account_level > 3 && req.session.authUser.account_level < 5)
            {
                res.render('admin/indexAdmin',{page:1})
            }
            else{
                res.redirect('/index')
            }
        }
        else{
            res.redirect('/index')
        }
    },
    indexediter:async function(req, res)
    {

        if(req.session.isAuthenticated )
        {
            if(req.session.authUser.account_level > 3 && req.session.authUser.account_level < 5)
            {
                const result = await adminModel.category(req.session.authUser.account_id);

                const result1 = await adminModel.posts(result[0].id_cate);
                console.log(result)
        
                res.render('admin/baiviet', {page: 1, result: result1});
            }
            else{
                res.redirect('/index')
            }
        }
        else{
            res.redirect('/index')
        }
    },
    editerduyet:async function(req, res)
    {

        if(req.session.isAuthenticated )
        {
            if(req.session.authUser.account_level > 3 && req.session.authUser.account_level < 5)
            {
                var today = new Date();
            var date =  today.getFullYear()+'-'+(today.getMonth()+1)+'-'+ today.getDate();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            var dateTime = date +' '+ time;
            console.log(date);
            console.log(time);
            //console.log(datetime);
            const entity = {
                post_status: req.query.status,
                post_id: req.query.id,
                post_browse: date,
            }

        await adminModel.patch(entity);

        res.redirect('/admin/editer');
            }
            else{
                res.redirect('/index')
            }
        }
        else{
            res.redirect('/index')
        }

    }
};