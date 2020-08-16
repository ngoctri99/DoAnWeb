var vipModels = require("../models/vip");
const accountModels = require("../models/accounts");

module.exports = {

    duyetregistration:async function(req, res)
    {
 
        var date = new Date();
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate() + 7;
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

        const entity = {
          account_id: 1,
          account_status: 2,
          account_date: data,
          year: y,
          month: m,
          day: d,
          hour: h,
          minute: mi,
        };

        await vipModels.patch(entity);

        res.redirect('/');
    },
    registration: async function(req, res){

        if(!req.session.isAuthenticated)
        {
            res.redirect('/account');
        }

        const entity = {
            account_id: req.session.authUser.account_id,
            account_status: 2,
            account_dateVip: req.body.day,
        };
            console.log(req.body.day);
            console.log(req.session.authUser.account_id);


          await vipModels.patch(entity);
          res.redirect('/account')
    },
    updatehethang: async function(req, res){

        const entity = {
            account_id: req.session.authUser.account_id,
            account_status: 3,
        };
        const entity1 = {
            account_id:req.session.authUser.account_id,
            account_level: 1,
        };

        await accountModels.patch(entity1);
        await vipModels.patch(entity);
        req.session.authUser.account_level = 1;
    },
    kiemtrangayhethang: async function(req, res)
    {

        if(!req.session.isAuthenticated)
        {
            res.redirect('/account');
        }

        var date = new Date();
        const result = await vipModels.single(req.session.authUser.account_id);

        const timediff = await vipModels.timediff(req.session.authUser.account_id);

        timediff[0].timediff.slice(0,1);

        if(timediff[0].timediff.slice(0,1) == '-')
        {
            const entity = {
                account_id: req.session.authUser.account_id,
                account_status: 3,
            };

            const entity1 = {
                account_id:req.session.authUser.account_id,
                account_level: 1,
            }
              await vipModels.patch(entity);
              await accountModels.upload(entity1);
              req.session.authUser.account_level = 1;
        }


        if (result[0]== null){
            res.render('vip/indexvip', { result: 0});
        }
        else {
            if(result[0].account_status == 2)
            {
                res.render('vip/indexvip', { result: 1 ,hour: result[0].hour, minute: result[0].minute, second: result[0].second})
            }
            else if(result[0].account_status == 3){
                res.render('vip/indexvip', { result: 0, result1: 1});
            }
            else if(result[0].account_status == 1){
                res.render('vip/indexvip', { result: 0, result1: 0});
            }
        }
    }
};