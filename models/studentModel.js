const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const crypto = require('crypto')

const studentSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true, "Please provide your name!"],
    },
    email:{
        type: String,
        required: [true, "Please provide your email"],
        lowercase: true,
        unique:true,
        validate:[validator.isEmail,"Invalid Email address"]
    },
    role:{
        type: String,
        enum:['student','admin'],
        default:'student'
    },
    photo:{ 
        type: String,
        required:false
    },

    active:{ 
        type: Boolean,
        default: true },

    password:{
        type: String,
        required: [true, "Please provide password"],
        minlegnth: 8
    },

    passwordConfirm:{
        type: String,
        required: [true, "Please confirm the password"],
        validate:{
            validator: function(el){
                return el === this.password
            },  
            message: "Password does not match!!"
        }
    },
    passwordChangedAt:{ 
        type: Date 
    },

    passwordResetToken:{
        type: String 
    },
    passwordResetExpires: {
        type: Date
    }
})

studentSchema.pre('save', async function(next){
    
    //Only run if password is acctually modifeid
    if(!this.isModified('password')) return next();

    //hash the password with cost of 12
    this.password = await bcrypt.hash("password", 12);
    //delete the passwoed confirm field
    this.passwordConfirm = undefined;
    next();
})
studentSchema.pre('save', async function(next){
    if(!this.isModified('password')||this.isNew) return next();
    this.passwordChangedAt = Date.now() - 1000;
    next()
})

//instance method for comaprison of password
studentSchema.methods.correctPassword = async function(candidatePassword, userPassword){
    return await bcrypt.compare(candidatePassword, userPassword)
}

studentSchema.methods.changedPasswordAfter = function(JWTTimesamp){
    if(this.passwordChangedAt){
        const changedTimestamp = ParseInt(this.passwordChangedAt.getDate() / 1000, 10);
        console(this.changedTimestamp, JWTTimestamp)
        return JWTTimestamp < changedTimestamp
    }
    //false means not changed
    return false;
}

studentSchema.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    console.log({resetToken}, this.passwordResetToken);

    return resetToken;
}
const Student = mongoose.model("Student", studentSchema);

module.exports = Student;