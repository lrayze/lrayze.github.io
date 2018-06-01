
//Registrar el service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
    .then(reg => console.log('Registro exitoso del service worker.', reg))
    .catch(err => console.warn('Error al tratar de registrar el service worker.', err))
}
