const express = require('express');
const router = express.Router();
const aboutUsController = require('../controllers/aboutUsController');

// Get About Us information
router.get('/get/about-us', aboutUsController.getAboutUs);

// Update About Us information
router.put('/update/about-us', aboutUsController.updateAboutUs);

module.exports = router;
