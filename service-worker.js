self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('memory-game-store').then((cache) => cache.addAll([
      '/',
      '/index.html',
      '/leaderboard.html',
      '/settings.html',
      '/style.css',
      '/app.js',
      '/navigation.js',
      '/img/icon.png',
      '/manifest.json'
    ])),
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(fetch(e.request));
});


if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/service-worker.js')
    .then(() => { console.log('Service Worker Registered'); });
}
