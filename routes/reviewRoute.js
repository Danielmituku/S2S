const express = require('express')

const reviewController = require('../controllers/reviewController')
const authController = require('../controllers/authController')

const router = express.Router()

router.get('/', reviewController.getAllReview).post( authController.protect, authController.restrictTo('student'), reviewController.createReview)


module.exports = router