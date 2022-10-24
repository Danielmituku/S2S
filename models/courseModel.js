const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');


const courseSchema = mongoose.Schema({
    name:{
        type: String,
        required:[true, "A name for the course is required"],
        unique: true,
        maxlength:[40, "A course name must have equal or less than 40 character"],
        minlength:[3, "A course name must have equal or morethan 20 characters"],
        validate:[validator.isAlpha,"Course name must only contain characters"]
    },
    slug: String,
    duration:{
        type: Number,
        required:[true, 'A duartion for course is required']
    },
    difficulty:{
        type: String,
        required:[true, 'A difficulity for course is required'],
        enum:{
            values:['easy','medium','difficult'],
            message:'difficulty is either: easy, medium, difficult'},
        },
    ratingAverage: {
        type: Number, 
        required:[true, "A rating is required"],
        default: 4.5,
        min:[1, "Rating must be min 1"],
        max:[5, 'Rating must be max 5']
    },
    ratingsQuantity:{
        type: Number,
        required:[true],
    },
    price:{
        type: Number,
        required:[true, "A price is required"]
    },
    pricediscount:{
        type: Number,
        validate:
        {
            validator: function(val){ 
            //this only point to current doc on NEW documnet Creation
            return val < this.price;
            },
            message: `Discount price({VALUE}) should be below regualr price`
        }
    },
    summary:{
        type:String,
        trim: true,
        required:[true, 'A course discription is required']
    },
    discription:{
        type:String,
        trim: true
    },
    imageCover:{
        type: String,
        required:[true, 'A course cover image is required']
    },
    images:[String],
    createdAt:{
        type:Number,
        default: Date.now(),
        select:false
    },
    startDates:[Date],
    seretcourse:{
        type:Boolean,
        default:false 
    },
    tutor:[{
        type: mongoose.Schema.ObjectId,
        ref: 'Tutor'
    }]
}, 
{
    toJSON:{ virtuals: true}, 
    toObject:{virtuals: true}
});

//Virtaul properties: not to save the data in database
courseSchema.virtual('durationWeeks').get(function(){ return this.duration / 7;});

// virtual populate
courseSchema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'course',
    localField: '_id'
})
//DOCUMENT MIDDLEWARE: runs before .save() and .create()

// courseSchema.pre('save', function(next){
//    this.slug = slugify(this.name,{lower:true});
//    next();
// });
// courseSchema.post('save', (doc, next)=> {
//     console.log(doc);
//     next();
// })

//QUEREY MIDDLEWARE


courseSchema.pre('/^find/', function(next){
this.find({secretTour:{$ne: true}})

this.start = Date.now();
 next();
})

courseSchema.post('/^find/', function(docs, next){
    console.log(docs);
    console.log(`Query took ${Date.now()-this.start} milliseonds!`);
    next();

})

//AGGRATION MIDDLEWARE
courseSchema.pre('aggregate', function(next){
    this.pipeline().unshift({$match:{secretTour: {$ne: true}}}) 
    console.log(this.pipeline());
    next();
})

const Course = mongoose.model('course', courseSchema)

module.exports = Course;