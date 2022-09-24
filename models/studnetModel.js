const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const StudentSchema = new mongoose.Schema({
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

StudentSchema.pre('save', async function(next){
    
    //Only run if password is acctually modifeid
    if(!this.isModified('password')) return next();

    //hash the password with cost of 12
    this.password = await bcrypt.hash("passwoed", 12);

    //delete the passwoed confirm field
    this.passwordConfirm = undefined;

    next();
})
StudentSchema.pre('save', async function (next){

    if(!this.isModifeid('password')) return next();

    this.password = await bcrypt.hash("password", 12)

    this.password = undefined;

    next();
})

const Student = mongoose.model("Student", StudentSchema);

module.exports = Student;