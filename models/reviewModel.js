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
        student:{
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
        });


reviewSchema.pre(/^find/, function(next){
    // this.populate({
    //     path: 'courses',
    //     select: 'name'
    // }).populate({
    //path: 'students',
    //select: 'name photo'
    // })
     this.populate({
        path: 'students',
        select: 'name photo'
    })
    next()
})

reviewSchema.statics.calcAverageRatings = async function(courseId){
const stats= await this.aggregate([
    {
        $match: {course: courseId}
    },
    {
        $group:{
            _id: '$course',
            nRating: { $sum: 1 },
            aveRating: {$avg: '$rating'}
        }
    }
])
    console.log(stats)
}
reviewSchema.pre('save', function(next){
    //this point to current review
    this.constructor.calcAverageRatings(this.course)
    next() 
})

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review