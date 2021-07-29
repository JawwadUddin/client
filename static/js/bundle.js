(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const loginButton = document.querySelector("#login-button");
const signInButton = document.querySelector("#sign-up-button");

function clearAllInputFields() {
  const inputs = document.querySelectorAll("input");

  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].type === "submit") {
      continue;
    } else {
      inputs[i].value = "";
    }
  }
}

function setActiveButton(e) {
  // See is the button which called the event already active.
  // if it is do nothing.

  if (e.target.classList.contains("active")) {
    // this one is already live so no need to do anything.
    return;
  }

  clearAllInputFields();

  loginButton.classList.toggle("active");
  signInButton.classList.toggle("active");

  updateFormData();
}

function updateFormData() {
  const formHeading = document.getElementById("form-heading");
  const submitButton = document.getElementById("submit-button");
  const email = document.getElementById("emailEntry");
  const card = document.getElementById("login-signin");
  const confirmPasswordDiv = document.getElementById("row4");

  let width = window.innerWidth;

  if (formHeading.textContent === "log in.") {
    location.hash = "signup";
    formHeading.textContent = "sign up.";
    submitButton.value = "sign up";
    if (width < "460") {
      email.style.display = "inline";
      confirmPasswordDiv.style.display = "inline";
    } else {
      email.style.display = "block";
      confirmPasswordDiv.style.display = "block";
    }
    card.style.height = "auto";
  } else {
    location.hash = "login";
    formHeading.textContent = "log in.";
    submitButton.value = "log in";
    email.style.display = "none";
    confirmPasswordDiv.style.display = "none";
    card.style.height = "auto";
    document.getElementById("error-messages").textContent = "";
  }
}



function closeGDPR() {
  const gdpr = document.querySelector("#gdpr");
  gdpr.style.display = "none";
}

// location.hash = "login";

module.exports = {
  setActiveButton,
  clearAllInputFields,
  closeGDPR,
  updateFormData,
};

},{}],2:[function(require,module,exports){
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

},{"./helpers":1}]},{},[2]);
