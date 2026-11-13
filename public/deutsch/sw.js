// Service worker. The version placeholder below is replaced with a content hash after every build
// (astro.config.mjs), so each deploy installs a fresh worker with its own cache.
const VERSION = 'b88fe1c3f070';
const CACHE = 'dfj-' + VERSION;
const SCOPE = self.registration.scope; // ends with "/"
const KILL_URL = new URL('sw-kill.json', SCOPE).href;
const MANIFEST_URL = new URL('sw-manifest.json', SCOPE).href;
const NEVER_CACHE = new Set([KILL_URL, MANIFEST_URL, new URL('sw.js', SCOPE).href]);

let lastKillCheck = 0;

async function killRequested() {
  try {
    const res = await fetch(KILL_URL, { cache: 'no-store' });
    if (!res.ok) return false;
    const json = await res.json();
    return !!json && json.kill === true;
  } catch (e) {
    return false;
  }
}

async function selfDestruct() {
  const keys = await caches.keys();
  await Promise.all(keys.filter((k) => k.startsWith('dfj-')).map((k) => caches.delete(k)));
  await self.registration.unregister();
  const clients = await self.clients.matchAll({ type: 'window' });
  clients.forEach((c) => c.navigate(c.url).catch(() => {}));
}

async function maybeKill(force) {
  const now = Date.now();
  if (!force && now - lastKillCheck < 10 * 60 * 1000) return false;
  lastKillCheck = now;
  if (await killRequested()) {
    await selfDestruct();
    return true;
  }
  return false;
}

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    try {
      const res = await fetch(MANIFEST_URL, { cache: 'no-store' });
      const { files } = await res.json();
      await Promise.all(files.map(async (f) => {
        try {
          await cache.add(new Request(new URL(f, SCOPE).href, { cache: 'reload' }));
        } catch (e) { /* one missing file must not break the install */ }
      }));
    } catch (e) { /* no manifest (dev): runtime caching still works */ }
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k.startsWith('dfj-') && k !== CACHE).map((k) => caches.delete(k)));
    if (await maybeKill(true)) return;
    await self.clients.claim();
  })());
});

async function networkFirst(request) {
  const cache = await caches.open(CACHE);
  try {
    const res = await fetch(request);
    if (res.ok) cache.put(request, res.clone());
    return res;
  } catch (e) {
    const hit = await cache.match(request, { ignoreSearch: true });
    if (hit) return hit;
    const home = await cache.match(new URL('./', SCOPE).href);
    if (home) return home;
    throw e;
  }
}

async function cacheFirst(request) {
  const cache = await caches.open(CACHE);
  const hit = await cache.match(request);
  if (hit) return hit;
  const res = await fetch(request);
  if (res.ok) cache.put(request, res.clone());
  return res;
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin || !url.href.startsWith(SCOPE)) return;
  if (NEVER_CACHE.has(url.origin + url.pathname)) return;

  const isHtml = req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html');
  if (isHtml) {
    event.waitUntil(maybeKill(false));
    event.respondWith(networkFirst(req));
  } else {
    event.respondWith(cacheFirst(req));
  }
});
