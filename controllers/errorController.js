const AppError = require("../utilis/appError");

const handleCastEroorDB = err=>{
const message = `Invalid ${err.path}: ${err.value}`;
return new AppError(message, 400)
}

const handleValidationErrorDB = err=>{
const errors = Object.values(err.errors).map(el =>el.message)

const message = `Invalid input. ${errors.join('. ')}`;
return new AppError(message, 400)

}

// const handleDuplicateFieldsDB = err=>{
// const errors = Object.values(err.errors).map()

//   // const value = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1
//   // /)[0]; 
//   console.log(value)
//   const message = `Duplicate Fields Name: ${value} please use another value!`;
//   return new AppError(message, 400)
//   }

const sendErrorDev = (err, res)=>{
  res.status(err.statusCode).json({
    stauts:err.status,
    error: err,
    message: err.message,
    stack: err.stack
  })
}
const handleJWTError = err => new AppError("Invalid Token Please login again", 401)
const handleJWTExpiredError = err=> new AppError("Your token is Expired! please login again", 401)

const sendErrorProd = (err, res)=>{
  //Operational, trusted error: send message to client
  if(err.isOperational){
    res.status(err.statusCode).json({
      stauts:err.status,
      message: err.message
    })

    //progtraming or other unknown error: dont leak error details
  } else{
    //1) log error
    //  console.error('ERROR', err);
    //2) Send generic message 
  res.status(500).json({
    status:'error',
    message:'Something went very wrong!'
  })
  }
}
module.exports = (err, req, res, next)=>{
  console.log(err.stack)
    err.statusCode = err.statusCode || 500;
    err.status= err.status || 'error';
   if(!process.env.NODE_ENV==='development'){
   sendErrorDev(err, res);
   } else if(process.env.NODE_ENV==='production'){
let error = {...err};
if(error.name ==='CastError') error = handleCastEroorDB(error);
// if(error.name === 11000) error= handleDuplicateFieldsDB(error)
if(error.name ==='ValidationError') error = handleValidationErrorDB(error)
if(error.name ==='JsonWebTokenError') error = handleJWTError(error)
if(error.name ==='TokenExpiredError') error = handleJWTExpiredError(error)
    sendErrorProd(error, res);
   }   
   next();
  }