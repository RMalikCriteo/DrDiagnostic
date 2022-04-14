/delivery/v2/api/page?
criteo-a=1318&
page-id=viewCategoryDesktop&
criteo-uid=e3980db4-5c78-457b-b1ba-413a7799be05&
shopper-browser-id=02cac83a-4d25-45fa-a0ae-ca94c131b884&
criteo-xdid=3a60ece8-175e-494d-ac37-d556ab3232d4&
abe=0&
category=spielzeug+%26+spiele%3Ebabyspielzeug&
list-size=20&
page-num=1&
organic-skus=2060861%7 C15908252%7 C2531383%7 C4375589%7 C20712435%7 C8728014%7 C11505862%7 C12223824%7 C3341622%7 C15030373%7 C3400191%7 C11505902%7 C5569601%7 C2874049%7 C11578818%7 C13464900%7 C23301815%7 C20445744%7 C23316969%7 C14521889






// The body of this function will be executed as a content script inside the
async function openFromOneTag() {
    function httpGet(theUrl) {
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
      xmlHttp.send( null );
      return xmlHttp.responseText;
    }
    console.profile()
    console.profileEnd()
    
    window.caches.keys().then(function(cacheNames) {
      // console.log("maybe", cacheNames);
      cacheNames.forEach(function(cacheName) {
        if(cacheName.includes("sslwidget.criteo.com")){
          url = cacheName;
          sendCacheURL(url)
        }
      })
    });
    function sendCacheURL(url){
      // {applaunched:"al",viewitem:"vp",viewhome:"vh",viewlist:"vl",viewbasket:"vb",viewsearch:"vs",
      // viewpage:"vpg",tracktransaction:"vc",addtocart:"ac",calldising:"dis",setdata:"exd",
      // setemail:"ce",setidentity:"id"}
  
      const preArray = [
        /%252C/g, /%3D/g, /%26/g, /%7C/g, /%25/g, /%20/g, "https://sslwidget.criteo.com/event?", "a=", "rvi=", "ca=",
        "pi=","p=%255B", "page=", "p2=e=", "=al","=vp","=vh","=vl","=vb","=vs","=vpg","=vc","=ac","=dis","=exd","=ce","=id", "p=%5B"];
      const postArray = [
        '|','=','&','|','%', '',"https://d.eu.criteo.com/delivery/adserving?","criteo-partner-id=","retailer-visitor-id=","category=",
        "page-id=","organic-skus=","page-num=","event-type=","=appLaunched","=viewItem","=viewHome","=viewList","=viewBasket","=viewSearch",
        "=viewPage","=trackTransaction","=addToCart","=callDising","=setData","=setEmail","=setIdentity", "organic-skus="
      ]
  
      let newURL;
  
  
      for(let i = 0; i < preArray.length; i++){
        url = url.replace(preArray[i], postArray[i]);
      }
  
      // url = url.replace(/%252C/g, '|');
      // url = url.replace(/%3D/g, '=');
      // url = url.replace(/%26/g, '&');
      // url = url.replace(/%7C/g, '|');
      // url = url.replace(/%25/g, '%');
      // url = url.replace("https://sslwidget.criteo.com/event?", "https://d.eu.criteo.com/delivery/retailmedia?");
      // url = url.replace("a=", "criteo-partner-id=");
      // url = url.replace("rvi=", "shopper-browser-id=");
      // url = url.replace("ca=", "category=");
      // url = url.replace("pi=", "page-id=");
      // url = url.replace("p=%255B", "organic-skus=");
      // url = url.replace("page=", "page-num=");
      // url = url.replace("p2=e=", "event-type=");
      window.open(url, '_blank').focus();
  
      // console.log(url, "maybe", preArray.length, postArray.length);
    }
  }