const stripe =  require("stripe")(process.env.STRIPE_SECRET_KEY)
const Course = require("../models/courseModel")
const catchAsync = require("../utilis/catchAsync")
const AppError = require("../utilis/appError")

exports.getCheckoutSession = catchAsync( async (req, res, next) => {
//1) get the currently course
// res.status(200).render('Meeting', { title: 'S2S | Meeting'})
//3) create session as a response
     res.redirect('/meeting.html');
})
