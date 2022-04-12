// Initialize buttons
let convertTo = document.getElementById("convertTo");
let convertBack = document.getElementById("convertBack");

chrome.storage.sync.get("color", ({ color }) => {
  convertTo.style.backgroundColor = color;
});

// When the button is clicked, inject Convert to new page
convertTo.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: convertToDiagnostic,
  });
});

// The body of this function will be executed as a content script inside the
// current page
function convertToDiagnostic() {
let oldURL = "https://d.eu.criteo.com/";
let newURL = "http://cbsd.par.prod.crto.in/";
let diagnosticMode = "&diagnosticmode=true"
  let url = window.location.href;
  console.log(url);
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
  });
});

// The body of this function will be executed Convert to old page
function convertFromDiagnostic() {
let newURL = "https://d.eu.criteo.com/";
let oldURL = "http://cbsd.par.prod.crto.in/";
let diagnosticMode = "&diagnosticmode=true"
  let url = window.location.href;
  console.log(url);
  if(url.includes(oldURL)){
    url = url.replace(oldURL, newURL);
    url = url.replace(diagnosticMode, "");
    window.open(url, '_blank').focus();
  }
}
