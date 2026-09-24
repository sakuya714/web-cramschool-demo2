/* ============================================================
   明進学院 - Demo Site 2 / main.js
   - スクロール fade-in
   - ハンバーガーメニュー
   - 数字カウントアップ
   ============================================================ */

/* ---------- 1. Fade-in on scroll ---------- */
(function initFadeIn() {
  const targets = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  targets.forEach((el) => observer.observe(el));
})();

/* ---------- 2. Header shadow on scroll ---------- */
(function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
})();

/* ---------- 3. Hamburger menu ---------- */
(function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
})();

/* ---------- 4. Number count-up ---------- */
(function initCountUp() {
  const numEls = document.querySelectorAll('[data-target]');
  if (!numEls.length) return;

  const easeOut = (t) => 1 - Math.pow(1 - t, 3);

  function animateCount(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1600; // ms
    const startTime = performance.now();

    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.round(easeOut(progress) * target);
      el.textContent = value.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  numEls.forEach((el) => observer.observe(el));
})();
