/* ============================================
   HUD — Clock, Interactivity, Marquee
   ============================================ */
(function () {
  // --- Live Clock ---
  var clockEl = document.getElementById('clock');

  function updateClock() {
    var now = new Date();
    var h = String(now.getHours()).padStart(2, '0');
    var m = String(now.getMinutes()).padStart(2, '0');
    var s = String(now.getSeconds()).padStart(2, '0');
    clockEl.textContent = h + ':' + m + ':' + s;
  }

  updateClock();
  setInterval(updateClock, 1000);

  // --- Duplicate marquee content for seamless loop ---
  var marqueeInner = document.querySelector('.marquee__inner');
  if (marqueeInner) {
    var children = Array.from(marqueeInner.children);
    children.forEach(function (child) {
      var clone = child.cloneNode(true);
      marqueeInner.appendChild(clone);
    });
  }

  // --- Click ripple effect on panels ---
  document.querySelectorAll('.panel, .project-card').forEach(function (el) {
    el.addEventListener('click', function (e) {
      var ripple = document.createElement('span');
      ripple.style.cssText =
        'position:absolute;border-radius:50%;background:rgba(0,212,255,0.3);' +
        'width:20px;height:20px;pointer-events:none;transform:scale(0);' +
        'animation:ripple-out 0.5s ease-out forwards;';

      var rect = el.getBoundingClientRect();
      ripple.style.left = (e.clientX - rect.left - 10) + 'px';
      ripple.style.top = (e.clientY - rect.top - 10) + 'px';

      el.style.position = el.style.position || 'relative';
      el.appendChild(ripple);

      ripple.addEventListener('animationend', function () {
        ripple.remove();
      });
    });
  });

  // Inject ripple keyframes
  var style = document.createElement('style');
  style.textContent = '@keyframes ripple-out{to{transform:scale(12);opacity:0;}}';
  document.head.appendChild(style);
})();
