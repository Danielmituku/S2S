const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const { promisify } = require('util');
const Tutor = require("../models/tutorModel")
const catchAsync = require("../utilis/catchAsync")
const AppError = require("../utilis/appError")
const sendEmail = require("../utilis/email")

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRED
    })
}
const cookieOptions = {
    expires: new Date(Date.now() + process.env.JWT_COOKIES_EXPIRED_IN * 24 * 60 * 60 * 1000),
    httpOnly: true
}
if (process.env.NODE_PRODUCTION) cookieOpitons.secure = true

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id)
    res.cookie('jwt', token, cookieOptions)

    //remove the passwords from the output
    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    })
}
exports.signup = catchAsync(async (req, res) => {
    const newUser = await Tutor.create(req.body);
    createSendToken(newUser, 201, res)
    // JSON WEB TOKEN IS APPLIED HER WHICH HELP US OR WE CAN TREAT IT AS SESSION TIME FOR THE AUTHENTCETICATED USER
    //THERE US NO NEED TO STORE USER SESSION  ON SERVER 
})

exports.login = catchAsync(async (req, res, next) => {
    const { email, password} = req.body

    //1) check the email and the passwoerd are existed
    if(!email || !password){
        return next(new AppError("Please provide email and password", 400))
    }

    //2) check if the email and password are correct
    const user = await Tutor.findOne({email}).select('+password')
    console.log(user);
    if(!user || !user.correctPassword(password, user.password)){
        return next(new AppError("Incorrect email or Password!!", 401));
    }
    //3) if everything is ok, send the token to the client
    createSendToken(user,201,res)

})

exports.logout = (req, res) => {
    res.cookie('jwt',"loggedout", {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    })
    res.status(200).json({ status: "success"})
}

exports.protect = catchAsync(async (req, res, next) => {
    //1) Getting token and check if it's there
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt
    }
    console.log(token);
    if (!token) {
        return next(new AppError('You are not logged in! please login to get access', 401))
    }
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    //3) check if user still exits
    const freshTutor = await Tutor.findById(decoded.id)
    if (!freshTutor) {
        return next(new AppError("The Tutor belong to this token no more exist.", 401))
    }
    //4) check if user changed password after the token was issued
    if (freshTutor.changedPasswordAfter(decoded.iat)) {
        return next(new AppError('The password is recently changed! please log in again.', 401))
    }

    //Grant Access to the protected route
    req.user = freshTutor
    next();

})



exports.isLoggedIn = async (req, res, next) => {
    //1) Verify token
    if (req.cookies.jwt) {
        try{
        const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);

        //3) check if user still exits
        const currentUser = await Tutor.findById(decoded.id)
        if (!currentUser) {
            return next()
        }
        //4) check if user changed password after the token was issued
        if (currentUser.changedPasswordAfter(decoded.iat)) {
            return next()
        }
        //THERE IS A LOGGED IN USER
        res.locals.user = currentUser
        return next();
    }catch(err){
        return next()
    }
    }
    next()
}

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        //roles is the array of {'admin"} or someonelse. role="user"

        if (!roles.includes(req.user.role)) {
            return next(new AppError("you do not have a permission to perform this action"), 403)

        }
        next();
    }
}

exports.forgetPassword = catchAsync(async (req, res, next) => {
    //1) check if the POSTed email is existed
    const user = await Tutor.findOne({ email: req.body.email })
    if (!user) {
        return next(new AppError("There is no user with that email Addreess", 404))
    }
    //2) Generate the random rest token
    const resetToken = user.createPasswordResetToken();
    console.log(resetToken)
    //3) send it to the user
   const resetURL = `${req.protocol}://${req.get('host')}/api/v1/Tutors/resetPassword/${resetToken}`
   const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you did not forgot your password, please ignore this email`;
    try{
        await sendEmail({
            email: user.email,
            subject: "Your password reset token(valid for 10 min)",
            message
        });
        res.status(200).json({
            status:'success',
            message: 'Token sent to email!'
        });

    } catch(err){
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });
        
        return next(new AppError('There was an error sending the email. Try again later!', 500))
    }
    
    })

exports.resetPassword = catchAsync(async (req, res, next) => { 
    //1. get user based on the token
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await Tutor.findOne({  passwordResetToken: hashedToken, passwordResetExpires: {$gt: Date.now() } })

    //2. if token has not expired, and there is a user, set the new password
    if(!user){
        return next(new AppError("Token is invalid or has expired", 400))
    }
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    //3. update changedPasswordAt property for the user

    //4. Log the user in, send JWT
    createSendToken(user, 200, res)
});

exports.updatePassword = catchAsync(async(req, res, next)=>{
    //1, get user from the collection
    const  user = await Tutor.findById(req.user.id).select('+password')

    //2) check if posted current password is correct
    if(! (await user.correctPassword(req.body.passwordConfirm, user.password))){
        return next(new AppError('Your current password is wrong.', 401))
    }

    //3) if so, update password
    user.password = req.body.password
    user.passwordConfirm = req.body.passwordConfirm
    await user.save()
    //4) log user in, send JWT
    createSendToken(user, 200, res)
})

//app.get('/conformation/: token', confirmEmail)
exports.confirmEmail = function (req, res, next) {
    token.findOne({ token: req.params.token }, function (err, token) {
        if (!token) {
            return res.status(400).send({ msg: 'your vervication link may have expired. please click on resend for verify email.' });

        }
        else {
            user.findOne({ _id: token._userId, email: req.params.email }, function (err, user) {
                if (!user) {
                    return res.status(401).send({ msg: 'We were unable to find a user for this verfication. please signup' });
                }
                //user is already verfified
                else if (user.isVerified) {
                    return res.status(200).send('user has been already verified .please login');
                }
                // verify user
                else {
                    //chande isVerified to true
                    user.isVerified = true;
                    user.save(function (err) {
                        //error occur
                        if (err) { 
                            return res.status(500).send({ msg: err.message });
                        }
                        //accout successfy verified
                        else {
                            return res.status(200).send('Your accout has been successfuly verified')
                        }
                    });
                }
            });
        }
    });
}

//resend the link
exports.resendLink = function (req, res, next) {
    User.findOne({ email: req.body.email }, function (err, user) {
        // user is not found into database
        if (!user) {
            return res.status(400).send({ msg: 'We were unable to find a user with that email. Make sure your Email is correct!' });
        }
        // user has been already verified
        else if (user.isVerified) {
            return res.status(200).send('This account has been already verified. Please log in.');

        }
        // send verification link
        else {
            // generate token and save
            var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
            token.save(function (err) {
                if (err) {
                    return res.status(500).send({ msg: err.message });
                }

                // Send email (use credintials of SendGrid)
                var transporter = nodemailer.createTransport({ service: 'Sendgrid', auth: { user: process.env.SENDGRID_USERNAME, pass: process.env.SENDGRID_PASSWORD } });
                var mailOptions = { from: 'no-reply@example.com', to: user.email, subject: 'Account Verification Link', text: 'Hello ' + user.name + ',\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + user.email + '\/' + token.token + '\n\nThank You!\n' };
                transporter.sendMail(mailOptions, function (err) {
                    if (err) {
                        return res.status(500).send({ msg: 'Technical Issue!, Please click on resend for verify your Email.' });
                    }
                    return res.status(200).send('A verification email has been sent to ' + user.email + '. It will be expire after one day. If you not get verification Email click on resend token.');
                });
            });
        }
    });
}
