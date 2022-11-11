const express = require('express')

const bookingController = require('../controllers/bookingController')
const authController = require('../controllers/authController')

const router = express.Router();

router.get('/create-checkout-session/:courseId', bookingController.getCourseCheckout)
router.post('/create-checkout-session/:courseId',  bookingController.getCheckoutSession)

module.exports = router;  