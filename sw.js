/* Visual Snow Reader service worker — makes the app work with no network at all,
   and receives .epub files shared from other Android apps. */
const VERSION = 'vsr-v2';
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
    const keep = [VERSION, 'reflow-share', 'vsr-flags'];
    await Promise.all(keys.filter(k => !keep.includes(k)).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

/* Re-fetch the page in the background. If it really changed, tell any open
   window so the user hears about an update instead of silently getting the
   old copy on the next launch. */
async function refreshShell(req) {
  try {
    const res = await fetch(req, { cache: 'no-cache' });
    if (!res || !res.ok) return;
    const forCache = res.clone();
    const newText = await res.clone().text();
    const c = await caches.open(VERSION);
    const old = await c.match('./index.html');
    const oldText = old ? await old.text() : '';
    await c.put('./index.html', forCache);
    if (oldText && oldText !== newText) {
      // A flag outlives the race between this background fetch and the page's
      // scripts starting up; the page clears it once it has said something.
      const flags = await caches.open('vsr-flags');
      await flags.put('./pending-update', new Response('1'));
      const windows = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
      windows.forEach(w => w.postMessage({ type: 'updated' }));
    }
  } catch (err) { /* offline: keep what we have */ }
}

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
      if (cached) {
        e.waitUntil(refreshShell(req));
        return cached;
      }
      try {
        const res = await fetch(req);
        if (res && res.ok) (await caches.open(VERSION)).put('./index.html', res.clone());
        return res;
      } catch (err) {
        return new Response(
          '<h1>Offline</h1><p>Visual Snow Reader has not finished installing yet. Open it once with a connection.</p>',
          { headers: { 'Content-Type': 'text/html' } });
      }
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
