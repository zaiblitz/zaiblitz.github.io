/* ============================================
   PARTICLE SYSTEM — Floating ambient particles
   ============================================ */
(function () {
  var canvas = document.getElementById('particles');
  var ctx = canvas.getContext('2d');
  var particles = [];
  var PARTICLE_COUNT = 60;
  var mouse = { x: -1000, y: -1000 };

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener('resize', resize);

  document.addEventListener('mousemove', function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  // Respect reduced motion preference
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    PARTICLE_COUNT = 10;
  }

  function Particle() {
    this.reset();
  }

  Particle.prototype.reset = function () {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;
    this.radius = Math.random() * 1.5 + 0.5;
    this.opacity = Math.random() * 0.5 + 0.1;
    this.life = Math.random() * 300 + 200;
    this.age = 0;
  };

  Particle.prototype.update = function () {
    this.x += this.vx;
    this.y += this.vy;
    this.age++;

    // Subtle attraction to mouse
    var dx = mouse.x - this.x;
    var dy = mouse.y - this.y;
    var dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 150 && dist > 0) {
      this.vx += (dx / dist) * 0.01;
      this.vy += (dy / dist) * 0.01;
    }

    // Damping
    this.vx *= 0.999;
    this.vy *= 0.999;

    // Fade in/out based on life
    var lifeRatio = this.age / this.life;
    if (lifeRatio < 0.1) {
      this.currentOpacity = this.opacity * (lifeRatio / 0.1);
    } else if (lifeRatio > 0.8) {
      this.currentOpacity = this.opacity * ((1 - lifeRatio) / 0.2);
    } else {
      this.currentOpacity = this.opacity;
    }

    if (this.age > this.life ||
        this.x < -50 || this.x > canvas.width + 50 ||
        this.y < -50 || this.y > canvas.height + 50) {
      this.reset();
    }
  };

  Particle.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 212, 255, ' + this.currentOpacity + ')';
    ctx.fill();
  };

  // Initialize particles
  for (var i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle());
  }

  // Draw connections between nearby particles
  function drawConnections() {
    for (var i = 0; i < particles.length; i++) {
      for (var j = i + 1; j < particles.length; j++) {
        var dx = particles[i].x - particles[j].x;
        var dy = particles[i].y - particles[j].y;
        var dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          var alpha = (1 - dist / 120) * 0.15;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = 'rgba(0, 212, 255, ' + alpha + ')';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(function (p) {
      p.update();
      p.draw();
    });

    drawConnections();
    requestAnimationFrame(animate);
  }

  animate();
})();
