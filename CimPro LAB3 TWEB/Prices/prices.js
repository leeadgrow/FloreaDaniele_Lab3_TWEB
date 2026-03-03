// Mobile menu toggle (same behavior as main)
(() => {
  const btn = document.querySelector(".nav__toggle");
  const menu = document.querySelector(".nav__list");
  if (!btn || !menu) return;

  const closeMenu = () => {
    menu.classList.remove("is-open");
    btn.setAttribute("aria-expanded", "false");
  };

  btn.addEventListener("click", () => {
    const open = menu.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  });

  // inchide meniul pe mob cand apesi in afara lui
  document.addEventListener("click", (e) => {
    if (!menu.classList.contains("is-open")) return;
    const clickedToggle = e.target.closest(".nav__toggle");
    const clickedMenu = e.target.closest(".nav__list");
    if (!clickedToggle && !clickedMenu) closeMenu();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
})();

// Newsletter (demo)
document.getElementById("newsletterForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = new FormData(e.target).get("email");
  console.log("Newsletter signup:", email);
  e.target.reset();
  alert("Mulțumim! Te-ai abonat cu succes.");
});
