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
  res.status(200).render('student_home', {title: 'Home'})
}
exports.getMyCourse = (req,res)=>{
  res.status(200).render('mycourses')
}
exports.getTutorFind = (req, res)=>{
  res.status(200).render('Tutors')
}
exports.getWebinar = (req, res)=>{
  res.status(200).render('webinar')
}
exports.getOnline = (req, res) =>{
  res.status(200).render('online')
}
exports.getTask = (req, res) =>{
  res.status(200).render('tasks')
}
exports.getProfile = (req, res) =>{
  res.status(200).render('student_profile')
}
exports.getProfileEdit = (req, res)=>{
  res.status(200).render('Sedit')
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