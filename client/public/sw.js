const SCOPE = self.registration.scope;
const INDEX_URL = new URL("index.html", SCOPE).href;
const CACHE_NAME = "rainha-das-capas-v5";
const STATIC_DESTINATIONS = new Set(["document", "script", "style", "image", "font", "audio", "video"]);

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.add(INDEX_URL)).catch(() => undefined));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin) return;
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone();
            void caches.open(CACHE_NAME).then((cache) => cache.put(request, copy)).catch(() => undefined);
          }
          return response;
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match(INDEX_URL).then((index) => index || Response.error()))),
    );
    return;
  }
  if (!STATIC_DESTINATIONS.has(request.destination)) return;
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        if (response.ok) void caches.open(CACHE_NAME).then((cache) => cache.put(request, response.clone()));
        return response;
      }).catch(() => Response.error());
    }),
  );
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") self.skipWaiting();
});
