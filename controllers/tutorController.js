const Student = require('../models/tutorModel')
const catchAsync = require("../utilis/catchAsync")

exports.getAlltutor = catchAsync(async (req, res, next) => {
  const users = await Student.find();
  res.status(201).json({
    status: 'Success',
    data:{
      users
    }
  });
})

exports.getTutor = (req, res) => {
  res.status(500).json({
    status: 'File not found',
    message: 'The Route is not defined yet',
  });
};
exports.updateTutor = (req, res) => {
  res.status(500).json({
    status: 'File not found',
    message: 'The Route is not defined yet',
  });
};
exports.createTutors = (req, res) => {
  res.status(500).json({
    status: 'File not found',
    message: 'The Route is not defined yet',
  });
};
 