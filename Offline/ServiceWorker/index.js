//This if is to check if the browser actually SW
if (navigator.serviceWorker) {
  //Register Service Worker - sw.js is the path of the SW file
  navigator.serviceWorker
    .register("./sw.js")
    .then((res) => console.log("Service Worker Registered", res))
    .catch((err) => console.log("Service Worker Not Registered", err));
}
