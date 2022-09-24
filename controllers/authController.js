const jwt = require('jsonwebtoken')
const Student = require("../models/studnetModel")
const catchAsync = require("../utilis/catchAsync")
const AppError = require("../utilis/appError")



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
        passwordConfirm: req.body.passwordConfirm
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

    if(!user || !await user.correctPassword(password, user.password)){
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