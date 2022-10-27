const mongoose = require('mongoose')
const Student = require("./studentModel")
const validator = require('validator')

const reviewSchema = new mongoose.Schema({
        review:{
            type: String,
            required: [true,"review can not be empty"]
        },
        rating:{
            type: Number,
            min: [1,'Rating must be greater than one'],
            max:[5, 'Rating must be less than five'],
          
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

reviewSchema.index({course:1, student:1}, {unique: true})

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
 if(stats.length > 0){
    await Student.findByIdAndUpdate(courseId, {
        ratingsQuantity: stats[0].nRating, 
        ratingsAverage: stats[0].avgRating
    })
}else{
    await Student.findByIdAndUpdate(courseId, {
        ratingsQuantity: 0,
        ratingsAverage: 4.5
    })
}
 }
 
reviewSchema.post('save', function(next){
    //this point to current review
    this.constructor.calcAverageRatings(this.course)
})

// findByIdAndUpdate
// findBYIdAndDelete

reviewSchema.pre(/^findOneAnd/, async function(next){
    this.r = await this.findOne();
    console.log(this.r)
    next()
})

reviewSchema.post(/^findOneAnd/, async function(){
   await this.r.constructor.calcAverageRatings(this.r.course)
})


const Review = mongoose.model('Review', reviewSchema)

module.exports = Review