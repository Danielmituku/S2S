const Student = require('../models/studentModel')
const catchAsync = require("../utilis/catchAsync")

exports.getAllStudent = catchAsync(async (req, res, next) => {
  const users = await Student.find();
  res.status(201).json({
    status: 'Success',
    data:{
      users
    }
  });
})

exports.getStudent = (req, res) => {
  res.status(500).json({
    status: 'File not found',
    message: 'The Route is not defined yet',
  });
};
exports.updateStudent = (req, res) => {
  res.status(500).json({
    status: 'File not found',
    message: 'The Route is not defined yet',
  });
};
exports.createStudent = (req, res) => {
  res.status(500).json({
    status: 'File not found',
    message: 'The Route is not defined yet',
  });
};
 