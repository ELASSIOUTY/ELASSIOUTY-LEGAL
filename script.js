/* ELASSIOUTY LEGAL — interactions */
(function () {
  "use strict";

  var doc = document;

  /* ---- Footer year ---- */
  var yearEl = doc.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Header scroll state ---- */
  var header = doc.getElementById("siteHeader");
  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Theme toggle (persisted) ---- */
  var toggle = doc.getElementById("themeToggle");
  function setTheme(mode) {
    doc.documentElement.setAttribute("data-theme", mode);
    try { localStorage.setItem("el-theme", mode); } catch (e) {}
  }
  if (toggle) {
    toggle.addEventListener("click", function () {
      var current = doc.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
      setTheme(current === "dark" ? "light" : "dark");
    });
  }

  /* ---- Mobile menu ---- */
  var menuBtn = doc.getElementById("menuToggle");
  var mobileNav = doc.getElementById("mobileNav");
  function closeMenu() {
    if (!menuBtn || !mobileNav) return;
    mobileNav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.setAttribute("aria-label", "Open menu");
  }
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener("click", function () {
      var open = mobileNav.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    mobileNav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });
  }

  /* ---- Practice tabs ---- */
  var tabs = Array.prototype.slice.call(doc.querySelectorAll(".tab"));
  var cards = Array.prototype.slice.call(doc.querySelectorAll(".card"));
  function selectGroup(group) {
    tabs.forEach(function (t) {
      var active = t.getAttribute("data-group") === group;
      t.classList.toggle("is-active", active);
      t.setAttribute("aria-selected", active ? "true" : "false");
    });
    cards.forEach(function (c) {
      c.hidden = c.getAttribute("data-group") !== group;
    });
  }
  tabs.forEach(function (t) {
    t.addEventListener("click", function () {
      selectGroup(t.getAttribute("data-group"));
    });
  });

  /* ---- Reveal on scroll ---- */
  var revealEls = Array.prototype.slice.call(
    doc.querySelectorAll(".section-title, .section-lead, .counsel-card, .card, .principle, .enforcement-note, .faq, .engagement")
  );
  revealEls.forEach(function (el) { el.classList.add("reveal"); });
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- Forms (Formsubmit AJAX) — contact + careers ---- */
  var isAr = (doc.documentElement.getAttribute("lang") || "").indexOf("ar") === 0;
  var T = isAr
    ? {
        sending: "جارٍ الإرسال…",
        ok: "تم الاستلام. نردّ في يوم العمل نفسه.",
        err: "تعذّر الإرسال. يُرجى المحاولة بعد قليل."
      }
    : {
        sending: "Sending…",
        ok: "Received. We reply the same business day.",
        err: "Something went wrong sending that. Please try again in a moment."
      };
  // Destination address is base64-encoded so it is not sitting in plain text.
  var endpoint = "https://formsubmit.co/ajax/" + atob("TS5lbGFzdW90eUB5YWhvby5jb20=");

  Array.prototype.forEach.call(doc.querySelectorAll("form.ajax-form"), function (form) {
    var status = form.querySelector(".form-status");
    var submitBtn = form.querySelector('button[type="submit"]');
    var subject = form.getAttribute("data-subject") || "New enquiry — ELASSIOUTY LEGAL";

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var honey = form.querySelector('input[name="_honey"]');
      if (honey && honey.value) return; // bot

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      if (status) { status.className = "form-status"; status.textContent = ""; }
      var original = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = T.sending;

      var data = new FormData(form);
      data.append("_subject", subject);
      data.append("_template", "table");
      data.append("_captcha", "false");

      fetch(endpoint, { method: "POST", body: data, headers: { Accept: "application/json" } })
        .then(function (r) { return r.json(); })
        .then(function (res) {
          if (res && (res.success === true || res.success === "true")) {
            form.reset();
            if (status) { status.classList.add("ok"); status.textContent = T.ok; }
          } else {
            throw new Error((res && res.message) || "error");
          }
        })
        .catch(function () {
          if (status) { status.classList.add("err"); status.textContent = T.err; }
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = original;
        });
    });
  });
})();
