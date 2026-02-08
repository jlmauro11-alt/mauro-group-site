/* =========================================================
   The Mauro Group — interactions
   - Parallax (hero)
   - Card glow follow
   - Scroll reveal
   ========================================================= */

(() => {
  const prefersReduced =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* -------------------------------
     HERO PARALLAX
     ------------------------------- */
  if (!prefersReduced) {
    let raf = null;

    const setParallaxVars = (clientX, clientY) => {
      // center = 0,0 — edges = +-1
      const cx = (clientX / window.innerWidth) * 2 - 1;
      const cy = (clientY / window.innerHeight) * 2 - 1;

      // px/py in pixels (keep subtle)
      const px = cx * 18;  // intensity
      const py = cy * 14;

      document.documentElement.style.setProperty("--px", `${px}px`);
      document.documentElement.style.setProperty("--py", `${py}px`);
    };

    window.addEventListener("pointermove", (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        setParallaxVars(e.clientX, e.clientY);
        raf = null;
      });
    }, { passive: true });
  }

  /* -------------------------------
     CARD GLOW FOLLOW (premium)
     ------------------------------- */
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.style.position = card.style.position || "relative";
    card.style.overflow = "hidden";

    // create glow layer
    const glow = document.createElement("div");
    glow.className = "card-glow";
    glow.style.position = "absolute";
    glow.style.inset = "0";
    glow.style.pointerEvents = "none";
    glow.style.opacity = "0";
    glow.style.transition = "opacity 180ms ease";
    glow.style.background =
      "radial-gradient(420px 260px at var(--gx, 50%) var(--gy, 50%), rgba(255,255,255,0.10), transparent 60%)";
    card.appendChild(glow);

    const move = (e) => {
      const r = card.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      const y = ((e.clientY - r.top) / r.height) * 100;
      glow.style.setProperty("--gx", `${x}%`);
      glow.style.setProperty("--gy", `${y}%`);
      glow.style.opacity = "1";
    };

    const leave = () => {
      glow.style.opacity = "0";
    };

    card.addEventListener("pointermove", move, { passive: true });
    card.addEventListener("pointerleave", leave, { passive: true });
  });

  /* -------------------------------
     SCROLL REVEAL
     ------------------------------- */
  const revealEls = document.querySelectorAll(".reveal");

  if (!revealEls.length) return;

  if (prefersReduced) {
    revealEls.forEach((el) => el.classList.add("reveal-in"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealEls.forEach((el) => io.observe(el));
})();
