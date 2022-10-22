const express = require('express')

const reviewController = require('../controllers/reviewController')

const router = express.Route()

router.get('/Reviews', reviewController.getAllReview)
router.post('/My-Review', reviewController.createReview)




module.exports = router