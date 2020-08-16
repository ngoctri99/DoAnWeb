var account = require('../models/accounts');
const bcrypt = require('bcryptjs');
const restrict = require('../middlewares/auth.mdw');
var nodemailer =  require('nodemailer');
var OTP = 0;

module.exports = {
    loginIndex: function(req, res, next) {

        if(!req.session.isAuthenticated)
        {
            res.render('account/login')
        }
        else{
            res.redirect('index');
        }
    },
    login: async function(req, res, next) {
        var entity = {
            account_email: req.body.Email,
            account_password: req.body.Password
        };
        var result = await account.getAccount(req.body.Email, req.body.Password);
        if (result.length == 0) {
            res.redirect('/account');
        } else {
            req.session.isAuthenticated = true;
            req.session.authUser = result[0];

            console.log(req.session.authUser);

            if(req.session.authUser.account_level < 4)
            {
                res.redirect('/index');
            }
            else if(req.session.authUser.account_level >= 4 && req.session.authUser.account_level < 5)
            {
                res.redirect('/admin');
            }
            else if(req.session.authUser.account_level == 5)
            {
                res.redirect('/admin/vip');
            }
        }
    },
    registerIndex: function(req, res, next) {
        res.render('account/SignUp');
    },
    //---------------Chua tra ve ket qua loi
    register: async function(req, res, next) {
        var entity = {
            account_email: req.body.Email,
            account_name: req.body.UserName,
            account_password: req.body.Password,
            account_phone: req.body.Telephone,
            account_level: 1,
            account_address: req.body.Address,
            account_birthday: req.body.Day
        };
        var checkMail = await account.getEmailExist(entity);

        if (checkMail.length != 0) {
            res.redirect('register');
        }
        var rePassword = req.body.RePassword;
        if (entity.password != rePassword) {
            res.redirect('register');
        }
        var result = await account.add(entity);

        var kq =  await account.getIdacccount(entity.account_email);

        console.log(kq[0].account_id);

        var d= {
            account_id: kq[0].account_id,
            account_status: 3,
        };
        await account.addvip(d);

        res.redirect('../index');
    },

    infoindex:async function(req, res)
    {

        if(!req.session.isAuthenticated)
        {
            res.redirect('/account');
        }
        else{
            if(req.session.authUser.account_id == 3){
                res.render('account/info', {account_level: 1});
            }
            else{
                res.render('account/info', {account_level: 0});
            }
        }
    },
    logout: function (req, res) {

        req.session.isAuthenticated = false;
        req.session.authUser = null;
        res.redirect('/index');
    },

    updateinfo: async function(req, res)
    {
        var entity = {
            account_name: req.body.ten,
            account_address: req.body.address,
            account_birthday: req.body.ngaysinh,
            account_id: req.session.authUser.account_id,
            account_phone: req.body.phone,
        }

        const url = req.session.authUser.account_id;

        const result = await account.upload(entity);

        req.session.authUser.account_name = entity.account_name;
        req.session.authUser.account_address = entity.account_address;
        req.session.authUser.account_birthday = entity.account_birthday;
        req.session.authUser.account_phone = entity.account_phone;

        res.redirect(`info=${url}`);
    },

    indexdoipass: function(req, res)
    {
        //kiem tra session de vao indexdoipass
        if(req.session.isAuthenticated)
        {
            res.render('account/indexdoipass')
        }
        else
        {
            res.redirect('/account');
        }
    },

    doipass: async function(req, res)
    {
        // kiem tra session
        if(!req.session.isAuthenticated)
        {
            res.render('/account')
        }
        else
        {
            const entity = {
                account_id: req.session.authUser.account_id,
                account_password: req.body.passwordnew,
            }
            const passwordnew1 = req.body.passwordnew1;
            const result = await account.getpassword(entity.account_id);

            if (entity.password == result[0].account_pasword)
            {
                if(entity.account_password == passwordnew1)
                {
                    await account.upload(entity);
                    res.render('account/indexdoipass', {result: 0, result1: 1});
                }
                else
                {
                    res.render('account/indexdoipass', {result: 1});
                }
            }
            else{
                res.render('account/indexdoipass', {result: 1});
            }
        }
    },

    indexquenpass:async function(req, res)
    {
        res.render('account/indexquenpass');
    },

    xlindexquenpass:async function(req, res)
    {

            OTP= Math.floor(Math.random() * 999) + 1;
        var transporter =  nodemailer.createTransport({ // config mail server
            service: 'Gmail',
            auth: {
                user: 'leanhtruong011@gmail.com',
                pass: '123123456789'
            }
        });
        var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
            from: 'reset email',
            to: req.body.email,
            subject: 'reset email 4T',
            text: 'Mã OTP để reset email',
            html: `<p>Mã OTP của bạn là: ${OTP}</b>`
        };
        transporter.sendMail(mainOptions);

        res.redirect(`/account/xlquenpass?email=${req.body.email}`);
    },

    indexxlquenpass: function(req, res)
    {
        res.render('account/indexxlquenpass', {email: req.query.email})
    },

    xlquenpass:async function(req, res)
    {
            const entity = {
                account_email: req.query.email,
                account_password: req.body.passwordnew,
            };
            console.log(entity.account_email);
            const passwordnew1 = req.body.passwordnew1;

            if(req.body.maOTP == OTP)
            {
                if(entity.account_password == passwordnew1)
                {
                    await account.uploadquenpass(entity);
                    res.render('account/indexxlquenpass', {result: 0, result1: 1});
                }
                else
                {
                    res.render('account/indexxlquenpass', {result: 1});
                }
            }
            else
            {
                res.render('account/indexxlquenpass', {result: 1})
            }

    }
};