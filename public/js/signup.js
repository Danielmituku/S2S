import axios from "axios";
import {showAlert, hideAlert} from "./alert"
export const signupTutor = async (firstname, middlename,
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
