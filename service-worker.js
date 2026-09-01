// عند التعديل مستقبلاً، غير رقم الإصدار هنا (مثلاً من v1.0.0 إلى v1.0.1)
const CACHE_NAME = 'Dorra-libarary-cache-v1.1.0'; 

const assets = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// تثبيت الـ Service Worker وحفظ الملفات
self.addEventListener('install', e => {
  self.skipWaiting(); // إجبار النسخة الجديدة على التنشيط فوراً
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// تفعيل النسخة الجديدة وحذف الكاش القديم
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key)) // حذف أي كاش قديم
      );
    })
  );
});

// جلب البيانات
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});

