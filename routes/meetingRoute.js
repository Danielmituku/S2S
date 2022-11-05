const express = require('express')

const meetingController = require('../controllers/meetingController')
const authController = require('../controllers/authController')

const router = express.Router();

router.get('/meeting',  meetingController.getCheckoutSession)

module.exports = router;   