#!/usr/bin/env node

const fs = require("fs-extra");
const path = require("path");

/**
 * Setup script for @amorphie/definition-core
 * Copies .vscode configuration and examples to the target project
 */

async function setupProject() {
  try {
    // Get the package directory
    const packageDir = path.dirname(__dirname);

    // Get the target project directory (where the package is installed)
    // When running as postinstall, cwd is the package directory
    // We need to find the actual project root
    let targetDir = process.cwd();

    // If we're in node_modules, go up to find the project root
    if (targetDir.includes("node_modules")) {
      const nodeModulesIndex = targetDir.indexOf("node_modules");
      targetDir = targetDir.substring(0, nodeModulesIndex);
    }

    console.log("🚀 Setting up Amorphie Definition Core...");
    console.log(`📂 Package directory: ${packageDir}`);
    console.log(`📂 Target directory: ${targetDir}`);

    // Check if we're running setup on the package itself (development mode)
    if (path.resolve(targetDir) === path.resolve(packageDir)) {
      console.log("📦 Running in development mode - setup not needed");
      console.log("✅ Project is already configured for development");
      console.log("");
      console.log("🚀 Available commands:");
      console.log("   • npm run validate - Validate workflow definitions");
      console.log("   • npm run lint - Lint JSON files");
      console.log("   • npm run build - Build and test package");
      return;
    }

    // Copy .vscode configuration if it doesn't exist
    const vscodeSrc = path.join(packageDir, ".vscode");
    const vscodeDest = path.join(targetDir, ".vscode");

    if (fs.existsSync(vscodeSrc)) {
      if (!fs.existsSync(vscodeDest)) {
        try {
          await fs.copy(vscodeSrc, vscodeDest);
          console.log("✅ VSCode configuration copied");
        } catch (copyError) {
          console.error(`❌ Error copying VSCode config: ${copyError.message}`);
          console.error(`   Source: ${vscodeSrc}`);
          console.error(`   Destination: ${vscodeDest}`);
          throw copyError;
        }
      } else {
        // Merge or update specific files
        await mergeVSCodeConfig(vscodeSrc, vscodeDest);
        console.log("✅ VSCode configuration updated");
      }

      // Copy examples to .vscode/examples
      const examplesSrc = path.join(packageDir, "examples");
      const examplesDest = path.join(vscodeDest, "examples");

      if (fs.existsSync(examplesSrc)) {
        if (!fs.existsSync(examplesDest)) {
          await fs.copy(examplesSrc, examplesDest);
          console.log("✅ Examples copied to .vscode/examples/");
        } else {
          console.log(
            "⚠️  Examples directory already exists in .vscode/, skipping"
          );
        }
      }
    }

    // Copy .cursorrules if it doesn't exist
    const cursorrulesSrc = path.join(packageDir, ".cursorrules");
    const cursorrulesDest = path.join(targetDir, ".cursorrules");

    if (fs.existsSync(cursorrulesSrc) && !fs.existsSync(cursorrulesDest)) {
      await fs.copy(cursorrulesSrc, cursorrulesDest);
      console.log("✅ Cursor rules copied");
    }

    // Core schemas are kept in the package - no copying to project
    // They can be accessed programatically via the main module
    console.log(
      "📦 Core schemas available via @amorphie/definition-core module"
    );

    // Setup git hooks for linting
    try {
      const { setupGitHooks } = require("./setup-git-hooks");
      console.log("\n🔧 Setting up Git hooks...");
      setupGitHooks();
    } catch (error) {
      console.log("⚠️  Git hooks setup skipped (optional):", error.message);
    }

    console.log("");
    console.log("🎉 Setup completed successfully!");
    console.log("");
    console.log("📝 What was installed:");
    console.log("   • VSCode tasks, snippets, and settings");
    console.log("   • Workflow validation scripts");
    console.log("   • CSX template files in .vscode/examples/");
    console.log("   • Core schemas (accessible via module API)");
    console.log("   • Cursor AI rules");
    console.log("");
    console.log("🚀 Next steps:");
    console.log("   • Open your project in VSCode");
    console.log(
      '   • Use Ctrl+Shift+P → "Tasks: Run Task" to see available commands'
    );
    console.log("   • Create new workflows using the provided snippets");
    console.log("   • Check .vscode/examples/ directory for CSX templates");
    console.log(
      '   • Access Core schemas: const { loadSchema } = require("@amorphie/definition-core")'
    );
  } catch (error) {
    console.error("❌ Setup failed:", error.message);
    process.exit(1);
  }
}

/**
 * Merge VSCode configuration with existing project configuration
 */
async function mergeVSCodeConfig(srcDir, destDir) {
  const filesToMerge = [
    "tasks.json",
    "settings.json",
    "workflow.code-snippets",
  ];

  for (const fileName of filesToMerge) {
    const srcFile = path.join(srcDir, fileName);
    const destFile = path.join(destDir, fileName);

    if (fs.existsSync(srcFile)) {
      if (fs.existsSync(destFile)) {
        // Create backup
        const backupFile = `${destFile}.backup.${Date.now()}`;
        await fs.copy(destFile, backupFile);
        console.log(
          `📁 Backed up existing ${fileName} to ${path.basename(backupFile)}`
        );
      }

      try {
        await fs.copy(srcFile, destFile);
      } catch (copyError) {
        console.error(`❌ Error copying ${fileName}: ${copyError.message}`);
        console.error(`   Source: ${srcFile}`);
        console.error(`   Destination: ${destFile}`);
        throw copyError;
      }
    }
  }

  // Copy scripts directory entirely
  const scriptsSrc = path.join(srcDir, "scripts");
  const scriptsDest = path.join(destDir, "scripts");

  if (fs.existsSync(scriptsSrc)) {
    await fs.copy(scriptsSrc, scriptsDest);
  }

  // Copy schemas directory entirely
  const schemasSrc = path.join(srcDir, "schemas");
  const schemasDest = path.join(destDir, "schemas");

  if (fs.existsSync(schemasSrc)) {
    await fs.copy(schemasSrc, schemasDest);
  }
}

// Run setup if called directly
if (require.main === module) {
  setupProject();
}

module.exports = { setupProject };
