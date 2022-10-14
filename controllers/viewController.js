exports.getsHome = (req,res)=>{
    res.status(200).render('index')
  }
exports.getsLoginStudent= (req,res)=>{
    res.status(200).render('logins')
  }
exports.getsLoginTutor= (req,res)=>{
    res.status(200).render('logint')
  } 
exports.getSignup = (req, res)=>{
  res.status(200).render('signup')
}
exports.getsSignupTutor= (req,res)=>{
    res.status(200).render('signupt')
  } 
exports.getsSignupStudent= (req,res)=>{
    res.status(200).render('signup')
  } 
exports.getReg = (req, res)=>{
  res.status(200).render('reg')
}
exports.getStudentLanding = (req,res)=>{
  res.status(200).render('student_home')
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