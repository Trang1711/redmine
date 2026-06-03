# Redmine Smart Request UI

Prototype giao diện React + TypeScript cho quản lý yêu cầu Redmine, gồm:

- Dashboard desktop/mobile.
- Trạng thái ngoài danh sách: Chưa làm / Đang làm / Đã đóng.
- Bộ lọc desktop và mobile bottom-sheet nằm trong màn hình điện thoại.
- Form New issue responsive, tối ưu cho mobile.
- Timeline chi tiết và mô phỏng tự ghi nhận thời gian xử lý.

## Cách chạy

Yêu cầu Node.js 20.19+ hoặc 22.12+.

```bash
npm install
npm run dev
```

Mở địa chỉ được Vite hiển thị trong Terminal.

## Kiểm tra build

```bash
npm run build
```

## Công nghệ

- React + TypeScript
- Vite
- Tailwind CSS thông qua `@tailwindcss/vite`
- Lucide React icons

Dữ liệu hiện là dữ liệu demo trên frontend, chưa kết nối Redmine REST API.
