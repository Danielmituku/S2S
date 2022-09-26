const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv')

const userRouter = require('./routes/studentRoute')
const AppError = require('./utilis/appError')
const app = express();
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(morgan('dev'));

app.use((req,res, next) =>{
  console.log('Hello form the middleware');
  next();
})

app.use((req,res,next)=>{
  req.requestTime = new Date().toISOString();
  next();
})

//router
app.use('/', userRouter)

//handling an unhandled route handler

app.all('*',(req,res,next)=>{
  next(new AppError(`can not find ${req.orginalUrl} on server`,404));
})


// app.use(globlalErrorhandlers)
module.exports= app;