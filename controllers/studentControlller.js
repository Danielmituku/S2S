const Student = require('../models/studentModel')
const catchAsync = require("../utilis/catchAsync")

exports.getAllUser = catchAsync(async (req, res, next) => {
  const users = await Student.find();
  res.status(201).json({
    status: 'Success',
    data:{
      users
    }
  });
})

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'File not found',
    message: 'The Route is not defined yet',
  });
};
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'File not found',
    message: 'The Route is not defined yet',
  });
};
exports.createUsers = (req, res) => {
  res.status(500).json({
    status: 'File not found',
    message: 'The Route is not defined yet',
  });
};
 