'use strict';
const C='werwolf-security-v8-iphone-amor';
const A=['./','./index.html','./styles.css','./hotfix.css','./app.js','./pwa.js','./newgame.js','./amorfix.js','./manifest.webmanifest','./app-icon-192.png','./app-icon-512.png','./app-icon-maskable.png','./apple-touch-icon.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(A)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request,{credentials:'same-origin',redirect:'error'}).then(x=>{if(x.ok){const y=x.clone();caches.open(C).then(c=>c.put(e.request,y))}return x}).catch(()=>e.request.mode==='navigate'?caches.match('./index.html'):Response.error())))});
