#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const Ajv = require("ajv");
const addFormats = require("ajv-formats");

/**
 * Advanced Workflow Linter
 * Validates JSON files against schemas and custom business rules
 */

class WorkflowLinter {
  constructor(configPath = null) {
    this.ajv = new Ajv({
      allErrors: true,
      verbose: true,
      strict: false,
      loadSchema: this.loadSchema.bind(this),
    });

    addFormats(this.ajv);

    this.errors = [];
    this.warnings = [];
    this.schemasDir = path.join(__dirname, "../schemas");
    this.loadedSchemas = new Map();

    // Load configuration
    this.config = this.loadConfig(configPath);

    // Set patterns from config
    this.ignorePatterns = this.config.ignore || [];
    this.includePatterns = this.config.include || [];
    this.rules = this.config.rules || {};
    this.requiredLanguages = this.config.requiredLanguages || [
      "en-US",
      "tr-TR",
    ];
    this.allowedWorkflowTypes = this.config.allowedWorkflowTypes || [
      "Schema",
      "Workflow",
      "Task",
      "View",
      "Function",
    ];
    this.verbose = this.config.verbose || false;
  }

  loadConfig(configPath) {
    const defaultConfigPath = path.join(__dirname, "../lint.config.json");
    const targetConfigPath = configPath || defaultConfigPath;

    try {
      if (fs.existsSync(targetConfigPath)) {
        const configContent = fs.readFileSync(targetConfigPath, "utf-8");
        return JSON.parse(configContent);
      }
    } catch (error) {
      console.warn(
        `⚠️ Could not load config from ${targetConfigPath}: ${error.message}`
      );
    }

    // Fallback to default config
    return {
      ignore: [
        "**/node_modules/**",
        "**/.git/**",
        "**/.vscode/**",
        "**/bin/**",
        "**/obj/**",
        "**/dist/**",
        "**/build/**",
        "**/coverage/**",
        "**/temp/**",
        "**/tmp/**",
        "**/logs/**",
        "**/.nyc_output/**",
        "**/package.json",
        "**/package-lock.json",
        "**/tsconfig.json",
        "**/jest.config.json",
        "**/webpack.config.json",
        "**/*.config.json",
        "**/genDocs/**",
      ],
      include: [
        "**/Core/**/*.json",
        "**/workflow/**/*.json",
        "**/workflows/**/*.json",
        "**/Workflow/**/*.json",
        "**/*.[0-9].[0-9].[0-9].json",
        "**/*workflow*.json",
        "**/*-workflow-*.json",
        "**/*-flow-*.json",
      ],
      rules: {
        "filename-consistency": true,
        "reference-integrity": true,
        "version-consistency": true,
        "label-completeness": true,
        "state-machine-validation": true,
        "schema-validation": true,
      },
      requiredLanguages: ["en-US", "tr-TR"],
      allowedWorkflowTypes: ["Schema", "Workflow", "Task", "View", "Function"],
      verbose: false,
    };
  }

  shouldIgnoreFile(filePath) {
    const normalizedPath = filePath.replace(/\\/g, "/");

    // Check ignore patterns
    for (const pattern of this.ignorePatterns) {
      if (this.matchesPattern(normalizedPath, pattern)) {
        return true;
      }
    }

    return false;
  }

  isRelevantFile(filePath) {
    const normalizedPath = filePath.replace(/\\/g, "/");
    const fileName = path.basename(filePath);

    // Must be JSON file
    if (!fileName.endsWith(".json")) {
      return false;
    }

    // Check if it should be ignored first
    if (this.shouldIgnoreFile(normalizedPath)) {
      return false;
    }

    // Check include patterns
    for (const pattern of this.includePatterns) {
      if (this.matchesPattern(normalizedPath, pattern)) {
        return true;
      }
    }

    return false;
  }

  matchesPattern(filePath, pattern) {
    // Normalize path separators
    const normalizedPath = filePath.replace(/\\/g, "/");
    const normalizedPattern = pattern.replace(/\\/g, "/");

    // Convert glob pattern to regex
    // First handle ** and * patterns, then escape other regex chars
    let regexPattern = normalizedPattern
      .replace(/\*\*/g, "__DOUBLE_STAR__") // Temporarily replace **
      .replace(/\*/g, "__SINGLE_STAR__") // Temporarily replace *
      .replace(/\?/g, "__QUESTION__") // Temporarily replace ?
      .replace(/[.+^${}()|[\]\\]/g, "\\$&") // Escape regex special chars
      .replace(/__DOUBLE_STAR__/g, ".*") // ** -> .* (matches any path including empty)
      .replace(/__SINGLE_STAR__/g, "[^/]*") // * -> [^/]*
      .replace(/__QUESTION__/g, "[^/]"); // ? -> [^/]

    // Handle patterns that start with **/ - they should also match files in root
    if (normalizedPattern.startsWith("**/")) {
      const rootPattern = regexPattern.replace(/^\.\*\//, "");
      regexPattern = `(${regexPattern}|${rootPattern})`;
    }

    const regex = new RegExp(`^${regexPattern}$`);
    const result = regex.test(normalizedPath);

    // Debug logging if verbose
    if (this.verbose) {
      console.log(`    Pattern: ${pattern} -> Regex: ^${regexPattern}$`);
      console.log(`    File: ${normalizedPath} -> Match: ${result}`);
    }

    return result;
  }

  async loadSchema(uri) {
    try {
      // Check if schema is already loaded
      if (this.loadedSchemas.has(uri)) {
        return this.loadedSchemas.get(uri);
      }

      const schemaPath = path.join(this.schemasDir, path.basename(uri));
      if (fs.existsSync(schemaPath)) {
        const schema = JSON.parse(fs.readFileSync(schemaPath, "utf-8"));

        // Cache the schema to avoid duplicate loading
        this.loadedSchemas.set(uri, schema);

        return schema;
      }
      throw new Error(`Schema not found: ${uri}`);
    } catch (error) {
      console.error(`Error loading schema ${uri}:`, error.message);
      throw error;
    }
  }

  async lintFile(filePath) {
    try {
      // Check if file should be processed
      if (!this.isRelevantFile(filePath)) {
        console.log(`⏭️ Skipping: ${filePath} (not a workflow JSON)`);
        return;
      }

      console.log(`🔍 Linting: ${filePath}`);

      const content = fs.readFileSync(filePath, "utf-8");
      const json = JSON.parse(content);

      // Determine schema based on file content and naming patterns
      const schemaUrl = this.determineSchema(filePath, json);

      if (!schemaUrl) {
        this.addWarning(filePath, "No matching schema found", 1, 1);
        return;
      }

      // Load and compile schema
      const schema = await this.loadSchema(schemaUrl);

      // Check if validator is already compiled for this schema
      const validatorKey = `${schemaUrl}_${JSON.stringify(
        schema.$id || schemaUrl
      )}`;
      let validator;

      try {
        // Try to get existing validator or compile new one
        validator =
          this.ajv.getSchema(schema.$id || schemaUrl) ||
          this.ajv.compile(schema);
      } catch (error) {
        // If schema already exists, get it instead of recompiling
        if (error.message.includes("already exists")) {
          validator = this.ajv.getSchema(schema.$id || schemaUrl);
          if (!validator) {
            throw new Error(`Schema compilation failed: ${error.message}`);
          }
        } else {
          throw error;
        }
      }

      // Validate against schema
      const valid = validator(json);

      if (!valid) {
        validator.errors.forEach((error) => {
          this.addError(
            filePath,
            this.formatSchemaError(error),
            this.getLineNumber(content, error.instancePath),
            1
          );
        });
      }

      // Custom business rule validations
      await this.validateBusinessRules(filePath, json, content);

      console.log(
        `✅ ${filePath} - ${
          this.errors.filter((e) => e.file === filePath).length === 0
            ? "PASSED"
            : "FAILED"
        }`
      );
    } catch (error) {
      if (error instanceof SyntaxError) {
        this.addError(filePath, `Invalid JSON: ${error.message}`, 1, 1);
      } else {
        this.addError(filePath, `Linting error: ${error.message}`, 1, 1);
      }
    }
  }

  determineSchema(filePath, json) {
    const fileName = path.basename(filePath);

    // Version pattern matching
    if (/\.\d+\.\d+\.\d+\.json$/.test(fileName)) {
      if (json.attributes && json.attributes.states) {
        return "workflow-definition.schema.json";
      }
      if (json.key && json.version && json.domain) {
        return "core-schema.schema.json";
      }
    }

    // Directory-based matching
    if (filePath.includes("/Core/Schema/")) {
      return "core-schema.schema.json";
    }

    if (filePath.includes("/workflow/") || filePath.includes("/Workflow/")) {
      return "workflow-definition.schema.json";
    }

    return null;
  }

  async validateBusinessRules(filePath, json, content) {
    // Rule 1: Filename consistency
    if (this.rules["filename-consistency"]) {
      await this.validateFilenameConsistency(filePath, json);
    }

    // Rule 2: Reference integrity
    if (this.rules["reference-integrity"]) {
      await this.validateReferenceIntegrity(filePath, json);
    }

    // Rule 3: Version consistency
    if (this.rules["version-consistency"]) {
      await this.validateVersionConsistency(filePath, json);
    }

    // Rule 4: Label completeness
    if (this.rules["label-completeness"]) {
      await this.validateLabels(filePath, json);
    }

    // Rule 5: Workflow state machine validation
    if (this.rules["state-machine-validation"]) {
      await this.validateStateMachine(filePath, json);
    }
  }

  async validateFilenameConsistency(filePath, json) {
    const fileName = path.basename(filePath, ".json");

    if (json.key && json.version) {
      const expectedName = `${json.key}.${json.version}`;

      // Case-insensitive comparison for better flexibility
      if (fileName.toLowerCase() !== expectedName.toLowerCase()) {
        this.addError(
          filePath,
          `Filename '${fileName}' does not match key.version '${expectedName}' (case-insensitive)`,
          1,
          1
        );
      }
    }
  }

  async validateReferenceIntegrity(filePath, json) {
    const findReferences = (obj, path = "") => {
      if (!obj || typeof obj !== "object") return;

      for (const [key, value] of Object.entries(obj)) {
        const currentPath = path ? `${path}.${key}` : key;

        if (key === "workflow" && typeof value === "string") {
          // Check if workflow reference exists
          if (
            !["Schema", "Workflow", "Task", "View", "Function"].includes(value)
          ) {
            this.addWarning(
              filePath,
              `Unknown workflow reference: ${value} at ${currentPath}`,
              1,
              1
            );
          }
        } else if (Array.isArray(value)) {
          value.forEach((item, index) => {
            findReferences(item, `${currentPath}[${index}]`);
          });
        } else if (typeof value === "object") {
          findReferences(value, currentPath);
        }
      }
    };

    findReferences(json);
  }

  async validateVersionConsistency(filePath, json) {
    if (json.version && !/^\d+\.\d+\.\d+$/.test(json.version)) {
      this.addError(
        filePath,
        `Invalid version format: ${json.version}. Expected semantic version (e.g., 1.0.0)`,
        1,
        1
      );
    }

    if (json.flowVersion && !/^\d+\.\d+\.\d+$/.test(json.flowVersion)) {
      this.addError(
        filePath,
        `Invalid flowVersion format: ${json.flowVersion}. Expected semantic version`,
        1,
        1
      );
    }
  }

  async validateLabels(filePath, json) {
    const validateLabelArray = (labels, path) => {
      if (!Array.isArray(labels)) return;

      const languages = new Set();
      labels.forEach((label, index) => {
        if (!label.label || !label.language) {
          this.addError(
            filePath,
            `Missing label or language at ${path}[${index}]`,
            1,
            1
          );
        }

        if (languages.has(label.language)) {
          this.addWarning(
            filePath,
            `Duplicate language '${label.language}' at ${path}[${index}]`,
            1,
            1
          );
        }
        languages.add(label.language);
      });

      // Check for required languages
      this.requiredLanguages.forEach((lang) => {
        if (!languages.has(lang)) {
          this.addWarning(
            filePath,
            `Missing required language '${lang}' in ${path}`,
            1,
            1
          );
        }
      });
    };

    const findLabels = (obj, path = "") => {
      if (!obj || typeof obj !== "object") return;

      for (const [key, value] of Object.entries(obj)) {
        const currentPath = path ? `${path}.${key}` : key;

        if (key === "labels" && Array.isArray(value)) {
          validateLabelArray(value, currentPath);
        } else if (Array.isArray(value)) {
          value.forEach((item, index) => {
            findLabels(item, `${currentPath}[${index}]`);
          });
        } else if (typeof value === "object") {
          findLabels(value, currentPath);
        }
      }
    };

    findLabels(json);
  }

  async validateStateMachine(filePath, json) {
    if (!json.attributes || !json.attributes.states) return;

    const states = json.attributes.states;
    const stateKeys = states.map((s) => s.key);

    // Check for start state
    const startStates = states.filter((s) => s.stateType === 1);
    if (startStates.length === 0) {
      this.addError(
        filePath,
        "Workflow must have at least one start state (stateType: 1)",
        1,
        1
      );
    } else if (startStates.length > 1) {
      this.addWarning(
        filePath,
        "Multiple start states found. Consider using one start state.",
        1,
        1
      );
    }

    // Check for final state
    const finalStates = states.filter((s) => s.stateType === 3);
    if (finalStates.length === 0) {
      this.addWarning(
        filePath,
        "Workflow should have at least one final state (stateType: 3)",
        1,
        1
      );
    }

    // Validate transitions
    states.forEach((state) => {
      if (state.transitions) {
        state.transitions.forEach((transition) => {
          if (transition.target && !stateKeys.includes(transition.target)) {
            this.addError(
              filePath,
              `Invalid transition target '${transition.target}' from state '${state.key}'`,
              1,
              1
            );
          }
        });
      }
    });
  }

  formatSchemaError(error) {
    const { instancePath, message, data } = error;
    return `Schema validation failed at ${instancePath || "root"}: ${message}`;
  }

  getLineNumber(content, jsonPath) {
    // Simple line number calculation - could be improved
    const lines = content.split("\n");
    for (let i = 0; i < lines.length; i++) {
      if (jsonPath && lines[i].includes(jsonPath.split("/").pop())) {
        return i + 1;
      }
    }
    return 1;
  }

  addError(file, message, line, column) {
    this.errors.push({ file, message, line, column, severity: "error" });
  }

  addWarning(file, message, line, column) {
    this.warnings.push({ file, message, line, column, severity: "warning" });
  }

  async lintDirectory(directory) {
    const files = await this.getAllFiles(directory);

    // Filter to only relevant files
    const relevantFiles = files.filter((file) => this.isRelevantFile(file));

    console.log(
      `📁 Found ${files.length} total files, ${relevantFiles.length} relevant for linting`
    );

    if (this.verbose) {
      console.log("\n🔍 Debug: Sample files found:");
      files.slice(0, 10).forEach((file) => {
        const isRelevant = this.isRelevantFile(file);
        console.log(`  ${isRelevant ? "✓" : "✗"} ${file}`);
      });
    }

    for (const file of relevantFiles) {
      await this.lintFile(file);
    }
  }

  async getAllFiles(directory, allFiles = []) {
    const files = fs.readdirSync(directory, { withFileTypes: true });

    for (const file of files) {
      const fullPath = path.join(directory, file.name);

      if (file.isDirectory()) {
        // Skip ignored directories
        if (!this.shouldIgnoreFile(fullPath)) {
          await this.getAllFiles(fullPath, allFiles);
        }
      } else {
        allFiles.push(fullPath);
      }
    }

    return allFiles;
  }

  printResults() {
    console.log("\n📊 Linting Results");
    console.log("=".repeat(50));

    if (this.errors.length === 0 && this.warnings.length === 0) {
      console.log("✅ All files passed linting!");
      return true;
    }

    if (this.errors.length > 0) {
      console.log(`\n❌ Errors (${this.errors.length}):`);
      this.errors.forEach((error) => {
        console.log(
          `  ${error.file}:${error.line}:${error.column}: error ${error.message}`
        );
      });
    }

    if (this.warnings.length > 0) {
      console.log(`\n⚠️  Warnings (${this.warnings.length}):`);
      this.warnings.forEach((warning) => {
        console.log(
          `  ${warning.file}:${warning.line}:${warning.column}: warning ${warning.message}`
        );
      });
    }

    console.log(
      `\n📈 Summary: ${this.errors.length} errors, ${this.warnings.length} warnings`
    );

    return this.errors.length === 0;
  }
}

// CLI execution
async function main() {
  const linter = new WorkflowLinter();
  const target = process.argv[2] || ".";

  console.log("🚀 Amorphie Workflow Linter");
  console.log("=".repeat(50));

  try {
    const stats = fs.statSync(target);

    if (stats.isDirectory()) {
      await linter.lintDirectory(target);
    } else {
      await linter.lintFile(target);
    }

    const success = linter.printResults();
    process.exit(success ? 0 : 1);
  } catch (error) {
    console.error("❌ Linter failed:", error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { WorkflowLinter };
