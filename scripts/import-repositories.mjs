#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = path.join(root, "imports", "repositories.json");
const targetRoot = path.join(root, "imports", "repositories");
const continueOnError = process.argv.includes("--continue-on-error");
const repositories = JSON.parse(readFileSync(manifestPath, "utf8"));

mkdirSync(targetRoot, { recursive: true });

const run = (command, args, options = {}) => {
  const result = spawnSync(command, args, {
    cwd: root,
    stdio: "inherit",
    shell: false,
    ...options,
  });

  return result.status ?? 1;
};

const failures = [];

for (const repo of repositories) {
  const destination = path.join(targetRoot, repo.name);
  const destinationLabel = path.relative(root, destination);

  console.log(`\n▶ ${repo.name}`);
  console.log(`  ${repo.url}`);

  const status = existsSync(path.join(destination, ".git"))
    ? run("git", ["-C", destination, "pull", "--ff-only"])
    : run("git", [
        "clone",
        "--depth=1",
        "--filter=blob:none",
        repo.url,
        destination,
      ]);

  if (status === 0) {
    console.log(`  imported: ${destinationLabel}`);
  } else {
    failures.push(repo.name);
    console.error(`  failed: ${destinationLabel}`);

    if (!continueOnError) {
      console.error(
        "\nImport stopped. Re-run with --continue-on-error to keep importing the remaining repositories.",
      );
      process.exit(status);
    }
  }
}

if (failures.length > 0) {
  console.error(`\nFinished with ${failures.length} failed import(s):`);
  for (const name of failures) {
    console.error(`- ${name}`);
  }
  process.exit(1);
}

console.log(
  `\nImported ${repositories.length} repositories into imports/repositories.`,
);
