const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const {promisify} = require('util');
const Student = require("../models/studentModel")
const catchAsync = require("../utilis/catchAsync")
const AppError = require("../utilis/appError")
const sendEmail = require("../utilis/email")




// eslint-disable-next-line arrow-body-style
const signToken = id => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRED
    })}


exports.signup = catchAsync(async (req, res) => {
    const newUser = await Student.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        passwordChangedAt:req.body.passwordChangedAt,
        role:req.body.role
    });
    
    // JSON WEB TOKEN IS APPLIED HER WHICH HELP US OR WE CAN TREAT IT AS SESSION TIME FOR THE AUTHENTCETICATED USER
    //THERE US NO NEED TO STORE USER SESSION  ON SERVER 
    
    const token = signToken(Student._id)

    res.status(201).json({
        status: "success",
        token,
        data: {
            newUser
        }
    })
})

exports.login = catchAsync(async (req, res, next)=>{
    const {email} = req.body;
    const {password} = req.body;

    //1) check the email and the passwoerd are existed
    if(!email || !password){
        return next(new AppError("Please provide email and password", 400))
    }

    //2) check if the email and password are correct

    const user = await Student.findOne({ email }).select('+password');
    console.log(user);

    if(!user || !user.correctPassword(password, user.password)){
        return next(new AppError("Incorrect email or Password!!", 401));
    }

    //3) if everything is ok, send the token to the client
    const token = signToken(user._id);
    res.status(200).json({
        status: "Success",
        message: "The request is succcessful",
        token:{
            token
        } 
    })
})

exports.protect = catchAsync(async(req,res,next)=>{
     //1) Getting token and check if it's there
     let token;
     if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
         token = req.headers.authorization.split(' ')[1];
     }
     console.log(token);
     if(!token){
         return next(new AppError('You are not logged in! please login to get access', 401))
     }
     const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET);
     //3) check if user still exits
    const freshStudent = await  Student.findById(decoded.id)
    if(!freshStudent){
        return next(new AppError("The Tutor belong to this token no more exist.",401))
    }
     //4) check if user changed password after the token was issued
        if(freshStudent.changedPasswordAfter(decoded.iat)) {
            return next(new AppError('The password is recently changed! please log in again.', 401))
        }

    //Grant Access to the protected route
    req.user = freshStudent
     next();
})

exports.restrictTo = (...roles)=>{
    return (req,res,next) => {
        //roles is the array of {'admin"} or someonelse. role="user"

        if(!roles.includes(req.user.role)){
            return next(new AppError("you do not have a permission to perform this action"), 403)

        }
        next();
    }
}
exports.forgetPassword = catchAsync(async (req, res, next)=>{
    //1) check if the POSTed email is existed
    const student = await Student.findOne({email: req.body.email})
    if(!student){
        return next(new AppError("There is no user with that email Addreess", 404))
    }
    //2) Generate the random rest token
    const restToken = student.createPasswordResetToken();
   

    //3) send it to the user
    const restURL = `${req.protocol}:${req.get('host')}/api/v1/users/restPassword/${restToken}`;

    const message = `Forgot your password? submit a patch request with your new password and pasword confirm to: ${restURL}.\If you did not forger yout password. please forget this email`;

    try {
        await sendEmail({
        email: student.email,
        subject: "Your password reset token (valid for 10min)",
        message
    })
    res.status(200).json({
        status: 'success',
        message: 'Token sent to email'
    })} catch(err){
        student.passwordResetToken = undefined;
        student.passwordResetExpires = undefined;
        await student.save({ validateBeforeSave: false});
        return next(new AppError("There was an error sending an email, Try again letter!"), 500)
    }
    
}) 
exports.resetPassword = catchAsync( async (req, res, next)=>{

    //1) get user based on thier token
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const student = await Student.findOne({passwordResetToken: hashedToken, passwordResetExpires: { $gt: Date.now()}})

    //2) if token has not expired there is a user
        if(!student){
            return next(new AppError("Token is invalid or has expired", 400))
        }
        student.password = req.body.password;
        student.passwordConfirm = req.body.passwordConfirm;
        student.passwordResetToken = undefined
        student.passwordTokenExpires = undefined
        await student.save()
    //3) update the changedPasswordAt property for the user
    //4) Log the user in, send JWT
    const token = signToken(student._id);
    res.status(200).json({
        status: "success",
        message: "The request is succcessful",
        token:{
            token
        } 
    })
}
)
