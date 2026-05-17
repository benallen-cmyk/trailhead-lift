const CACHE = 'trailhead-lift-v9';
const ASSETS = ['/trailhead-lift/','/trailhead-lift/index.html','/trailhead-lift/manifest.json','/trailhead-lift/icon-192.png','/trailhead-lift/icon-512.png'];
self.addEventListener('install', e => { self.skipWaiting(); e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS))); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => { e.respondWith(caches.match(e.request).then(cached => { return cached || fetch(e.request).then(res => { if (res && res.status === 200) { const clone = res.clone(); caches.open(CACHE).then(c => c.put(e.request, clone)); } return res; }).catch(() => caches.match('/trailhead-lift/index.html')); })); });
