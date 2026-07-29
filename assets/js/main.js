(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;

  /* ---------- Preloader ---------- */
  window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    setTimeout(() => preloader && preloader.classList.add("hidden"), reduceMotion ? 0 : 1200);
  });

  /* ---------- Custom cursor ---------- */
  if (finePointer && !reduceMotion) {
    const dot = document.getElementById("cursorDot");
    const ring = document.getElementById("cursorRing");
    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
    document.addEventListener("mousemove", (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + "px"; dot.style.top = my + "px";
    });
    (function loop() {
      rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16;
      ring.style.left = rx + "px"; ring.style.top = ry + "px";
      requestAnimationFrame(loop);
    })();
    document.querySelectorAll("a, button, input, textarea").forEach((el) => {
      el.addEventListener("mouseenter", () => ring.classList.add("hover"));
      el.addEventListener("mouseleave", () => ring.classList.remove("hover"));
    });
  } else {
    const dot = document.getElementById("cursorDot"), ring = document.getElementById("cursorRing");
    if (dot) dot.style.display = "none"; if (ring) ring.style.display = "none";
  }

  /* ---------- Dark-scene body class ---------- */
  const darkScenes = document.querySelectorAll("#c01, #c03, #c06, #c07, #c08");
  const checkDark = () => {
    const mid = innerHeight * 0.5;
    const anyDark = Array.from(darkScenes).some((el) => {
      const r = el.getBoundingClientRect();
      return r.top < mid && r.bottom > mid;
    });
    document.body.classList.toggle("on-dark", anyDark);
  };
  document.addEventListener("scroll", checkDark, { passive: true });
  checkDark();

  /* ---------- Magnetic buttons ---------- */
  if (finePointer && !reduceMotion) {
    document.querySelectorAll(".magnetic").forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const r = btn.getBoundingClientRect();
        btn.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.2}px, ${(e.clientY - r.top - r.height / 2) * 0.3}px)`;
      });
      btn.addEventListener("mouseleave", () => { btn.style.transform = "translate(0,0)"; });
    });
  }

  /* ---------- Index overlay ---------- */
  const indexTrigger = document.getElementById("indexTrigger");
  const indexOverlay = document.getElementById("indexOverlay");
  indexTrigger.addEventListener("click", () => {
    const open = indexOverlay.classList.toggle("open");
    indexTrigger.classList.toggle("active", open);
    indexTrigger.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
  });
  indexOverlay.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => {
    indexOverlay.classList.remove("open"); indexTrigger.classList.remove("active");
    indexTrigger.setAttribute("aria-expanded", "false"); document.body.style.overflow = "";
  }));

  /* ---------- Generic scroll reveal ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("in"); io.unobserve(entry.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in"));
  }

  /* ---------- Chapter 01 — Arrival zoom-in on view ---------- */
  const arrival = document.querySelector(".ch-arrival");
  if (arrival && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => e.target.classList.toggle("in-view", e.isIntersecting));
    }, { threshold: 0.25 });
    io.observe(arrival);
    requestAnimationFrame(() => arrival.classList.add("in-view"));
  }

  /* ---------- Chapter 05 — Collection sticky image crossfade ---------- */
  (function collectionCrossfade() {
    const blocks = document.querySelectorAll(".coll-block");
    const imgA = document.getElementById("collImgA");
    const imgB = document.getElementById("collImgB");
    if (!blocks.length || !imgA || !imgB) return;
    if (!("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const which = entry.target.dataset.collImg;
          imgA.style.opacity = which === "A" ? 1 : 0;
          imgB.style.opacity = which === "B" ? 1 : 0;
        }
      });
    }, { threshold: 0.55 });
    blocks.forEach((b) => io.observe(b));
  })();

  /* ---------- Chapter 08 — chip select + form ---------- */
  const chipRow = document.getElementById("chipRow");
  if (chipRow) {
    chipRow.querySelectorAll(".chip").forEach((chip) => chip.addEventListener("click", () => {
      chipRow.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
    }));
  }
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const button = contactForm.querySelector("button[type=submit]");
      const original = button.textContent;
      button.textContent = "Request Sent — An Advisor Will Reach Out";
      button.disabled = true;
      setTimeout(() => { button.textContent = original; button.disabled = false; contactForm.reset(); }, 3200);
    });
  }

  /* ---------- Smooth anchor scroll ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY, behavior: reduceMotion ? "auto" : "smooth" });
        }
      }
    });
  });
})();
