const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const tutorSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required:[true, "Please provide your name!"]
    },
    middlename:{
        type: String
    },
    lastname:{
        type: String,
        required:[true,"Please provide your last name"]
    },
    
    email:{
        type: String,
        required: [true, "Please provide your email"],
        lowercase: true,
        unique:true,
        validate:[validator.isEmail,"Invalid Email address"]
    },
    password:{
        type: String,
        required: [true, "Please provide password"],
        minlegnth: 8
    },
    passwordConfirm:{
        type: String,
        required: [true, "Please confirm the password"],
        validate:{
            validator:function(el){
                return el === this.password
            },  
            message: "Password does not match!!"
        }
    },
    Mobile:{
        type: Number,
        length:12,
        required:[true,"Please provide your contact Number"],
    }, 
    AlternativeNumber:{
        type: Number
    },
   
    DOB:{
        type: Date,
        requierd:[true,"please provide your birthdate"]
    },
    Address:{
        type:String
    },
    Gender:{
        type: String,
        required:[true,'Please provide your gender']
    },

    Institution:{
        type: String,
    },
    TutoringCourse:{
        type: String,
        required:[true,"Please select yout tutoring course!"]
    },
    CGPA:{
        type: Number,
    },
    Percentage:{
        type: Number,
    },
    Qualification:{
        type: String,
    },
    Expreinece:{
        type: Number,
        required:[true,'Provide year Expreince']
    }, 
    Marksheet:{
        type: String,
    },
    Resume:{
        type: String,
        required:[true,"please upload your resume"]
    },
    photo:{ 
        type: String
    },
    role:{
        type: String,
        enum:['tutor','admin'],
        default:'tutor'
    },
    passwordChangedAt: Date,
    active:{
        type: Boolean,
        default: true,
        select: false
    }
})

tutorSchema.pre('save', async function(next){
    
    //Only run if password is acctually modifeid
    if(!this.isModified('password')) return next();

    //hash the password with cost of 12
    this.password = await bcrypt.hash("password", 12);
    //delete the passwoed confirm field
    this.passwordConfirm = undefined;
    next();
})
tutorSchema.pre('save', async function(next){
    if(!this.isModified('password')||this.isNew) return next();
    this.passwordChangedAt = Date.now() - 1000;
    next()
})
tutorSchema.pre('/^find/', function(next){
    //this point to the currrent query
    this.find({active:{$ne : false}})
    next()

})
//instance method for comaprison of password
tutorSchema.methods.correctPassword = async function(candidatePassword, userPassword){
    return await bcrypt.compare(candidatePassword, userPassword)
}

tutorSchema.methods.changedPasswordAfter = function(JWTTimesamp){
    if(this.passwordChangedAt){
        const changedTimestamp = ParseInt(this.passwordChangedAt.getDate() / 1000, 10);
        console(this.changedTimestamp, JWTTimestamp)
        return JWTTimestamp < changedTimestamp
    }
    //false means not changed
    return false;
}

tutorSchema.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    console.log({resetToken}, this.passwordResetToken);

    return resetToken;
}
const Tutor = mongoose.model("Tutor", tutorSchema);

module.exports = Tutor;