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
    Mobile:{
        type: Number,
        required:[true,"Please provide your contact Number"]
    },
    Address:{
        type:String
    },
    Gender:{
        type: String,
        required:[type,'Please provide your gender']
    },
    AlternativeNumber:{
        type: Number
    },

    email:{
        type: String,
        required: [true, "Please provide your email"],
        lowercase: true,
        unique:true,
        validate:[validator.isEmail,"Invalid Email address"]
    },
    DOB:{
        type: Date,
        requierd:[true,"please provide your birthdate"]
    },
    photo:{ 
        type: String
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

    Institution:{
        type: String,
    },

    TutoringCourse:{
        type: String,
        required:[true,"Please select yout tutoring course!"]
    },
    Resume:{
        type: String,
        required:[ture,"please upload your resume"]
    },

    Qualification:{
        type: String,
    },
    Expreinece:{
        type: Number,
        required:[true,'Provide year Expreince']
    }, 
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