const express = require('express');
const router = express.Router();
const pdfController = require('../controllers/pdf');

router.get('/', pdfController.pdf);
router.get('/post=:id', pdfController.dowload);
module.exports = router;