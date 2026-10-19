// Offline + install support. Network-first for this app's own files; the cache is used when offline.
const CACHE = 'sta2e-console-v6';
self.addEventListener('install', e => {
    e.waitUntil((async () => {
        const c = await caches.open(CACHE);
        const res = await fetch('index.html', { cache: 'reload' });
        const html = await res.clone().text();
        await c.put('index.html', res);
        const urls = new Set(['manifest.webmanifest', 'toolkit.html']);
        html.replace(/(?:src|href)="([^"#]+)"/g, (m, u) => { if (!/^[a-z]+:|^\/\/|^data:/i.test(u)) urls.add(u); return m; });
        const list = Array.from(urls);
        await Promise.all(list.map(u => c.add(new Request(u, { cache: 'reload' })).catch(() => {})));
        // also cache files referenced by url() inside local stylesheets (fonts)
        for (const u of list.filter(x => /\.css(\?|$)/i.test(x))) {
            const r = await c.match(u);
            if (!r) continue;
            const css = await r.text();
            const base = new URL(u, self.location.href);
            const found = [];
            css.replace(/url\(\s*['"]?([^'")]+)['"]?\s*\)/g, (m, f) => { if (!/^data:|^[a-z]+:|^\/\//i.test(f)) found.push(new URL(f, base).href); return m; });
            await Promise.all(found.map(f => c.add(new Request(f, { cache: 'reload' })).catch(() => {})));
        }
        await self.skipWaiting();
    })());
});
self.addEventListener('activate', e => {
    e.waitUntil((async () => {
        const keys = await caches.keys();
        await Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)));
        await self.clients.claim();
    })());
});
self.addEventListener('fetch', e => {
    const req = e.request;
    if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
    e.respondWith(
        fetch(req).then(res => {
            if (res.status === 200) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
            return res;
        }).catch(() => caches.match(req, { ignoreSearch: true }).then(r => r || (req.mode === 'navigate' ? caches.match('index.html') : null) || Response.error()))
    );
});
