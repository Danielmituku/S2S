const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const tutorSchema = new mongoose.Schema({
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
    photo:{ 
        type: String,
        required:false
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
    }
    
})

tutorSchema.pre('save', async function(next){
    
    //Only run if password is acctually modifeid
    if(!this.isModified('password')) return next();

    //hash the password with cost of 12
    this.password = await bcrypt.hash("passwoed", 12);

    //delete the passwoed confirm field
    this.passwordConfirm = undefined;

    next();
})

//instance method for comaprison of password
tutorSchema.methods.correctPassword = async function(candidatePassword, userPassword){
    return await bcrypt.compare(candidatePassword, userPassword)
}

const Tutor = mongoose.model("Tutor", tutorSchema);

module.exports = Tutor;