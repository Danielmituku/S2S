const Student = require('../models/studentModel')
const catchAsync = require("../utilis/catchAsync");
const { login } = require('./authController');

exports.getAllStudent = catchAsync(async (req, res, next) => {
  const users = await Student.find();
  res.status(201).json({
    status: 'Success',
    data:{
      users
    }
  });
})

exports.getStudent = catchAsync(async (req, res, next) => {
  // console.log(req.requestTime);
  const Students = await Student.findById(req.params.id);

  if (!Students) {
    return next(new AppError('No Tour found with that ID', 404))
  }
  res.status(200).json({
    status: 'success',
    // reqestAtTime: req.requestTime,
    // result: tours.length,
    data: {
      Students,
    }
  })
})

exports.updateStudent = catchAsync(async (req, res, next) => {
  const students = await Student.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })

  if (!students) {
    return next(new AppError('No Tour found with that ID', 404))
  }
  res.status(200).json({
    status: 'success',
    data: {
      Student: students
    }
  })
})

exports.deleteStudent = async (req, res, next) => {
  try {
    const students = await Student.findByIdAndDelete(req.params.id)
    if (!students) {
      return next(new AppError('No Tour found with that ID', 404))
    }
    res.status(204).json({
      status: 'success',
      data: {
        Student: null,
      }
    })
  }
  catch (err) {
    res.status(400).json({
      status: "fail",
      reportLength: "The message is not requires",
      message: err,
    })
  }
}

exports.getStudentStates = async (req, res) => {
  try {

    const stats = await Student.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5 } }
      },
      {
        $group: {
          _id: '$difficulty',
          numTours: { $sum: 1 },
          numRating: { $sum: '$ratingsQunatity' },
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' }
        }
      },
      {
        $sort: { avgPrice: 1 }
      },
      {
        $match: { _id: { $ne: 'EASY' } }
      }
    ]);
    res.status(200).json({
      status: 'success',
      data: {
        tours: stats
      },
    });

  } catch (err) {
    res.status(400).json({
      status: "fail",
      reportLength: "The message is not requires",
      message: err
    })
  }
}

exports.getMonthlyPlan = async (req, res) => {
  try {
    const year = req.param.year * 1;

    const plan = await Test.aggregate([
      {
        $unwind: '$startDates'
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`)
          }
        }
      },
      {
        $group: {
          _id: { $month: '$startDates' },
          numToursStarts: { $sum: 1 },
          tours: { $push: '$name' }
        }
      },
      {
        $addFields: { month: '_id' }
      },
      {
        $project: {
          _id: 0
        }
      },
      {
        $sort: { numToursStarts: -1 }
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

  } catch (err) {
    res.status(400).json({
      status: "fail",
      reportLength: "The message is not requires",
      message: err
    })
  }
};

exports.getLoginForm = (res, req)=>{
  res.status(200).render('login',{
    title:'login your accout'
  })
}