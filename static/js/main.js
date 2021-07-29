const helpers = require("./helpers");

const loginButton = document.querySelector("#login-button");
const signInButton = document.querySelector("#sign-up-button");
// const errorMessages = document.getElementById("error-messages");

loginButton.addEventListener("click", helpers.setActiveButton);
signInButton.addEventListener("click", helpers.setActiveButton);

const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (location.hash == "#signup") {
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let errorMessages = document.getElementById("error-messages");
    if (password !== confirmPassword) {
      errorMessages.style.color = "red";
      errorMessages.textContent = "The passwords do not match!";
      return;
    }
  }

  const data = {
    username: e.target.username.value,
    password: e.target.password.value,
  };

  if (location.hash == "#signup") {
    data.email = e.target.email.value;
  }

  // if any of the values are falsy, i.e empty, don't process.
    for (const key in data) {
      if (!data[key]) {
        // this one is already live so no need to do anything.
        document.getElementById("error-messages").textContent = "username or password missing.";
        return;
      }
    }

  helpers.clearAllInputFields();

  const requestType = location.hash;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  let endpoint = "";

  if (requestType == "#signup") {
    endpoint = "/auth/register";
  } else {
    endpoint = "/auth/login";
  }

  const response = await fetch(
    `https://brogrammers-habit-track.herokuapp.com${endpoint}`,
    options
  );

  
  const tokenData = await response.json();

  if (tokenData.err) {
    document.getElementById("error-messages").textContent = "username or Email already in use.";
    return;
  }

  if (requestType === "#login") {
    const userData = jwt_decode(tokenData.token);
    localStorage.setItem("userId", userData.id);
    localStorage.setItem("username", userData.user);
  } else {
    localStorage.setItem("userId", tokenData.id);
    localStorage.setItem("username", tokenData.user);
  }

  window.location.assign(`https://the-stride.netlify.app/profile/`);
  
});

const dismiss = document.getElementById("dismiss");
const cancel = document.querySelector(".fa-times");

dismiss.addEventListener("click", helpers.closeGDPR);
cancel.addEventListener("click", helpers.closeGDPR);

location.hash = "login";
