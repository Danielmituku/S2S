const AppError = require('../utilis/appError')
const catchAsync = require('../utilis/catchAsync')
const Review = require('../models/reviewModel')
const factory = require('./handlerFactory')

exports.setCourseIdAndUserId = (req, res, next) =>{
       // allow nested routes
       if(!req.body.course) req.body.course = req.params.courseId
       if(!req.body.user) req.body.user = req.user.id
       next()
}

exports.getAllReview = factory.getAllModel(Review)
exports.createReview = factory.createOne(Review)
exports.updateReview = factory.updateOne(Review)
exports.deleteReview = factory.deleteOne(Review)
exports.getReview = factory.getOne(Review)