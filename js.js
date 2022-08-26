function validateForm() {
    let firstname = document.forms["myform"]["firstname"].value;
    if(firstname == "") {
    alert("please enter your first name!");
    return false;
    }
    if(!isNaN (firstname)) {
    alert("please enter alphabets only!");
    return false;
    }
    let middlename = document.forms["myform"]["middlename"].value;
    if(middlename == "") {
    alert("please enter your middle name!");
    return false;
    }
    if(!isNaN (middlename)) {
    alert("please enter alphabets only!");
    return false;
    }
   
    let lastname = document.forms["myform"]["lastname"].value;
    if(lastname == "") {
    alert("please enter your last name!");
    return false;
    }
    if(!isNaN (lastname)) {
    alert("please enter alphabets only!");
    return false;
    }
    let email = document.forms["myform"]["email"].value;
    if(email == "") {
    alert("please enter your email id!");
    return false;
    }
    let emailformat = /^[a-zA-Z0-9\_\.\-]+\@[a-zA-Z]{2,6}[.]{1}[a-z]{2,4}[.]{0,1}[a-z]{0,2}$/;
    if(emailformat.test(email)) {
    alert(" ");
    }
    else {
    alert("please use the correct email format");
    return false;
    }
 
    let password = document.forms["myform"]["password"].value;
    if(password == "") {
    alert("please enter your password! ");
    }
    let confPassword = document.forms["myform"]["confPassword"].value;
    if(confPassword!==password){
    alert("your confirmation password is wrong! ");
    return false;
    }
    let mobile = document.forms["myform"]["mobile"].value;
    if(mobile == ""){
    alert("please enter your moblie number! ");
    return false;
    }
    if(isNaN(mobile)) {
    alert("please enter digits only!");
    return false;
   
    }
    if(mobile.length !==10) {
    alert("please enter 10 digits only!");
    return false;
    }
    let birth_date = document.forms["myform"]["DoB"]
    if(birth_date ==" " || birth_date == null){
    alert("please fill your date of birth!");
    return false;
    }
    let arrdate = document.forms["myform"]["DoB"].value;
    let arrdt = new Date(arrdate);
    let stdt = new Date();
    stdt.setFullYear(1950,1,1);
    var enddt = new Date();
    enddt.setFullYear(2022,8,6);
    if(arrdt < stdt || arrdt > enddt){
    alert("please fill your date of birth correctly! ");
    return false;
   
    }
    if(document.getElementById('male').checked) {
    document.getElementById("disp").innerHTML = " ";
    }
    else if(document.getElementById('female').checked) {
    document.getElementById("disp").innerHTML = " ";
    }
    else {
    document.getElementById("error").innerHTML
    = "You have not selected any season";
    }
    }
  