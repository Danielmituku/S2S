const express = require('express')

const reviewController = require('../controllers/reviewController')
const authController = require('../controllers/authController')

const router = express.Router({mergeParams: true})

router.route('/').get(reviewController.getAllReview).post( authController.protect, authController.restrictTo('student'), reviewController.createReview)
router.route('/:id').delete(reviewController.deleteReview)

module.exports = router