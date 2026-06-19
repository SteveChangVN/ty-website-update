# Website Công ty TNHH Du lịch & Tư vấn T&Y (bản cải tiến)

Trang giới thiệu công ty (one-page) — **HTML + CSS + JavaScript thuần**, không cần build.

## Có gì mới
- Giao diện hiện đại hơn: header trong suốt chuyển nền navy khi cuộn, nút bo tròn, đổ bóng tinh tế.
- Hiệu ứng động: hạt particles ở hero, reveal-on-scroll, counter số liệu, thanh tiến trình cuộn, hover card.
- Form liên hệ **gửi email thật** qua Web3Forms (miễn phí, không cần backend) + chống spam + trạng thái gửi.
- Tối ưu SEO: structured data (JSON-LD), Open Graph, robots.txt, sitemap.xml, lazy-load ảnh.

## Cách xem
- Nhanh: mở thẳng `index.html`.
- Chuẩn: `python -m http.server 5500` rồi mở `http://localhost:5500`.

## ⚙️ Kích hoạt form nhận email (QUAN TRỌNG)
1. Vào https://web3forms.com → nhập email công ty `consulting@tydulich.vn` → lấy **Access Key** miễn phí.
2. Mở `index.html`, tìm `YOUR_ACCESS_KEY_HERE` (trong form) và thay bằng key vừa nhận.
3. Xong! Mọi yêu cầu sẽ gửi thẳng về email. (Chưa thay key thì form chạy chế độ demo.)

## Ảnh
Thư mục `assets/img/` đang dùng ảnh **placeholder**. Thay bằng ảnh thật, giữ nguyên tên:
`logo.png`, `laurent.jpg`, `anna.jpg`, `thao.jpg`.

## Cấu trúc
```
index.html              Nội dung & bố cục
assets/css/style.css    Giao diện, hiệu ứng, responsive
assets/js/main.js       Menu, scroll, particles, counter, form
assets/img/             Logo + ảnh lãnh đạo
robots.txt, sitemap.xml SEO
```

## Bảng màu
Navy đậm `#082636` · Navy `#0E3B54` · Vàng `#D9A441` · Vàng nhạt `#E8C176` · Kem `#F5EFE3`

## Deploy miễn phí
Trang tĩnh → kéo-thả cả thư mục lên Netlify / Vercel / Cloudflare Pages / GitHub Pages, rồi trỏ tên miền `tydulich.vn`. (Có sẵn `render.yaml` nếu dùng Render.)
