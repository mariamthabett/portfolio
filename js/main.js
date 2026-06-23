/* =================================================================
   Mariam Ahmed Thabet — Portfolio
   Interactions: scroll reveal, nav, scroll-spy, progress bar,
   stat counters, language bars, lightbox, contact form.
   Vanilla JS, no dependencies.
   ================================================================= */
(function () {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ---------- Footer year ---------- */
  const yearEl = $("#year");
  if (yearEl) {
    // Avoid Date in headless; this runs in the browser so it's fine.
    yearEl.textContent = new Date().getFullYear();
  }

  /* ---------- Navbar: scrolled state + scroll progress ---------- */
  const nav = $("#nav");
  const progress = $("#scrollProgress");

  function onScroll() {
    const y = window.scrollY || window.pageYOffset;
    if (nav) nav.classList.toggle("scrolled", y > 24);

    if (progress) {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const pct = max > 0 ? (y / max) * 100 : 0;
      progress.style.width = pct + "%";
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  const toggle = $("#navToggle");
  const links = $("#navLinks");
  if (toggle && links) {
    const closeMenu = () => {
      links.classList.remove("open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    };
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));
    });
    // close after clicking a link
    $$(".nav__link", links).forEach((a) => a.addEventListener("click", closeMenu));
    // close on Escape
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });
  }

  /* ---------- Reveal on scroll (Intersection Observer) ---------- */
  const revealEls = $$("[data-reveal]");
  if (prefersReduced || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("in"));
  } else {
    const revealObs = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const delay = parseInt(el.getAttribute("data-reveal-delay") || "0", 10);
        setTimeout(() => el.classList.add("in"), delay);
        obs.unobserve(el);
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach((el) => revealObs.observe(el));
  }

  /* ---------- Stat counters ---------- */
  const counters = $$(".stat__num");
  function animateCount(el) {
    const target = parseFloat(el.getAttribute("data-count")) || 0;
    const suffix = el.getAttribute("data-suffix") || "";
    if (prefersReduced) { el.textContent = target + suffix; return; }
    const duration = 1500;
    let startTime = null;
    function step(ts) {
      if (startTime === null) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(step);
  }
  if (counters.length) {
    if (!("IntersectionObserver" in window)) {
      counters.forEach(animateCount);
    } else {
      const countObs = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) { animateCount(entry.target); obs.unobserve(entry.target); }
        });
      }, { threshold: 0.6 });
      counters.forEach((el) => countObs.observe(el));
    }
  }

  /* ---------- Language bars (animate width when visible) ---------- */
  const langBars = $$(".lang__bar i");
  if (langBars.length) {
    // store target width then reset to 0 so the transition runs
    langBars.forEach((bar) => {
      bar.dataset.w = bar.style.width || "0%";
      bar.style.width = "0%";
    });
    if (prefersReduced || !("IntersectionObserver" in window)) {
      langBars.forEach((bar) => (bar.style.width = bar.dataset.w));
    } else {
      const barObs = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.width = entry.target.dataset.w;
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      langBars.forEach((bar) => barObs.observe(bar));
    }
  }

  /* ---------- Scroll-spy (active nav link) ---------- */
  const sections = $$("main section[id]");
  const navLinkMap = {};
  $$(".nav__link").forEach((a) => {
    const id = a.getAttribute("href");
    if (id && id.startsWith("#")) navLinkMap[id.slice(1)] = a;
  });
  if (sections.length && "IntersectionObserver" in window) {
    const spyObs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          Object.values(navLinkMap).forEach((a) => a.classList.remove("active"));
          if (navLinkMap[id]) navLinkMap[id].classList.add("active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    sections.forEach((s) => spyObs.observe(s));
  }

  /* ---------- Lightbox for project screenshots ---------- */
  const lightbox = $("#lightbox");
  const lightboxImg = $("#lightboxImg");
  const lightboxClose = $("#lightboxClose");
  function openLightbox(src, alt) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || "Enlarged screenshot";
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  $$("[data-lightbox]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const src = btn.getAttribute("data-lightbox");
      const img = $("img", btn);
      openLightbox(src, img ? img.alt : "");
    });
  });
  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (lightbox) lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLightbox(); });

  /* ---------- Contact form (mailto-based; static-site friendly) ---------- */
  const form = $("#contactForm");
  const note = $("#formNote");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = $("#cf-name").value.trim();
      const email = $("#cf-email").value.trim();
      const msg = $("#cf-msg").value.trim();

      if (!name || !email || !msg) {
        if (note) { note.textContent = "Please fill in all fields."; note.className = "contact__note err"; }
        return;
      }
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!emailOk) {
        if (note) { note.textContent = "Please enter a valid email address."; note.className = "contact__note err"; }
        return;
      }

      // Build a mailto so it works without a backend.
      // To collect submissions server-side, swap this for a Formspree POST.
      const subject = encodeURIComponent(`Portfolio message from ${name}`);
      const body = encodeURIComponent(`${msg}\n\n— ${name}\n${email}`);
      window.location.href = `mailto:mariamthabet2003@gmail.com?subject=${subject}&body=${body}`;

      if (note) { note.textContent = "Opening your email app…"; note.className = "contact__note ok"; }
      form.reset();
    });
  }
})();
