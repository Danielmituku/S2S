const User = require('./../models/userModel')


exports.creatUser = (req, res, next)=>{
    const newUser = User.create(req.body);
    res.status(201).json({
        status:"Success",
        data:{
            newUser
        }
    })
}