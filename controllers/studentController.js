const Student = require('../models/studentModel')
const { login } = require('./authController');
const catchAsync = require("../utilis/catchAsync")
const AppError = require("../utilis/appError")
const factory = require('./handlerFactory')

const filterObj = (obj, ...allowedFields)=>{
  const newObj = {};
  Object.keys(obj).forEach(el =>{
    if(allowedFields.includes(el)) newObj[el] = obj[el]
  });
  return newObj
}

exports.getAllStudent = factory.getAllModel(Student)
exports.getStudent = factory.getOne(Student)
exports.updateStudent = factory.updateOne(Student)
exports.deleteStudent = factory.deleteOne(Student)
exports.createStudent = factory.createOne(Student)

exports.updateMe = async (req, res, next) =>{
  //1) Create Error if users post password data
  if(req.body.password || req.passwordConfirm){
    return next(new AppError('This route is not for password update/ please use /updateMyPassword', 400))
  }
  //2) Update user document
  const filteredBody  = filterObj(req.body, 'name', 'email')
  const updatedUser = await Student.findByIdAndUpdate(req.user.id, filteredBody, {new:true, runValidators: true})
  
  
  res.status(200).json({
    status: "success",
    data:{
      user: updatedUser
    }
  })
}

exports.deleteMe = catchAsync(
  async(req, res, next)=>{
   const user = await Student.findByIdAndUpdate(req.user.id,{ active: false })

    res.status(204).json({
      status: "success",
      data: null
    })
  }
)
exports.getMe = (req, res, next)=>{
  req.params.id = req.user.id
  next()
} 
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


