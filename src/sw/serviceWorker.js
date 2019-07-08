importScripts('/workbox/workbox-sw.js')

workbox.setConfig({
  modulePathPrefix: '/workbox/'
})

const runtimeCacheName = 'cr-cache'
const offlineHTML = 'index.html'

workbox.core.clientsClaim()
workbox.core.setCacheNameDetails({
  prefix: '',
  suffix: '',
  precache: runtimeCacheName,
  runtime: runtimeCacheName
})

workbox.precaching.precache(self.__precacheManifest)

workbox.routing.registerRoute(
  ({ event }) => event.request.destination === 'document',
  async () => {
    const cache = await caches.open(runtimeCacheName)
    const requests = await cache.keys()
    let resp
    for (let i = 0; i < requests.length; i++) {
      if (requests[i].url.includes(offlineHTML)) {
        resp = await caches.match(requests[i].url)
        break
      }
    }
    return resp
  }
)

workbox.routing.registerRoute(
  /\.(js|css)$/,
  new workbox.strategies.CacheFirst({
    cacheName: runtimeCacheName
  })
)

workbox.routing.registerRoute(
  /fonts/,
  new workbox.strategies.CacheFirst({
    cacheName: runtimeCacheName
  })
)

workbox.routing.registerRoute(
  /\.(png|jpg|jpeg|webp)/,
  new workbox.strategies.CacheFirst({
    cacheName: 'image-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 7 * 24 * 60 * 60
      })
    ]
  })
)

self.addEventListener("message", event => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting()
  }
})