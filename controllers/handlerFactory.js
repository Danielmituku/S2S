const catchAsync = require('../utilis/catchAsync')
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

exports.getAllModel = Model => catchAsync(async (req, res, next) => {
    const docs = await Model.find();
    res.status(201).json({
      status: 'Success',
      data: {
        docs
      }
    });
  })
  
exports.createOne = Model => catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
      res.status(201).json({
      status:"Success",
      data: {
        data: doc
      }
  