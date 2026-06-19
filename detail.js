/* Lightbox cho gallery trang chi tiết dịch vụ */
(function () {
  "use strict";
  var lb = document.getElementById("lightbox");
  var lbImg = document.getElementById("lbImg");
  var lbClose = document.getElementById("lbClose");
  if (!lb) return;

  document.querySelectorAll(".gallery__item").forEach(function (item) {
    item.addEventListener("click", function () {
      var full = item.getAttribute("data-full");
      var cap = item.querySelector("img") ? item.querySelector("img").alt : "";
      if (!full) return;
      lbImg.src = full;
      lbImg.alt = cap;
      lb.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  });

  var close = function () {
    lb.classList.remove("open");
    lbImg.src = "";
    document.body.style.overflow = "";
  };
  lbClose.addEventListener("click", close);
  lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") close();
  });
})();
-e 
