document.querySelectorAll(".toggle-pass").forEach(icon => {
  icon.addEventListener("click", () => {
    const input = document.getElementById(icon.dataset.target);
    if(input.type === "password"){
      input.type = "text";
      icon.classList.replace("fa-eye","fa-eye-slash");
    } else {
      input.type = "password";
      icon.classList.replace("fa-eye-slash","fa-eye");
    }
  });
});


// SHOW / HIDE PASSWORD
document.querySelectorAll(".toggle-pass").forEach(icon => {
  icon.addEventListener("click", () => {
    const input = document.getElementById(icon.dataset.target);
    if(input.type === "password"){
      input.type = "text";
      icon.classList.replace("fa-eye","fa-eye-slash");
    } else {
      input.type = "password";
      icon.classList.replace("fa-eye-slash","fa-eye");
    }
  });
});


// LOGIN LOGIC
const form = document.getElementById("loginForm");
const errorMsg = document.getElementById("errorMsg");

form.addEventListener("submit", function(e){
  e.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPass").value.trim();

  // validations
  if(email === "" || password === ""){
    errorMsg.textContent = "Please fill all fields";
    return;
  }

  if(password.length < 6){
    errorMsg.textContent = "Password must be at least 6 characters";
    return;
  }

  // get users from localStorage
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // check user
  const validUser = users.find(user =>
    user.email === email && user.password === password
  );

  if(validUser){
    // save current login session
    localStorage.setItem("loggedInUser", JSON.stringify(validUser));

    // redirect to post page
    window.location.href = "../post-page/post.html";
  }
  else{
    errorMsg.textContent = "Invalid email or password";
  }
});
