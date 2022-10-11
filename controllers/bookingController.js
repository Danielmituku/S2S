const Tutor = require("../models/tutorModel")
const catchAsync = require("../utilis/catchAsync")
const AppError = require("../utilis/appError")
exports.getCheckoutSession = catchAsync( async (req, res, next) => {
//1) get the currently booked tutor
const tutor = await Tutor.findById(req.params.tutorId) 
})