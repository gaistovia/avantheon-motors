(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;

  /* ---------- Preloader ---------- */
  window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    setTimeout(() => preloader && preloader.classList.add("hidden"), reduceMotion ? 0 : 1300);
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
  const darkScenes = document.querySelectorAll("#s02, #s03, #s06, #s07, #s09");
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

  /* ================= SCENE 01 — SILENCE: word-by-word kinetic reveal ================= */
  (function silenceScene() {
    const lineEl = document.getElementById("silenceLine");
    const cursorEl = document.getElementById("silenceCursor");
    const hintEl = document.getElementById("silenceHint");
    const timeEl = document.getElementById("silenceTime");
    if (!lineEl) return;

    const text = lineEl.firstChild ? lineEl.childNodes[0].textContent : lineEl.textContent;
    const words = text.trim().split(" ");
    lineEl.innerHTML = "";
    words.forEach((w) => {
      const span = document.createElement("span");
      span.textContent = w + "\u00A0";
      lineEl.appendChild(span);
    });
    lineEl.appendChild(cursorEl);

    // fade in timestamp counter
    let elapsed = 0;
    timeEl.style.transition = "opacity 1s ease";
    requestAnimationFrame(() => { timeEl.style.opacity = 1; });
    const timeInterval = reduceMotion ? null : setInterval(() => {
      elapsed += 0.1;
      const s = elapsed.toFixed(1).padStart(4, "0");
      timeEl.textContent = `T — 00:00:${s}`;
      if (elapsed >= 3.6) clearInterval(timeInterval);
    }, 100);
    timeEl.textContent = "T — 00:00:0.0";

    const spans = lineEl.querySelectorAll("span:not(.silence-cursor)");
    spans.forEach((span, i) => {
      if (reduceMotion) { span.style.opacity = 1; span.style.filter = "none"; return; }
      span.style.transition = `opacity 0.8s ease ${i * 0.16 + 0.3}s, transform 0.8s ease ${i * 0.16 + 0.3}s, filter 0.8s ease ${i * 0.16 + 0.3}s`;
      requestAnimationFrame(() => {
        span.style.opacity = 1; span.style.transform = "translateY(0)"; span.style.filter = "blur(0)";
      });
    });
    cursorEl.style.transition = "opacity .4s ease";
    setTimeout(() => { cursorEl.style.opacity = 1; }, spans.length * 160 + 400);
    setTimeout(() => { hintEl.classList.add("show"); }, spans.length * 160 + 1400);
  })();

  /* ================= SCENE 02 — huge cinematic image reveal ================= */
  const s2 = document.getElementById("s02");
  if (s2 && "IntersectionObserver" in window) {
    const s2io = new IntersectionObserver((entries) => {
      entries.forEach((e) => e.target.classList.toggle("in-view", e.isIntersecting));
    }, { threshold: 0.3 });
    s2io.observe(s2);
  }

  /* ================= SCENE 03 — ENGINE SOUND VISUALIZATION ================= */
  (function engineScene() {
    const startBtn = document.getElementById("engineStart");
    const icon = document.getElementById("engineIcon");
    const note = document.getElementById("engineNote");
    const rpmEl = document.getElementById("rpmReadout");
    const gearEl = document.getElementById("gearReadout");
    const eqWrap = document.getElementById("eqBars");
    if (!startBtn) return;

    const BAR_COUNT = 28;
    const bars = [];
    for (let i = 0; i < BAR_COUNT; i++) {
      const b = document.createElement("span");
      eqWrap.appendChild(b); bars.push(b);
    }

    let ctx, analyser, dataArray, gainNode, oscillators = [], running = false, rafId = null;
    let rpm = 0, rpmTarget = 0;

    function buildGraph() {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      gainNode = ctx.createGain();
      gainNode.gain.value = 0;
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 800;

      const freqs = [55, 110, 82.5];
      oscillators = freqs.map((f, i) => {
        const osc = ctx.createOscillator();
        osc.type = i === 0 ? "sawtooth" : "square";
        osc.frequency.value = f;
        osc.connect(filter);
        return osc;
      });

      analyser = ctx.createAnalyser();
      analyser.fftSize = 64;
      dataArray = new Uint8Array(analyser.frequencyBinCount);

      filter.connect(gainNode);
      gainNode.connect(analyser);
      analyser.connect(ctx.destination);

      oscillators.forEach((o) => o.start());
    }

    function rampEngine(toIdle) {
      const now = ctx.currentTime;
      const base = toIdle ? 1 : 3.2;
      oscillators.forEach((osc, i) => {
        const target = [55, 110, 82.5][i] * base;
        osc.frequency.cancelScheduledValues(now);
        osc.frequency.setValueAtTime(osc.frequency.value, now);
        osc.frequency.linearRampToValueAtTime(target, now + 1.1);
      });
    }

    function visualLoop() {
      if (running && analyser) {
        analyser.getByteFrequencyData(dataArray);
        for (let i = 0; i < BAR_COUNT; i++) {
          const v = dataArray[i % dataArray.length] / 255;
          bars[i].style.height = Math.max(6, v * 100) + "%";
        }
        rpmTarget = 900 + Math.min(1, (dataArray[2] / 255)) * 5800 + Math.sin(Date.now() / 140) * 120;
      } else {
        rpmTarget = 0;
        for (let i = 0; i < BAR_COUNT; i++) bars[i].style.height = "4%";
      }
      rpm += (rpmTarget - rpm) * 0.12;
      rpmEl.textContent = Math.max(0, Math.round(rpm)).toLocaleString();
      rafId = requestAnimationFrame(visualLoop);
    }
    visualLoop();

    startBtn.addEventListener("click", () => {
      try {
        if (!ctx) buildGraph();
        if (ctx.state === "suspended") ctx.resume();

        running = !running;
        startBtn.classList.toggle("active", running);
        startBtn.setAttribute("aria-pressed", String(running));
        gearEl.textContent = running ? "GEAR — D" : "GEAR — N";
        note.textContent = running ? "Engine Running — Tap to Stop" : "Start Engine — Sound On";
        icon.innerHTML = running
          ? '<rect x="6" y="6" width="4" height="12"/><rect x="14" y="6" width="4" height="12"/>'
          : '<path d="M8 5v14l11-7z"/>';

        const now = ctx.currentTime;
        gainNode.gain.cancelScheduledValues(now);
        gainNode.gain.setValueAtTime(gainNode.gain.value, now);
        gainNode.gain.linearRampToValueAtTime(running ? 0.18 : 0, now + (running ? 0.9 : 0.6));
        rampEngine(!running);
      } catch (err) {
        note.textContent = "Audio unavailable in this browser.";
      }
    });
  })();

  /* ================= SCENE 04 — horizontal scroll rail ================= */
  (function collectionRail() {
    const section = document.getElementById("s04");
    const rail = document.getElementById("s4Rail");
    const progressFill = document.getElementById("s4ProgressFill");
    if (!section || !rail) return;

    function update() {
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - innerHeight;
      const scrolled = -rect.top;
      const progress = Math.min(1, Math.max(0, scrolled / total));
      const maxTranslate = Math.max(0, rail.scrollWidth - innerWidth + 40);
      rail.style.transform = `translateX(-${progress * maxTranslate}px)`;
      progressFill.style.width = (progress * 100) + "%";
      requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  })();

  /* ================= SCENE 06 — interior hotspots ================= */
  (function interiorScene() {
    const hotspots = document.querySelectorAll(".hotspot");
    const numEl = document.getElementById("interiorNum");
    const titleEl = document.getElementById("interiorTitle");
    const descEl = document.getElementById("interiorDesc");
    if (!hotspots.length) return;

    const details = [
      { title: "Hand-Stitched Wheel", desc: "Nappa leather wrapped over a carbon core, stitched by a single artisan per vehicle — no two wheels are stitched by the same hand." },
      { title: "12.8&Prime; Command Display", desc: "A single pane of curved glass replaces twelve switches. Every surface you touch was tuned for haptic feedback, not just looks." },
      { title: "Aerated Leather Seating", desc: "Cooled, heated and massaging — engineered to disappear after the first ten minutes so you forget it's there." },
      { title: "Ambient Fiber-Optic Trim", desc: "1.6 million points of light woven through the cabin, tunable to 64,000 colors, dimmed automatically at night." }
    ];

    hotspots.forEach((h) => h.addEventListener("click", () => {
      hotspots.forEach((x) => x.classList.remove("active"));
      h.classList.add("active");
      const idx = parseInt(h.dataset.detail, 10);
      numEl.textContent = String(idx + 1).padStart(2, "0");
      titleEl.textContent = details[idx].title;
      descEl.innerHTML = details[idx].desc;
    }));
  })();

  /* ================= SCENE 09 — chip select + form ================= */
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
