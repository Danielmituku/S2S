const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const expressLayout = require('express-ejs-layouts')
const AppError = require("./utilis/appError")
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const hpp = require('hpp')


//requireing Route
const courseRouter = require('./routes/courseRoute')
const studentRouter = require('./routes/studentRoute')
const tutorRouter = require('./routes/tutorRoute')
const viewRoute = require('./routes/viewRoutes')
const bookingRouter = require('./routes/bookingRoute')
const reviewRouter = require('./routes/reviewRoute')
const meetingRouter = require('./routes/meetingRoute')

const app = express();

//1)  Global middleware 

//static files
const path = require('path')
app.use(express.static('public'));

//set templating enigine
app.use(expressLayout)
app.set('view engine', 'ejs');
app.set('layout', './layouts/layout')
app.engine('html', require('ejs').renderFile);

//set Security http
app.use(helmet())

//limit request from same api
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 *1000,
  message: "Too many requests form this IP. Please try agian in an hour!"
})
app.use('/api', limiter)



// body parser, reading data from body into req.body
app.use(express.json({limit: "10kb"}));
app.use(express.urlencoded({ extended: true, limit:'10kb'}))
app.use(cookieParser())


//Data sanitaization aganist Nosql query Injection
app.use(mongoSanitize())

//Data santization aganist xss
app.use(xss())
//prevent parameter pollution
app.use(hpp({ whitelist: [
  'duration','ratingsQuantity', 'ratingsAverage', 'difficulty', 'price'
]}
))


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

//3) Routes

app.use('/', viewRoute)
app.use('/',  bookingRouter)
app.use('/', meetingRouter)

app.use('/api/v1/courses', courseRouter)
app.use('/api/v1/reviews', reviewRouter)
app.use('/api/v1/students', studentRouter)
app.use('/api/v1/tutors', tutorRouter)
app.use('/api/v1/bookings', bookingRouter)


//handling an unhandled route handler

app.all('*',(req,res,next)=>{
  next(new AppError(`can not find ${req.orginalUrl} on server`,404));
})

 
// app.use(globlalErrorhandlers)
module.exports = app;