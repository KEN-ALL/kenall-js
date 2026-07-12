#!/usr/bin/env node
//
// Automate a version-bump release PR for @ken-all/kenall.
//
// Usage:
//   node scripts/release-bump.mjs <version>
//     <version> is either an explicit version (e.g. 2.6.0) or an
//     npm-style keyword: patch | minor | major.
//
// What it does:
//   1. Creates a topic branch  chore/v<new-version>  off the current branch.
//   2. Bumps the version in package.json + root package-lock.json.
//   3. Refreshes every examples/*/package-lock.json (they link to ../..).
//   4. Commits the changes as a signed commit (git commit -S).
//   5. Pushes the branch and opens a PR with the GitHub CLI.
//
// Requirements: node, npm, git (with signing configured), gh (authenticated).

import { execFileSync } from "node:child_process";
import { readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

// Run a command inheriting stdio; return trimmed stdout when capturing.
function run(cmd, args, { capture = false } = {}) {
  return execFileSync(cmd, args, {
    cwd: REPO_ROOT,
    encoding: "utf8",
    stdio: capture ? ["inherit", "pipe", "inherit"] : "inherit",
  });
}

function fail(msg) {
  console.error(`error: ${msg}`);
  process.exit(1);
}

const bump = process.argv[2];
if (!bump) {
  console.error("usage: node scripts/release-bump.mjs <version|patch|minor|major>");
  process.exit(2);
}

// --- safety checks ---------------------------------------------------------
if (run("git", ["status", "--porcelain"], { capture: true }).trim() !== "") {
  fail("working tree is not clean; commit or stash first.");
}

const baseBranch = run("git", ["rev-parse", "--abbrev-ref", "HEAD"], {
  capture: true,
}).trim();

// --- bump root package.json + root lockfile (no tag, no commit) ------------
// --no-git-tag-version keeps npm from committing/tagging; we do that ourselves.
const newVersion = run("npm", ["version", bump, "--no-git-tag-version"], {
  capture: true,
})
  .trim()
  .replace(/^v/, "");
console.log(`==> bumping to ${newVersion}`);

const branch = `chore/v${newVersion}`;
run("git", ["switch", "-c", branch]);

// --- refresh the example lockfiles (each links back to file:../..) ---------
const examplesDir = join(REPO_ROOT, "examples");
const exampleLocks = [];
for (const name of readdirSync(examplesDir)) {
  const dir = join("examples", name);
  const lock = join(dir, "package-lock.json");
  console.log(`==> refreshing ${lock}`);
  // --package-lock-only rewrites the lockfile without touching node_modules.
  run("npm", ["install", "--package-lock-only", "--prefix", dir]);
  exampleLocks.push(lock);
}

// --- commit (signed), push, and open the PR --------------------------------
run("git", [
  "add",
  "package.json",
  "package-lock.json",
  ...exampleLocks,
]);
run("git", ["commit", "-S", "-m", `v${newVersion}`]);

run("git", ["push", "-u", "origin", branch]);

run("gh", [
  "pr",
  "create",
  "--base",
  baseBranch,
  "--head",
  branch,
  "--title",
  `v${newVersion}`,
  "--body",
  `Bump version to \`${newVersion}\`.`,
]);

console.log(`==> done: opened PR for ${branch} -> ${baseBranch}`);
