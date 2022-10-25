const catchAsync = require('../utilis/catchAsync')
const APIfeatures = require("../utilis/apiFeatures");
const AppError = require('../utilis/appError')


exports.deleteOne = Model => catchAsync( async (req, res, next) => {

      const doc = await Model.findByIdAndDelete(req.params.id)
      if(!doc){
        return next(new AppError('No document found with that ID', 404))
      }
      res.status(204).json({
        status: 'success',
        data: {
          Model: null,
        }
      })})

exports.getOne = Model =>catchAsync(async (req, res, next) => {
    const doc = await Model.findById(req.params.id);
  
    if (!doc) {
      return next(new AppError('No document found with that ID', 404))
    }
    res.status(200).json({
      status: 'success',
      data: {
        doc
      }
    })
  })

exports.updateOne = Model => catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
  
    if (!doc) {
      return next(new AppError('No document found with that ID', 404))
    }
    res.status(200).json({
      status: 'success',
      data: {
        Model: doc
      }
    })
  })

exports.getAllModel = Model => catchAsync( async(req, res) => {
    
    //To allow for nested get reviews on Course
    let fillter = {}
    if(req.params.courseId) fillter = {course: req.params.courseId}

    const features = new APIfeatures(Model.find(fillter), req.query).filter().sort().limitFields().paginate();
    const docs = await features.query;
      res.status(200).json({
        status: 'success',
        reqestAtTime: req.requestTime,
        result: docs.length,
        data: {
          data: docs
        },
      })
    })
exports.createOne = Model => catchAsync ( async (req, res, next) => {
    const doc = await Model.create(req.body);
      res.status(201).json({
      status:"Success",
      data: {
        data: doc
      }
        })
    })