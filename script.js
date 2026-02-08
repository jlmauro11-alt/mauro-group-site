/* =========================================================
   The Mauro Group — script.js
   - Footer year
   - Scroll reveal (with stagger)
   - Card cursor glow vars (--mx/--my) for CSS glow
   - Hero parallax vars (--px/--py) for CSS parallax
   ========================================================= */

/* -----------------------------
   Footer year
----------------------------- */
(function setYear(){
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();


/* -----------------------------
   Scroll reveal (staggered)
   Add class="reveal" to any element you want animated.
   Works best on cards/sections/blocks.
----------------------------- */
(function scrollReveal(){
  const prefersReduced =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const els = Array.from(document.querySelectorAll(".reveal"));
  if (!els.length) return;

  // Stagger: if a reveal element contains cards, stagger the cards.
  const applyStagger = (root) => {
    const cards = root.querySelectorAll(".card");
    if (!cards.length) return;
    cards.forEach((c, i) => {
      c.style.transitionDelay = `${Math.min(i * 80, 320)}ms`; // 0ms..320ms
    });
  };

  els.forEach(applyStagger);

  if (prefersReduced) {
    els.forEach(el => el.classList.add("reveal-in"));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("reveal-in");
      io.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  els.forEach(el => io.observe(el));
})();


/* -----------------------------
   Card cursor glow
   This powers your CSS:
   .card::before { ... at var(--mx) var(--my) ... }
----------------------------- */
(function cardGlow(){
  const cards = document.querySelectorAll(".card");
  if (!cards.length) return;

  cards.forEach(card => {
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      const y = ((e.clientY - r.top) / r.height) * 100;
      card.style.setProperty("--mx", `${x}%`);
      card.style.setProperty("--my", `${y}%`);
    }, { passive: true });
  });
})();


/* -----------------------------
   Hero parallax
   This sets CSS vars used in your styles.css:
   :root { --px: 0px; --py: 0px; }
----------------------------- */
(function heroParallax(){
  const prefersReduced =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const hero = document.querySelector(".hero");
  if (!hero || prefersReduced) return;

  let raf = null;
  let px = 0, py = 0;

  const onMove = (e) => {
    // Normalize movement around center of viewport
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    px = e.clientX - cx;
    py = e.clientY - cy;

    if (raf) return;
    raf = requestAnimationFrame(() => {
      document.documentElement.style.setProperty("--px", `${px}px`);
      document.documentElement.style.setProperty("--py", `${py}px`);
      raf = null;
    });
  };

  window.addEventListener("pointermove", onMove, { passive: true });
})();
