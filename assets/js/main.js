(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;

  /* ---------- Preloader ---------- */
  window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    setTimeout(() => preloader && preloader.classList.add("hidden"), reduceMotion ? 0 : 1400);
  });

  /* ---------- Custom cursor ---------- */
  if (finePointer && !reduceMotion) {
    const dot = document.getElementById("cursorDot");
    const ring = document.getElementById("cursorRing");
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;

    document.addEventListener("mousemove", (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + "px"; dot.style.top = my + "px";
    });

    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.left = rx + "px"; ring.style.top = ry + "px";
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);

    document.querySelectorAll("a, button, input, textarea, select").forEach((el) => {
      el.addEventListener("mouseenter", () => ring.classList.add("hover"));
      el.addEventListener("mouseleave", () => ring.classList.remove("hover"));
    });
  } else {
    const dot = document.getElementById("cursorDot");
    const ring = document.getElementById("cursorRing");
    if (dot) dot.style.display = "none";
    if (ring) ring.style.display = "none";
  }

  /* ---------- Dark-scene body class (for cursor contrast) ---------- */
  const darkScenes = document.querySelectorAll(".on-dark, .hero");
  if ("IntersectionObserver" in window) {
    const darkIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            document.body.classList.add("on-dark");
          }
        });
        const anyVisible = Array.from(darkScenes).some((el) => {
          const r = el.getBoundingClientRect();
          return r.top < window.innerHeight * 0.5 && r.bottom > window.innerHeight * 0.5;
        });
        document.body.classList.toggle("on-dark", anyVisible);
      },
      { threshold: [0, 0.5, 1] }
    );
    darkScenes.forEach((el) => darkIO.observe(el));
  }

  /* ---------- Magnetic buttons ---------- */
  if (finePointer && !reduceMotion) {
    document.querySelectorAll(".magnetic").forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const r = btn.getBoundingClientRect();
        const relX = e.clientX - r.left - r.width / 2;
        const relY = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${relX * 0.22}px, ${relY * 0.32}px)`;
      });
      btn.addEventListener("mouseleave", () => { btn.style.transform = "translate(0,0)"; });
    });
  }

  /* ---------- Nav scroll state ---------- */
  const nav = document.getElementById("mainNav");
  const onScroll = () => {
    if (window.scrollY > 40) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  };
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  menuToggle.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("open");
    menuToggle.classList.toggle("active", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  });
  mobileMenu.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      menuToggle.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    })
  );

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in"));
  }

  /* ---------- Parallax layers ---------- */
  const parallaxEls = document.querySelectorAll(".parallax-layer");
  if (parallaxEls.length && !reduceMotion) {
    const updateParallax = () => {
      const scrollY = window.scrollY;
      parallaxEls.forEach((el) => {
        const speed = parseFloat(el.dataset.speed) || 0.1;
        el.style.transform = `translate3d(0, ${scrollY * speed}px, 0)`;
      });
      requestAnimationFrame(updateParallax);
    };
    requestAnimationFrame(updateParallax);
  }

  /* ---------- Odometer counters ---------- */
  const counters = document.querySelectorAll(".num[data-target]");
  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target, 10) || 0;
    const suffix = el.dataset.suffix || "";
    if (reduceMotion) { el.textContent = target + suffix; return; }
    const duration = 1500;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    };
    requestAnimationFrame(step);
  };
  if ("IntersectionObserver" in window) {
    const counterIO = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) { animateCounter(entry.target); counterIO.unobserve(entry.target); }
      }),
      { threshold: 0.4 }
    );
    counters.forEach((el) => counterIO.observe(el));
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll(".faq-item").forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    question.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach((openItem) => {
        if (openItem !== item) {
          openItem.classList.remove("open");
          openItem.querySelector(".faq-answer").style.maxHeight = null;
          openItem.querySelector(".faq-question").setAttribute("aria-expanded", "false");
        }
      });
      item.classList.toggle("open", !isOpen);
      question.setAttribute("aria-expanded", String(!isOpen));
      answer.style.maxHeight = !isOpen ? answer.scrollHeight + "px" : null;
    });
  });

  /* ---------- Contact form (demo only) ---------- */
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

  /* ---------- Smooth anchor scroll with fixed-nav offset ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const id = anchor.getAttribute("href");
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          const y = target.getBoundingClientRect().top + window.scrollY - 84;
          window.scrollTo({ top: y, behavior: reduceMotion ? "auto" : "smooth" });
        }
      }
    });
  });
})();
