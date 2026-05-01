const CACHE = 'srn-dashboard-trail-v30';
const FILES = [
  '/dashboard-suivi-trail/',
  '/dashboard-suivi-trail/index.html',
  '/dashboard-suivi-trail/manifest.json',
  '/dashboard-suivi-trail/icon_dashboard.svg',
  '/dashboard-suivi-trail/icon-192.png',
  '/dashboard-suivi-trail/icon-512.png'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(cache) {
      return cache.addAll(FILES);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(key) { return key !== CACHE; })
            .map(function(key) { return caches.delete(key); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
