const CACHE_NAME = 'my-cache-v5'; // Change version to update cache
const FILES_TO_CACHE = [
  '/wordleanalyser/index.html',
  '/wordleanalyser/words.json' // The file you updated
];

caches.keys().then(cacheNames => {
  console.log('Cache versions:', cacheNames);
});

self.addEventListener('install', event => {
  // Precache updated assets
  console.log('Install...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(FILES_TO_CACHE))
      .then(() => self.skipWaiting()) // Activate new SW immediately
  );
});

  console.log('Activate...');
self.addEventListener('activate', event => {
  // Remove old caches
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim()) // Take control of clients immediately
  );
});

  console.log('Fetch...');
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
