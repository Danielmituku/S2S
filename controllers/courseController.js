const Course = require('../models/courseModel')
const APIfeatures = require("../utilis/apiFeatures");
const AppError = require('../utilis/appError');
const catchAsync = require("../utilis/catchAsync")

//alias middleware
exports.aliasTopCourse= catchAsync((req, res, next)=>{
  req.query.limit = '5';
  req.query.sort = '-price,ratingsAverage';
  req.query.fields = 'name, price, discription,rratingsAverage';
  next();
})
exports.getAllCourse = catchAsync( async(req, res) => {
 //Execute query
 const features = new APIfeatures(Course.find(), req.query).filter().sort().limitFields().paginate();
 const courses = await features.query;
   res.status(200).json({
     status: 'success',
     // reqestAtTime: req.requestTime,
      result: courses.length,
     data: {
       courses
     }
   })

})
exports.createCourse = catchAsync(async (req, res, next) => {
  const newCourse = await Course.create(req.body);
    res.status(201).json({
    status:"Success",
    data: {
      courses: newCourse
    }
})
})

exports.getCourse = catchAsync(async(req, res, next) => {
  // console.log(req.requestTime);
    const course = await Course.findById(req.params.id);
    if(!course){
      return next(new AppError('No course found with that ID', 404))
    }
    res.status(200).json({
      status: 'success',
      // reqestAtTime: req.requestTime,
      // result: tours.length,
      data: {
        course
      }
    })
})

exports.updateCourse = catchAsync(async(req, res, next) => {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })

    if(!course){
      return next(new AppError('No course found with that ID', 404))
    }
    res.status(200).json({
      status: 'success',
      data: {
        course
      }
    })
})

exports.deleteCourse = async (req, res, next) => {
  try{ 
    const course = await Course.findByIdAndDelete(req.params.id)
    if(!course){
      return next(new AppError('No course found with that ID', 404))
    }
    res.status(204).json({
      status: 'success',
      data: {
        course: null,
      }
    })}
    catch(err){
      res.status(400).json({
        status:"fail",
        reportLength:"The message is not requires",
        message: err,
      })
    }
}

exports.getCourseStats = async (req, res, next) => {
  try{

    const stats = await Course.aggregate([
      {
        $match: { ratingsAverage: {$gte: 4.5}}
       },
      {
        $group:{
          _id: '$difficulty',
          numCourses: { $sum: 1 },
          numRating:{$sum:'$ratingsQunatity'},
          avgRating:{$avg:'$ratingsAverage'},
          avgPrice: {$avg: '$price'},
          minPrice: {$min: '$price'},
          maxPrice: {$max: '$price'}
        }
      },
      { $sort: { avgPrice: 1}
      },
      {
        $match: { _id: {$ne:'EASY'} }
      }
    ]);
    res.status(200).json({
      status: 'success',
      data: {
       course: stats
      },
    });    

  } catch(err){
    res.status(400).json({
      status:"fail",
      reportLength:"The message is not requires",
      message: err
    })
  }
}
exports.getMonthlyPlan = async (req, res)=>{
  try{ 
    const year = req.param.year * 1;
    
    const plan = await Course.aggregate([
      {
        $unwind: '$startDates'
      },
      {
        $match : {
          startDates: { $gte: new Date(`${year}-01-01`),
                       $lte: new Date(`${year}-12-31`)
           }
        }
      },
      {
        $group:{
          _id: { $month:'$startDates'},
          numToursStarts:{ $sum: 1},
          tours:{$push: '$name'}
        }
      },
      {
        $addFields:{month:'_id'}
      },
      { 
        $project:{
          _id: 0
        }
      },
      {
          $sort:{numToursStarts: -1 }
      },
      {
        $limit: 12
      }
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        plan
      }
    }); 

  } catch(err){
    res.status(400).json({
      status:"fail",
      reportLength:"The message is not requires",
      message: err
    })
  }
};