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

module.exports = router;
