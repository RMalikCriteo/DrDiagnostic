// Initialize buttons
let convertTo = document.getElementById("convertTo");
let convertBack = document.getElementById("convertBack");
let urlTextbox = document.getElementById("urlTextbox");
let getFromOneTag = document.getElementById("getFromOneTag");

let oldURL = "https://d.eu.criteo.com";
let newURL = "http://cbsd.par.prod.crto.in";
let diagnosticMode = "&diagnosticmode=true"

// When the button is clicked, inject Convert to new page
convertTo.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: convertToDiagnostic,
    args: [oldURL, newURL, diagnosticMode]
  });
});

// The body of this function will be executed as a content script inside the
function convertToDiagnostic(oldURL, newURL, diagnosticMode) {
  let url = window.location.href;
  if(url.includes(oldURL)){
    url = url.replace(oldURL, newURL) + diagnosticMode;
    window.open(url, '_blank').focus();
  }
}

// When the button is clicked, inject Convert to old page
convertBack.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: convertFromDiagnostic,
    args: [newURL, oldURL, diagnosticMode]
  });
});

// The body of this function will be executed Convert to old page
function convertFromDiagnostic(oldURL, newURL, diagnosticMode) {
  let url = window.location.href;
  if(url.includes(oldURL)){
    url = url.replace(oldURL, newURL);
    url = url.replace(diagnosticMode, "");
    window.open(url, '_blank').focus();
  }
}

// Event for the URL 
urlTextbox.addEventListener('keypress', async (e) => {
  if (e.key === 'Enter') {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: openFromKibana,
      args: [oldURL, e.target.value]
    });
  }
});

// Adds the URL then checks to see if it's a valid url to go to
function openFromKibana(oldURL, e) {
  let url = oldURL + e;
  if(url.includes("delivery")){
    window.open(url, '_blank').focus();
  }
}

// When the button is clicked, inject Convert to new page
getFromOneTag.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: openFromOneTag
  });
});

// The body of this function will be executed as a content script inside the
function openFromOneTag() {
  // let url = oldURL;
  let url = window.location.href;
  let response = fetch(url);
  console.log(response);
}