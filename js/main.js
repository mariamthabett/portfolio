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

  /* ---------- Theme toggle (light / dark) ---------- */
  const themeBtn = $("#themeToggle");
  const themeMeta = $("#themeColorMeta");
  function currentTheme() {
    return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
  }
  function setThemeLabel(mode) {
    if (!themeBtn) return;
    const ar = window.__lang === "ar";
    themeBtn.setAttribute(
      "aria-label",
      mode === "light"
        ? (ar ? "التبديل إلى الوضع الداكن" : "Switch to dark mode")
        : (ar ? "التبديل إلى الوضع الفاتح" : "Switch to light mode")
    );
  }
  function applyTheme(mode) {
    document.documentElement.setAttribute("data-theme", mode);
    if (themeMeta) themeMeta.setAttribute("content", mode === "light" ? "#f6f2fb" : "#14101f");
    if (themeBtn) themeBtn.setAttribute("aria-pressed", String(mode === "light"));
    try { localStorage.setItem("theme", mode); } catch (e) { /* ignore */ }
    setThemeLabel(mode);
  }
  if (themeBtn) {
    setThemeLabel(currentTheme());
    themeBtn.setAttribute("aria-pressed", String(currentTheme() === "light"));
    themeBtn.addEventListener("click", () =>
      applyTheme(currentTheme() === "light" ? "dark" : "light"));
    // keep the aria-label localized when the language flips
    document.addEventListener("langchange", () => setThemeLabel(currentTheme()));
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

  /* ---------- Lightbox for project screenshots (gallery w/ prev-next) ---------- */
  const lightbox = $("#lightbox");
  const lightboxImg = $("#lightboxImg");
  const lightboxClose = $("#lightboxClose");
  const lightboxPrev = $("#lightboxPrev");
  const lightboxNext = $("#lightboxNext");

  let gallery = [];   // [{ src, alt }]
  let gIndex = 0;

  function renderLightbox() {
    const item = gallery[gIndex];
    if (!item || !lightboxImg) return;
    lightboxImg.src = item.src;
    lightboxImg.alt = item.alt || "Enlarged screenshot";
    const multi = gallery.length > 1;
    if (lightboxPrev) lightboxPrev.style.display = multi ? "" : "none";
    if (lightboxNext) lightboxNext.style.display = multi ? "" : "none";
  }
  function openGallery(btn) {
    if (!lightbox || !lightboxImg) return;
    const scope = btn.closest(".project__gallery") || document;
    const btns = $$("[data-lightbox]", scope);
    gallery = btns.map((b) => {
      const im = $("img", b);
      return { src: b.getAttribute("data-lightbox"), alt: im ? im.alt : "" };
    });
    gIndex = Math.max(0, btns.indexOf(btn));
    renderLightbox();
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
  function step(dir) {   // dir: -1 prev, +1 next
    if (!gallery.length) return;
    gIndex = (gIndex + dir + gallery.length) % gallery.length;
    renderLightbox();
  }
  $$("[data-lightbox]").forEach((btn) =>
    btn.addEventListener("click", () => openGallery(btn)));
  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener("click", () => step(-1));
  if (lightboxNext) lightboxNext.addEventListener("click", () => step(1));
  if (lightbox) lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener("keydown", (e) => {
    if (!lightbox || !lightbox.classList.contains("open")) return;
    if (e.key === "Escape") { closeLightbox(); return; }
    const rtl = document.documentElement.dir === "rtl";
    if (e.key === "ArrowRight") step(rtl ? -1 : 1);
    else if (e.key === "ArrowLeft") step(rtl ? 1 : -1);
  });

  /* ---------- Contact form (posts to /api/contact — Nodemailer) ---------- */
  const form = $("#contactForm");
  const note = $("#formNote");

  // Localized status messages (follows the active language from i18n.js).
  const MSG = {
    en: {
      fill: "Please fill in all fields.",
      email: "Please enter a valid email address.",
      sending: "Sending your message…",
      sendingBtn: "Sending…",
      ok: "Thanks! Your message has been sent. ✅",
      fail: "Something went wrong. Please try again.",
      net: "Network error — please try again, or email mariamthabet2003@gmail.com directly.",
    },
    ar: {
      fill: "يرجى ملء جميع الحقول.",
      email: "يرجى إدخال بريد إلكتروني صحيح.",
      sending: "جارٍ إرسال رسالتك…",
      sendingBtn: "جارٍ الإرسال…",
      ok: "شكرًا! تم إرسال رسالتك بنجاح. ✅",
      fail: "حدث خطأ ما. يُرجى المحاولة مرة أخرى.",
      net: "خطأ في الشبكة — حاول مجددًا أو راسل mariamthabet2003@gmail.com مباشرة.",
    },
  };
  const t = (key) => (MSG[window.__lang] || MSG.en)[key];

  function setNote(text, cls) {
    if (note) { note.textContent = text; note.className = "contact__note " + (cls || ""); }
  }

  if (form) {
    const submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = $("#cf-name").value.trim();
      const email = $("#cf-email").value.trim();
      const msg = $("#cf-msg").value.trim();

      if (!name || !email || !msg) { setNote(t("fill"), "err"); return; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setNote(t("email"), "err"); return; }

      const originalBtn = submitBtn ? submitBtn.innerHTML : "";
      if (submitBtn) { submitBtn.disabled = true; submitBtn.style.opacity = "0.7"; submitBtn.textContent = t("sendingBtn"); }
      setNote(t("sending"), "");

      try {
        const resp = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, message: msg }),
        });
        const data = await resp.json().catch(() => ({}));

        if (resp.ok && data.ok) {
          setNote(t("ok"), "ok");
          form.reset();
        } else {
          setNote(data && data.error ? data.error : t("fail"), "err");
        }
      } catch (err) {
        setNote(t("net"), "err");
      } finally {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.style.opacity = ""; submitBtn.innerHTML = originalBtn; }
      }
    });
  }
})();
