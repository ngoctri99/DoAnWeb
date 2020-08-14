var account = require('../models/accounts');
const bcrypt = require('bcryptjs');
const restrict = require('../middlewares/auth.mdw');

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
            res.redirect('../index');
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
};