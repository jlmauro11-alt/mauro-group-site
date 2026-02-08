(() => {
  // Active nav link
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(a => {
    const href = (a.getAttribute("href") || "").trim();
    if (href === path) a.classList.add("active");
  });

  // Scroll reveal targets
  const targets = [
    ...document.querySelectorAll(".kicker, .h1, .lead, .hr, .btn"),
    ...document.querySelectorAll(".card"),
    ...document.querySelectorAll(".footer, .footer *")
  ];

  // Mark hidden before observing (prevents flicker)
  targets.forEach(el => el.classList.add("reveal"));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-in");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach(el => io.observe(el));
})();
