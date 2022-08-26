const User = require('./../models/userModel')

exports.getAllUser = (req, res, next)=>{
    const newUser = User.find();
    res.status(201).json({
        status:"Success",
        data:{
            newUser
        }
    })
}

