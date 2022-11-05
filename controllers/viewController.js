const jwt = require('jsonwebtoken')
const Course = require('../models/courseModel')
const Student = require('../models/studentModel')
const Tutor = require('../models/tutorModel')
const Review = require('../models/reviewModel')
const catchAsync = require('../utilis/catchAsync')


//Overview Controller
exports.getsHome = (req, res) => {
  res.status(200).render('index', { title: 'S2S' })
}
exports.getSignup = (req, res) => {
  res.status(200).render('signup', { title: 'S2S | sign-up' })
}
exports.getForgetPassword = (req, res) => {
  res.status(200).render('forget')
}
exports.getsSignupTutor = (req, res) => {
  res.status(200).render('reg', { title: 'S2S | Registration' })
}
exports.getsSignupStudent = (req, res) => {
  res.status(200).render('signup', { title: 'S2S | sign-up' })
}


//student-view controller
exports.getsLoginStudent = (req, res) => {
  res.status(200).render('logins', { title: 'S2S | student-Login' })
}

// exports.login = catchAsync(async (req,res, next) =>{

//   const email = req.body.email
//   const password = req.body.password
//   //1) check the email and the passwoerd are existed
//   if(!email || !password){
//       return next(new AppError("Please provide email and password", 400))
//   }
//   //2) check if the email and password are correct
//   const user = await Student.findOne({email}).select('+password')
//   console.log(user);
//   if(!user || !user.correctPassword(password, user.password)){
//       return next(new AppError("Incorrect email or Password!!", 401));
//   }
//   //3) if everything is ok, send the token to the client
//   createSendToken(user,201,res)
//   res.status(200).render('student_home',{
//     title: 'S2S | Home',
//     user
//   })
// })

exports.getStudentLanding = (req, res) => {

  res.status(200).render('student_home', { title: 'S2S | Home', layout: './layouts/student-layout' })
}

exports.getMyCourse = catchAsync(async (req, res, next) => {
  //1) get course data from collection
  const course = await Course.find()

  //2) build template

  //3) Render that template using course data
  res.status(200).render('mycourses', {
    title: "S2S | Courses",
    layout: './layouts/student-layout',
    course
  })
})
exports.getCourseDetails = catchAsync(async (req, res, next) => {
  //1) get the Data, for the requested course including the tutor and review
  const course = await Course.findOne({ slug: req.params.slug }).populate({
    path: 'review',
    fields: 'review rating student'
  }).populate({
    path: 'tutors',
    fields: 'name'
  })


  //3) render template using the data from step 1
  res.status(200).render('course', {
    title: "S2S | course",
    layout: './layouts/student-layout',
    course
  })
})
exports.getTutorFind = (req, res) => {
  res.status(200).render('Tutors', { title: "S2S | Tutors", layout: './layouts/student-layout' })
}
exports.getWebinar = (req, res) => {
  res.status(200).render('webinar', { title: "S2S | Meetings", layout: './layouts/student-layout' })
}
exports.getOnline = (req, res) => {
  res.status(200).render('online', { title: "S2S | Meetings", layout: './layouts/student-layout' })
}
exports.getTask = (req, res) => {
  res.status(200).render('tasks', { title: "S2S | Tasks" })
}
exports.getProfile = (req, res) => {
  res.status(200).render('student_profile', { title: "S2S | My-profile", layout: './layouts/student-layout' })
}
exports.getProfileEdit = (req, res) => {
  res.status(200).render('Sedit', { title: "S2S | Edit-Me", layout: './layouts/student-layout' })
}



//  Tutor-View control
exports.getsLoginTutor = (req, res) => {
  res.status(200).render('logint', { title: "S2S | Tutor-Login" })
}
exports.getsTutorProfile = (req, res) => {
  res.status(200).render('Tprofile', { title: "S2S | My-Profile", layout: './layouts/tutor-layout' })
}
exports.getsTutorProfileEdit = (req, res) => {
  res.status(200).render('Tedit', { title: "S2S | Edit-Me", layout: './layouts/tutor-layout' })
}
exports.getsTutorLanding = (req, res) => {
  res.status(200).render('TutorLanding', { title: "S2S | Home", layout: './layouts/tutor-layout' })
}
exports.getsPortfolio = (req, res) => {
  res.status(200).render('portfolio', { title: "S2S | My-Portfolio", layout: './layouts/tutor-layout' })
}
exports.getMeeting = (req,res)=>{
  res.status(200).render('Meeting', {title: 'S2S | Meeeting ', layout:'./layouts/meeting-layout'})
}
//Admin-view Controller
exports.getDashbord = (req, res) => {
  res.status(200).render('dashbord', { title: "S2S | Admin", layout: './layouts/admin-layout' })
}
exports.getCourse = (req, res) =>{
  res.status(200).render('add-course', {title: "Admin | Course", layout:'./layouts/admin-layout' })
}
exports.getAllCourse =(req, res)=>{
  res.status(200).render('all-courses', {
    title:"Admin | All-Course", layout:'./layouts/admin-layout'})
  }
  exports.getStudent =(req, res)=>{
    res.status(200).render('add-student', {
      title:"Admin | Student", layout:'./layouts/admin-layout'})
    }
    exports.getAllStudent =(req, res)=>{
      res.status(200).render('all-student', {
        title:"Admin | All-Student", layout:'./layouts/admin-layout'})
      }
      exports.getTutor =(req, res)=>{
        res.status(200).render('add-tutor', {
          title:"Admin | Tutor", layout:'./layouts/admin-layout'})
        }
        exports.getAllTutor =(req, res)=>{
          res.status(200).render('all-tutor', {
            title:"Admin | All-Tutor", layout:'./layouts/admin-layout'})
          }
          exports.getAllEvents =(req, res)=>{
            res.status(200).render('all-events', {
              title:"Admin | All-Event", layout:'./layouts/admin-layout'})
            }
            exports.getEvent =(req, res)=>{
              res.status(200).render('add-event', {
                title:"Admin | Add-Event", layout:'./layouts/admin-layout'})
              }
              exports.getAllTimeTable =(req, res)=>{
                res.status(200).render('all-time-table', {
                  title:"Admin | All-Timetable", layout:'./layouts/admin-layout'})
                }
                exports.getTimeTable =(req, res)=>{
                  res.status(200).render('all-courses', {
                    title:"Admin | Add-Timetable", layout:'./layouts/admin-layout'})
                  }
                  exports.getAllNotice =(req, res)=>{
                    res.status(200).render('all-courses', {
                      title:"Admin | All-Course", layout:'./layouts/admin-layout'})
                    }
                    exports.getNotice =(req, res)=>{
                      res.status(200).render('all-courses', {
                        title:"Admin | All-Course", layout:'./layouts/admin-layout'})
                      }
                      exports.getReviews =(req, res)=>{
                        res.status(200).render('all-reviews', {
                          title:"Admin | All-Reviews", layout:'./layouts/admin-layout'})
                        }
                        exports.getAllReviews =(req, res)=>{
                          res.status(200).render('all-reviews', {
                            title:"Admin | All-Reviews", layout:'./layouts/admin-layout'})
                          }
