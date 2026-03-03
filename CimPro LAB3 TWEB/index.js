// Mobile menu toggle
const btn = document.querySelector(".nav__toggle");
const menu = document.querySelector(".nav__list");

if (btn && menu) {
  btn.addEventListener("click", () => {
    const open = menu.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  });

  // inchide meniul pe mob cand apesi in afara lui
  document.addEventListener("click", (e) => {
    if (!menu.classList.contains("is-open")) return;

    const clickedToggle = e.target.closest(".nav__toggle");
    const clickedMenu = e.target.closest(".nav__list");
    if (!clickedToggle && !clickedMenu) {
      menu.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
    }
  });
}

// Hero slider (dots + autoplay)
(function () {
  const slides = Array.from(document.querySelectorAll(".hero__slide"));
  const dots = Array.from(document.querySelectorAll(".hero__dot"));
  if (!slides.length) return;

  let index = 0;
  let timer = null;
  const INTERVAL = 4500;

  function setActive(i) {
    index = (i + slides.length) % slides.length;
    slides.forEach((s, idx) => s.classList.toggle("is-active", idx === index));
    dots.forEach((d, idx) => d.classList.toggle("is-active", idx === index));
  }

  function next() {
    setActive(index + 1);
  }

  function start() {
    stop();
    timer = setInterval(next, INTERVAL);
  }

  function stop() {
    if (timer) clearInterval(timer);
    timer = null;
  }

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      setActive(i);
      start();
    });
  });

  const hero = document.getElementById("hero");
  hero?.addEventListener("mouseenter", stop);
  hero?.addEventListener("mouseleave", start);

  setActive(0);
  start();
})();

// video modal (Why section)
(function () {
  const modal = document.getElementById("videoModal");
  const frame = document.getElementById("videoFrame");
  if (!modal || !frame) return;

  function toYouTubeEmbed(url) {
    try {
      const u = new URL(url);

      if (u.hostname.includes("youtube.com")) {
        const id = u.searchParams.get("v");
        return id ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0` : null;
      }

      if (u.hostname.includes("youtu.be")) {
        const id = u.pathname.replace("/", "").trim();
        return id ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0` : null;
      }

      if (u.pathname.includes("/embed/")) {
        return url.includes("?")
          ? `${url}&autoplay=1&rel=0`
          : `${url}?autoplay=1&rel=0`;
      }

      return null;
    } catch {
      return null;
    }
  }

  function openVideo(url) {
    const embedUrl = toYouTubeEmbed(url);

    if (!embedUrl) {
      window.open(url, "_blank", "noopener");
      return;
    }

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    frame.src = embedUrl;
    document.body.style.overflow = "hidden";
  }

  function closeVideo() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    frame.src = ""; // opreste vidosul
    document.body.style.overflow = "";
  }

  document.addEventListener("click", (e) => {
    const playBtn = e.target.closest(".why__play[data-video]");
    if (playBtn) {
      openVideo(playBtn.dataset.video);
      return;
    }

    if (e.target.closest("[data-close]")) {
      closeVideo();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) {
      closeVideo();
    }
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
