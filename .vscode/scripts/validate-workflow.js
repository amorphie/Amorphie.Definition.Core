#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const Ajv = require("ajv");
const addFormats = require("ajv-formats");

/**
 * BBT Workflow JSON Validator
 * This script workflow validates JSON files and reports errors
 */

// Colors for console output
const colors = {
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
  reset: "\x1b[0m",
  bright: "\x1b[1m",
};

class WorkflowValidator {
  constructor() {
    this.ajv = new Ajv({
      allErrors: true,
      verbose: true,
      strict: false, // Allow enumDescriptions and other custom keywords
      logger: false, // Disable AJV logging for cleaner output
    });
    addFormats(this.ajv);

    // Add support for enumDescriptions keyword
    this.ajv.addKeyword({
      keyword: "enumDescriptions",
      type: "string",
      schemaType: "array",
      compile: function (schemaVal) {
        return function validate(data) {
          return true; // Always valid, it's just for documentation
        };
      },
    });

    this.schema = null;
    this.totalFiles = 0;
    this.validFiles = 0;
    this.invalidFiles = 0;
  }

  async loadSchema() {
    try {
      const schemaPath = path.join(
        __dirname,
        "../schemas/workflow-definition.schema.json"
      );
      const schemaContent = fs.readFileSync(schemaPath, "utf8");
      this.schema = JSON.parse(schemaContent);
      console.log(`${colors.green}✓ Schema loaded successfully${colors.reset}`);
    } catch (error) {
      console.error(
        `${colors.red}✗ Failed to load schema: ${error.message}${colors.reset}`
      );
      process.exit(1);
    }
  }

  validateFile(filePath) {
    this.totalFiles++;

    try {
      // Read file content
      const content = fs.readFileSync(filePath, "utf8");

      // Try to parse JSON with detailed error reporting
      let workflowData;
      try {
        workflowData = JSON.parse(content);
      } catch (parseError) {
        this.invalidFiles++;
        console.log(`${colors.red}✗ ${filePath}${colors.reset}`);
        this.printParseError(parseError, content, filePath);
        return;
      }

      // Validate against schema
      const validate = this.ajv.compile(this.schema);
      const valid = validate(workflowData);

      if (valid) {
        this.validFiles++;
        console.log(`${colors.green}✓ ${filePath}${colors.reset}`);

        // Additional business logic validations
        this.performBusinessValidations(workflowData, filePath);
      } else {
        this.invalidFiles++;
        console.log(`${colors.red}✗ ${filePath}${colors.reset}`);
        this.printSchemaErrors(validate.errors, filePath, content);
      }
    } catch (error) {
      this.invalidFiles++;
      console.log(
        `${colors.red}✗ ${filePath} - File Error: ${error.message}${colors.reset}`
      );
      if (error.code === "ENOENT") {
        console.log(`    ${colors.red}File not found${colors.reset}`);
      } else if (error.code === "EACCES") {
        console.log(`    ${colors.red}Permission denied${colors.reset}`);
      }
    }
  }

  performBusinessValidations(workflow, filePath) {
    const warnings = [];

    // Check if all state references in transitions exist
    const stateKeys = workflow.attributes?.states?.map((s) => s.key) || [];
    const transitions = [];

    // Collect all transitions
    if (workflow.attributes?.startTransition) {
      transitions.push(workflow.attributes.startTransition);
    }

    if (workflow.attributes?.sharedTransitions) {
      transitions.push(...workflow.attributes.sharedTransitions);
    }

    workflow.attributes?.states?.forEach((state) => {
      if (state.transitions) {
        transitions.push(...state.transitions);
      }
    });

    // Validate state references
    transitions.forEach((transition) => {
      if (transition.target && !stateKeys.includes(transition.target)) {
        warnings.push(
          `Transition '${transition.key}' targets non-existent state '${transition.target}'`
        );
      }

      if (transition.from && !stateKeys.includes(transition.from)) {
        warnings.push(
          `Transition '${transition.key}' has non-existent source state '${transition.from}'`
        );
      }
    });

    // Check for unreachable states
    const reachableStates = new Set();
    if (workflow.attributes?.startTransition?.target) {
      reachableStates.add(workflow.attributes.startTransition.target);
    }

    const checkReachability = (stateKey) => {
      const state = workflow.attributes?.states?.find(
        (s) => s.key === stateKey
      );
      if (state?.transitions) {
        state.transitions.forEach((t) => {
          if (!reachableStates.has(t.target)) {
            reachableStates.add(t.target);
            checkReachability(t.target);
          }
        });
      }
    };

    reachableStates.forEach(checkReachability);

    stateKeys.forEach((stateKey) => {
      if (!reachableStates.has(stateKey)) {
        warnings.push(`State '${stateKey}' is unreachable`);
      }
    });

    // Check for duplicate keys
    const allKeys = [
      ...(workflow.attributes?.states?.map((s) => s.key) || []),
      ...(transitions.map((t) => t.key) || []),
    ];

    const duplicates = allKeys.filter(
      (key, index) => allKeys.indexOf(key) !== index
    );
    duplicates.forEach((key) => {
      warnings.push(`Duplicate key found: '${key}'`);
    });

    // Print warnings
    if (warnings.length > 0) {
      console.log(`${colors.yellow}  Warnings:${colors.reset}`);
      warnings.forEach((warning) => {
        console.log(`    ${colors.yellow}⚠ ${warning}${colors.reset}`);
      });
    }
  }

  printParseError(parseError, content, filePath) {
    console.log(`${colors.red}  JSON Parse Error:${colors.reset}`);

    // Extract line and column information from error message
    const lineMatch = parseError.message.match(/at position (\d+)/);
    const position = lineMatch ? parseInt(lineMatch[1]) : null;

    let lineNumber = 1;
    let columnNumber = 1;
    let lineContent = "";

    if (position !== null) {
      const lines = content.substring(0, position).split("\n");
      lineNumber = lines.length;
      columnNumber = lines[lines.length - 1].length + 1;

      // Get the problematic line
      const allLines = content.split("\n");
      lineContent = allLines[lineNumber - 1] || "";
    }

    console.log(
      `    ${colors.red}✗ Line: ${lineNumber}, Column: ${columnNumber}${colors.reset}`
    );
    console.log(
      `      ${colors.white}Error: ${parseError.message}${colors.reset}`
    );

    if (lineContent.trim()) {
      console.log(
        `      ${colors.yellow}Line content: ${lineContent.trim()}${
          colors.reset
        }`
      );

      // Show pointer to error location
      if (columnNumber > 0) {
        const pointer = " ".repeat(columnNumber - 1) + "^";
        console.log(
          `      ${colors.yellow}${" ".repeat(14)}${pointer}${colors.reset}`
        );
      }
    }

    // Common JSON syntax errors and suggestions
    this.printJsonSuggestions(parseError.message);
    console.log("");
  }

  printJsonSuggestions(errorMessage) {
    const suggestions = [];

    if (errorMessage.includes("Unexpected token")) {
      suggestions.push(
        "Check for missing or extra commas, brackets, or quotes"
      );
    }
    if (errorMessage.includes("Unexpected end")) {
      suggestions.push("Check for unclosed brackets or quotes");
    }
    if (errorMessage.includes("property name")) {
      suggestions.push(
        "Ensure all property names are enclosed in double quotes"
      );
    }
    if (errorMessage.includes("string")) {
      suggestions.push(
        "Check string formatting - use double quotes, not single quotes"
      );
    }

    if (suggestions.length > 0) {
      console.log(`      ${colors.cyan}Suggestions:${colors.reset}`);
      suggestions.forEach((suggestion) => {
        console.log(`        ${colors.cyan}• ${suggestion}${colors.reset}`);
      });
    }
  }

  printSchemaErrors(errors, filePath, content) {
    console.log(`${colors.red}  Schema Validation Errors:${colors.reset}`);

    const lines = content.split("\n");

    errors.forEach((error, index) => {
      const path = error.instancePath || "/";
      const message = error.message;
      const value =
        error.data !== undefined ? JSON.stringify(error.data) : "undefined";

      // Try to find line number for the error path
      const lineInfo = this.findLineForPath(path, content);

      console.log(
        `    ${colors.red}✗ Error ${index + 1}: ${path}${colors.reset}`
      );

      if (lineInfo.line > 0) {
        console.log(
          `      ${colors.white}Line: ${lineInfo.line}${colors.reset}`
        );
        if (lineInfo.content) {
          console.log(
            `      ${colors.yellow}Content: ${lineInfo.content.trim()}${
              colors.reset
            }`
          );
        }
      }

      console.log(`      ${colors.white}Issue: ${message}${colors.reset}`);

      // Show schema information
      if (error.schema && typeof error.schema === "object") {
        if (error.schema.enum) {
          console.log(
            `      ${colors.cyan}Allowed values: ${error.schema.enum.join(
              ", "
            )}${colors.reset}`
          );
        }
        if (error.schema.pattern) {
          console.log(
            `      ${colors.cyan}Required pattern: ${error.schema.pattern}${colors.reset}`
          );
        }
        if (error.schema.type) {
          console.log(
            `      ${colors.cyan}Expected type: ${error.schema.type}${colors.reset}`
          );
        }
      }

      if (error.data !== undefined && error.keyword !== "required") {
        console.log(
          `      ${colors.magenta}Current value: ${value}${colors.reset}`
        );
      }

      // Add suggestions based on error type
      this.printSchemaSuggestions(error);

      console.log("");
    });
  }

  findLineForPath(jsonPath, content) {
    if (!jsonPath || jsonPath === "/") {
      return { line: 1, content: "" };
    }

    try {
      const pathParts = jsonPath.split("/").filter((part) => part.length > 0);
      let currentPath = "";

      for (const part of pathParts) {
        currentPath += part;
        const regex = new RegExp(`"${part}"\\s*:`, "g");
        const lines = content.split("\n");

        for (let i = 0; i < lines.length; i++) {
          if (regex.test(lines[i])) {
            return { line: i + 1, content: lines[i] };
          }
        }
      }
    } catch (e) {
      // Fallback: just return line 1
    }

    return { line: 0, content: "" };
  }

  printSchemaSuggestions(error) {
    const suggestions = [];

    switch (error.keyword) {
      case "required":
        suggestions.push(
          `Add the required property: ${error.params?.missingProperty}`
        );
        break;
      case "enum":
        suggestions.push(
          `Use one of the allowed values from the dropdown in VS Code`
        );
        break;
      case "pattern":
        if (error.instancePath.includes("language")) {
          suggestions.push("Use format like: en, en-US, tr, tr-TR");
        } else if (error.instancePath.includes("version")) {
          suggestions.push("Use semantic version format: 1.0.0");
        } else if (error.instancePath.includes("key")) {
          suggestions.push("Use lowercase letters, numbers, and hyphens only");
        }
        break;
      case "type":
        suggestions.push(`Change value to ${error.schema?.type} type`);
        break;
      case "additionalProperties":
        suggestions.push("Remove unknown properties or check for typos");
        break;
    }

    if (suggestions.length > 0) {
      console.log(`      ${colors.cyan}Suggestions:${colors.reset}`);
      suggestions.forEach((suggestion) => {
        console.log(`        ${colors.cyan}• ${suggestion}${colors.reset}`);
      });
    }
  }

  findWorkflowFiles(directory) {
    const files = [];

    const scanDirectory = (dir) => {
      const items = fs.readdirSync(dir);

      items.forEach((item) => {
        const itemPath = path.join(dir, item);
        const stat = fs.statSync(itemPath);

        if (stat.isDirectory()) {
          scanDirectory(itemPath);
        } else if (this.isWorkflowFile(item)) {
          files.push(itemPath);
        }
      });
    };

    scanDirectory(directory);
    return files;
  }

  isWorkflowFile(filename) {
    return (
      filename.endsWith(".json") &&
      !filename.includes("package") &&
      !filename.includes("node_modules")
    );
  }

  printSummary() {
    console.log(`\n${colors.bright}=== Validation Summary ===${colors.reset}`);
    console.log(`Total files: ${this.totalFiles}`);
    console.log(`${colors.green}Valid: ${this.validFiles}${colors.reset}`);
    console.log(`${colors.red}Invalid: ${this.invalidFiles}${colors.reset}`);

    if (this.invalidFiles === 0) {
      console.log(
        `\n${colors.green}${colors.bright}🎉 All workflow files are valid!${colors.reset}`
      );
    } else {
      console.log(
        `\n${colors.red}${colors.bright}❌ ${this.invalidFiles} file(s) have validation errors${colors.reset}`
      );
      process.exit(1);
    }
  }

  async run(targetPath) {
    console.log(
      `${colors.cyan}${colors.bright}BBT Workflow JSON Validator${colors.reset}\n`
    );

    await this.loadSchema();

    let files = [];

    if (targetPath) {
      const stat = fs.statSync(targetPath);
      if (stat.isFile()) {
        files = [targetPath];
      } else if (stat.isDirectory()) {
        files = this.findWorkflowFiles(targetPath);
      }
    } else {
      // Default: scan examples directory
      const examplesPath = path.join(__dirname, "../examples");
      if (fs.existsSync(examplesPath)) {
        files = this.findWorkflowFiles(examplesPath);
      }
    }

    if (files.length === 0) {
      console.log(`${colors.yellow}No workflow files found${colors.reset}`);
      return;
    }

    console.log(
      `${colors.blue}Found ${files.length} workflow file(s)${colors.reset}\n`
    );

    files.forEach((file) => this.validateFile(file));

    this.printSummary();
  }
}

// CLI Usage
const args = process.argv.slice(2);
const targetPath = args[0];

const validator = new WorkflowValidator();
validator.run(targetPath).catch((error) => {
  console.error(`${colors.red}Fatal error: ${error.message}${colors.reset}`);
  process.exit(1);
});
