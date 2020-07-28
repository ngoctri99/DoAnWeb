const express = require('express');
const router = express.Router();
const pdfController = require('../controllers/pdf');

router.get('/', pdfController.pdf);

module.exports = router;