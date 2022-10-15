import "@babel/polyfill"
import {login, logout} from './login'
import {logint, logoutt} from './logint'

document.querySelector('.form').addEventListener('submit', e =>{
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password)
   
})
document.getElementById('form').addEventListener('submit', e =>{
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    logint(email, password)
})
const logOutBtn = document.querySelector('.nav__el--logout')
if(logOutBtn) logOutBtn.addEventListener('click', logout);
const logOutBtnt = document.querySelector('.nav__el--logout')
if(logOutBtn) logOutBtn.addEventListener('click', logoutt);