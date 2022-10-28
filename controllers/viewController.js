const Course = require('../models/courseModel')
const catchAsync = require('../utilis/catchAsync')

exports.getsHome = (req,res)=>{
    res.status(200).render('index', {title: 'S2S'})
  }
exports.getsLoginStudent= (req,res)=>{
    res.status(200).render('logins', {title: 'S2S | student-Login'})
  }

exports.getSignup = (req, res)=>{
  res.status(200).render('signup',{title: 'S2S | sign-up'})
}
exports.getForgetPassword = (req, res)=>{
  res.status(200).render('forget')
}
exports.getsSignupTutor= (req,res)=>{
    res.status(200).render('reg', {title:'S2S | Registration'})
  } 
exports.getsSignupStudent= (req,res)=>{
    res.status(200).render('signup')
  } 

  //student-view controller
exports.getStudentLanding = (req,res)=>{
 
  res.status(200).render('student_home', {title: 'S2S | Home', layout:'./layouts/student-layout'})
}
exports.getMyCourse = catchAsync(async (req,res , next)=>{
   //1) get course data from collection
  const course = await Course.find()

  //2) build template

  //3) Render that template using course data
  res.status(200).render('mycourses',{ 
    title:"S2S | Courses",  
    layout:'./layouts/student-layout',
    course
  })
})
exports.getCourseDetails = catchAsync(async (req, res, next)=>{
  //1) get the Data, for the requested course including the tutor and review
  const course = await Course.findOne({slug: req.params.slug}).populate({
    path:'review',
    fields: 'review rating student'
  })
  //2) build the template

  //3) render template using the data from step 1
  res.status(200).render('course',{ 
    title:"S2S | Details",  
    layout:'./layouts/student-layout',
    course
  })
})
exports.getTutorFind = (req, res)=>{
  res.status(200).render('Tutors', {title: "S2S | Tutors",  layout:'./layouts/student-layout'})
}
exports.getWebinar = (req, res)=>{
  res.status(200).render('webinar', {title:"S2S | Meetings",  layout:'./layouts/student-layout'})
}
exports.getOnline = (req, res) =>{
  res.status(200).render('online',{title:"S2S | Meetings",  layout:'./layouts/student-layout'})
}
exports.getTask = (req, res) =>{
  res.status(200).render('tasks',{title:"S2S | Tasks"})
}
exports.getProfile = (req, res) =>{
  res.status(200).render('student_profile', {title: "S2S | My-profile",  layout:'./layouts/student-layout'})
}
exports.getProfileEdit = (req, res)=>{
  res.status(200).render('Sedit',{title: "S2S | Edit-Me",  layout:'./layouts/student-layout'})
}



//  Tutor-View control
exports.getsLoginTutor= (req,res)=>{
  res.status(200).render('logint', {title: "S2S | Tutor-Login"})
} 
exports.getsTutorProfile = (req, res)=>{
  res.status(200).render('Tprofile',{title:"S2S | My-Profile", layout:'./layouts/tutor-layout'})
}
exports.getsTutorProfileEdit = (req, res)=>{
  res.status(200).render('Tedit',{title:"S2S | Edit-Me", layout:'./layouts/tutor-layout'})
}
exports.getsTutorLanding = (req, res)=>{
  res.status(200).render('TutorLanding', {title:"S2S | Home", layout:'./layouts/tutor-layout'})
}
exports.getsPortfolio = (req, res) =>{ 
  res.status(200).render('portfolio',{title: "S2S | My-Portfolio", layout:'./layouts/tutor-layout'})
}