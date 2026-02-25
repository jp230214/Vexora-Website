/* ═══════════════════════════════════════════════════════════════
   VEXORA WEBSITE — SHARED JS
═══════════════════════════════════════════════════════════════ */

// ── STARFIELD ─────────────────────────────────────────────────
(function () {
  const canvas = document.getElementById('star-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, stars = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  function init() {
    stars = Array.from({ length: 130 }, () => ({
      x:  Math.random() * W,
      y:  Math.random() * H,
      r:  Math.random() * 1.1 + 0.2,
      a:  Math.random(),
      da: (Math.random() * 0.003 + 0.001) * (Math.random() < 0.5 ? 1 : -1),
      vx: (Math.random() - 0.5) * 0.035,
      vy: (Math.random() - 0.5) * 0.035,
    }));
  }
  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (const s of stars) {
      s.a += s.da;
      if (s.a > 1 || s.a < 0) s.da *= -1;
      s.x += s.vx; s.y += s.vy;
      if (s.x < 0) s.x = W; if (s.x > W) s.x = 0;
      if (s.y < 0) s.y = H; if (s.y > H) s.y = 0;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200,210,255,${s.a * 0.65})`;
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  window.addEventListener('resize', () => { resize(); init(); });
  resize(); init(); draw();
})();

// ── NAV SCROLL + ACTIVE ───────────────────────────────────────
(function () {
  const nav = document.querySelector('nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  });

  // Highlight active nav link based on current page
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link[data-page]').forEach(el => {
    if (el.dataset.page === page) el.classList.add('active');
  });
})();

// ── MOBILE MENU ───────────────────────────────────────────────
window.toggleMobile = function () {
  const menu = document.getElementById('mobile-menu');
  const burger = document.querySelector('.hamburger');
  if (!menu || !burger) return;
  menu.classList.toggle('open');
  burger.classList.toggle('open');
};

// ── SCROLL REVEAL ─────────────────────────────────────────────
(function () {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
})();
