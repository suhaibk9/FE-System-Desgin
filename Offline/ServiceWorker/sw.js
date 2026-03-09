//Name of the Cache
const CACHE_NAME = "ServiceWorkerCache/V3";
//This is the event listener for the install event
self.addEventListener("install", (e) => {
  //Install event will wait till you finish whatever you write inside waitUntil
  e.waitUntil(
    //This is the name of the Cache
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Service Worker Cache V1 Opened");
      //This is the list of files we want to cache
      return cache.addAll(["./index.html", "./index.css", "./index.js"]);
    }),
  );
});

//This is the event listener for the activate event
self.addEventListener("activate", (e) => {
  console.log("Service Worker Activated", e);
  //Wait Until I am done cleaning up the old caches
  e.waitUntil(
    //Get all the caches
    caches.keys().then((cacheNames) => {
      //Filter out the current cache
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
});

//This is the event listener for the fetch event. If there is a network call being made in DOM at that time that req will be passed through this.
self.addEventListener("fetch", (e) => {
  //Offline Requsts
  //Whenever a file is requested. You can do 2 things:
  //1. Check the Cache and return from it.
  //2. If not available in cache, then make a network call and return from it.
  //This is a terrible experience. This way a request will be never be made even if the file changed in server.
  //Better Way:
  //1. For every fetch request get it from n/w and update your cache.
  //2. If there is no network then use cache as a fallback/backup.
  //This will ensure your cache is always up to date.
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        // Clone the response because it's a stream and can only be consumed once
        const resClone = res.clone();

        // Open cache and put the new response in it
        caches.open(CACHE_NAME).then((cache) => {
          console.log("Request", e.request);
          cache.put(e.request, resClone).then(() => {
            console.log("Response", res);
          });
        });

        // Return the original response to the browser
        return res;
      })
      .catch((err) => {
        // If the network fails (offline), fall back to the cache
        return caches.match(e.request);
      }),
  );
});
