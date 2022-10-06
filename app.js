const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const path = require('path');

const studentRouter = require('./routes/studentRoute')
const tutorRouter = require('./routes/tutorRoute')
const AppError = require('./utilis/appError');
const { login } = require('./controllers/authController');

const app = express();
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(morgan('dev'));

app.use((req,res, next) =>{
  console.log('Hello form the middleware');
  console.log(req.headers)
  next();
})

app.use((req,res,next)=>{
  req.requestTime = new Date().toISOString();
  next();
})

//router
router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});

router.get('/logins',function(req,res){
  res.sendFile(path.join(__dirname+'/logins.html'));
});

router.get('/logint',function(req,res){
  res.sendFile(path.join(__dirname+'/logint.html'));
});

router.get('/reg',function(req,res){
  res.sendFile(path.join(__dirname+'/reg.html'));
});

router.get('/signup',function(req,res){
  res.sendFile(path.join(__dirname+'/signup.html'));
});

router.get('/Tprofile',function(req,res){
  res.sendFile(path.join(__dirname+'/Tprofile.html'));
});
//Add to the router
app.use('/', router);
app.listen(process.env.port || 8000);

console.log('Running at Port 8000');

app.use('/api/v1/students', studentRouter)
app.use('/api/v1/tutors', tutorRouter)

//handling an unhandled route handler

app.all('*',(req,res,next)=>{
  next(new AppError(`can not find ${req.orginalUrl} on server`,404));
})




// app.use(globlalErrorhandlers)
module.exports= app;