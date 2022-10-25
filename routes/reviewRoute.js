const express = require('express')

const reviewController = require('../controllers/reviewController')
const authController = require('../controllers/authController')

const router = express.Router({mergeParams: true})

router.use(authController.protect)
router.route('/').get(reviewController.getAllReview).post(authController.restrictTo('student'),reviewController.setCourseIdAndUserId, reviewController.createReview)
router.route('/:id').delete(authController.restrictTo('student','admin'),reviewController.deleteReview).patch(authController.restrictTo('student','admin'),reviewController.updateReview).get(authController.restrictTo('student','admin', 'tutor'),reviewController.getReview)

module.exports = router