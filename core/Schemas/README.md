# Core Schema Definitions

This folder contains the fundamental schema definitions for the Amorphie platform.

## Schema List

### 📋 Foundation Schemas

- **schema.1.0.0.json** / **schema.1.1.0.json** - Meta-schema for schema definitions
- **reference.1.0.0.json** - Cross-domain reference mechanism
- **label.1.0.0.json** - Multi-language support (i18n)

### 🔄 Workflow Components

- **workflow.1.0.0.json** - Workflow definitions
- **state.1.0.0.json** - Workflow state definitions
- **transition.1.0.0.json** - State transition definitions
- **version-strategy.1.0.0.json** - Version management strategies

### 💻 Task and Code

- **task.1.0.0.json** - Dapr binding task definitions
- **code.1.0.0.json** - Executable code definitions
- **mapping.1.0.0.json** - Data transformation definitions

### 🎨 UI Components

- **view.1.0.0.json** - User interface definitions

## Usage Examples

### Schema Instance Pattern (Platform Managed)

Schema instances MUST include platform-managed properties and MUST NOT include business logic properties:

```json
{
  "key": "user-profile",
  "version": "1.0.0",
  "domain": "idms",
  "flow": "user-management",
  "flowVersion": "1.0.0",
  "tags": ["user", "profile"],
  "attributes": {
    // Schema definition here
  }
}
```

### Reference Pattern

References use domain + workflow + (id OR key) + optional version:

```json
{
  "key": "user-state",
  "domain": "idms",
  "flow": "state",
  "version": "1.0.0"
}
```

### Business Process with Labels

State and Transition definitions MUST include labels for i18n:

```json
{
  "key": "pending-approval",
  "labels": [
    { "label": "Pending Approval", "language": "en-US" },
    { "label": "Onay Bekliyor", "language": "tr-TR" }
  ],
  "transitions": [
    // Transition definitions
  ]
}
```

### Local File References

Always use local file references with #/attributes:

```json
{
  "modelSchema": {
    "$ref": "reference.1.0.0.json#/attributes"
  }
}
```

## Standard Workflow Lifecycle Pattern

### 3-State Pattern

All lifecycle workflows must implement:

- **draft** (type: "start") - Initial state
- **active** (type: "normal") - Active state
- **passive** (type: "finish") - Final state

### Standard Transitions

- **create-\*** → Entry to draft state
- **activate** → draft to active
- **delete** → Delete in draft state
- **deactivate** → active to passive
- **update** → Update in active state
- **reactivate** → passive to active
- **archive** → Archive in passive state

## Important Rules

1. **Instance Wrapper Pattern**: All schema instances use the base structure with platform-managed properties
2. **Label Usage**: Business logic definitions (State, Transition, Workflow) include labels for i18n
3. **Reference Pattern**: Works like foreign keys, uses workflow field as type indicator (no separate type property)
4. **Versioning**: Semantic versioning (major.minor.patch) is mandatory
5. **File Naming**: Must match `key.version.json` pattern exactly
6. **Local References**: Always use local file references with `#/attributes`, never external URLs
7. **Schema Separation**: Platform properties (key, version, domain) vs Business properties (labels, conditions)

## JSON Schema Standards

### Enum Pattern

Use oneOf + const + description instead of enum arrays:

```json
"status": {
  "oneOf": [
    {"const": "active", "description": "Active status"},
    {"const": "inactive", "description": "Inactive status"}
  ]
}
```

### Required Properties

Always define required fields explicitly in schema definitions.

## Cross-Domain Architecture

The schema system supports cross-domain references enabling:

- Domain isolation
- Workflow-based organization
- Version-controlled evolution
- Semantic reference resolution
