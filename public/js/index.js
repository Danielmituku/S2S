import "@babel/polyfill"
import {login, logout, logint} from './login'

document.querySelector('.form').addEventListener('submit', e =>{
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password)
    logint(email, password)
})

const logOutBtn = document.querySelector('.nav__el--logout')
if(logOutBtn) logOutBtn.addEventListener('click', logout);