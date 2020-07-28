var account = require('../models/accounts');

module.exports = {
    loginIndex: function(req, res, next) { 
        res.render('account/login');
    },
    login: async function(req, res, next) { 
        var entity = {
          account_email: req.body.Email,
          account_password: req.body.Password
        };
        var result = await account.getAccount(entity);
        if(result.length == 0) {
          res.redirect('/account');
        }
        // else {
        //   req.session.user={
        //     id:result[0].account_id,
        //     name:result[0].account_name,
        //     level:result[0].account_level,
        //     image:result[0].account_image
        //   };
        res.redirect('../index');
    },
    registerIndex: function(req,res,next){
        res.render('account/SignUp');
    },
    //---------------Chua tra ve ket qua loi
    register: async function(req,res,next){
        var entity={
          account_email:req.body.Email,
          account_name:req.body.UserName,
          account_fullName:req.body.FullName,
          account_password:req.body.Password,
          account_phone:req.body.Telephone,
          account_level:1,
          account_address:req.body.Address,
          account_birthday:req.body.Day
        };
         var checkMail = await account.getEmailExist(entity);
        
        if(checkMail.length != 0) {
           res.redirect('register');
        }
         var rePassword = req.body.RePassword;
         if(entity.password != rePassword){
           res.redirect('register');
         }
         var result = await account.add(entity);
        res.redirect('../index');
    }
};