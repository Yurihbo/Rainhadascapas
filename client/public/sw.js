const SCOPE = self.registration?.scope || new URL(".", self.location).href;
const INDEX_URL = new URL("index.html", SCOPE).href;
const CACHE_NAME = "rainha-das-capas-v4";
const STATIC_DESTINATIONS = new Set(["image", "font", "audio", "video"]);

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
  if (request.method !== "GET" || new URL(request.url).origin !== self.location.origin) return;

  // HTML, JavaScript and CSS must always come from the network after deploy.
  // Hashed assets remain safe because Vite changes their URL on each build.
  if (request.mode === "navigate" || ["document", "script", "style"].includes(request.destination)) {
    event.respondWith(
      fetch(new Request(request, { cache: "no-store" }))
        .then((response) => response)
        .catch(() => caches.match(INDEX_URL).then((cached) => cached || Response.error())),
    );
    return;
  }

  if (!STATIC_DESTINATIONS.has(request.destination)) return;
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok) void caches.open(CACHE_NAME).then((cache) => cache.put(request, response.clone()));
        return response;
      })
      .catch(() => caches.match(request).then((cached) => cached || Response.error())),
  );
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") self.skipWaiting();
});
