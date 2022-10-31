var dropdown = document.getElementsByClassName("dropdown-btn");

var i;

for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function() {
  this.classList.toggle("active");
  var dropdownContent = this.nextElementSibling;
  if (dropdownContent.style.display === "block") {
  dropdownContent.style.display = "none";
  } else {
  dropdownContent.style.display = "block";
  }
  });
}


const sideNav = () =>{
  const burger = document.querySelector(".admin-menu-bar");
  const adminSidebar = document.querySelector(".admin-sidebar");

  burger.addEventListener("click", ()=>{
    if(adminSidebar.style.display === "block"){
      adminSidebar.style.display = "none";
    }else{
      adminSidebar.style.display = "block";
    }
  })
}
  sideNav();




