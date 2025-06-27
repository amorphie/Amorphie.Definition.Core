#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

/**
 * Pre-commit hook for JSON linting
 * Ensures that only valid JSON files are committed
 */

function getChangedJsonFiles() {
  try {
    // Get staged files
    const stagedFiles = execSync("git diff --cached --name-only", {
      encoding: "utf-8",
    })
      .split("\n")
      .filter((file) => file.trim())
      .filter((file) => file.endsWith(".json"))
      .filter((file) => fs.existsSync(file));

    return stagedFiles;
  } catch (error) {
    console.error("Error getting staged files:", error.message);
    return [];
  }
}

function lintFiles(files) {
  if (files.length === 0) {
    console.log("✅ No JSON files to lint.");
    return true;
  }

  console.log("🔍 Linting staged JSON files...");
  console.log("Files to lint:", files.map((f) => `  • ${f}`).join("\n"));

  try {
    const linterScript = path.join(__dirname, "lint-workflow.js");

    // Lint each file individually to get detailed results
    let hasErrors = false;

    for (const file of files) {
      try {
        execSync(`node "${linterScript}" "${file}"`, {
          stdio: "inherit",
          encoding: "utf-8",
        });
      } catch (error) {
        hasErrors = true;
        console.error(`❌ Linting failed for ${file}`);
      }
    }

    return !hasErrors;
  } catch (error) {
    console.error("❌ Linting process failed:", error.message);
    return false;
  }
}

function main() {
  console.log("🚀 Pre-commit JSON Linting");
  console.log("=".repeat(50));

  const changedFiles = getChangedJsonFiles();

  if (changedFiles.length === 0) {
    console.log("✅ No JSON files changed. Skipping lint check.");
    process.exit(0);
  }

  const success = lintFiles(changedFiles);

  if (!success) {
    console.log("\n❌ Pre-commit hook failed!");
    console.log("📝 Fix the linting errors above and try committing again.");
    console.log('💡 You can run "npm run lint:json" to see all issues.');
    console.log(
      '💡 Or use "git commit --no-verify" to skip this check (not recommended).'
    );
    process.exit(1);
  }

  console.log("\n✅ All JSON files passed linting!");
  console.log("🎉 Commit can proceed.");
  process.exit(0);
}

if (require.main === module) {
  main();
}

module.exports = { getChangedJsonFiles, lintFiles };
