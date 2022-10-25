const Tutor = require('../models/tutorModel')
const catchAsync = require("../utilis/catchAsync")
const factory = require('./handlerFactory')


exports.getAllTutor = factory.getAllModel(Tutor)
exports.getTutor = factory.getOne(Tutor)
exports.updateTutor = factory.updateOne(Tutor)
exports.deleteTutor = factory.deleteOne(Tutor)

exports.getMe = (req, res, next)=>{
  req.params.id = req.user.id
  next()
}

exports.getTutorStats = async (req, res) => {
  try {

    const stats = await Tutor.aggregate([
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
