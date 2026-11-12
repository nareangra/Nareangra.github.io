/* Service worker: cache para uso offline. Ao atualizar dados, aumente a versão. */
const CACHE = "indicadores-angra-v14";
const ARQUIVOS = [
  "./", "./index.html", "./styles.css", "./app.js", "./data.js", "./escolas.js", "./avalia_escolas.js", "./manifest.webmanifest", "./favicon.ico",
  "./icons/icon-192.png", "./icons/icon-512.png", "./icons/icon-maskable-192.png", "./icons/icon-maskable-512.png",
  "./icons/apple-touch-icon.png", "./icons/favicon-32.png", "./icons/logo-96.png"
];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ARQUIVOS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
/* Rede primeiro (dados sempre frescos quando online), cache quando offline. */
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  /* Cadernos em PDF ficam de fora do cache (são grandes e devem vir da rede). */
  if (new URL(e.request.url).pathname.toLowerCase().endsWith(".pdf")) return;
  e.respondWith(
    fetch(e.request).then((r) => {
      const copia = r.clone();
      caches.open(CACHE).then((c) => c.put(e.request, copia));
      return r;
    }).catch(() => caches.match(e.request).then((r) => r || caches.match("./index.html")))
  );
});
