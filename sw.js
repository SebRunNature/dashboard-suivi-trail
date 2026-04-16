const CACHE = 'srn-dashboard-trail-v19';
const FILES = [
  '/dashboard-suivi-trail/',
  '/dashboard-suivi-trail/index.html',
  '/dashboard-suivi-trail/manifest.json'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(cache) {
      return cache.addAll(FILES);
    })
  );
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
