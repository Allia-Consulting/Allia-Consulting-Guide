/* ==================================================================
   ALLIA CONSULTING — site script
   - Nav scrolled state (transparent → ivory blur after 24 px)
   - Hero slideshow (auto 6 s + dot/step navigation + caption sync)
   - Burger toggle (mobile)
   - Insight filters (visual only)
   ================================================================== */

(function () {
  // ── Nav scrolled state ────────────────────────────────────
  const nav = document.querySelector('.ac-nav');
  if (nav) {
    const setScrolled = () => {
      nav.classList.toggle('scrolled', window.scrollY > 24);
    };
    setScrolled();
    window.addEventListener('scroll', setScrolled, { passive: true });
  }

  // ── Burger (mobile) — basic toggle, expands an overlay ──
  const burger = document.querySelector('.burger');
  if (burger) {
    burger.addEventListener('click', () => {
      document.body.classList.toggle('menu-open');
    });
  }

  // ── Hero slideshow ───────────────────────────────────────
  const hero = document.querySelector('.hero-full[data-slideshow]');
  if (hero) {
    const slides = hero.querySelectorAll('.layer.photos .slide');
    const dots = hero.querySelectorAll('.foot .dot');
    const steps = hero.querySelectorAll('.side .step');
    const caption = hero.querySelector('.foot .caption');
    const counter = hero.querySelector('.foot .counter b');
    const markerNum = hero.querySelector('.marker .num');
    const markerLab = hero.querySelector('.marker .lab .lab-text');

    let states;
    try {
      states = JSON.parse(hero.dataset.states || '[]');
    } catch (e) { states = []; }
    let i = 0;
    let timer = null;
    const PERIOD = 7000;

    function goTo(n) {
      if (!slides.length) return;
      const prevI = i;
      i = (n + slides.length) % slides.length;
      slides.forEach((s, k) => {
        // .active = nouvelle slide (fade-in en z-index 2)
        // .prev   = ancienne slide (reste opaque en z-index 1, sans transition)
        // toutes les autres = opacity 0 derrière
        s.classList.remove('active', 'prev');
        if (k === i) s.classList.add('active');
        else if (k === prevI && prevI !== i) s.classList.add('prev');
      });
      dots.forEach((d, k) => d.classList.toggle('active', k === i));
      steps.forEach((s, k) => s.classList.toggle('active', k === i));
      const st = states[i];
      if (st) {
        if (caption) caption.innerHTML = st.cap || '';
        if (counter) counter.textContent = st.num || '';
        if (markerNum) markerNum.textContent = st.num || '';
        if (markerLab) markerLab.textContent = st.lab || '';
      }
    }
    function start() {
      stop();
      timer = setInterval(() => goTo(i + 1), PERIOD);
    }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    dots.forEach((d) => d.addEventListener('click', () => { goTo(parseInt(d.dataset.i, 10)); start(); }));
    steps.forEach((s) => s.addEventListener('click', () => { goTo(parseInt(s.dataset.i, 10)); start(); }));
    if (slides.length > 1) start();
  }

  // ── Insight filter (visual only — no real filtering since dataset is static) ──
  const filters = document.querySelectorAll('.tile-filter');
  filters.forEach((f) => {
    f.addEventListener('click', (e) => {
      e.preventDefault();
      filters.forEach((x) => x.classList.remove('active'));
      f.classList.add('active');
    });
  });
})();
