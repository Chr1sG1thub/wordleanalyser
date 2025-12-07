self.addEventListener('install', event => {
  // No files to cache
  self.skipWaiting(); // Optional: activate immediately
});

self.addEventListener('activate', event => {
  self.clients.claim(); // Take control of pages immediately
});

self.addEventListener('fetch', event => {
  // Always fetch from network, no caching
  event.respondWith(fetch(event.request));
});
