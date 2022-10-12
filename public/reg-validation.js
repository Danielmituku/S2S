function valiationReg()
{
   var fname = document.getElementId('fname');
    var mname = document.getElementId('mname');
    var lname = document.getElementId('lname');
    var email = document.getElementId('email');
    var phone = document.getElementId('phone');
    var password  = document.getElementById('password')
    var confirm = document.getElementId('confirm');
    var messageError  = document.getElementId("message_error")
    var submit = document.getElementId('submit');
    
    
    function validateFname()
    {
        var name = document.getElementId('contact_name').value;
        
        if(name.length == 0)
        {
            nameError.innerHTML = 'Name is required';
            return flase;
        }
        if(!name.match(/^[A-Za-z]*\s{1}[a-Za-z]*$/))
        {
            nameError.innerHTML = 'White full name';
            return false;
        }
        nameError.innerHTML = '<i class = "fas fa-check-circle"></i>';
        return true;
    }
    function validateMname()
    {
        var name = document.getElementId('contact_name').value;
        
        if(name.length == 0)
        {
            nameError.innerHTML = 'Name is required';
            return flase;
        }
        if(!name.match(/^[A-Za-z]*\s{1}[a-Za-z]*$/))
        {
            nameError.innerHTML = 'White full name';
            return false;
        }
        nameError.innerHTML = '<i class = "fas fa-check-circle"></i>';
        return true;
    }
    function validateLname()
    {
        var name = document.getElementId('contact_name').value;
        
        if(name.length == 0)
        {
            nameError.innerHTML = 'Name is required';
            return flase;
        }
        if(!name.match(/^[A-Za-z]*\s{1}[a-Za-z]*$/))
        {
            nameError.innerHTML = 'White full name';
            return false;
        }
        nameError.innerHTML = '<i class = "fas fa-check-circle"></i>';
        return true;
    }
     function validateMobile()
     {
        var phone = document.getElementId('contact_phone').value;
        
        if(email.length  = 0){
            phoneError.innerHTML = 'phone number is required';
            return false;
        if(phone.length = 10)
        {
            phoneError.innerHTML = 'phone number is 10 digits';
            return false;
        }
        if(!phone.match(/^[0-9]{10}$/)){
            emailError.innerHTML = 'Only digits please';
            return flase;
        }
        phoneError.innerHTML = '<i class = "fas fa-check-circle"></i>';
        return true;
    }
    
    function validateEmail()
    {
        var email = document.getElementId('contact_email').value;
        
        if(email.length = 0){
            emailError.innerHTML = 'Email is required';
            return false;
        }
        if(!email.match(/^[a-Za-z]\._\-[0-9]*[@][a-Za-z]*[\.][a-z]{2,4}$/)){
            emailError.innerHTML = 'White Email';
            return flase;
        }
        emailError.innerHTML = '<i class = "fas fa-check-circle"></i>';
        return true;
    }
     function validatMessage(){
        var email = document.getElementId('contact_message').value;
        var required = 50;
        var left = required - message.length;
        
        if(left>0){
            messageError.innerHTML = left+'more character  is required';
            return false;
        }
       
        emailError.innerHTML = '<i class = "fas fa-check-circle"></i>';
        return true;
    }
    
    function validatePassword(){
        var pass = document.getElementId('pass1');
        var upper = document.getElementId('upper');
        var lower = document.getElementId('lower');
        var num = document.getElementId('number');
        var len = document.getElementId('length');
        var sp_cha =document.getElementId('special_char');
        if(pass.value.match(/[0-9]/)){
            num.style.color = 'green';
        }
        else{
            num.style.color = 'red';
        }
        
        if(pass.value.match(/[A-Z]/)){
            upper.style.color = 'green';
        }
        else{
            upper.style.color = 'red';
        }
        
        if(pass.value.match(/[a-z]/)){
            lower.style.color = 'green';
        }
        else{
            lower.style.color = 'red';
        }
        
        if(pass.value.match(/[!\@\#\$\%\^\&\*\(\)\_\-\+\=\?\>\<\,\.]/)){
            sp_cha.style.color = 'green';
        }
        else{
            sp_cha.style.color = 'red';
        }
        
        if(pass.value.length<6){
            len.style.color = 'green';
        }
        else{
            len.style.color = 'red';
        }
        
        function coniform(){
            var pass1 = document.getElementId('pass1');
            var pass2 = document.getElementId('pass2');
            if(pass1.value == pass2.value){
            document.getElementId('number').disply = 'none'
            document.getElementId('upper').disply = 'none'
            document.getElementId('lower').disply = 'none'
            document.getElementId('special_char').disply = 'none'
            document.getElementId('length').disply = 'none'
            
        }
        else{
            document.getElementId('number').disply = 'block'
            document.getElementId('upper').disply = 'block'
            document.getElementId('lower').disply = 'block'
            document.getElementId('special_char').disply = 'block'
            document.getElementId('length').disply = 'block'
        }
    }
        
        var img = document.form['myform']['img_upload'];
        var validExc = ["jpeg", "pug", "jpg"];
        function validatphoto()
        {
            if(img.value != '')
            {
                var img_exc = img.value.substring(img.value.lastIndexOf('.')+1);
                
                var result = validExc.includes(img_exc);
                if(result == flase)
                {
                    alert("selecte files is not an image");
                    return false;
                }
                else
                {
                    if(parseFloat(img.files[0].sizes/(1024*2024))>=3)
                    {
                        alert("file size is must be smaller than 3MB: "+ parseFloat(img.files[0].sizes/(1024*2024)));
                    }
                }
            }
            else
            {
                alert("no image is selected")
                return false;
            }
        return false;
        }
    function validationReg()
    {
        if(!validateFname() ||!validateMname()|| !validatLname()|| !validatePassord()||!validatPhone() || !validateEmail() || !validatMessage())
        {
            submitError.style.disply = 'block';
            submitError.innerHTML = 'please fix  error to submit';
            return false;
            
    
        }
       }
    }
  }
}
