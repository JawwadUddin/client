(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
function renderHabitData(data) {
    const newSection = document.createElement("section");
    newSection.classList.add("habit-details");

    const habitTitle = document.createElement("h2");
    habitTitle.textContent = data.habitname;

    const habitBoilerToday = document.createElement("h3");
    habitBoilerToday.textContent = "Today";

    const submittedToday = document.createElement("p");
    submittedToday.textContent = `${data.times_completed} of ${data.frequency_day}`;

    const habitBoilerStreak = document.createElement("h3");
    habitBoilerStreak.textContent = "Streak";

    const streak = document.createElement("p");
    streak.textContent = data.streak;

    newSection.append(habitTitle);
    newSection.append(habitBoilerToday);
    newSection.append(submittedToday);
    newSection.append(habitBoilerStreak);
    newSection.append(streak);

    return newSection;
}

function renderHabitContainer(data) {
    const newArticle = document.createElement("article");
    newArticle.id = data.id;
    newArticle.classList.add("habit-container");

    const habitData = renderHabitData(data);
    newArticle.append(habitData);

    const bgImage = document.createElement("img");
    bgImage.src = "../static/assets/ER0AQagU8AAUjHM.jpg";
    bgImage.classList.add("habit-gradient");
    bgImage.alt = "background gradient";
    //* the opacity is based on the percentage of the goal complete.
    bgImage.style.opacity = (parseInt(data.times_completed) / parseInt(data.frequency_day));
    newArticle.append(bgImage);

    const removeButton = document.createElement("button");
    removeButton.textContent = "remove";
    removeButton.classList.add("remove");
    newArticle.append(removeButton);   
    
    const addToCountButton = document.createElement("button");
    addToCountButton.id = "add-to-total";
    addToCountButton.type = "button";
    addToCountButton.textContent = "+";

    newArticle.append(addToCountButton);
    
    return newArticle;

}

function removeAllHabitContainers() {
    const articles = document.querySelectorAll("article");
    const articlesArr = Array.from(articles);


    articlesArr.forEach(article => {
        article.remove();
    });

}

function updateTimesCompleted(timesComplete, targetTimes, id) {

    const targetArticle = document.getElementById(`${id}`);
    
    const paragraph = targetArticle.querySelector("p");
    paragraph.textContent = `${timesComplete} of ${targetTimes}`;
    return;
}

function updateBackgroundOpacity(timesComplete, targetTimes, id) {
    
}

module.exports = {renderHabitContainer, removeAllHabitContainers, updateTimesCompleted};
},{}],2:[function(require,module,exports){
const helpers = require("./helpers");
const serverUrl = "http://localhost:3000";
// TODO get user id from local storage.



async function getUserData() {
    const userId = localStorage.getItem("userId");

    if (!userId) {
        return;
    }

    const response = await fetch(`${serverUrl}/habits/${userId}`);
    const userData = await response.json();

    if (userData.length === 0) {
        console.log("no data found");
        return;
    }
    
    // add a 
    userData.forEach(habit => {
        const newHabit = helpers.renderHabitContainer(habit);
        console.log(newHabit);
        document.querySelector("#habits").append(newHabit);
    });
    bindEventListeners();
}

async function buttonEvents(e) {
    const targetArticle = e.target.closest("article");

    let dailyTarget = targetArticle.querySelector("p").textContent.split(" ")[2];
    dailyTarget = parseInt(dailyTarget);
    
    let currentCount = targetArticle.querySelector("p").textContent.split(" ")[0];
    currentCount = parseInt(currentCount);

    if ((currentCount + 1) > dailyTarget) {
        // Already maxed out.
        return;
    }

    currentCount++;

    // Update the dom

    helpers.updateTimesCompleted(currentCount, dailyTarget, targetArticle.id);

    
   

   

    // Update the server
    const eventData = {
        id: targetArticle.id,
        times_completed: currentCount
    };

    const options = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(eventData)
      };

    const response = await fetch(`${serverUrl}/habits`, options);

      

    // helpers.removeAllHabitContainers();
    // getUserData();

}

async function removeHabit(e) {
    const habitId = e.target.closest("article").id;
    
    const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({id: habitId})
      };

    const response = await fetch(`${serverUrl}/habits`, options);

    e.target.closest("article").remove();
}

function bindEventListeners() {

    //===== Add to count =====//
    const addButtons = document.querySelectorAll("#add-to-total");
    const addButtonsArr = Array.from(addButtons);
    addButtonsArr.forEach(button => {
        button.addEventListener("click", buttonEvents);
    });

    //===== Remove habit =====//
    const removeButtons = document.querySelectorAll(".remove");
    const removeButtonsArr = Array.from(removeButtons);
    removeButtonsArr.forEach(button => {
        button.addEventListener("click", removeHabit);
    });
}



// Sign out button
const signOutButton = document.querySelector("header button");
signOutButton.addEventListener("click", () => {
    localStorage.removeItem('userId');
    window.location.assign("http://[::]:8000/#login"); // TODO update this to our live version.
});

getUserData();
},{"./helpers":1}]},{},[2]);
