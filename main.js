/* ============================================================
   T&Y Travel & Consulting — main.js
   Menu mobile · Header scroll · Reveal · Particles ·
   Counter · Scroll progress · To-top · Form (Web3Forms)
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Năm hiện tại ở footer ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Menu mobile ---------- */
  var hamburger = document.getElementById("hamburger");
  var menu = document.getElementById("menu");
  if (hamburger && menu) {
    var toggleMenu = function (open) {
      var willOpen = open !== undefined ? open : !menu.classList.contains("open");
      menu.classList.toggle("open", willOpen);
      hamburger.classList.toggle("active", willOpen);
      hamburger.setAttribute("aria-expanded", String(willOpen));
      document.body.style.overflow = willOpen ? "hidden" : "";
    };
    hamburger.addEventListener("click", function () { toggleMenu(); });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { toggleMenu(false); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") toggleMenu(false);
    });
  }

  /* ---------- Header đổi nền khi cuộn + progress bar ---------- */
  var header = document.getElementById("header");
  var progress = document.getElementById("scrollProgress");
  var onScroll = function () {
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle("scrolled", y > 40);
    if (progress) {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      progress.style.width = (max > 0 ? (y / max) * 100 : 0) + "%";
    }
    if (toTop) toTop.classList.toggle("show", y > 500);
  };
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Reveal on scroll (IntersectionObserver) ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Hạt particles ở hero ---------- */
  var pBox = document.getElementById("heroParticles");
  if (pBox && !window.matchMedia("(prefers-reduced-motion:reduce)").matches) {
    var count = window.innerWidth < 680 ? 14 : 26;
    for (var i = 0; i < count; i++) {
      var s = document.createElement("span");
      var size = Math.random() * 3 + 2;
      s.style.left = Math.random() * 100 + "%";
      s.style.bottom = "-10px";
      s.style.width = s.style.height = size + "px";
      s.style.animationDuration = (Math.random() * 10 + 10) + "s";
      s.style.animationDelay = (Math.random() * 12) + "s";
      s.style.opacity = (Math.random() * 0.4 + 0.2).toFixed(2);
      pBox.appendChild(s);
    }
  }

  /* ---------- Counter số liệu ---------- */
  var counters = document.querySelectorAll(".stat__num");
  var runCounter = function (el) {
    var target = parseFloat(el.getAttribute("data-target")) || 0;
    var suffix = el.getAttribute("data-suffix") || "";
    var dur = 1600, start = null;
    var step = function (ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    };
    requestAnimationFrame(step);
  };
  if (counters.length && "IntersectionObserver" in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { runCounter(entry.target); cio.unobserve(entry.target); }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { cio.observe(el); });
  }

  /* ---------- Nút lên đầu trang ---------- */
  var toTop = document.getElementById("toTop");

  /* ---------- Form liên hệ (Web3Forms) ---------- */
  var form = document.getElementById("contactForm");
  var note = document.getElementById("formNote");
  var submitBtn = document.getElementById("submitBtn");

  var showNote = function (msg, type) {
    if (!note) return;
    note.hidden = false;
    note.textContent = msg;
    note.className = "form__note " + type;
  };
  var isEmail = function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); };

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var message = form.message.value.trim();

      if (!name || !email || !message) {
        showNote("Vui lòng điền đầy đủ Họ tên, Email và Nội dung.", "err");
        return;
      }
      if (!isEmail(email)) {
        showNote("Email chưa đúng định dạng. Vui lòng kiểm tra lại.", "err");
        return;
      }

      var key = form.access_key.value;
      // Nếu chưa cấu hình Web3Forms -> chạy chế độ demo
      if (!key || key === "YOUR_ACCESS_KEY_HERE") {
        showNote("✓ (Demo) Form hợp lệ. Hãy gắn Access Key của Web3Forms để nhận email thật.", "ok");
        form.reset();
        return;
      }

      submitBtn.classList.add("loading");
      submitBtn.disabled = true;

      var data = new FormData(form);
      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data
      })
        .then(function (r) { return r.json(); })
        .then(function (res) {
          if (res.success) {
            showNote("✓ Cảm ơn bạn! Yêu cầu đã được gửi. Chúng tôi sẽ liên hệ sớm.", "ok");
            form.reset();
          } else {
            showNote("Gửi không thành công: " + (res.message || "Vui lòng thử lại sau."), "err");
          }
        })
        .catch(function () {
          showNote("Có lỗi kết nối. Vui lòng thử lại hoặc gọi 0987.345.689.", "err");
        })
        .finally(function () {
          submitBtn.classList.remove("loading");
          submitBtn.disabled = false;
        });
    });
  }

  /* khởi tạo trạng thái cuộn lần đầu */
  onScroll();
})();
-e 
