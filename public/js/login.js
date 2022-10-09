const login = async (email, password) => {
   try{
    const result = await axios({
        method:'post',
        url:'http://127.0.0.1:8000/api/v1/students/login',
        data:{ 
            email,
            password
    }
    }  
   );
   if (result.data.status === "success"){
    alert("logged in successfully")
    window.setTimeout(()=>{
        location.assign('/')
    }, 1500)
   } 

    } catch(err){
    alert(err.response.data.message)
    }
} 
document.querySelector('.form').addEventListener('submit', e =>{
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password)
})
