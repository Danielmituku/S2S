import axios from "axios";
import {showAlert, hideAlert} from "./alert"
const signupTutor = async (firstname, middlename,
    lastname,
    Mobile,
    Gender,
    email,
    password,
    passwordConfirm,
    DOB,
    CGPA,
    TutoringCourse,
    Institution,
    Percentage,
    Qualification,
    Expreinece,
    Marksheet,
    Resume) => {
   try{
    const result = await axios({
        method:'POST',
        url:'http://127.0.0.1:8000/api/v1/tutors/signup',
        data:{ 
            firstname,
            middlename,
            lastname,
            Mobile,
            Gender,
            email,
            password,
            passwordConfirm,
            DOB,
            CGPA,
            TutoringCourse,
            Institution,
            Percentage,
            Qualification,
            Expreinece,
            Marksheet,
            Resume,
            photo
    }
    }  
   );
   if (result.data.status === "success"){
    showAlert("success","Registered successfully")
    window.setTimeout(()=>{
        location.assign('/tutors')
    }, 1500)
   } 

    } catch(err){
    showAlert('error',err.response.data.message)
    }
} 

export const logout =  async () =>{
    try{ 
        const result = await axios({
        method: 'GET',
        url:'http://127.0.0.1:8000/api/v1/students/logout'
        });
        if ((res.data.status === 'success')) location.reload(true);

    }catch(err){
        showAlert('error','error logging out! Try again.')
    }
}
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