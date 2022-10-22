const mongoose = require('mongoose')
const validator = require('validator')



const reviewSchema = new mongoose.Schema({
        review:{
            type: String,
            required: [true,"review can not be empty"]
        },
        rating:{
            type: Number,
            min: 1,
            max: 5

        },
        createdAt:{
            type: Date,
            default: Date.now()
        },
        studnets:{
            type:mongoose.Schema.ObjectId,
            ref: 'Student',
            required: [true, 'review must given by student']
        },
        course:{
            type: mongoose.Schema.ObjectId,
            ref: 'Course',
            required:[true, 'review must belong to the course'] 
        }
        },
        {
            toJSON: {virtuals: true},
            toObject: {virtuals: true}
        }
        )

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review