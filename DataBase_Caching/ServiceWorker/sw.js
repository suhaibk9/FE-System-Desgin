// ============================================================
// SERVICE WORKER (sw.js)
// This file runs in a separate thread from the main page.
// It intercepts ALL network requests from the browser.
// ============================================================

const CACHE_NAME = "my-cache-v1";

// Files to pre-cache during the "install" phase
const ASSETS_TO_CACHE = ["/", "/index.html", "/data.json"];

// ============================================================
// LIFECYCLE EVENT 1: INSTALL
// Runs once when the SW is first registered.
// This is where you pre-cache your static assets.
// ============================================================
self.addEventListener("install", (event) => {
  console.log("[SW] Install event — pre-caching assets...");

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[SW] Caching:", ASSETS_TO_CACHE);
      return cache.addAll(ASSETS_TO_CACHE);
    }),
  );
});

// ============================================================
// LIFECYCLE EVENT 2: ACTIVATE
// Runs after install, when the SW takes control.
// This is where you clean up old caches from previous versions.
// ============================================================
self.addEventListener("activate", (event) => {
  console.log("[SW] Activate event — cleaning old caches...");

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME) // Delete any cache that isn't our current version
          .map((name) => {
            console.log("[SW] Deleting old cache:", name);
            return caches.delete(name);
          }),
      );
    }),
  );
});

// ============================================================
// LIFECYCLE EVENT 3: FETCH
// Intercepts EVERY network request the page makes.
// Strategy: "Cache First, Network Fallback"
//   1. Check the cache first
//   2. If not in cache, go to the network
//   3. If network works, cache the response for next time
// ============================================================
self.addEventListener("fetch", (event) => {
  console.log("[SW] Intercepted fetch:", event.request.url);

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // 1. If it's in the cache, return it immediately
      if (cachedResponse) {
        console.log("[SW] Serving from cache:", event.request.url);
        return cachedResponse;
      }

      // 2. Not in cache — go to network
      console.log(
        "[SW] Not in cache, fetching from network:",
        event.request.url,
      );
      return fetch(event.request).then((networkResponse) => {
        // 3. Clone and store in cache for next time
        const responseClone = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone);
        });
        return networkResponse;
      });
    }),
  );
});
