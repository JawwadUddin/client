const helpers = require("./helpers");
const serverUrl = "https://brogrammers-habit-track.herokuapp.com";
const avatarOptions = require("./avatars");

let myChart;
let executed;

async function buttonEvents(e) {
  const targetArticle = e.target.closest("article");

  let dailyTarget = targetArticle.querySelector("p").textContent.split(" ")[2];
  dailyTarget = parseInt(dailyTarget);

  let currentCount = targetArticle.querySelector("p").textContent.split(" ")[0];
  currentCount = parseInt(currentCount);

  if (currentCount + 1 > dailyTarget) {
    M.toast({html: 'You\'ve already hit your daily target!'})
    // Already maxed out.
    return;
  }

  let halfdailyTarget = dailyTarget/2;
  if (!executed) {
  if(currentCount + 1 >= halfdailyTarget){
        M.toast({html: 'Keep going, you\'re over half way there!'});
        executed = true;
      }
  };

  if(currentCount + 1 === dailyTarget){
    M.toast({html: 'Well done! You\'ve hit your daily target!'})
    let completedSection = document.getElementById('completedHabits');
    let completedHabits = document.querySelectorAll("#completedHabits article");
    if (completedHabits.length === 0){
      document.getElementById("completedHabitsHiddenTitle").style.display = "block";
    }
    targetArticle.parentNode.removeChild(targetArticle);
    completedSection.append(targetArticle);
    // if no habits remain remove title
    let activeHabits = document.querySelectorAll("#habits article");
    console.log(activeHabits);
    if (activeHabits.length === 0){
      document.getElementById("activeHabitsHiddenTitle").style.display = "none";
    }
  }

  currentCount++;

  helpers.updateTimesCompleted(currentCount, dailyTarget, targetArticle.id);
  helpers.updateBackgroundOpacity(currentCount, dailyTarget, targetArticle.id);


  // Update the server
  const eventData = {
    id: targetArticle.id,
    times_completed: currentCount,
    frequency_day: dailyTarget,
  };

  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  };

  await fetch(`${serverUrl}/habits`, options);

  
  getGraphData();
  updateBadgesToProfile();
}

async function removeHabit(e) {
  const habitId = e.target.closest("article").id;

  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: habitId }),
  };

  await fetch(`${serverUrl}/habits`, options);
  getGraphData();
  e.target.closest("article").remove();
  M.toast({html: 'Habit Deleted!'})
  hideChart();

  let completedHabits = document.querySelectorAll("#completedHabits article");
  if (completedHabits.length === 0){
    document.getElementById("completedHabitsHiddenTitle").style.display = "none";
  }
  let activeHabits = document.querySelectorAll("#habits article");
  if (activeHabits.length === 0){
    document.getElementById("activeHabitsHiddenTitle").style.display = "none";
  }

}

function bindEventListeners() {
  //===== Add to count =====//
  const addButtons = document.querySelectorAll("#add-to-total");
  const addButtonsArr = Array.from(addButtons);
  addButtonsArr.forEach((button) => {
    button.addEventListener("click", buttonEvents);
  });

  //===== Remove habit =====//
  const removeButtons = document.querySelectorAll(".remove");
  const removeButtonsArr = Array.from(removeButtons);
  removeButtonsArr.forEach((button) => {
    button.addEventListener("click", removeHabit);
  });

  //===== Email Reminder =====//
  const reminderButtons = document.querySelectorAll("#email-reminder");
  const reminderButtonsArr = Array.from(reminderButtons);
  reminderButtonsArr.forEach((button) => {
    button.addEventListener("click", toggleReminderModal);
    button.addEventListener("click", storeArticleId);
  })
}

const newReminderForm = document.getElementById("add-new-reminder");
newReminderForm.addEventListener("submit", sendEmailPostRequest);
const closeReminderButton = document.getElementById("close-button-reminder");

closeReminderButton.addEventListener("click", toggleReminderModal);

function storeArticleId(e){
  const closeId = e.target.closest("article").id;
  localStorage.setItem("targetArticleId", closeId);
}

function toggleReminderModal() {
  const modal = document.getElementById("add-new-reminder");
  modal.classList.toggle("closed");
}

function toggleModal(){
  const modal = document.getElementById("add-new-habit");
  const knownUser = (localStorage.getItem("username"));
  if (knownUser === 'Stranger' || knownUser === 'strange') {
    M.toast({html: 'Hi Stranger, Why not register to save your habits!'});
  }
  modal.classList.toggle("closed");
}

async function sendEmailPostRequest(e){
  e.preventDefault();
  toggleReminderModal();
  const habitId = localStorage.getItem("targetArticleId");
  localStorage.removeItem("targetArticleId");
  const targetArticle = document.getElementById(`${habitId}`);
  let currentTitle = targetArticle.querySelector("h2").textContent;
  let username = localStorage.getItem("username");
  let toSend = { 
    habitname: currentTitle,
    //because currently BST, will need to remove -1 when GMT
    timeHour: e.target.timeHour.value - 1,
    timeMin: e.target.timeMinute.value,
    username: username
  }
  if (!toSend.timeHour || !toSend.timeMin) {
    return;
  }

  const options = {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(toSend)
  }

  const response = await fetch(`${serverUrl}/habits/email`, options);
  M.toast({html: 'E-mail reminder set!'})
}

async function getUserData() {
  const userId = localStorage.getItem("userId");

  const knownUser = (localStorage.getItem("userId")) ? true : false;
  localStorage.setItem("knownUser", knownUser);

  if (!knownUser) {
    localStorage.setItem("username", "Stranger");
  }

  //* Create custom title
  const username = localStorage.getItem("username");
  document.title = `${username}'s Habits`;
  document.getElementById("profileName").textContent = username;
  let avatarLetter = username[0];
  let avatartag = avatarOptions[avatarLetter];
  if (!avatartag){
    avatartag = "fas fa-dragon red";
  }
  let avatar = document.querySelector("i");
  avatar.className = `${avatartag} fa-5x`;


  if (!userId) {
    return;
  }

  const response = await fetch(`${serverUrl}/habits/${userId}`);
  const userData = await response.json();

  console.log(userData);

  if (userData.length === 0) {
    hideChart();
    return;
  }

  let totalDone = 0;
  let totalToDo = 0;
  userData.forEach((habit) => {
    if (habit.times_completed !== habit.frequency_day){
      const newHabit = helpers.renderHabitContainer(habit);
      document.querySelector("#habits").append(newHabit);
      totalDone += habit.times_completed;
      totalToDo += habit.frequency_day;
    } else {
      const newHabit = helpers.renderHabitContainer(habit);
      document.getElementById('completedHabits').append(newHabit);
      totalDone += habit.times_completed;
      totalToDo += habit.frequency_day;
    }
  });

  let activeHabits = document.querySelectorAll("#habits article").length;
  if (activeHabits !== 0){
    let activeTitle = document.getElementById('activeHabitsHiddenTitle');
    activeTitle.style.display = "block";
  }
  let compeltedHabits = document.querySelectorAll("#completedHabits article").length;
  if (compeltedHabits !== 0){
    let completedTitle = document.getElementById('completedHabitsHiddenTitle');
    completedTitle.style.display = "block";
  }


  let stillToDo = totalToDo - totalDone;

  updateBadgesToProfile();
  renderGraph([totalDone, stillToDo]);
  
  bindEventListeners();
}

async function addHabit(e) {
  e.preventDefault();
  toggleModal();

  const data = {
    habitname: e.target.habitname.value,
    times_completed: 0,
    frequency_day: parseInt(e.target.frequency.value),
    streak: 0,
    username_id: localStorage.getItem("userId"),
  };

  if (!data.frequency_day || !data.habitname) {
    return;
  }


  if (!data.username_id) {
    const newHabit = helpers.renderHabitContainer(data);

    if (document.querySelectorAll("article").length === 1) {
      M.toast({html: 'Hi Stranger, Why not register to add more habits!'});
      return;
    }

    document.querySelector("#habits").append(newHabit);
    bindEventListeners();

    return;
  }
  
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  await fetch(`${serverUrl}/habits`, options);

  // Reload the page to add the new item
  location.reload();
}

async function getGraphData() {
  const userId = localStorage.getItem("userId");

  const response = await fetch(`${serverUrl}/habits/${userId}`);
  const userData = await response.json();

  let totalDone = 0;
  let totalToDo = 0;

  userData.forEach((habit) => {
    totalDone += habit.times_completed;
    totalToDo += habit.frequency_day;
  });
  
  let stillToDo = totalToDo - totalDone;

  renderGraph([totalDone, stillToDo]);
  bindEventListeners();
}

async function updateBadgesToProfile() {
  const data = await getBadgeData();

  const userId = localStorage.getItem("userId");

  const response = await fetch(`${serverUrl}/habits/${userId}`);
  const userData = await response.json();

  let totalDone = 0;
  let totalToDo = 0;

  userData.forEach((habit) => {
    totalDone += habit.times_completed;
    totalToDo += habit.frequency_day;
  });
  
  let stillToDo = totalToDo - totalDone;


  const badgeNames = helpers.uniqueBadges(data);

  

  if (stillToDo === 0) {
    badgeNames.push("daily");
    M.toast({html: 'Well done! You\'ve completed all habits for the day!'})
  }

  //! here we could check the lengths to see if a new badge is added. and check the alt text to see which one is new.
  const badgeSection = helpers.createBadgeSection(badgeNames);

  if (document.querySelector("#profileInfo section")) {
    document.querySelector("#profileInfo section").remove();
  }


  const badges = badgeSection.querySelectorAll("img");
  badges.forEach(badge => {
    badge.addEventListener("mouseenter", (e) => {
      const newParagraph = document.createElement("p");
      newParagraph.textContent = e.target.alt;
      newParagraph.id = "badge-name";
      document.getElementById("badge-display").append(newParagraph);
    });
    badge.addEventListener("mouseleave", () => {
      document.getElementById("badge-name").remove();
    });
  });

  document.querySelector("#profileInfo").append(badgeSection);

  // TODO loop through the badges and add event listeners to them to display their names
  
}



async function getBadgeData() {
  const userId = localStorage.getItem("userId");

  const response = await fetch(`${serverUrl}/badges/${userId}`);
  const data = await response.json();

  return data;
}

const newHabitForm = document.getElementById("new-habit-form");
newHabitForm.addEventListener("submit", addHabit);
const closeHabitButton = document.getElementById("close-button");
const newHabitButton = document.getElementById("new-habit");

closeHabitButton.addEventListener("click", toggleModal);
newHabitButton.addEventListener("click", toggleModal);

// Sign out button
const signOutButton = document.querySelector("header button");
signOutButton.addEventListener("click", () => {
  localStorage.removeItem("userId");
  localStorage.removeItem("username");
  localStorage.removeItem("knownUser");
  // TODO remove everything.
  window.location.assign("https://the-stride.netlify.app/"); // TODO update this to our live version.
});

const signOutButton2 = document.querySelector("#hidden button");
signOutButton2.addEventListener("click", () => {
  localStorage.removeItem("userId");
  window.location.assign("https://the-stride.netlify.app/"); // TODO update this to our live version.
});

function renderGraph(dataInput) {
  var xValues = ["Goals Completed", "Still to do"];
  let totalDone = dataInput[0];
  let stillToDo = dataInput[1];
  let totalToDo = totalDone + stillToDo;
  let mutatedColor = ["#D02020", "#FF9C07", "#F7FF00", "#58c770"]; 
  let i;
  if (totalDone/totalToDo < 0.25) {
    i = 0;
  } else if (totalDone/totalToDo < 0.5) {
    i = 1;
  } else if (totalDone/totalToDo < 0.75){
    i = 2;
  } else {
    i = 3;
  }
  let barColors = [`${mutatedColor[i]}`, "#c4c4c4"];
  let chart = document.getElementById("myChart");
  if (!!myChart) {
    myChart.destroy();
  }
  // myChart.destroy();
  myChart = new Chart("myChart", {
    type: "doughnut",
    options: {
      legend: {
        display: false,
      },
      animation: false,
    },
    data: {
      labels: xValues,
      datasets: [
        {
          backgroundColor: barColors,
          data: dataInput,
        },
      ],
    },
  });
}


// This function hides chart when there is no habits available.
function hideChart() {
  let chart = document.getElementById("myChart");
  let profile = document.getElementById("user-info");
  if (!document.querySelector("article")) {
    chart.style.display = "none";
    profile.style.height = "150px";
  }
}


function showBadgeName(e) {

}



getUserData();

