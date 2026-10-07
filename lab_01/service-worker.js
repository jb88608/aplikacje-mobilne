importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/7.4.1/workbox-sw.js'
);

const { precaching, routing, strategies } = workbox;

precaching.precacheAndRoute([
    { url: './', revision: '2' },
    { url: 'index.html', revision: '2' },
    { url: 'index.js', revision: '2' },
    { url: 'manifest.json', revision: '2' },
    { url: 'offline.html', revision: '2' },
    { url: 'android.png', revision: '2' },
    { url: 'icons/favicon-196.png', revision: '2' },
    { url: 'icons/apple-icon-180.png', revision: '2' },
    { url: 'icons/manifest-icon-192.maskable.png', revision: '2' },
    { url: 'icons/manifest-icon-512.maskable.png', revision: '2' }
]);

routing.registerRoute(
    ({ request }) => request.mode === 'navigate',
    new strategies.NetworkFirst({
        cacheName: 'strony',
        networkTimeoutSeconds: 3
    })
);

routing.registerRoute(
    ({ request }) => request.destination === 'image',
    new strategies.CacheFirst({
        cacheName: 'obrazy'
    })
);

routing.setCatchHandler(async ({ request }) => {
    if (request.mode === 'navigate') {
        return precaching.matchPrecache('offline.html');
    }

    return Response.error();
});