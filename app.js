// Registration From
// password PerScholas2024!
let registration = document.querySelector("#registration");
let username = registration["username"];
let password = registration["password"];
let email = registration["email"];
let passwordCheck = registration["passwordCheck"];
let terms = registration["terms"];

// Login
let login = document.querySelector("#login");
let logUser = login["username"];
let logPassword = login["password"];
let keepLog = login["logCheck"];

let users = JSON.parse(localStorage.getItem("users")) || [];

function validUserName() {
  let uniqueChar = new Set(username.value.toLowerCase());
  let userRegEx = /^[a-zA-Z0-9]+$/;

  if (uniqueChar.size < 2) {
    username.setCustomValidity(
      "Username must contain at least two unique characters"
    );
    return false;
  } else if (username.value.length < 4) {
    username.setCustomValidity("Username must be at least 4 characters long");
    return false;
  } else if (!userRegEx.test(username.value)) {
    username.setCustomValidity(
      "Username must not contain any spaces or special characters"
    );
    return false;
  } else if (
    users.some(
      (user) => user.username.toLowerCase() === username.value.toLowerCase()
    )
  ) {
    username.setCustomValidity("Username already exists");
    return false;
  } else {
    username.setCustomValidity("");
    return true;
  }
}
username.addEventListener("input", validUserName);

function validEmail() {
  if (email.value.endsWith("@example.com")) {
    email.setCustomValidity("Please enter a valid email address.");
    return false;
  } else if (
    users.some((user) => user.email.toLowerCase() === email.value.toLowerCase())
  ) {
    email.setCustomValidity("Email is already in use");
    return false;
  } else {
    email.setCustomValidity("");
    return true;
  }
}
email.addEventListener("input", validEmail);
function validPassword() {
  let passwordRegEx =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;

  if (!passwordRegEx.test(password.value)) {
    password.setCustomValidity(
      "Password must contain at least 12 characters, including one uppercase letter, one lowercase letter, one number, and one special character"
    );
    return false;
  } else if (password.value.toLowerCase().includes("password")) {
    password.setCustomValidity(
      "The password must not contain the word 'password'"
    );
    return false;
  } else if (
    password.value.toLowerCase().includes(username.value.toLowerCase())
  ) {
    password.setCustomValidity("The password must not contain the username");
    return false;
  } else if (password.value !== passwordCheck.value) {
    passwordCheck.setCustomValidity("Passwords do not match");
    return false;
  } else {
    passwordCheck.setCustomValidity("");
    password.setCustomValidity("");
    return true;
  }
}

password.addEventListener("input", validPassword);
passwordCheck.addEventListener("input", validPassword);

registration.addEventListener("submit", function (event) {
  if (!validUserName() || !validEmail() || !validPassword() || !terms.checked) {
    event.preventDefault();
  } else {
    users.push({
      username: username.value,
      email: email.value,
      password: password.value,
    });

    localStorage.setItem("users", JSON.stringify(users));
    document.body.classList.add("centered");
    document.body.innerHTML = `<h1>Form submitted successfully</h1><p>A link has been sent to ${email.value}.${username.value} Please confirm your email address.</p>`;
  }
});

function loginCheck() {
  let user = users.find(
    (user) =>
      user.username === logUser.value && user.password === logPassword.value
  );

  if (!user) {
    logUser.setCustomValidity("Invalid username or password");
    return false;
  } else {
    logUser.setCustomValidity("");
    return true;
  }
}

logUser.addEventListener("input", loginCheck);
logPassword.addEventListener("input", loginCheck);
login.addEventListener("submit", function (event) {
  if (!loginCheck()) {
    event.preventDefault();
  } else {
    document.body.classList.add("centered");
    document.body.innerHTML = `<h1>Hello ${logUser.value}</h1>`;
  }
});
