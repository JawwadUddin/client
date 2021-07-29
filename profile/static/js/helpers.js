// TESTED
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
  streak.id = "streak-output";
  streak.textContent = data.streak;

  newSection.append(habitTitle);
  newSection.append(habitBoilerToday);
  newSection.append(submittedToday);
  newSection.append(habitBoilerStreak);
  newSection.append(streak);

  return newSection;
}
// TESTED
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
  bgImage.style.opacity =
    parseInt(data.times_completed) / parseInt(data.frequency_day);
  newArticle.append(bgImage);

  const removeButton = document.createElement("button");
  // removeButton.textContent = "delete";
  removeButton.classList.add("remove");
  newArticle.append(removeButton);

  const addToCountButton = document.createElement("button");
  addToCountButton.id = "add-to-total";
  addToCountButton.type = "button";
  addToCountButton.textContent = "+";

  newArticle.append(addToCountButton);

  const emailReminderButton = document.createElement("button");
  emailReminderButton.id = "email-reminder";
  let reminderImage = document.createElement("i");
  reminderImage.className = "far fa-envelope fa-lg";
  reminderImage.id = "reminderImage";
  // console.log(reminderImage);
  emailReminderButton.append(reminderImage);

  newArticle.append(emailReminderButton);

  return newArticle;
}

// TESTED
function removeAllHabitContainers() {
  const articles = document.querySelectorAll("article");
  const articlesArr = Array.from(articles);

  articlesArr.forEach((article) => {
    article.remove();
  });
}

// TESTED
function updateTimesCompleted(timesComplete, targetTimes, id) {
  const targetArticle = document.getElementById(`${id}`);

  const paragraph = targetArticle.querySelector("p");
  paragraph.textContent = `${timesComplete} of ${targetTimes}`;

  if (timesComplete == targetTimes) {
    console.log("we might need to do something else here too.");
    const target = targetArticle.querySelectorAll("p")[1];
    target.textContent = parseInt(target.textContent) + 1;

    // update the dom streak total.
  }
}

// TESTED
function updateBackgroundOpacity(timesComplete, targetTimes, id) {
  const targetArticle = document.getElementById(`${id}`);

  const backgroundImage = targetArticle.querySelector("img");

  backgroundImage.style.opacity =
    parseInt(timesComplete) / parseInt(targetTimes);
}

// TESTED
function uniqueBadges(data) {
  const output = [];
  for (let i = 0; i < data.length; i++) {
    if (!output.includes(data[i].badge_name)) {
      output.push(data[i].badge_name);
    }
  }
  return output;
}

// TESTED
function createBadgeSection(badges) {
  const badgesContainer = document.createElement("section");
  badgesContainer.id = "badge-display";

  badges.forEach((badge) => {
    let imgSrc = `../../../static/assets/badges/${badge}.svg`;
    const newImg = document.createElement("img");
    newImg.src = imgSrc;

    let number = badge.match(/\d/g);
    let name = badge.match(/\w/g);

   
    let output = [];
    for (let i = 0; i < name.length; i++) {
      if (/\d/.test(name[i])) {
         break;
      } else {
        output.push(name[i]);
      }
    }

    name = output.join().replace(/,/g, "");
    if (number) {
      number = number.toString().replace(/,/g, "");
    }
    

    if (badge === "daily") {
      newImg.alt = `All goals for today!`;
    } else {
      newImg.alt = `${name} x ${number}`;
    }
    
    newImg.classList.add("badge");
    badgesContainer.append(newImg);
  });
  
  return badgesContainer;
}

module.exports = {
  renderHabitContainer,
  removeAllHabitContainers,
  updateTimesCompleted,
  updateBackgroundOpacity,
  uniqueBadges,
  createBadgeSection
};
