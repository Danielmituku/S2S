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
  res.status(200).render('mycourses',{title:"Courses"})
}
exports.getTutorFind = (req, res)=>{
  res.status(200).render('Tutors', {title: "Tutors"})
}
exports.getWebinar = (req, res)=>{
  res.status(200).render('webinar', {title:"Meetings"})
}
exports.getOnline = (req, res) =>{
  res.status(200).render('online',{title:"Meetings"})
}
exports.getTask = (req, res) =>{
  res.status(200).render('tasks',{title:"Tasks"})
}
exports.getProfile = (req, res) =>{
  res.status(200).render('student_profile', {title: "My-profile"})
}
exports.getProfileEdit = (req, res)=>{
  res.status(200).render('Sedit',{title: "Edit-Me"})
}

//  Tutor control
exports.getsLoginTutor= (req,res)=>{
  res.status(200).render('logint')
} 
exports.getsTutorProfile = (req, res)=>{
  res.status(200).render('Tprofile')
}
exports.getsTutorProfileEdit = (req, res)=>{
  res.status(200).render('Tedit')
}
exports.getsTutorLanding = (req, res)=>{
  res.status(200).render('TutorLanding')
}
exports.getsPortfolio = (req, res) =>{ 
  res.status(200).render('portfolio')
}