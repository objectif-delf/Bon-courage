/* Service worker minimal : met en cache les fichiers de l'application pour
   qu'elle s'ouvre même sans connexion (sauf traduction en ligne et IA).
   Stratégie : réseau d'abord, cache en secours. Changez VERSION pour forcer
   la mise à jour du cache après un déploiement important. */
const VERSION = 'bon-courage-v1'

self.addEventListener('install', (e) => { self.skipWaiting() })

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', (e) => {
  const req = e.request
  if (req.method !== 'GET') return
  const url = new URL(req.url)
  if (url.origin !== self.location.origin) return // API externes : jamais en cache
  e.respondWith(
    fetch(req)
      .then((res) => {
        const copy = res.clone()
        caches.open(VERSION).then((c) => c.put(req, copy))
        return res
      })
      .catch(() => caches.match(req).then((r) => r || caches.match('./index.html')))
  )
})
