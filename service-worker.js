self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('v2').then(cache =>
      cache.addAll([
       '/wordleanalyser/index.html',
       '/wordleanalyser/words.json'
       ])
    )
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response =>
      response || fetch(event.request)
    )
  );
});
