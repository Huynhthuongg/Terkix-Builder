# Chạy Terkix-Builder trên Termux

Bạn bị lỗi:

```text
tsc: not found
next: not found
```

Lỗi này không phải do code dashboard. Nó xảy ra vì máy Termux chưa cài dependencies vào `node_modules`, nên npm không tìm thấy binary local của `typescript` (`tsc`) và `next`.

## 1. Cài dependencies trước

Chạy trong thư mục dự án:

```bash
npm install
```

Nếu muốn cài đúng theo `package-lock.json`, dùng:

```bash
npm ci
```

## 2. Kiểm tra code

Sau khi cài xong, chạy:

```bash
npm run typecheck
npm run build
```

## 3. Chạy web local trên Termux

Chạy server dev:

```bash
npm run dev:next
```

Sau khi Next.js báo ready, mở trình duyệt điện thoại vào:

```text
http://127.0.0.1:3000
```

## 4. Nếu muốn test bằng curl

Không chạy như sau:

```bash
npm run dev:next + curl -I http://127.0.0.1:3000
```

Dấu `+` không phải cách nối lệnh shell. Hãy chạy server nền rồi curl:

```bash
npm run dev:next &
curl -I http://127.0.0.1:3000
```

Hoặc mở 2 phiên Termux: một phiên chạy `npm run dev:next`, phiên còn lại chạy `curl -I http://127.0.0.1:3000`.

## 5. Deploy ra link public

Termux chỉ chạy local. Muốn có link public `.dev`, `.com`, hoặc `*.vercel.app`, hãy deploy theo `DEPLOYMENT.md`.
