var express = require('express');
var accountController = require('../controllers/accounts');
var router = express.Router();

/* GET home page. */

//login
router.get('/',  accountController.loginIndex);
router.post('/', accountController.login);
//register
router.get('/register', accountController.registerIndex);
router.post('/register', accountController.register);

// chua lam
router.get('/info=:id', accountController.infoindex);
router.post('/info=:id', accountController.updateinfo);

router.get('/logout', accountController.logout);

router.get('/doipass', accountController.indexdoipass);
router.post('/doipass', accountController.doipass);

module.exports = router;
