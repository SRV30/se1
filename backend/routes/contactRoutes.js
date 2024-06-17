// routes/contactRoutes.js
const express = require('express');
const { submitContactForm, getContactForms, deleteContactForms } = require('../controllers/contactController');
const router = express.Router();

router.post('/submit', submitContactForm);
router.get('/see', getContactForms); 
router.delete('/deleteOld', deleteContactForms); 

module.exports = router;
