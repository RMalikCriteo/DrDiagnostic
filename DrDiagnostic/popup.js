// Initialize button with users' preferred color
let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
  });
});

// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {

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
