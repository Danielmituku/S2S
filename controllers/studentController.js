const Student = require('../models/studentModel')
const { login } = require('./authController');
const catchAsync = require("../utilis/catchAsync")
const AppError = require("../utilis/appError")
const factory = require('./handlerFactory')


exports.getAllStudent = factory.getAllModel(Student)
exports.getStudent = factory.getOne(Student)
exports.updateStudent = factory.updateOne(Student)
exports.deleteStudent = factory.deleteOne(Student)
exports.createStudent = factory.createOne(Student)

exports.getLoginForm = (res, req)=>{
  res.status(200).render('login',{
    title:'login your accout'
  })
}
{
  exports = getloginform = (req, res) =>{
    res.status(200).render('login',{
      title: 'login your accout'
    });
  }
};


