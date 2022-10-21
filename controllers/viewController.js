exports.getsHome = (req,res)=>{
    res.status(200).render('index', {title: 'S2S'})
  }
exports.getsLoginStudent= (req,res)=>{
    res.status(200).render('logins', {title: 'student-Login'})
  }

exports.getSignup = (req, res)=>{
  res.status(200).render('signup',{title: 'sign-up'})
}
exports.getForgetPassword = (req, res)=>{
  res.status(200).render('forget')
}
exports.getsSignupTutor= (req,res)=>{
    res.status(200).render('reg', {title:'Registration'})
  } 
exports.getsSignupStudent= (req,res)=>{
    res.status(200).render('signup')
  } 
exports.getStudentLanding = (req,res)=>{
  res.status(200).render('student_home', {title: 'Home', layout:'./layouts/student-layout'})
}
exports.getMyCourse = (req,res)=>{
  res.status(200).render('mycourses',{title:"Courses",  layout:'./layouts/student-layout'})
}
exports.getTutorFind = (req, res)=>{
  res.status(200).render('Tutors', {title: "Tutors",  layout:'./layouts/student-layout'})
}
exports.getWebinar = (req, res)=>{
  res.status(200).render('webinar', {title:"Meetings",  layout:'./layouts/student-layout'})
}
exports.getOnline = (req, res) =>{
  res.status(200).render('online',{title:"Meetings",  layout:'./layouts/student-layout'})
}
exports.getTask = (req, res) =>{
  res.status(200).render('tasks',{title:"Tasks"})
}
exports.getProfile = (req, res) =>{
  res.status(200).render('student_profile', {title: "My-profile",  layout:'./layouts/student-layout'})
}
exports.getProfileEdit = (req, res)=>{
  res.status(200).render('Sedit',{title: "Edit-Me",  layout:'./layouts/student-layout'})
}



//  Tutor-View control
exports.getsLoginTutor= (req,res)=>{
  res.status(200).render('logint', {title: "Tutor-Login"})
} 
exports.getsTutorProfile = (req, res)=>{
  res.status(200).render('Tprofile',{title:"My-Profile", layout:'./layouts/tutor-layout'})
}
exports.getsTutorProfileEdit = (req, res)=>{
  res.status(200).render('Tedit',{title:"Edit-Me", layout:'./layouts/tutor-layout'})
}
exports.getsTutorLanding = (req, res)=>{
  res.status(200).render('TutorLanding', {title:"Home", layout:'./layouts/tutor-layout'})
}
exports.getsPortfolio = (req, res) =>{ 
  res.status(200).render('portfolio',{title: "My-Portfolio", layout:'./layouts/tutor-layout'})
}