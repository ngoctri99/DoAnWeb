var vipControllers = require('../controllers/vip');
var express = require('express');
var router = express.Router();

router.get('/kt', vipControllers.kiemtrangayhethang);
router.post('/kt', vipControllers.registration);

router.get('/duyet', vipControllers.duyetregistration);

module.exports = router;