const helpers = require("./helpers");

const loginButton = document.querySelector("#login-button");
const signInButton = document.querySelector("#sign-up-button");
const errorMessages = document.getElementById("error-messages");

loginButton.addEventListener("click", helpers.setActiveButton);
signInButton.addEventListener("click", helpers.setActiveButton);

const form = document.querySelector("form");


form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const data = {
        username: e.target.username.value,
        password: e.target.password.value
    };

    // if any of the values are falsy, i.e empty, don't process.
    for (const key in data) {
        if(!data[key]) {
        // this one is already live so no need to do anything.
            errorMessages.textContent = "username or password missing.";
            return;
        }
    };

    helpers.clearAllInputFields();
    
    // TODO send the requests to the server.




    //* Get the hash from the page to pick which fetch we do.

});