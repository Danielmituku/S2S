const AppError = require('../utilis/appError')
const catchAsync = require('../utilis/catchAsync')
const Review = require('../models/reviewModel')


exports.getAllReview = catchAsync(async (req, res, next)=>{
        const reviews = await Review.find();
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
   //nested route
    if(!req.body.course) req.body.course = req.params.courseId
    if(!req.body.student) req.body.student = req.student.id
    const newReview = await Review.create(req.body)

    res.status(201).json({
        status:"review added successfully!",
        data:{
            review: newReview
        }
     
    })

})