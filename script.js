/* ===== MATRIX RAIN ===== */
(function () {
  const canvas = document.getElementById('matrix-canvas');
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*(){}[]<>/?=+-_;:,.~`!|\\\'\"';
  const fontSize = 14;
  const columns = Math.floor(canvas.width / fontSize);
  const drops = Array.from({ length: columns }, () => Math.random() * -100);

  function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00ff88';
    ctx.font = `${fontSize}px JetBrains Mono, monospace`;

    for (let i = 0; i < drops.length; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      const x = i * fontSize;
      const y = drops[i] * fontSize;

      // Vary brightness
      const brightness = Math.random();
      if (brightness > 0.95) {
        ctx.fillStyle = '#ffffff';
      } else if (brightness > 0.7) {
        ctx.fillStyle = '#00ff88';
      } else {
        ctx.fillStyle = '#005533';
      }

      ctx.fillText(char, x, y);

      if (y > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  const matrixInterval = setInterval(drawMatrix, 40);

  /* ===== POSITION ERROR MESSAGES ===== */
  const errors = document.querySelectorAll('.error-msg');
  errors.forEach((el, i) => {
    el.style.left = `${Math.random() * 70 + 5}%`;
    el.style.top = `${Math.random() * 70 + 10}%`;
    el.style.animationDelay = `${i * 0.4}s`;
    el.style.animationDuration = `${3 + Math.random() * 2}s`;
  });

  /* ===== TRANSITION: GLITCH -> MAIN SITE ===== */
  const GLITCH_DURATION = 4000; // 4 seconds of glitch

  setTimeout(() => {
    const overlay = document.getElementById('glitch-overlay');
    const mainSite = document.getElementById('main-site');

    overlay.classList.add('fade-out');
    mainSite.classList.remove('hidden');

    setTimeout(() => {
      clearInterval(matrixInterval);
      overlay.style.display = 'none';
    }, 800);
  }, GLITCH_DURATION);

  /* ===== SCROLL FADE-IN ===== */
  const fadeTargets = document.querySelectorAll(
    '.pain-card, .step, .case-card, .price-card, .about-text, .contact-block, .hero-badge, .hero-stats .stat'
  );
  fadeTargets.forEach(el => el.classList.add('fade-in'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  // Start observing after glitch ends
  setTimeout(() => {
    fadeTargets.forEach(el => observer.observe(el));
    // Immediately show hero elements
    document.querySelectorAll('#hero .fade-in').forEach(el => el.classList.add('visible'));
  }, GLITCH_DURATION + 200);

  /* ===== MOBILE MENU ===== */
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  /* ===== SMOOTH SCROLL FOR NAV ===== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();
