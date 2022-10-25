const Course = require('../models/courseModel')
const APIfeatures = require("../utilis/apiFeatures");
const AppError = require('../utilis/appError');
const catchAsync = require("../utilis/catchAsync")
const factory = require('./handlerFactory')

//alias middleware
exports.aliasTopCourses= catchAsync((req, res, next)=>{
  req.query.limit = '5';
  req.query.sort = '-price,ratingsAverage';
  req.query.fields = 'name, price, discription, ratingsAverage';

  next();
})
exports.getAllCourses = catchAsync( async(req, res) => {
 //Execute query
 const features = new APIfeatures(Course.find(), req.query).filter().sort().limitFields().paginate();
 const courses = await features.query;
   res.status(200).json({
     status: 'success',
     reqestAtTime: req.requestTime,
     result: courses.length,
     data: {
       courses
     },
   });
  
  //   // console.log(req.requestTime);
  //   //1) Fillterting
  //     const queryObj = { ...req.query };
  //     const excludedFields=['page','sort','limit', 'fields'];
  //     excludedFields.forEach(el => delete queryObj[el]);
  //     // console.log(req.query, queryObj)

  // //1b) Advanced filltering
  //     let queryStr = JSON.stringify(queryObj);
  //     queryStr = queryStr.replace(/\b(gte|gt|ltte|lt)\b/g, match => `$${match}`);
  //     console.log(JSON.parse(queryStr));
  //     // const Courses = await Course.find().where('duration').equals(5).where('difficulty').equals("easy");
  //     // console.log(req.query);
  //     let query =  Course.find(JSON.parse(queryStr));

  //2) Sorting

      // if(req.query.sort){
      //   const sortBy = req.query.sort.split(',').join(' ');
      //   query = query.sort(sortBy);
      // }else{
      //   query = query.sort('--createdAt');
      // }
    
  //3) limiting fields

    // if(req.query.fields){
    //   const fields = req.query.fields.split(',').join(' ');
    //   query = query.select(fields);
    // }else{
    //   query = query.select('-__v');
    // }

    //4) pagination

    // const page = req.query.page * 1 || 1;
    // const limit = req.query.limit * 1 || 100;
    // const skip = (page - 1)* limit;
    
    // query = query.skip(skip).limit(limit);

    // if(req.query.page){
    //   const numCourses = await Course.countDocuments();
    //   if(skip >= numCourses) throw new Error("The document is not avalibale");
    // }   
});

exports.createCourse = catchAsync(async (req, res, next) => {
  const newCourse = await Course.create(req.body);
    res.status(201).json({
    status:"Success",
    data: {
      Courses: newCourse
    }
  // try{
  // // const newTour = new Course({})
  // // newTour.save().then();
  // const newTour = await Course.create(req.body);
  //   res.send(201).json({
  //   status:"Success",
  //   data: {
  //     Courses: newTour
  //   }
  // })} 
  //  catch (err){
  //   res.status(400).json({
  //     status:"fail",
  //     reportLength:"The message is not requires",
  //     message: err
  //   })
  // }

  /* creating a json documnet to file */

  // const id = Courses[Courses.length - 1].id + 1;
  // const newId = { id: id, ...req.body };
  // Courses.push(newId);
  // fs.writeFile(
  //   `${__dirname}/dev-data/data/Courses-simple.json`,
  //   JSON.stringify(Courses),
  //   () => {
  //       res.status(201).json({
  //           status: 'sucess',
  //           data: Courses, 
  //       });
  //   }
  // );
  
})

})


exports.getCourse = catchAsync(async(req, res, next) => {
    const courses = await Course.findById(req.params.id).populate('reviews');
    
    if(!courses){
      return next(new AppError('No Course found with that ID', 404))
    }
    res.status(200).json({
      status: 'success',
      // reqestAtTime: req.requestTime,
      // result: courses.length,
      data: {
        courses,
      }
    })
})

exports.updateCourse = catchAsync(async(req, res, next) => {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })

    if(!course){
      return next(new AppError('No Course found with that ID', 404))
    }
    res.status(200).json({
      status: 'success',
      data: {
        course: course
      }
    })
})

exports.deleteCourse = factory.deleteOne(Course)

exports.getCourseStats = catchAsync(async (req, res) => {

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
       courses: stats
      },
    });    
})

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
          numCoursesStarts:{ $sum: 1},
          Courses:{$push: '$name'}
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
          $sort:{numCoursesStarts: -1 }
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