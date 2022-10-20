import "@babel/polyfill"
import {login, logout} from './login'
import {signupTutor} from './signup'

document.querySelector('.form').addEventListener('submit', e =>{
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password)
})

documnet.getElementById('main-form').addEventListener('submit', e=>{
    e.preventDefault();
    const firstname =  document.getElementById('firstname').value;
    const middlename =  document.getElementById('middlename').value;
    const lastname =  document.getElementById('lastname').value;
    const Mobile =  document.getElementById('Mobile').value;
    const Gender =  document.getElementById('Gender').value;
    const email =  document.getElementById('email').value;
    const password =  document.getElementById('password').value;
    const passwordConfirm =  document.getElementById('passwordConfirm').value;
    const DOB =  document.getElementByName('DOB').value;
    const CGPA =  document.getElementByName('CGPA').value;
    const TutoringCourse =  document.getElementByName('Tutoringcourse').value;
    const Institution =  document.getElementByName('Institution').value;
    const Percentage =  document.getElementByName('Percentage').value;
    const Qualification =  document.getElementByName('Qualification').value;
    const Expreinece =  document.getElementByName('Expreinece').value;
    const Marksheet =  document.getElementByName('Marksheet').value;
    const Resume =  document.getElementByName('Resume').value;
    signupTutor(firstname,middlename,lastname,Mobile,Gender,email,password,
        passwordConfirm,DOB,CGPA,TutoringCourse,Institution, Percentage, Qualification, Expreinece,Marksheet,Resume)
})

const logOutBtn = document.querySelector('.nav__el--logout')
if(logOutBtn) logOutBtn.addEventListener('click', logout);

const logOutBtnt = document.querySelector('.nav__el--logout')
if(logOutBtn) logOutBtn.addEventListener('click', logoutt);