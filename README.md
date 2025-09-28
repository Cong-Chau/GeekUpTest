# 🚀 GeekUp Test

Demo: [Xem tại đây](https://geek-up-test.vercel.app/)

## 📖 Giới thiệu

GeekUp Test là một ứng dụng demo được xây dựng bằng **React**, **Vite** và **Tailwind CSS**, nhằm thực hành và trình bày giao diện web hiện đại.  
Dự án được triển khai trực tuyến bằng **Vercel**.

## 🛠️ Công nghệ sử dụng

- ⚛️ [React 19](https://react.dev/) – thư viện UI
- ⚡ [Vite](https://vite.dev/) – bundler siêu nhanh
- 🎨 [Tailwind CSS](https://tailwindcss.com/) – framework CSS tiện lợi
- 🛣️ [React Router v7](https://reactrouter.com/) – quản lý điều hướng
- 🔗 [Lucide React](https://lucide.dev/) – bộ icon hiện đại

## 📂 Cấu trúc dự án

    ├── public/ # Tài nguyên tĩnh
    ├── src/ # Source code chính
    │ ├── components/ # Các component tái sử dụng
    │ ├── pages/ # Các trang chính
    │ ├── App.jsx # Component gốc
    │ └── main.jsx # Điểm khởi chạy
    ├── index.html
    ├── package.json
    └── vite.config.js

## ⚙️ Cài đặt & chạy local

Yêu cầu: **Node.js >= 18**

```bash
# Clone repo
git clone https://github.com/Cong-Chau/GeekUpTest
cd geekuptest

# Cài dependencies
npm install

# Chạy môi trường phát triển
npm run dev

# Build production
npm run build

# Preview build
npm run preview
```

# 🚀 GeekUp Test

Dự án được deploy bằng **Vercel**
Mỗi lần push code lên branch chính, Vercel sẽ tự động build & cập nhật phiên bản mới.
