const helpers = require("../static/js/helpers");
const profileHelpers = require("../profile/static/js/helpers")

describe("login page", () => {
    describe("clear input fields tests", () => {

        beforeEach(() => {
            document.documentElement.innerHTML = `<main><input type="text">test</input><input type="text">test</input></main>`;
        });
    
    
        test('all input fields should be emptied', () => {
            helpers.clearAllInputFields()
            expect(document.querySelector("input").value).toBe("");
        });
    
        test("an input with a type of submit shouldn't be affected.", () => {
            document.documentElement.innerHTML = `<main><input type="submit" value="hello"></input></main>`;
            helpers.clearAllInputFields()
            expect(document.querySelector("input").value).toBe("hello");
        });
    
        test("clears multiple input fields", () => {
            document.documentElement.innerHTML = `<main><input type="text" value="hello"></input><input type="text" value="hello"></input><input type="text" value="hello"></input><input type="text" value="hello"></input></main>`;
            helpers.clearAllInputFields()
            const inputs = document.querySelectorAll("input");
            const inputsArr = Array.from(inputs);
            const values = []
            inputsArr.forEach(element => {
                values.push(element.value);
            });
            const result = values.every(e => e === values[0])
            expect(result).toBeTruthy();
        });
    
        test("clears multiple input fields but not a submit", () => {
            document.documentElement.innerHTML = `<main><input type="text" value="hello"></input><input type="submit" value="hello"></input><input type="text" value="hello"></input><input type="text" value="hello"></input><input type="text" value="hello"></input></main>`;
            helpers.clearAllInputFields()
            const inputs = document.querySelectorAll("input");
            const inputsArr = Array.from(inputs);
            const values = []
            inputsArr.forEach(element => {
                values.push(element.value);
            });
            const result = values.every(e => e === values[0])
            expect(result).toBeFalsy();
        });
        
    })

    describe("set active button", () => {
        beforeEach(() => {
            document.documentElement.innerHTML = `<section id="login-signin"><form>
            <h1 id="form-heading">sign up.</h1>
            <div id="row4"></div>
            <p id="error-messages"></p>
            <div id="login-entry">
              <div id="emailEntry" style="display: block;">
                <label class="leftForm" for="email">email address</label>
                <input class="rightForm" id="email" type="text" spellcheck="false">
              </div>
  
              <div id="row2">
                <label class="leftForm" for="username">username</label>
                <input class="rightForm" id="username" type="text" spellcheck="false">
                <br>
              </div>
  
              <div id="row3">
                <label class="leftForm" for="password">password</label>
                <input class="rightForm" id="password" type="password" spellcheck="false">
                <br>
              </div>
            </div>
            <input id="submit-button" type="submit" value="sign up" spellcheck="false">
          </form></section>`
        })

        test("heading changes to login", () => {
            helpers.updateFormData()
            expect(document.querySelector("#login-signin h1").textContent).toBe("log in.");
        })

        test("height is updated to auto", () => {
            document.documentElement.innerHTML = `<section id="login-signin"><form>
            <h1 id="form-heading">log in.</h1>
            <div id="row4"></div>
            <p id="error-messages"></p>
            <div id="login-entry">
              <div id="emailEntry" style="display: block;">
                <label class="leftForm" for="email">email address</label>
                <input class="rightForm" id="email" type="text" spellcheck="false">
              </div>
  
              <div id="row2">
                <label class="leftForm" for="username">username</label>
                <input class="rightForm" id="username" type="text" spellcheck="false">
                <br>
              </div>
  
              <div id="row3">
                <label class="leftForm" for="password">password</label>
                <input class="rightForm" id="password" type="password" spellcheck="false">
                <br>
              </div>
            </div>
            <input id="submit-button" type="submit" value="sign up" spellcheck="false">
          </form></section>`
            helpers.updateFormData()
            expect(document.querySelector("#login-signin").style.height).toBe("auto");
        })

        test("height is updated to 350px", () => {
            document.documentElement.innerHTML = `<section id="login-signin"><form>
            <h1 id="form-heading">sign up.</h1>
            <div id="row4"></div>
            <p id="error-messages"></p>
            <div id="login-entry">
              <div id="emailEntry" style="display: block;">
                <label class="leftForm" for="email">email address</label>
                <input class="rightForm" id="email" type="text" spellcheck="false">
              </div>
  
              <div id="row2">
                <label class="leftForm" for="username">username</label>
                <input class="rightForm" id="username" type="text" spellcheck="false">
                <br>
              </div>
  
              <div id="row3">
                <label class="leftForm" for="password">password</label>
                <input class="rightForm" id="password" type="password" spellcheck="false">
                <br>
              </div>
            </div>
            <input id="submit-button" type="submit" value="sign up" spellcheck="false">
          </form></section>`
            helpers.updateFormData()
            expect(document.querySelector("#login-signin").style.height).toBe("350px");
        })

        test("email form is shown", () => {
            document.documentElement.innerHTML = `<section id="login-signin"><form>
            <h1 id="form-heading">sign up.</h1>
            <div id="row4"></div>
            <p id="error-messages"></p>
            <div id="login-entry">
              <div id="emailEntry" style="display: block;">
                <label class="leftForm" for="email">email address</label>
                <input class="rightForm" id="email" type="text" spellcheck="false">
              </div>
  
              <div id="row2">
                <label class="leftForm" for="username">username</label>
                <input class="rightForm" id="username" type="text" spellcheck="false">
                <br>
              </div>
  
              <div id="row3">
                <label class="leftForm" for="password">password</label>
                <input class="rightForm" id="password" type="password" spellcheck="false">
                <br>
              </div>
            </div>
            <input id="submit-button" type="submit" value="sign up" spellcheck="false">
          </form></section>`
            helpers.updateFormData()
            expect(document.querySelector("#login-signin").style.height).toBe("350px");
        })

        test("button text changes to login", () => {
            document.documentElement.innerHTML = `<section id="login-signin"><form>
            <h1 id="form-heading">sign up.</h1>
            <div id="row4"></div>
            <p id="error-messages"></p>
            <div id="login-entry">
              <div id="emailEntry" style="display: block;">
                <label class="leftForm" for="email">email address</label>
                <input class="rightForm" id="email" type="text" spellcheck="false">
              </div>
  
              <div id="row2">
                <label class="leftForm" for="username">username</label>
                <input class="rightForm" id="username" type="text" spellcheck="false">
                <br>
              </div>
  
              <div id="row3">
                <label class="leftForm" for="password">password</label>
                <input class="rightForm" id="password" type="password" spellcheck="false">
                <br>
              </div>
            </div>
            <input id="submit-button" type="submit" value="sign up" spellcheck="false">
          </form></section>`
            helpers.updateFormData()
            expect(document.querySelector("#submit-button").value).toBe("log in");
        })

        test("button text changes to sign up", () => {
            document.documentElement.innerHTML = `<section id="login-signin"><form>
            <h1 id="form-heading">log in.</h1>
            <div id="row4"></div>
            <p id="error-messages"></p>
            <div id="login-entry">
              <div id="emailEntry" style="display: block;">
                <label class="leftForm" for="email">email address</label>
                <input class="rightForm" id="email" type="text" spellcheck="false">
              </div>
  
              <div id="row2">
                <label class="leftForm" for="username">username</label>
                <input class="rightForm" id="username" type="text" spellcheck="false">
                <br>
              </div>
  
              <div id="row3">
                <label class="leftForm" for="password">password</label>
                <input class="rightForm" id="password" type="password" spellcheck="false">
                <br>
              </div>
            </div>
            <input id="submit-button" type="submit" value="sign up" spellcheck="false">
          </form></section>`
            helpers.updateFormData()
            expect(document.querySelector("#submit-button").value).toBe("sign up");
        })

        test("heading changes to sign up", () => {
            document.documentElement.innerHTML = `<section id="login-signin"><form>
            <h1 id="form-heading">log in.</h1>
            <div id="row4"></div>
            <p id="error-messages"></p>
            <div id="login-entry">
              <div id="emailEntry" style="display: block;">
                <label class="leftForm" for="email">email address</label>
                <input class="rightForm" id="email" type="text" spellcheck="false">
              </div>
  
              <div id="row2">
                <label class="leftForm" for="username">username</label>
                <input class="rightForm" id="username" type="text" spellcheck="false">
                <br>
              </div>
  
              <div id="row3">
                <label class="leftForm" for="password">password</label>
                <input class="rightForm" id="password" type="password" spellcheck="false">
                <br>
              </div>
            </div>
            <input id="submit-button" type="submit" value="sign up" spellcheck="false">
          </form></section>`
            helpers.updateFormData()
            expect(document.querySelector("#login-signin h1").textContent).toBe("sign up.");
        })

        test("GDPR display gets set to none", () => {
            document.documentElement.innerHTML = `<section id="login-signin"><article id="gdpr" style="display:static;" ><article></section>`
            helpers.closeGDPR()
            expect(document.querySelector("article").style.display).toBe("none");
        })
    })
})



describe('profile page', () => {
    describe('create new element', () => {
        beforeEach(() => {
            document.documentElement.innerHTML = `<section id="habits"></section>`
        })
        test('new habit is made', () => {
            const data = {
                habitId: 1,
                habitTitle: "test",
                todayTotal: 3,
                todayGoal: 10,
                streak: 7
            
            };
            const target = document.querySelector("#habits");
            target.append(profileHelpers.renderHabitContainer(data))
            expect(document.querySelector("article")).toBeTruthy();
        })
        
        
        test('text section has the right class', () => {
            const data = {
                habitId: 1,
                habitTitle: "test",
                todayTotal: 3,
                todayGoal: 10,
                streak: 7
            
            };
            const target = document.querySelector("#habits");
            target.append(profileHelpers.renderHabitContainer(data))
            
            expect(document.querySelector(".habit-details")).toBeTruthy()
        })
        test('text section has the right number of paragraphs', () => {
            const data = {
                habitId: 1,
                habitTitle: "test",
                todayTotal: 3,
                todayGoal: 10,
                streak: 7
            
            };
            const target = document.querySelector("#habits");
            target.append(profileHelpers.renderHabitContainer(data))
            
            expect(document.querySelectorAll("p").length).toBe(2)
        })
        test('text section has the right number of h2s', () => {
            const data = {
                habitId: 1,
                habitTitle: "test",
                todayTotal: 3,
                todayGoal: 10,
                streak: 7
            
            };
            const target = document.querySelector("#habits");
            target.append(profileHelpers.renderHabitContainer(data))
            
            expect(document.querySelectorAll("h3").length).toBe(2)
        })
        test('text section has the right number of h3s', () => {
            const data = {
                habitId: 1,
                habitTitle: "test",
                todayTotal: 3,
                todayGoal: 10,
                streak: 7
            
            };
            const target = document.querySelector("#habits");
            target.append(profileHelpers.renderHabitContainer(data))
            
            expect(document.querySelectorAll("h2").length).toBe(1)
        })
    })

    describe("all habit containers are removed", () => {
        beforeEach(() => {
            document.documentElement.innerHTML = `<section id="habits"><article></article></section>`
        })
        test("articles are present before in test cases", () => {
            expect(document.querySelectorAll("article").length).toBe(1);
        })
        test("all articles are remove from the dom (test case, one article)", () => {
            profileHelpers.removeAllHabitContainers();
            expect(document.querySelectorAll("article").length).toBe(0);
        })
        test("all articles are remove from the dom (test case, multiple article)", () => {
            document.documentElement.innerHTML = `<section id="habits"><article></article><article></article><article></article></section>`
            profileHelpers.removeAllHabitContainers();
            expect(document.querySelectorAll("article").length).toBe(0);
        })
    })

    describe("count updates", () => {
        beforeEach(() => {
            document.documentElement.innerHTML = `<section id="habits"><article id="test"><p><p></article></section>`
        })

        test("output if formatted correctly", () => {
            profileHelpers.updateTimesCompleted(1, 2, 'test')
            expect(document.querySelector("p").textContent).toEqual("1 of 2");
        })
        
        test("updated value is added to the dom", () => {
            profileHelpers.updateTimesCompleted(1, 2, 'test')
            expect(document.querySelector("p")).toBeTruthy();
        })

        test("updated value is added to the dom", () => {
            profileHelpers.updateTimesCompleted(10, 10, 'test')
            // TODO We will make a different assertion here based on a function getting called. Like maybe we add an emoji. and test it's there.
            expect(document.querySelector("p")).toBeTruthy();
        })
    })

    describe("change opacity based on values", () => {
        beforeEach(() => {
            document.documentElement.innerHTML = `<section id="habits"><article id="test"><img style="opacity:0;"><img></article></section>`
        })
        test("test case opacity should be 0", () => {
            expect(document.querySelector("img").style.opacity).toBe("0");
        })
        test("input of 1 and 2 should change opacity to 0.5", () => {
            profileHelpers.updateBackgroundOpacity(1,2,"test");
            expect(document.querySelector("img").style.opacity).toBe("0.5");
        })
        test("input of 1 and 3 should change opacity to 0.3", () => {
            profileHelpers.updateBackgroundOpacity(1,3,"test");
            expect(document.querySelector("img").style.opacity).toBe("0.3333333333333333");
        })
        test("equal entries make it solid", () => {
            profileHelpers.updateBackgroundOpacity(3,3,"test");
            expect(document.querySelector("img").style.opacity).toBe("1");
        })
        
    })

    describe("unique badge title finder", () => {
      test("we don't get back and empty array", () => {
        const data = [
          {"badge_name": "test"}
        ]
        const result = profileHelpers.uniqueBadges(data);
        expect(result.length).toBe(1)
      })

      test("if two items are the same it only returns one", () => {
        const data = [
          {"badge_name": "test"},
          {"badge_name": "test"}
        ]
        const result = profileHelpers.uniqueBadges(data);
        expect(result.length).toBe(1)
      })

      test("two unique entries returns both items", () => {
        const data = [
          {"badge_name": "test"},
          {"badge_name": "test1"}
        ]
        const result = profileHelpers.uniqueBadges(data);
        expect(result.length).toBe(2)
      })

      test("no data returns an empty array", () => {
        const data = []
        const result = profileHelpers.uniqueBadges(data);
        expect(result.length).toBe(0)
      })

    })

    describe("badge creation", () => {
      beforeEach(() => {
        document.documentElement.innerHTML = `<main id="images"></main>`
    })

      test("returns one section", () => {
        const data = ["1"]
        const result = profileHelpers.createBadgeSection(data);
        document.querySelector("#images").append(result);

        const result2 = document.querySelectorAll("section");

        expect(result2.length).toBe(1)
        
      })

      test("returns one img", () => {
        const data = ["1"]
        const result = profileHelpers.createBadgeSection(data);
        document.querySelector("#images").append(result);

        const result2 = document.querySelectorAll("img");

        expect(result2.length).toBe(1)
        
      })

      test("returns multiple img", () => {
        const data = ["1", "2", "3","4"]
        const result = profileHelpers.createBadgeSection(data);
        document.querySelector("#images").append(result);

        const result2 = document.querySelectorAll("img");

        expect(result2.length).toBe(data.length)
        
      })

      test("image link is formatted correctly", () => {
        const data = ["1", "2", "3","4"]
        const result = profileHelpers.createBadgeSection(data);
        document.querySelector("#images").append(result);

        const result2 = document.querySelector("img").src;

        expect(result2).toBe(`http://localhost/static/assets/badges/${data[0]}.svg`)
        
      })

      test("alt is formatted correctly", () => {
        const data = ["habits1"]
        const result = profileHelpers.createBadgeSection(data);
        document.querySelector("#images").append(result);

        const result2 = document.querySelector("img").alt;

        expect(result2).toBe(`habits x 1`)
        
      })

      test("alt is formatted correctly (habits10)", () => {
        const data = ["habits10"]
        const result = profileHelpers.createBadgeSection(data);
        document.querySelector("#images").append(result);

        const result2 = document.querySelector("img").alt;

        expect(result2).toBe(`habits x 10`)
        
      })

      test("alt is formatted correctly (all complete today)", () => {
        const data = ["daily"]
        const result = profileHelpers.createBadgeSection(data);
        document.querySelector("#images").append(result);

        const result2 = document.querySelector("img").alt;

        expect(result2).toBe(`All goals for today!`)
        
      })

    })
})
