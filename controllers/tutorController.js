const Tutor = require('../models/tutorModel')
const { login } = require('./authControllerTutor');
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


exports.getAllTutor = factory.getAllModel(Tutor)
exports.getTutor = factory.getOne(Tutor)
exports.updateTutor = factory.updateOne(Tutor)
exports.deleteTutor = factory.deleteOne(Tutor)
exports.createTutor = factory.createOne(Tutor)


exports.updateMe = async (req, res, next) =>{
  //1) Create Error if users post password data
  if(req.body.password || req.passwordConfirm){
    return next(new AppError('This route is not for password update/ please use /updateMyPassword', 400))
  }
  //2) Update user document
  const filteredBody  = filterObj(req.body, 'name', 'email')
  const updatedUser = await Tutor.findByIdAndUpdate(req.user.id, filteredBody, {new:true, runValidators: true})
  res.status(200).json({
    status: "success",
    data:{
      user: updatedUser
    }
  })
}
 
exports.deleteMe = catchAsync(
  async(req, res, next)=>{
   const user = await Tutor.findByIdAndUpdate(req.user.id,{ active: false })

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

