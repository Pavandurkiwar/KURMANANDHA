const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { submitContact } = require('../controllers/contactController');

router.post('/', asyncHandler(submitContact));

module.exports = router;
