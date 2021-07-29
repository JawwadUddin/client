// const { describe } = require("yargs");



const fs = require('fs');
const path = require('path');
// const { describe } = require("yargs");
// const { expect } = require("@jest/globals");


describe('head testing login page', () => {
    let html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

  //===== use this if you're bring in an entire file =====//

  beforeEach(() => {
      document.documentElement.innerHTML = html.toString()
  })


  test('the title has been changed from the default', () => {
      
      let title = document.querySelector('title')
      expect(title.textContent).not.toEqual('Document');
  });

  test('css link is not # (default)', () => {
      let css = document.querySelector('link[rel="stylesheet"]');
      expect(css.getAttribute("href")).not.toEqual('#') 
  });

  test('css links to a file with .css as its extension', () => {
      let css = document.querySelector('link[rel="stylesheet"]');
      let link = css.getAttribute("href");
      let result = /.css$/i.test(link)
      expect(result).toBeTruthy()
  });

  test('the page has a favicon element', () => {
      let iconLink = document.querySelector('link[rel="icon"]');
      expect(iconLink).toBeTruthy()
  });

  test('the favicon link is present', () => {
      let iconLink = document.querySelector('link[rel="icon"]');
      expect(iconLink.getAttribute("href")).not.toEqual('#') 
  });

  test('the favicon is in the correct .ico format', () => {
      let linkElm = document.querySelector('link[rel="icon"]');
      let link = linkElm.getAttribute("href");
      let result = /.ico$/i.test(link)
      expect(result).toBeTruthy()
  });

  test('script tag is present', () => {
      let javascriptLink = document.querySelector('script');
      expect(javascriptLink).toBeTruthy()
  });

  test('script has a src attribute', () => {
      let javascriptLink = document.querySelector('script');
      let src = javascriptLink.getAttribute("src");
      expect(src).toBeTruthy();
  });

  test('script link is a bundle.js', () => {
    let javascriptLink = document.querySelector('script');
    let src = javascriptLink.getAttribute("src");
    src = src.split(".").slice(-1)[0] 
    expect(src).toBe("js");
  });

  test("the correct google fonts are linked", () => {
    const links = document.querySelectorAll("link");
    console.log(links);
    let linkMatch = false;
    for (let i = 0; i < links.length; i++) {
      if (links[i].href === 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap') {
        linkMatch = true
        break
      }
    }
    expect(linkMatch).toBeTruthy();
  })

  test("jwt-decode is being brought in", () => {
    const scripts = document.querySelectorAll("script");
    let jwtDecodeLinked = false;
    for (let i = 0; i < scripts.length; i++) {
      if (scripts[i].src === "https://cdn.jsdelivr.net/npm/jwt-decode@1.5.1/build/jwt-decode.min.js") {
        jwtDecodeLinked = true;
        break
      }
    }
    expect(jwtDecodeLinked).toBeTruthy()
  })
})

describe('head testing profile page', () => {
    let html = fs.readFileSync(path.resolve(__dirname, '../profile/index.html'), 'utf8');

  //===== use this if you're bring in an entire file =====//

  beforeEach(() => {
      document.documentElement.innerHTML = html.toString()
  })


  test('the title has been changed from the default', () => {
      
      let title = document.querySelector('title')
      expect(title.textContent).not.toEqual('Document');
  });

  test('css link is not # (default)', () => {
      let css = document.querySelector('link[rel="stylesheet"]');
      expect(css.getAttribute("href")).not.toEqual('#') 
  });

  test('css links to a file with .css as its extension', () => {
      let css = document.querySelector('link[rel="stylesheet"]');
      let link = css.getAttribute("href");
      let result = /.css$/i.test(link)
      expect(result).toBeTruthy()
  });

  test('the page has a favicon element', () => {
      let iconLink = document.querySelector('link[rel="icon"]');
      expect(iconLink).toBeTruthy()
  });

  test('the favicon link is present', () => {
      let iconLink = document.querySelector('link[rel="icon"]');
      expect(iconLink.getAttribute("href")).not.toEqual('#') 
  });

  test('the favicon is in the correct .ico format', () => {
      let linkElm = document.querySelector('link[rel="icon"]');
      let link = linkElm.getAttribute("href");
      let result = /.ico$/i.test(link)
      expect(result).toBeTruthy()
  });

  test('script tag is present', () => {
      let javascriptLink = document.querySelector('script');
      expect(javascriptLink).toBeTruthy()
  });

  test('script has a src attribute', () => {
      let javascriptLink = document.querySelector('script');
      let src = javascriptLink.getAttribute("src");
      expect(src).toBeTruthy();
  });

  test('script link is a .js file', () => {1
      let javascriptLink = document.querySelector('script');
      let src = javascriptLink.getAttribute("src");
      src = src.split(".").slice(-1)[0] 
      expect(src).toBe("js");
  });
  test("the correct google fonts are linked", () => {
    const links = document.querySelectorAll("link");
    console.log(links);
    let linkMatch = false;
    for (let i = 0; i < links.length; i++) {
      if (links[i].href === 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap') {
        linkMatch = true
        break
      }
    }
    expect(linkMatch).toBeTruthy();
  })
  
  test("jwt decode is bering brought in", () => {
    const scripts = document.querySelectorAll("script");
    let jwtDecodeLinked = false;
    for (let i = 0; i < scripts.length; i++) {
      if (scripts[i].src === "https://cdn.jsdelivr.net/npm/jwt-decode@1.5.1/build/jwt-decode.min.js") {
        jwtDecodeLinked = true;
        break
      }
    }
    expect(jwtDecodeLinked).toBeTruthy()
  })

  test("meterialize css is being brought in", () => {
    const links = document.querySelectorAll("link")
    let isThere
    for (let i = 0; i < links.length; i++) {
      if (links[i].href === "http://localhost/static/materialize.css") {
        isThere = true;
        break;
      }
    }
    expect(isThere).toBeTruthy()
  })

  test("meterialize js is being brought in", () => {
    const links = document.querySelectorAll("script")
    let isThere
    for (let i = 0; i < links.length; i++) {
      if (links[i].src === "http://localhost/static/js/materialize.js") {
        isThere = true;
        break;
      }
    }
    expect(isThere).toBeTruthy()
  })

  test("chartjs is being brought in", () => {
    const links = document.querySelectorAll("script")
    let isThere
    for (let i = 0; i < links.length; i++) {
      if (links[i].src === "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js") {
        isThere = true;
        break;
      }
    }
    expect(isThere).toBeTruthy()
  })
  
})
