var vipControllers = require('../controllers/vip');
var express = require('express');
var router = express.Router();

router.get('/', vipControllers.registration);
router.get('/kt', vipControllers.kiemtrangayhethang);
router.get('/duyet', vipControllers.duyetregistration);

module.exports = router;