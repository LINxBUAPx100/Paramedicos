// Service worker de PTEM Pulso: abre la aplicación sin conexión para estudiar
// los módulos descargados. Solo lo registra quien descarga un módulo
// (src/lib/descargas.js).
//
// Estrategia, pensada para no servir nunca una versión vieja con red:
//  · navegación (index.html): RED primero; la caché solo sin conexión;
//  · /assets/ (archivos con hash, inmutables): caché primero;
//  · imágenes y fuentes propias: caché con actualización en segundo plano;
//  · todo lo de otros orígenes (Firebase, Google): no se toca.
const CACHE = 'ptem-app-v1'
const MAX_ENTRADAS = 250

self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k !== CACHE) await caches.delete(k)
    await self.clients.claim()
  })())
})

self.addEventListener('message', (e) => {
  if (e.data?.tipo !== 'precargar') return
  const urls = (e.data.urls || []).filter((u) => new URL(u).origin === self.location.origin)
  e.waitUntil(caches.open(CACHE).then((c) => Promise.all(urls.map((u) => c.add(u).catch(() => {})))).then(recortar))
})

async function recortar() {
  const c = await caches.open(CACHE)
  const claves = await c.keys()
  for (const k of claves.slice(0, Math.max(0, claves.length - MAX_ENTRADAS))) await c.delete(k)
}

self.addEventListener('fetch', (e) => {
  const req = e.request
  if (req.method !== 'GET') return
  const url = new URL(req.url)
  if (url.origin !== self.location.origin) return

  if (req.mode === 'navigate') {
    e.respondWith((async () => {
      try {
        const red = await fetch(req)
        const c = await caches.open(CACHE)
        c.put(req, red.clone())
        return red
      } catch {
        const c = await caches.open(CACHE)
        return (await c.match(req, { ignoreSearch: true })) || (await c.match(self.registration.scope)) || Response.error()
      }
    })())
    return
  }

  if (url.pathname.includes('/assets/')) {
    e.respondWith((async () => {
      const c = await caches.open(CACHE)
      const guardada = await c.match(req)
      if (guardada) return guardada
      const red = await fetch(req)
      if (red.ok) c.put(req, red.clone())
      return red
    })())
    return
  }

  if (/\.(avif|webp|png|jpe?g|svg|woff2?)$/i.test(url.pathname)) {
    e.respondWith((async () => {
      const c = await caches.open(CACHE)
      const guardada = await c.match(req)
      const red = fetch(req).then((r) => { if (r.ok) c.put(req, r.clone()); return r }).catch(() => guardada)
      return guardada || red
    })())
  }
})
