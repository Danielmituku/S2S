const AppError = require('../utilis/appError')
const catchAsync = require('../utilis/catchAsync')
const Review = require('../models/reviewModel')
const factory = require('./handlerFactory')

exports.getAllReview = catchAsync(async (req, res, next)=>{
        let fillter = {}
        if(req.params.courseId) fillter = {course: req.params.courseId}
        const reviews = await Review.find(fillter);
        res.status(200).json({
        status: 'success',
        results: reviews.length,
        data: {reviews}
    })
    if(!reviews){
        return next(new AppError('There is no Review anymore!!', 400))
    }
})

exports.createReview = catchAsync(async (req, res, next)=>{
   // allow nested routes
    if(!req.body.course) req.body.course = req.params.courseId
    if(!req.body.user) req.body.user = req.user.id
    const newReview = await Review.create(req.body)

    res.status(201).json({
        status:"review added successfully!",
        data:{
            review: newReview
        }
     
    })

})

exports.deleteReview = factory.deleteOne(Review)