const CACHE="attendance-v10-history-admin";
const ASSETS=["./","./index.html","./manifest.json"];
self.addEventListener("install",event=>{event.waitUntil(caches.open(CACHE).then(async cache=>{for(const url of ASSETS){try{await cache.add(url)}catch(e){}}}).then(()=>self.skipWaiting()))});
self.addEventListener("activate",event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",event=>{if(event.request.method!=="GET")return;event.respondWith(fetch(event.request).then(response=>{const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy)).catch(()=>{});return response}).catch(()=>caches.match(event.request).then(cached=>cached||caches.match("./index.html"))));
