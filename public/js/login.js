
const login = (email, password) =>{
  
}

doucument.querySelector("form.form").addEventLitsener('submit', e =>{
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email,password);
})