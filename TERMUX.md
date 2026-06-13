# Chạy Terkix-Builder trên Termux

## 0. Nếu không thấy file mới hoặc script mới

Nếu Termux báo các lỗi như sau:

```text
No files matching the pattern were found: "scripts/check-local-deps.mjs"
No files matching the pattern were found: "TERMUX.md"
npm error Missing script: "check:deps"
```

nghĩa là thư mục `~/Terkix-Builder` trên điện thoại của bạn **chưa kéo commit mới nhất**. Code trên Git đã có các file/script đó, nhưng máy bạn vẫn đang ở bản cũ.

Chạy trong thư mục dự án:

```bash
git status
git pull
npm install
```

Sau đó kiểm tra lại:

```bash
npm run check:deps
npm run typecheck
npm run build
```

Nếu `git pull` báo conflict, lưu file bạn cần rồi clone lại bản sạch:

```bash
cd ~
mv Terkix-Builder Terkix-Builder-old
git clone https://github.com/Huynhthuongg/Terkix-Builder.git
cd Terkix-Builder
npm install
```

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
