var account = require('../models/accounts');
const bcrypt = require('bcryptjs');
const restrict = require('../middlewares/auth.mdw');

module.exports = {
    loginIndex: function(req, res, next) {
        res.render('account/login');
    },
    login: async function(req, res, next) {
        var entity = {
            account_email: req.body.Email,
            account_password: req.body.Password
        };
        var result = await account.getAccount(req.body.Email, req.body.Password);
        if (result.length == 0) {
            res.redirectresult('/account');
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
            account_fullName: req.body.FullName,
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
        res.redirect('../index');
    }
};