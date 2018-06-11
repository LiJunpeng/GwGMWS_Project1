let cacheName = 'restaurant_review_cache';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll([
        'css/index.css',
        'css/restaurant.css'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  console.log("fetch");
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        return response;
      } else {
    	fetch(event.request).then(function(response) {
	      caches.open(cacheName).then(function(cache) {
	        cache.put(event.request, response.clone());
	      }).then(function() {
	        return response;
	      }); 
    	});
      }
    })
  );
});