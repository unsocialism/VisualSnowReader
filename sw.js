/* Reflow service worker — makes the app work with no network at all,
   and receives .epub files shared from other Android apps. */
const VERSION = 'reflow-v1';
const SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const c = await caches.open(VERSION);
    // addAll fails the whole install if one file 404s, so add them individually
    await Promise.all(SHELL.map(u => c.add(new Request(u, { cache: 'reload' })).catch(() => {})));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== VERSION && k !== 'reflow-share').map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', e => {
  const req = e.request;
  const url = new URL(req.url);

  // ---- files shared into the app from elsewhere on the phone ----
  if (req.method === 'POST' && url.pathname.endsWith('/share-target')) {
    e.respondWith((async () => {
      try {
        const fd = await req.formData();
        const file = fd.get('book') || [...fd.values()].find(v => v && v.name);
        if (file) {
          const c = await caches.open('reflow-share');
          await c.put('shared-book', new Response(file, {
            headers: { 'x-filename': file.name || 'shared.epub' }
          }));
        }
      } catch (err) { /* fall through to the app either way */ }
      return Response.redirect('./?shared=1', 303);
    })());
    return;
  }

  if (req.method !== 'GET' || url.origin !== self.location.origin) return;

  // ---- navigations: serve the shell instantly, refresh it in the background ----
  if (req.mode === 'navigate') {
    e.respondWith((async () => {
      const cached = await caches.match('./index.html');
      const net = fetch(req).then(res => {
        if (res && res.ok) caches.open(VERSION).then(c => c.put('./index.html', res.clone()));
        return res;
      }).catch(() => null);
      return cached || (await net) || new Response(
        '<h1>Offline</h1><p>Reflow has not finished installing yet. Open it once with a connection.</p>',
        { headers: { 'Content-Type': 'text/html' } });
    })());
    return;
  }

  // ---- everything else: cache first, then network ----
  e.respondWith((async () => {
    const hit = await caches.match(req);
    if (hit) return hit;
    try {
      const res = await fetch(req);
      if (res && res.ok && res.type === 'basic') {
        const c = await caches.open(VERSION);
        c.put(req, res.clone());
      }
      return res;
    } catch (err) {
      return new Response('', { status: 504, statusText: 'Offline' });
    }
  })());
});
