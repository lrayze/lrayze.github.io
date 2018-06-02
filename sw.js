//Asignar un nombre y versión al cache
const CACHE_NAME = 'cache_website',
  urlsToCache = [
    './',
    './css/font-awesome/css/font-awesome.min.css',
    './css/styles.css',
    './css/w3.css',
    './script.js',
    './img/img_band_la.jpg',
    './img/img_band_ny.jpg',
    './img/img_band_chicago.jpg',
    './img/bandmember-2.jpg',
    './img/bandmember-1.jpg',
    './img/bandmember-3.jpg',
    './img/favicon.png'
  ]

//Durante la fase de instalación generalmente se almacena en caché los activos estáticos
self.addEventListener('install', e => {
	e.waitUntil(
		caches.open(CACHE_NAME)
			.then(cache => {
				return cache.addAll(urlsToCache)
					.then(() => self.skipWaiting())
			})
			.catch(err => console.log('Falló registro de caché.', err))
	)
})

//Una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión
self.addEventListener('activate', e => {
  const cacheWhitelist = [CACHE_NAME]

  e.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            //Eliminamos lo que ya no se necesita en cache
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName)
            }
          })
        )
      })
      // Le indica al SW activar el cache actual
      .then(() => self.clients.claim())
  )
})

//Cuando el navegador vuelve a estar en línea (recuperauna url)
self.addEventListener('fetch', e => {
	//Responder ya sea con el objeto en caché o continuar y buscar la url real
	e.respondWith(
		caches.match(e.request)
			.then(res => {
				if (res){
					//recuperar del cache
					return res
				}
				//recuperar de la petición a la url
				return fetch(e.request)
			})
	)
})
