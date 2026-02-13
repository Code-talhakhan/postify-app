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


// SIGNUP LOGIC
const form = document.getElementById("signupForm");
const msg = document.getElementById("msg");

form.addEventListener("submit", function(e){
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim().toLowerCase();
  const pass = document.getElementById("signupPass").value.trim();
  const confirm = document.getElementById("confirmPass").value.trim();

  // RESET MESSAGE
  msg.textContent = "";
  msg.style.color = "#ff4d6d";

  // VALIDATIONS
  if(!name || !email || !pass || !confirm){
    msg.textContent = "All fields are required";
    return;
  }

  if(name.length < 3){
    msg.textContent = "Name must be at least 3 characters";
    return;
  }

  if(pass.length < 6){
    msg.textContent = "Password must be at least 6 characters";
    return;
  }

  if(pass !== confirm){
    msg.textContent = "Passwords do not match";
    return;
  }

  // GET EXISTING USERS
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // CHECK DUPLICATE EMAIL
  const alreadyExists = users.some(user => user.email === email);

  if(alreadyExists){
    msg.textContent = "Email already registered";
    return;
  }

  // CREATE USER OBJECT
  const user = {
    name,
    email,
    password: pass
  };

  // SAVE USER
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));

  // SUCCESS MESSAGE
  msg.style.color = "#4BB543";
  msg.textContent = "Account created successfully! Redirecting...";

  // REDIRECT TO LOGIN
  setTimeout(()=>{
    window.location.href = "../login-page/index.html";
  },1500);
});

