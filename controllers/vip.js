var vipModels = require("../models/vip");

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
        const entity = {
            account_id: 1,
            account_status: 3,
        };

          await vipModels.patch(entity);
    },
    kiemtrangayhethang: async function(req, res)
    {
        var date = new Date();
        const result = await vipModels.single();

        console.log(result[0].hour);
        console.log(result[0].minute);
        console.log(result[0].second);
    }
};