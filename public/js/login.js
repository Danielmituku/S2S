import axios from "axios";
import { showAlert } from "./alert";

export const login = async (email, password) => {
   try{
    const result = await axios({
        method:'POST',
        url:'http://127.0.0.1:8000/api/v1/students/login',
        data:{ 
            email,
            password
    }
    }  
   );
   if (result.data.status === "success"){
    showAlert("success","logged in successfully")
    window.setTimeout(()=>{
        location.assign('/student')
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
