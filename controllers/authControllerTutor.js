const {promisify} = require('util');
const jwt = require('jsonwebtoken')
const Tutor = require("../models/tutorModel")
const catchAsync = require("../utilis/catchAsync")
const AppError = require("../utilis/appError")



// eslint-disable-next-line arrow-body-style
const signToken = id => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRED
    })}


exports.signup = catchAsync(async (req, res) => {
    const newUser = await Tutor.create({
        firstname: req.body.firstname,
        middlename: req.body.middlename,
        lastname: req.body.lastname,
        Mobile: req.body.Mobile,
        Gender: req.body.Gender,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        DOB: req.body.DOB,
        TutoringCourse: req.body.TutoringCourse,
        Resume: req.body.Resume,
        Expreinece: req.body.Expreinece,
        passwordChangedAt:req.body.passwordChangedAt,
        role:req.body.role

    });
    
    // JSON WEB TOKEN IS APPLIED HER WHICH HELP US OR WE CAN TREAT IT AS SESSION TIME FOR THE AUTHENTCETICATED USER
    //THERE US NO NEED TO STORE USER SESSION  ON SERVER 
    
    const token = signToken(Tutor._id)

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

    const user = await Tutor.findOne({ email }).select('+password');
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
     if(!token){
         return next(new AppError('You are not logged in! please login to get access', 401))
     }
     //2) verification token
    const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET);
     //3) check if user still exits
    const freshTutor = await  Tutor.findById(decoded.id)
    if(!freshTutor){
        return next(new AppError("The Tutor belong to this token no more exist.",401))
    }
     //4) check if user changed password after the token was issued
        if(freshTutor.changedPasswordAfter(decoded.iat)) {
            return next(new AppError('The password is recently changed! please log in again.', 401))
        }

    //Grant Access to the protected route
    req.user = freshTutor
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