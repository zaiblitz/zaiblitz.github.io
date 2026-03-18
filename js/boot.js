/* ============================================
   BOOT SEQUENCE — Simulated system init
   ============================================ */
(function () {
  const overlay = document.getElementById('boot-overlay');
  const log = document.getElementById('boot-log');
  const hud = document.getElementById('hud');

  const lines = [
    '> INITIALIZING SYSTEM...',
    '> LOADING CORE MODULES.......... OK',
    '> SCANNING NETWORK INTERFACES... OK',
    '> ESTABLISHING SECURE CONNECTION...',
    '> ENCRYPTION: AES-256-GCM // STATUS: ACTIVE',
    '> LOADING PROJECT DATABASE...... OK',
    '> CALIBRATING DISPLAY HUD...... OK',
    '> ALL SYSTEMS NOMINAL.',
    '',
    '> WELCOME, MERWIN.',
  ];

  let index = 0;

  function typeLine() {
    if (index >= lines.length) {
      setTimeout(endBoot, 600);
      return;
    }

    const line = document.createElement('div');
    line.className = 'boot-line';
    line.textContent = lines[index];

    if (lines[index].includes('WELCOME')) {
      line.style.color = '#00ff88';
      line.style.fontWeight = 'bold';
      line.style.marginTop = '0.5rem';
    }

    log.appendChild(line);
    index++;

    const delay = lines[index - 1] === '' ? 200 : 180 + Math.random() * 120;
    setTimeout(typeLine, delay);
  }

  function endBoot() {
    overlay.classList.add('fade-out');
    hud.classList.remove('hidden');

    // Trigger skill bar animations after HUD is visible
    setTimeout(() => {
      document.querySelectorAll('.skill-bar__fill').forEach(function (bar) {
        bar.classList.add('animate');
      });
      animateCounters();
    }, 400);

    // Remove overlay from DOM after transition
    overlay.addEventListener('transitionend', function () {
      overlay.remove();
    });
  }

  function animateCounters() {
    document.querySelectorAll('.stat-box__value').forEach(function (el) {
      var target = parseInt(el.getAttribute('data-target'), 10);
      var current = 0;
      var step = Math.max(1, Math.floor(target / 40));
      var interval = setInterval(function () {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(interval);
        }
        el.textContent = current.toLocaleString();
      }, 30);
    });
  }

  // Start after a tiny delay so the page renders first
  setTimeout(typeLine, 300);
})();
