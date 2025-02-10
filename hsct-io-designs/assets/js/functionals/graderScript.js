// script.js


var iframeDoc = null;
let results = [];
let grade = 0 
document.getElementById('run-tests').addEventListener('click', function() {
    const htmlFile = document.getElementById('html-file').files[0];
    const cssFile = document.getElementById('css-file').files[0];
    const jsFile = document.getElementById('js-file').files[0];
    
  
    if (!htmlFile || !cssFile || !jsFile) {
      alert("Please upload all three files: HTML, CSS, and JavaScript.");
      return;
    }

  
    // Create FileReader instances for each file
    const readerHtml = new FileReader();
    const readerCss = new FileReader();
    const readerJs = new FileReader();
  
    // Read the HTML file and process it
    readerHtml.onload = function(e) {
      const htmlContent = e.target.result;
      injectHtml(htmlContent);
    };
    readerHtml.readAsText(htmlFile);
  
    // Read the CSS file and inject it into the page
    readerCss.onload = function(e) {
      const cssContent = e.target.result;
      injectCss(cssContent);
    };
    readerCss.readAsText(cssFile);
  
    // Read the JavaScript file and inject it into the page
    readerJs.onload = function(e) {
      const jsContent = e.target.result;
      injectJs(jsContent);
    };
    readerJs.readAsText(jsFile);
    grade = 0 
    results = []
    runTestCases(iframeDoc);
  });
  
  // Function to inject HTML content into an iframe
  function injectHtml(htmlContent) {
    const iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
     iframeDoc = iframe.contentDocument;
  
    iframeDoc.open();
    iframeDoc.write(htmlContent);
    iframeDoc.close();
  
    // Now that HTML is injected, run tests on it
  }
  
  // Function to inject CSS content into an iframe
  function injectCss(cssContent) {
    const iframe = document.querySelector('iframe');
    if (iframe) {
      const styleTag = iframe.contentDocument.createElement('style');
      styleTag.innerHTML = cssContent;
      iframe.contentDocument.head.appendChild(styleTag);
    }
  }
  

  function injectJs(jsContent) {
    const iframe = document.querySelector('iframe');
    if (iframe) {
        console.log("are we here")
      const scriptTag = iframe.contentDocument.createElement('script');
      scriptTag.type = 'text/javascript';
      scriptTag.innerHTML = jsContent;
      iframe.contentDocument.body.appendChild(scriptTag);
        console.log(iframe.contentWindow)
      // Wait until the script is loaded and executed before calling any functions
      scriptTag.onload = function() {
        console.log("are you running from a beggining")
        // Example: Call a function defined in the uploaded JS file
        if (typeof iframe.contentWindow.someTestFunction === 'function') {
          iframe.contentWindow.someTestFunction(); // Call the function
          document.getElementById('test-results').textContent = "someTestFunction executed!";
        } else {
          document.getElementById('test-results').textContent = "Function 'someTestFunction' not defined in the JS file.";
        }
      };


    }
  }
  

  async function runTestCases(iframeDoc) {
    

  
    // Test case 1: Check if an element with id 'main' exists in the HTML
    try {
      const element = iframeDoc.getElementById('display');
      if (element) {
        results.push("✔️ Passed Test 1 : Element input with id \"display\" exist. ---> 5 points");
        grade += 5
      } else {
        results.push("❌ Test 1 Failed:  Element input with id \"display\" does not exist.");
      }
    } catch (error) {
      results.push("❌ Error Test 1 : " + error.message);
    }
  
    // Test case 2: Check if a specific function from the JS file is defined
    try {
      const testFunction = document.querySelector('iframe').contentWindow.appendToDisplay;
      console.log(testFunction )
      if (typeof testFunction === "function") {
        results.push("✔️ Passed Test 2 : Function 'appendToDisplay' exists. ---> 5 points");
        grade += 5
      } else {
        results.push("❌ Failed Test 2 : Function 'appendToDisplay' is not defined.");
      }
    } catch (error) {
      results.push("❌ Error Test 2 : " + error.message);
    }
    let f = document.querySelector('iframe').contentWindow
    test("Test 3 : Should append numbers and operators to the display", () => {
        f.appendToDisplay('7');
        expect(f.display.value).toBe('7');
        f.appendToDisplay('8');
        expect(f.display.value).toBe('78');
        f.appendToDisplay('+');
        expect(f.display.value).toBe('78+');
        f.appendToDisplay('3');
        expect(f.display.value).toBe('78+3');
    }, 5);
    f.clearDisplay()

    test("Test 4 : Should clear the display when 'C' is clicked", () => {
        f.appendToDisplay('5');
        expect(f.display.value).toBe('5');
        f.clearDisplay();
        expect(f.display.value).toBe('');
    }, 5);

    try {
        const element = iframeDoc.getElementById('display');
        const nextSibling = element.nextElementSibling;
        console.log(nextSibling)
        if (nextSibling.classList.contains("keys")) {
          results.push("✔️ Passed Test 5 : Neighbor element to 'display'  with class \"keys\" exist. ---> 5 points");
          grade += 5
        } else {
          results.push("❌ Test 5 Failed: Neighbor element to 'display' with class \"keys\" does not exist.");
        }
      } catch (error) {
        results.push("❌ Error Test 5 : " + error.message);
      }

      const elementsToCheck = [
        { selector: "button[onclick=\"appendToDisplay('7')\"]", description: "Button for 7" },
        { selector: "button[onclick=\"appendToDisplay('8')\"]", description: "Button for 8" },
        { selector: "button[onclick=\"appendToDisplay('9')\"]", description: "Button for 9" },
        { selector: "button[onclick=\"appendToDisplay('/')\"]", description: "Button for /" },
        { selector: "button[onclick=\"appendToDisplay('4')\"]", description: "Button for 4" },
        { selector: "button[onclick=\"appendToDisplay('5')\"]", description: "Button for 5" },
        { selector: "button[onclick=\"appendToDisplay('6')\"]", description: "Button for 6" },
        { selector: "button[onclick=\"appendToDisplay('*')\"]", description: "Button for *" },
        { selector: "button[onclick=\"appendToDisplay('1')\"]", description: "Button for 1" },
        { selector: "button[onclick=\"appendToDisplay('2')\"]", description: "Button for 2" },
        { selector: "button[onclick=\"appendToDisplay('3')\"]", description: "Button for 3" },
        { selector: "button[onclick=\"appendToDisplay('-')\"]", description: "Button for -" },
        { selector: "button[onclick=\"appendToDisplay('0')\"]", description: "Button for 0" },
        { selector: "button[onclick=\"appendToDisplay('.')\"]", description: "Button for ." },
        { selector: "#clearDisp", description: "Button for Clear (C)" },
        { selector: "button[onclick=\"appendToDisplay('+')\"]", description: "Button for +" },
        { selector: "#equal", description: "Button for Equals (=)" }
    ];


    var buttonCounter = 0 
    elementsToCheck.forEach(({ selector, description }) => {
        const element = iframeDoc.querySelector(selector);
        if (element) {
            buttonCounter++;
        }
    });

    console.log(buttonCounter)

    if (buttonCounter == 17){
        results.push("✔️ Passed Test 6 : All seventeen buttons exists. ---> 10 points");
        grade += 10

    }else{
        results.push("❌ Test 6 Failed : There are some buttons that dont exist.");
    }
    f.clearDisplay()
    test("Test 7 : Should calculate simple expressions", () => {
        f.appendToDisplay('5');
        f.appendToDisplay('+');
        f.appendToDisplay('3');
        f.calculate();
        expect(f.display.value).toBe('4');

        f.clearDisplay();
        f.appendToDisplay('10');
        f.appendToDisplay('/');
       f. appendToDisplay('2');
        f.calculate();
        expect(f.display.value).toBe('5');
    }, 5);

    f.clearDisplay()
    test("Test 8 : Should handle invalid expressions (e.g., division by zero)", () => {
        f.appendToDisplay('5');
        f.appendToDisplay('/');
        f.appendToDisplay('0');
        f.calculate();
        expect(f.display.value).toBe('Error');
    }, 5);

    f.clearDisplay()
    test("Test 9 : Should calculate complex expressions", () => {
        5*3+6/2-5
        f.appendToDisplay('5');
        f.appendToDisplay('*');
        f.appendToDisplay('3');
        f.appendToDisplay('+');
        f.appendToDisplay('6');
        f.appendToDisplay('/');
        f.appendToDisplay('2');
        f.appendToDisplay('-');
        f.appendToDisplay('5');
        f.calculate();
        expect(f.display.value).toBe('13');
    }, 10);
    f.clearDisplay()
    


    const gridContainer = iframeDoc.querySelector(".keys"); 
    
    if (gridContainer) {
        const computedStyle = window.getComputedStyle(gridContainer);
        console.log(computedStyle)
        
        const gridTemplateColumns = computedStyle.getPropertyValue("grid-template-columns").trim();
        console.log(gridTemplateColumns)

        // Test if it matches "repeat(4, 1fr)"
        if (gridTemplateColumns === "repeat(4, 1fr)" || gridTemplateColumns === "1fr 1fr 1fr 1fr" || gridTemplateColumns === "47.5px 47.5px 47.5px 47.5px") {
            results.push("✔️ Passed Test 10 : The grid-template-columns property is set to repeat(4, 1fr). ---> 10 points");
            grade += 10
        } else {
            results.push(`Failed Test 10 : The grid-template-columns property is set to: ${gridTemplateColumns}`);
        }
    } else {
        results.push("❌  Failed Test 10 : Grid container not found.");
    }
if (iframeDoc){
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;

    const data = {
      first_name: firstName,
      last_name: lastName,
      score: parseInt(grade, 10), // Ensure score is a number
  };

    try {
      // Send POST request
      const response = await fetch('http://localhost:3000/submit-score', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
      });

      // Handle response
      if (response.ok) {
          const result = await response.json();
          alert(`Success: ${result.message}`);
          console.log('Response Data:', result);
      } else {
          const error = await response.json();
          alert(`Error: ${error.error}`);
          console.error('Error:', error);
      }
  } catch (error) {
      alert('Failed to submit the form. Please try again.');
      console.error('Network Error:', error);
  }
}
    
  
    document.getElementById('test-results').textContent = results.join('\n') + `\n\n total points : ${grade} / 65`;

  }


function describe(testName, fn) {
    console.log(testName);
    fn();
}

function test(testName, fn, grades) {
    try {
        fn();
        results.push(`✔️ Passed  ${testName} ---> ${grades} points`);
        grade += grades
    } catch (error) {
        results.push(`❌ Failed ${testName}`);
        results.push(error);
    }
}

function expect(value) {
    return {
        toBe: function(expected) {
            if (value !== expected) {
                throw new Error(`Expected "${value}" to be "${expected}"`);
            }
        }
    };
}

function beforeEach(fn) {
    fn();
}

function afterEach(fn) {
    fn();
}

/*

    test("Should append numbers and operators to the display", () => {
        appendToDisplay('7');
        expect(display.value).toBe('7');
        appendToDisplay('8');
        expect(display.value).toBe('78');
        appendToDisplay('+');
        expect(display.value).toBe('78+');
        appendToDisplay('3');
        expect(display.value).toBe('78+3');
    });
    
    // Test for clearing the display
    test("Should clear the display when 'C' is clicked", () => {
        appendToDisplay('5');
        expect(display.value).toBe('5');
        clearDisplay();
        expect(display.value).toBe('');
    });

    // Test for calculating simple expressions
    test("Should calculate simple expressions", () => {
        appendToDisplay('5');
        appendToDisplay('+');
        appendToDisplay('3');
        calculate();
        expect(display.value).toBe('8');

        clearDisplay();
        appendToDisplay('10');
        appendToDisplay('/');
        appendToDisplay('2');
        calculate();
        expect(display.value).toBe('5');
    });

    // Test for handling invalid expressions
    test("Should handle invalid expressions (e.g., division by zero)", () => {
        appendToDisplay('5');
        appendToDisplay('/');
        appendToDisplay('0');
        calculate();
        expect(display.value).toBe('Error');
    });

    */

