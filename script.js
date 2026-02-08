// Highlight active nav link based on current page
(() => {
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(a => {
    const href = (a.getAttribute("href") || "").trim();
    if (href === path) a.classList.add("active");
  });
})();
