// script.js — replace the entire file with this

(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------------------------------------
  // Footer year (safe on all pages)
  // ---------------------------------------
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------------------------------------
  // Scroll reveal (elements with .reveal)
  // ---------------------------------------
  const revealEls = Array.from(document.querySelectorAll(".reveal"));
  if (revealEls.length && !reduceMotion) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("reveal-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    // If reduced-motion OR none found, just show them
    revealEls.forEach((el) => el.classList.add("reveal-in"));
  }

  // ---------------------------------------
  // HERO PARALLAX (homepage)
  // Works if you have:
  //  - .hero
  //  - .hero-video (or a hero background element)
  //  - .hero-overlay
  //  - .hero-content
  // ---------------------------------------
  const hero = document.querySelector(".hero");
  if (!hero || reduceMotion) return;

  const heroVideo = hero.querySelector(".hero-video");
  const heroOverlay = hero.querySelector(".hero-overlay");
  const heroContent = hero.querySelector(".hero-content");

  // Helper to clamp values
  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

  let ticking = false;

  const apply = () => {
    ticking = false;

    const rect = hero.getBoundingClientRect();
    const vh = window.innerHeight || 1;

    // progress: 0 when hero top at top, 1 when hero has scrolled out
    const progress = clamp((-rect.top) / (rect.height || 1), 0, 1);

    // Subtle depth layers
    // Video moves slowest, overlay slightly, text slightly
    const videoY = progress * 22;      // px
    const overlayY = progress * 14;    // px
    const contentY = progress * -10;   // px (slight lift as you scroll)

    if (heroVideo) heroVideo.style.transform = `translate3d(0, ${videoY}px, 0) scale(1.03)`;
    if (heroOverlay) heroOverlay.style.transform = `translate3d(0, ${overlayY}px, 0)`;
    if (heroContent) heroContent.style.transform = `translate3d(0, ${contentY}px, 0)`;

    // Add a tiny fade as it scrolls off
    if (heroContent) heroContent.style.opacity = String(1 - progress * 0.25);
  };

  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(apply);
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });

  // Initial run
  apply();
})();
