// Envía al esqueleto las flechas del teclado y los gestos táctiles
// hechos dentro del tema. No hace falta tocarlo.
(function () {
  if (window.parent === window) return;
  function ir(dir) { window.parent.postMessage({ nav: dir }, '*'); }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') ir('prev');
    if (e.key === 'ArrowRight') ir('next');
  });

  var x0 = null, y0 = null;
  document.addEventListener('touchstart', function (e) {
    x0 = e.touches[0].clientX; y0 = e.touches[0].clientY;
  }, { passive: true });
  document.addEventListener('touchend', function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    var dy = e.changedTouches[0].clientY - y0;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) ir(dx < 0 ? 'next' : 'prev');
    x0 = null;
  }, { passive: true });
})();
