#!/usr/bin/env node
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const isWindows = process.platform === "win32";
const binSuffix = isWindows ? ".cmd" : "";
const requiredBins = ["next", "tsc"].map((name) => ({
  name,
  file: path.join(root, "node_modules", ".bin", `${name}${binSuffix}`),
}));

const missingBins = requiredBins.filter((bin) => !existsSync(bin.file));

if (missingBins.length === 0) {
  process.exit(0);
}

console.error("\nTerkix-Builder chưa cài dependencies trong node_modules.");
console.error("Các lệnh npm run typecheck/build/dev cần local binaries sau:");
for (const bin of missingBins) {
  console.error(`- ${bin.name}: ${path.relative(root, bin.file)}`);
}
console.error("\nChạy một trong các lệnh sau trước:");
console.error("  npm install");
console.error("  # hoặc nếu muốn đúng theo package-lock.json:");
console.error("  npm ci");
console.error("\nSau đó chạy lại:");
console.error("  npm run typecheck");
console.error("  npm run build");
console.error("  npm run dev:next");
console.error(
  "\nLưu ý: không chạy `npm run dev:next + curl -I ...`. Nếu muốn test bằng curl, chạy server nền rồi curl riêng:",
);
console.error("  npm run dev:next");
console.error("  curl -I http://127.0.0.1:3000");
console.error("");

process.exit(1);
