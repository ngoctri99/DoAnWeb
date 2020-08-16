var adminModel = require('../models/admin');
const accountModel = require('../models/accounts');
const vipModel = require('../models/vip');


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

    },
    indexvip:async function(req, res)
    {
        if(req.session.isAuthenticated )
        {
            if(req.session.authUser.account_level == 5)
            {
                res.render('admin/indexAdminvip',{page:1})
            }
            else{
                res.redirect('/index')
            }
        }
        else{
            res.redirect('/index')
        }
    },
    indexvipediter:async function(req,res)
    {
        if(req.session.isAuthenticated )
        {
            if(req.session.authUser.account_level ==5)
            {
                const result1 = await adminModel.postsvip();


                res.render('admin/baivietvip', {page: 1, result: result1});
            }
            else{
                res.redirect('/index')
            }
        }
        else{
            res.redirect('/index')
        }
    },
    editerduyetvip:async function(req, res)
    {

        if(req.session.isAuthenticated )
        {
            if(req.session.authUser.account_level == 5)
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

        res.redirect('/admin/vip-editer');
            }
            else{
                res.redirect('/index')
            }
        }
        else{
            res.redirect('/index')
        }

    },
    indexvipuser: async function(req, res)
    {
        if(req.session.isAuthenticated )
        {
            if(req.session.authUser.account_level == 5)
            {

                const result = await adminModel.getaccount();
                res.render('admin/user', {page: 1, result: result});
            }
            else{
                res.redirect('/index')
            }
        }
        else{
            res.redirect('/index')
        }
    },
    edituser: async function(req, res)
    {
        if(req.session.isAuthenticated )
        {
            if(req.session.authUser.account_level == 5)
            {
                const entity ={
                    account_id: req.query.id,
                    account_status: req.query.status,
                }
                await accountModel.upload(entity);
                res.redirect('/admin/vip-user');
            }
            else{
                res.redirect('/index')
            }
        }
        else{
            res.redirect('/index')
        }
    },
    indexgiahan: async function(req, res)
    {
        if(req.session.isAuthenticated )
        {
            if(req.session.authUser.account_level == 5)
            {
                const result = await adminModel.getaccountvip();
                res.render('admin/giahanvip', {page: 1, result: result});
            }
            else{
                res.redirect('/index')
            }
        }
        else{
            res.redirect('/index')
        }
    },
    xlgiahan: async function(req, res)
    {
        if(req.session.isAuthenticated )
        {
            if(req.session.authUser.account_level == 5)
            {
                var date = new Date();
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                var d = date.getDate() + Number(req.query.day);
                var h = date.getHours();
                var mi = date.getMinutes();
                var s = date.getSeconds();

                // // ngay
                if(d < 10)
                {
                    d = "0" + d;
                }

                // thang
                if(m < 10)
                {
                    m = "0" + m;
                }

                // GIO
                if( h < 10)
                {
                    h = "0" + h;
                }


                // //phut
                if(mi < 10)
                {
                    mi = "0" + mi;
                }

                // giay
                if(s < 10)
                {
                    s = "0" + s;
                }

                var data = y + "-" + m + "-" + d + " " + h + ":" + mi + ":" + "00" ;
                String(data);
                console.log(req.query.day);
                console.log(d);
                console.log(h);

                const entity = {
                    account_id: req.query.id,
                    account_status: 2,
                    account_date: data,
                };
                const entity1 = {
                    account_id: req.query.id,
                    account_level: 2,
                };
                await vipModel.patch1(entity1);
                await vipModel.patch(entity);

                res.redirect('/admin/vip-giahan');
            }
            else{
                res.redirect('/index')
            }
        }
        else{
            res.redirect('/index')
        }
    },

    indexphancong: async function(req, res)
    {
        if(req.session.isAuthenticated )
        {
            if(req.session.authUser.account_level == 5)
            {
                const result = await adminModel.getaccountediter();
                res.render('admin/phancong', {page: 1, result: result});
            }
            else{
                res.redirect('/index')
            }
        }
        else{
            res.redirect('/index')
        }
    },
    indexdoichuyenmuc: async function(req, res)
    {
        if(req.session.isAuthenticated )
        {
            if(req.session.authUser.account_level == 5)
            {
                const result = await adminModel.getaccounteditersingle(req.query.id);
                const result1 = await adminModel.getchuyenmuc();

                const entity = {
                    account_id: result[0].account_id,
                    account_email: result[0].account_email,
                    account_name: result[0].account_name,
                    category_name: result[0].category_name,
                }
                console.log(entity);
                console.log(result1);
                res.render('admin/indexeditchuyenmuc', {page: 1, result: entity, result1: result1});
            }
            else{
                res.redirect('/index')
            }
        }
        else{
            res.redirect('/index')
        }
    },
    xlindexdoichuyenmuc: async function(req, res)
    {
        if(req.session.isAuthenticated )
        {
            if(req.session.authUser.account_level == 5)
            {
                const entity = {
                    account_id: req.query.id,
                    cate_id: req.query.cate,
                }
                await adminModel.patchcate(entity);
                res.redirect('/admin/vip-phancong');
            }
            else{
                res.redirect('/index')
            }
        }
        else{
            res.redirect('/index')
        }
    },
};