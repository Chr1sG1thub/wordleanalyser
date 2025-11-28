// service-worker.js - Updated to STOP caching files and clear existing caches
const CACHE_NAME = 'no-cache-v1';

// Install event: Skip waiting and do NOT populate any cache
self.addEventListener('install', event => {
  console.log('Service Worker: Installing - No caching enabled');
  // Force immediate activation without waiting for old tabs to close
  self.skipWaiting();
  
  event.waitUntil(
    // Optional: Pre-cache nothing - we're disabling caching entirely
    Promise.resolve()
  );
});

// Activate event: Clear ALL existing caches and take control immediately
self.addEventListener('activate', event => {
  console.log('Service Worker: Activating - Clearing all old caches');
  
  // Take control of all pages immediately
  self.clients.claim();
  
  event.waitUntil(
    // Delete ALL existing caches to stop serving cached content
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          console.log('Service Worker: Deleting old cache:', cacheName);
          return caches.delete(cacheName);
        })
      );
    })
  );
});

// Fetch event: Bypass cache entirely - always fetch from network
self.addEventListener('fetch', event => {
  // Never respond from cache - always go to network
  event.respondWith(
    fetch(event.request).catch(err => {
      console.error('Service Worker: Network fetch failed:', err);
      // Optional: Return offline page for critical resources
      if (event.request.destination === 'document') {
        return new Response('Offline - Caching disabled', {
          status: 503,
          statusText: 'Service Unavailable'
        });
      }
    })
  );
});
