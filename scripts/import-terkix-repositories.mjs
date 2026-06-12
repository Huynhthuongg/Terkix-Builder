#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, "..");
const manifestPath = resolve(rootDir, "integrations/terkix-repositories.json");
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));

const args = new Set(process.argv.slice(2));
const dryRun = args.has("--dry-run");
const updateOnly = args.has("--update-only");
const failures = [];

function run(command, commandArgs, options = {}) {
  const printable = [command, ...commandArgs].join(" ");

  if (dryRun) {
    console.log(`[dry-run] ${printable}`);
    return { ok: true, printable };
  }

  const result = spawnSync(command, commandArgs, {
    cwd: rootDir,
    stdio: "inherit",
    ...options,
  });

  return {
    ok: result.status === 0,
    printable,
    status: result.status,
  };
}

console.log(
  `Importing ${manifest.repositories.length} repositories into ${manifest.defaultDirectory}/`,
);

for (const repository of manifest.repositories) {
  const localPath = resolve(rootDir, repository.localPath);
  const gitDir = resolve(localPath, ".git");

  console.log(`\n==> ${repository.name}`);
  console.log(`    ${repository.url}`);

  let result;

  if (existsSync(gitDir)) {
    result = run("git", ["-C", repository.localPath, "pull", "--ff-only"]);
  } else if (existsSync(localPath) && updateOnly) {
    console.log(
      `    Skipping existing non-git path in update-only mode: ${repository.localPath}`,
    );
    result = { ok: true };
  } else if (updateOnly) {
    console.log(
      `    Skipping missing checkout in update-only mode: ${repository.localPath}`,
    );
    result = { ok: true };
  } else {
    result = run("git", ["clone", repository.url, repository.localPath]);
  }

  if (!result.ok) {
    failures.push({
      repository,
      command: result.printable,
      status: result.status,
    });
    console.error(`    Failed: ${result.printable}`);
  }
}

if (failures.length > 0) {
  console.error("\nRepository import finished with failures:");
  for (const failure of failures) {
    console.error(
      `- ${failure.repository.name}: ${failure.command} (exit ${failure.status})`,
    );
  }
  process.exitCode = 1;
} else {
  console.log("\nRepository import complete.");
}
