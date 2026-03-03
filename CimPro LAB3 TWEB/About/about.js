// =========================
// Mobile menu toggle
// =========================
(() => {
  const btn = document.querySelector(".nav__toggle");
  const menu = document.querySelector(".nav__list");
  if (!btn || !menu) return;

  btn.addEventListener("click", () => {
    const open = menu.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  });

  // Close menu when clicking a link (mobile)
  menu.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (!link) return;
    if (window.matchMedia("(max-width: 760px)").matches) {
      menu.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
    }
  });
})();

// =========================
// Accordion (FAQ)
// =========================
(() => {
  const accRoot = document.querySelector("[data-accordion]");
  if (!accRoot) return;

  const items = Array.from(accRoot.querySelectorAll(".acc"));

  const setAria = (item, expanded) => {
    const head = item.querySelector(".acc__head");
    if (head) head.setAttribute("aria-expanded", expanded ? "true" : "false");
  };

  const closeAll = (except = null) => {
    items.forEach((it) => {
      if (it === except) return;
      it.classList.remove("is-open");
      setAria(it, false);
    });
  };

  // Sync aria with initial state
  items.forEach((it) => setAria(it, it.classList.contains("is-open")));

  accRoot.addEventListener("click", (e) => {
    const head = e.target.closest(".acc__head");
    if (!head) return;

    const item = head.closest(".acc");
    const isOpen = item.classList.contains("is-open");

    if (isOpen) {
      item.classList.remove("is-open");
      setAria(item, false);
      return;
    }

    closeAll(item);
    item.classList.add("is-open");
    setAria(item, true);
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
