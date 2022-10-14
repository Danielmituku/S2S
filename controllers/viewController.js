exports.getsHome = (req,res)=>{
    res.status(200).render('index')
  }
exports.getsLoginStudent= (req,res)=>{
    res.status(200).render('logins')
  }
exports.getsLoginTutor= (req,res)=>{
    res.status(200).render('logint')
  } 
  exports.getsSignupTutor= (req,res)=>{
    res.status(200).render('signupt')
  } 
  exports.getsSignupStudent= (req,res)=>{
    res.status(200).render('signups')
  } 