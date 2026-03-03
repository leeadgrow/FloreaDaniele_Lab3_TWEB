// =========================
// Mobile menu toggle (shared)
// =========================
(() => {
  const btn = document.querySelector(".nav__toggle");
  const menu = document.querySelector(".nav__list");
  if (!btn || !menu) return;

  btn.addEventListener("click", () => {
    const open = menu.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  });

  // Close on link click (mobile UX)
  menu.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a) return;
    if (menu.classList.contains("is-open")) {
      menu.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
    }
  });

  // Close on outside click
  document.addEventListener("click", (e) => {
    if (!menu.classList.contains("is-open")) return;
    const insideNav = e.target.closest(".nav__inner");
    if (!insideNav) {
      menu.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
    }
  });
})();

// =========================
// Newsletter (demo)
// =========================
document.getElementById("newsletterForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = new FormData(e.target).get("email");
  console.log("Newsletter signup:", email);
  e.target.reset();
  alert("Mulțumim! Te-ai abonat cu succes.");
});
