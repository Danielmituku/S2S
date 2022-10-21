const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const expressLayout = require('express-ejs-layouts')
const studentRouter = require('./routes/studentRoute')
const tutorRouter = require('./routes/tutorRoute')
const viewRoute = require('./routes/viewRoutes')
const bookingRouter = require('./routes/bookingRoute')

const AppError = require("./utilis/appError")

const app = express();

//static files
const path = require('path')
app.use(express.static('public'));

//set templating enigine
app.use(expressLayout)
app.set('view engine', 'ejs');
app.set('layout', './layouts/layout')
app.engine('html', require('ejs').renderFile);


// body parser, reading data from body into req.body
app.use(express.json({limit: "10kb"}));
app.use(cookieParser())

// app.use(helmet())

app.use(express.json());
app.use(morgan('dev'));

//Test middleware 
app.use((req,res, next) =>{
  console.log('Hello form the middleware');
  console.log(req.headers)
  console.log(req.cookies)
  next();
}) 


app.use((req,res,next)=>{
  req.requestTime = new Date().toISOString();
  next();
})

//Routes
app.use('/', viewRoute)
app.use('/api/v1/students', studentRouter)
app.use('/api/v1/tutors', tutorRouter)
app.use('/api/v1/bookings', bookingRouter)


//handling an unhandled route handler

app.all('*',(req,res,next)=>{
  next(new AppError(`can not find ${req.orginalUrl} on server`,404));
})

 
// app.use(globlalErrorhandlers)
module.exports = app;