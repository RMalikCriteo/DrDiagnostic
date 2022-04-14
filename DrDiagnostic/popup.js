// Initialize buttons
let convertTo = document.getElementById("convertTo");
let convertBack = document.getElementById("convertBack");
let urlTextbox = document.getElementById("urlTextbox");
// let getFromOneTag = document.getElementById("getFromOneTag");

let oldURL = "https://d.eu.criteo.com";
let newURL = "https://cbsd.par.prod.crto.in";
let diagnosticMode = "&diagnosticmode=true";

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
  console.info(url, oldURL, url.includes(oldURL))
  if(url.includes(oldURL)){
    url = url.replace(oldURL, newURL);
    url = url.replace(diagnosticMode, "");
    console.info(url)
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
// getFromOneTag.addEventListener("click", async () => {
//   let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  

//   chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     function: openFromOneTag
//   });
// });

// The body of this function will be executed as a content script inside the
// async function openFromOneTag() {
//   let url = "https://sslwidget.criteo.com/event?a=1318&v=5.9.0&p0=e%3Dexd%26rvi%3D02cac83a-4d25-45fa-a0ae-ca94c131b884%26site_type%3Dd&p1=e%3Dce%26m%3D%255B%255D&p2=e%3Dvl%26p%3D%255B13552267%252C2060861%252C2531383%252C4375589%252C20712435%252C4046302%252C8728014%252C11505862%252C21926727%252C12223824%252C3341622%252C2630062%252C15030373%252C3400191%252C11505902%252C5569601%252C2874049%252C11578818%252C13464900%252C23301815%255D%26pnb%3D1%26pi%3DviewCategoryDesktop%26f%3D%255B%255D%26ca%3Dspielzeug%2520%2526%2520spiele%253Ebabyspielzeug&p3=e%3Ddis&adce=1&bundle=3UFgr19Hd1NjcW9US3NFVlpxdTBLU2psZzc2UzF6Ykh3M3NjS0dNWm5FOEZlWm9VSGt5bkp2QlU0T213TEJLanJjMFVsVHl6TEJGQWYwYUs4MHpPaG5vOVA5ck5EYktQMVVoJTJCeHJQY1Rmd0taYlQ0M3dZTGp0NkkwV3dJUVpDbFhLR3pGa3BlNnhEYzFkSVFlV0lURkdRMEZCdyUzRCUzRA&tld=mytoys.de&dy=1&fu=https%3A%2F%2Fwww.mytoys.de%2Fspielzeug-spiele%2Fbabyspielzeug%2F&dtycbr=37755&abe=0";
//   let url = window.location.href;
  
//   let oReq = new XMLHttpRequest();
//   let responseText;
//   oReq.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
//         responseText = this.responseText;
//     }
//   };
//   oReq.open("GET", url);
//   oReq.send(null);
//   console.log(chrome);

//   let response = await fetch(url);
//   let data = await response.text();

//   const caches = await caches.keys();
//   const cache = await caches.open("event?");
//   const cachedResponse = await caches.match(event.request);

//   console.log(cachedResponse);

// }