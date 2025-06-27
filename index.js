/**
 * @amorphie/definition-core
 *
 * Main entry point for the Amorphie Definition Core package
 * Provides access to core schemas, workflow definitions, and developer tools
 */

const fs = require("fs");
const path = require("path");

/**
 * Get the Core schemas directory path
 */
function getCoreSchemaPath() {
  return path.join(__dirname, "Core");
}

/**
 * Get all available schemas
 */
function getAvailableSchemas() {
  const coreDir = getCoreSchemaPath();
  const schemaDir = path.join(coreDir, "Schema");

  if (!fs.existsSync(schemaDir)) {
    return [];
  }

  return fs
    .readdirSync(schemaDir)
    .filter((file) => file.endsWith(".json"))
    .map((file) => ({
      name: file.replace(".json", ""),
      path: path.join(schemaDir, file),
      version: file.match(/\.(\d+\.\d+\.\d+)\.json$/)?.[1] || "1.0.0",
    }));
}

/**
 * Load a specific schema by name and version
 */
function loadSchema(name, version = "latest") {
  const schemas = getAvailableSchemas();

  let schema;
  if (version === "latest") {
    // Find the latest version
    const namedSchemas = schemas.filter((s) => s.name.startsWith(name));
    if (namedSchemas.length === 0) {
      throw new Error(`Schema '${name}' not found`);
    }

    schema = namedSchemas.sort((a, b) => {
      const versionA = a.version.split(".").map(Number);
      const versionB = b.version.split(".").map(Number);

      for (let i = 0; i < 3; i++) {
        if (versionA[i] !== versionB[i]) {
          return versionB[i] - versionA[i];
        }
      }
      return 0;
    })[0];
  } else {
    schema = schemas.find((s) => s.name === `${name}.${version}`);
  }

  if (!schema) {
    throw new Error(`Schema '${name}' version '${version}' not found`);
  }

  return JSON.parse(fs.readFileSync(schema.path, "utf8"));
}

/**
 * Get all available workflows
 */
function getAvailableWorkflows() {
  const coreDir = getCoreSchemaPath();
  const workflowDir = path.join(path.dirname(coreDir), "Workflow");

  if (!fs.existsSync(workflowDir)) {
    return [];
  }

  return fs
    .readdirSync(workflowDir)
    .filter((file) => file.endsWith(".json"))
    .map((file) => ({
      name: file.replace(".json", ""),
      path: path.join(workflowDir, file),
      version: file.match(/\.(\d+\.\d+\.\d+)\.json$/)?.[1] || "1.0.0",
    }));
}

/**
 * Load a specific workflow by name and version
 */
function loadWorkflow(name, version = "latest") {
  const workflows = getAvailableWorkflows();

  let workflow;
  if (version === "latest") {
    const namedWorkflows = workflows.filter((w) => w.name.startsWith(name));
    if (namedWorkflows.length === 0) {
      throw new Error(`Workflow '${name}' not found`);
    }

    workflow = namedWorkflows.sort((a, b) => {
      const versionA = a.version.split(".").map(Number);
      const versionB = b.version.split(".").map(Number);

      for (let i = 0; i < 3; i++) {
        if (versionA[i] !== versionB[i]) {
          return versionB[i] - versionA[i];
        }
      }
      return 0;
    })[0];
  } else {
    workflow = workflows.find((w) => w.name === `${name}.${version}`);
  }

  if (!workflow) {
    throw new Error(`Workflow '${name}' version '${version}' not found`);
  }

  return JSON.parse(fs.readFileSync(workflow.path, "utf8"));
}

/**
 * Validate a definition against its schema
 */
function validateDefinition(definition, schemaName) {
  // This would integrate with the validation scripts
  const validationScript = path.join(
    __dirname,
    ".vscode",
    "scripts",
    "validate-workflow.js"
  );

  if (!fs.existsSync(validationScript)) {
    console.warn("Validation script not found. Skipping validation.");
    return { valid: true, warnings: ["Validation script not available"] };
  }

  // For now, return a basic validation
  // TODO: Integrate with actual validation logic
  return {
    valid: definition && typeof definition === "object",
    errors: [],
    warnings: [],
  };
}

module.exports = {
  // Schema operations
  getCoreSchemaPath,
  getAvailableSchemas,
  loadSchema,

  // Workflow operations
  getAvailableWorkflows,
  loadWorkflow,

  // Validation
  validateDefinition,

  // Version info
  version: require("./package.json").version,

  // Paths
  paths: {
    core: getCoreSchemaPath(),
    vscode: path.join(__dirname, ".vscode"),
    examples: path.join(__dirname, ".vscode", "examples"),
  },
};
