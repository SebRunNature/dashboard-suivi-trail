const CACHE = 'srn-dashboard-trail-v48';
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
  // On ne gère que les GET (les POST vers l'API Anthropic passent directement)
  if (e.request.method !== 'GET') return;

  // HTML / navigation : NETWORK-FIRST
  // → les mises à jour de l'app arrivent immédiatement, sans bump de version,
  //   et le cache sert de filet de sécurité hors ligne.
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request)
        .then(function(response) {
          const copy = response.clone();
          caches.open(CACHE).then(function(cache) { cache.put(e.request, copy); });
          return response;
        })
        .catch(function() {
          return caches.match(e.request).then(function(cached) {
            return cached || caches.match('/dashboard-suivi-trail/index.html');
          });
        })
    );
    return;
  }

  // Assets (icônes, manifest, polices...) : CACHE-FIRST avec mise en cache au vol
  e.respondWith(
    caches.match(e.request).then(function(cached) {
      if (cached) return cached;
      return fetch(e.request).then(function(response) {
        // Mettre en cache les réponses valides du même domaine + Google Fonts
        // (pour que les polices fonctionnent hors ligne)
        const url = e.request.url;
        const cacheable = response.ok && (
          url.startsWith(self.location.origin) ||
          url.includes('fonts.googleapis.com') ||
          url.includes('fonts.gstatic.com')
        );
        if (cacheable) {
          const copy = response.clone();
          caches.open(CACHE).then(function(cache) { cache.put(e.request, copy); });
        }
        return response;
      }).catch(function() {
        return cached; // undefined si vraiment rien — le navigateur affichera son erreur
      });
    })
  );
});

/* ── Mise à jour immédiate demandée par la page (bannière "Nouvelle version") ── */
self.addEventListener('message', function(e) {
  if (e.data && e.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
