# @amorphie/definition-core Documentation

Amorphie platform core definitions

## 📊 Statistics

- **Total Definitions:** 17
- **Domains:** 1 (Core)
- **Flows:** 3 (Workflow, View, Schema)
- **Tags:** 26

## 📂 Categories

- [Workflow](Workflow.md) (5 definitions)
- [View](View.md) (1 definitions)
- [Schema](Schema.md) (11 definitions)

## 📋 All Definitions


### Workflow v1.0.0

- **Domain:** Core
- **Flow:** Workflow
- **File:** `Core/Workflow/Workflow.1.0.0.json`
- **Description:** No description
- **Tags:** Core, Workflow, Lifecycle, Repository, Meta

```json
{
  "timeout": null,
  "type": "flow",
  "labels": {
    "en": "Workflow Lifecycle Management",
    "tr": "İş Akışı Yaşam Döngüsü Yönetimi"
  },
  "functions": [],
  "sharedTransitions": [],
  "extensions": [],
  "features": [],
  "startTransition": {
    "key": "create-workflow",
    "target": "draft",
    "labels": {
      "en": "Create Workflow",
      "tr": "İş Akışı Oluştur"
    },
    "versionStrategy": {
      "strategy": "noAction"
    },
    "schema": {
      "key": "workflow-creation-input",
      "domain": "Core",
      "workflow": "Workflow",
      "version": "1.0.0"
    },
    "onExecute": [],
    "views": [],
    "type": "forward"
  },
  "states": [
    {
      "key": "draft",
      "labels": {
        "en": "Draft State",
        "tr": "Taslak Durumu"
      },
      "transitions": [
        {
          "key": "activate",
          "target": "active",
          "labels": {
            "en": "Activate Workflow",
            "tr": "İş Akışını Aktifleştir"
          },
          "versionStrategy": {
            "strategy": "noAction"
          },
          "onExecute": [],
          "views": [],
          "type": "forward"
        },
        {
          "key": "delete",
          "target": null,
          "labels": {
            "en": "Delete Draft",
            "tr": "Taslağı Sil"
          },
          "versionStrategy": {
            "strategy": "noAction"
          },
          "onExecute": [],
          "views": [],
          "type": "self"
        }
      ],
      "views": [],
      "responses": [],
      "onFirstEntry": [],
      "onFirstExit": [],
      "onEntry": [],
      "onExit": [],
      "versionStrategy": {
        "strategy": "noAction"
      },
      "type": "start"
    },
    {
      "key": "active",
      "labels": {
        "en": "Active State",
        "tr": "Aktif Durumu"
      },
      "transitions": [
        {
          "key": "deactivate",
          "target": "passive",
          "labels": {
            "en": "Deactivate Workflow",
            "tr": "İş Akışını Pasifleştir"
          },
          "versionStrategy": {
            "strategy": "noAction"
          },
          "onExecute": [],
          "views": [],
          "type": "forward"
        },
        {
          "key": "update",
          "target": "active",
          "labels": {
            "en": "Update Workflow",
            "tr": "İş Akışını Güncelle"
          },
          "versionStrategy": {
            "strategy": "noAction"
          },
          "onExecute": [],
          "views": [],
          "type": "self"
        }
      ],
      "views": [],
      "responses": [],
      "onFirstEntry": [],
      "onFirstExit": [],
      "onEntry": [],
      "onExit": [],
      "versionStrategy": {
        "strategy": "noAction"
      },
      "type": "normal"
    },
    {
      "key": "passive",
      "labels": {
        "en": "Passive State",
        "tr": "Pasif Durumu"
      },
      "transitions": [
        {
          "key": "reactivate",
          "target": "active",
          "labels": {
            "en": "Reactivate Workflow",
            "tr": "İş Akışını Yeniden Aktifleştir"
          },
          "versionStrategy": {
            "strategy": "noAction"
          },
          "onExecute": [],
          "views": [],
          "type": "forward"
        },
        {
          "key": "archive",
          "target": null,
          "labels": {
            "en": "Archive Workflow",
            "tr": "İş Akışını Arşivle"
          },
          "versionStrategy": {
            "strategy": "noAction"
          },
          "onExecute": [],
          "views": [],
          "type": "self"
        }
      ],
      "views": [],
      "responses": [],
      "onFirstEntry": [],
      "onFirstExit": [],
      "onEntry": [],
      "onExit": [],
      "versionStrategy": {
        "strategy": "noAction"
      },
      "type": "finish"
    }
  ],
  "modelSchema": {
    "key": "Workflow",
    "domain": "Core",
    "workflow": "Schema",
    "version": "1.0.0"
  }
}
```

---

### View v1.0.0

- **Domain:** Core
- **Flow:** Workflow
- **File:** `Core/Workflow/View.1.0.0.json`
- **Description:** No description
- **Tags:** Core, View, Lifecycle, Repository

```json
{
  "timeout": null,
  "type": "flow",
  "labels": {
    "en": "View Lifecycle Management",
    "tr": "Görünüm Yaşam Döngüsü Yönetimi"
  },
  "functions": [],
  "sharedTransitions": [],
  "extensions": [],
  "features": [],
  "startTransition": {
    "key": "create-view",
    "target": "draft",
    "labels": {
      "en": "Create View",
      "tr": "Görünüm Oluştur"
    },
    "versionStrategy": {
      "strategy": "noAction"
    },
    "schema": {
      "key": "view-creation-input",
      "domain": "Core",
      "workflow": "View",
      "version": "1.0.0"
    },
    "onExecute": [],
    "views": [],
    "type": "forward"
  },
  "states": [
    {
      "key": "draft",
      "labels": {
        "en": "Draft State",
        "tr": "Taslak Durumu"
      },
      "transitions": [
        {
          "key": "activate",
          "target": "active",
          "labels": {
            "en": "Activate View",
            "tr": "Görünümü Aktifleştir"
          },
          "versionStrategy": {
            "strategy": "noAction"
          },
          "onExecute": [],
          "views": [],
          "type": "forward"
        },
        {
          "key": "delete",
          "target": null,
          "labels": {
            "en": "Delete Draft",
            "tr": "Taslağı Sil"
          },
          "versionStrategy": {
            "strategy": "noAction"
          },
          "onExecute": [],
          "views": [],
          "type": "self"
        }
      ],
      "views": [],
      "responses": [],
      "onFirstEntry": [],
      "onFirstExit": [],
      "onEntry": [],
      "onExit": [],
      "versionStrategy": {
        "strategy": "noAction"
      },
      "type": "start"
    },
    {
      "key": "active",
      "labels": {
        "en": "Active State",
        "tr": "Aktif Durumu"
      },
      "transitions": [
        {
          "key": "deactivate",
          "target": "passive",
          "labels": {
            "en": "Deactivate View",
            "tr": "Görünümü Pasifleştir"
          },
          "versionStrategy": {
            "strategy": "noAction"
          },
          "onExecute": [],
          "views": [],
          "type": "forward"
        },
        {
          "key": "update",
          "target": "active",
          "labels": {
            "en": "Update View",
            "tr": "Görünümü Güncelle"
          },
          "versionStrategy": {
            "strategy": "noAction"
          },
          "onExecute": [],
          "views": [],
          "type": "self"
        }
      ],
      "views": [],
      "responses": [],
      "onFirstEntry": [],
      "onFirstExit": [],
      "onEntry": [],
      "onExit": [],
      "versionStrategy": {
        "strategy": "noAction"
      },
      "type": "normal"
    },
    {
      "key": "passive",
      "labels": {
        "en": "Passive State",
        "tr": "Pasif Durumu"
      },
      "transitions": [
        {
          "key": "reactivate",
          "target": "active",
          "labels": {
            "en": "Reactivate View",
            "tr": "Görünümü Yeniden Aktifleştir"
          },
          "versionStrategy": {
            "strategy": "noAction"
          },
          "onExecute": [],
          "views": [],
          "type": "forward"
        },
        {
          "key": "archive",
          "target": null,
          "labels": {
            "en": "Archive View",
            "tr": "Görünümü Arşivle"
          },
          "versionStrategy": {
            "strategy": "noAction"
          },
          "onExecute": [],
          "views": [],
          "type": "self"
        }
      ],
      "views": [],
      "responses": [],
      "onFirstEntry": [],
      "onFirstExit": [],
      "onEntry": [],
      "onExit": [],
      "versionStrategy": {
        "strategy": "noAction"
      },
      "type": "finish"
    }
  ],
  "modelSchema": {
    "key": "View",
    "domain": "Core",
    "workflow": "Schema",
    "version": "1.0.0"
  }
}
```

---

### Task v1.0.0

- **Domain:** Core
- **Flow:** Workflow
- **File:** `Core/Workflow/Task.1.0.0.json`
- **Description:** No description
- **Tags:** Core, Task, Lifecycle, Repository

```json
{
  "timeout": null,
  "type": "flow",
  "labels": {
    "en": "Task Lifecycle Management",
    "tr": "Görev Yaşam Döngüsü Yönetimi"
  },
  "functions": [],
  "sharedTransitions": [],
  "extensions": [],
  "features": [],
  "startTransition": {
    "key": "create-task",
    "target": "draft",
    "labels": {
      "en": "Create Task",
      "tr": "Görev Oluştur"
    },
    "versionStrategy": {
      "strategy": "noAction"
    },
    "schema": {
      "key": "task-creation-input",
      "domain": "Core",
      "workflow": "Task",
      "version": "1.0.0"
    },
    "onExecute": [],
    "views": [],
    "type": "forward"
  },
  "states": [
    {
      "key": "draft",
      "labels": {
        "en": "Draft State",
        "tr": "Taslak Durumu"
      },
      "transitions": [
        {
          "key": "activate",
          "target": "active",
          "labels": {
            "en": "Activate Task",
            "tr": "Görevi Aktifleştir"
          },
          "versionStrategy": {
            "strategy": "noAction"
          },
          "onExecute": [],
          "views": [],
          "type": "forward"
        },
        {
          "key": "delete",
          "target": null,
          "labels": {
            "en": "Delete Draft",
            "tr": "Taslağı Sil"
          },
          "versionStrategy": {
            "strategy": "noAction"
          },
          "onExecute": [],
          "views": [],
          "type": "self"
        }
      ],
      "views": [],
      "responses": [],
      "onFirstEntry": [],
      "onFirstExit": [],
      "onEntry": [],
      "onExit": [],
      "versionStrategy": {
        "strategy": "noAction"
      },
      "type": "start"
    },
    {
      "key": "active",
      "labels": {
        "en": "Active State",
        "tr": "Aktif Durumu"
      },
      "transitions": [
        {
          "key": "deactivate",
          "target": "passive",
          "labels": {
            "en": "Deactivate Task",
            "tr": "Görevi Pasifleştir"
          },
          "versionStrategy": {
            "strategy": "noAction"
          },
          "onExecute": [],
          "views": [],
          "type": "forward"
        },
        {
          "key": "update",
          "target": "active",
          "labels": {
            "en": "Update Task",
            "tr": "Görevi Güncelle"
          },
          "versionStrategy": {
            "strategy": "noAction"
          },
          "onExecute": [],
          "views": [],
          "type": "self"
        }
      ],
      "views": [],
      "responses": [],
      "onFirstEntry": [],
      "onFirstExit": [],
      "onEntry": [],
      "onExit": [],
      "versionStrategy": {
        "strategy": "noAction"
      },
      "type": "normal"
    },
    {
      "key": "passive",
      "labels": {
        "en": "Passive State",
        "tr": "Pasif Durumu"
      },
      "transitions": [
        {
          "key": "reactivate",
          "target": "active",
          "labels": {
            "en": "Reactivate Task",
            "tr": "Görevi Yeniden Aktifleştir"
          },
          "versionStrategy": {
            "strategy": "noAction"
          },
          "onExecute": [],
          "views": [],
          "type": "forward"
        },
        {
          "key": "archive",
          "target": null,
          "labels": {
            "en": "Archive Task",
            "tr": "Görevi Arşivle"
          },
          "versionStrategy": {
            "strategy": "noAction"
          },
          "onExecute": [],
          "views": [],
          "type": "self"
        }
      ],
      "views": [],
      "responses": [],
      "onFirstEntry": [],
      "onFirstExit": [],
      "onEntry": [],
      "onExit": [],
      "versionStrategy": {
        "strategy": "noAction"
      },
      "type": "finish"
    }
  ],
  "modelSchema": {
    "key": "Task",
    "domain": "Core",
    "workflow": "Schema",
    "version": "1.0.0"
  }
}
```

---

### Schema v1.0.0

- **Domain:** Core
- **Flow:** Workflow
- **File:** `Core/Workflow/Schema.1.0.0.json`
- **Description:** No description
- **Tags:** Core, Schema, Lifecycle, Repository

```json
{
  "timeout": null,
  "type": "flow",
  "labels": {
    "en": "Schema Lifecycle Management",
    "tr": "Şema Yaşam Döngüsü Yönetimi"
  },
  "functions": [],
  "sharedTransitions": [],
  "extensions": [],
  "features": [],
  "startTransition": {
    "key": "create-schema",
    "target": "draft",
    "labels": {
      "en": "Create Schema",
      "tr": "Şema Oluştur"
    },
    "versionStrategy": {
      "strategy": "noAction"
    },
    "schema": {
      "key": "schema-creation-input",
      "domain": "Core",
      "workflow": "Schema",
      "version": "1.0.0"
    },
    "onExecute": [],
    "views": [],
    "type": "forward"
  },
  "states": [
    {
      "key": "draft",
      "labels": {
        "en": "Draft State",
        "tr": "Taslak Durumu"
      },
      "transitions": [
        {
          "key": "activate",
          "target": "active",
          "labels": {
            "en": "Activate Schema",
            "tr": "Şemayı Aktifleştir"
          },
          "versionStrategy": {
            "strategy": "noAction"
          },
          "onExecute": [],
          "views": [],
          "type": "forward"
        },
        {
          "key": "delete",
          "target": null,
          "labels": {
            "en": "Delete Draft",
            "tr": "Taslağı Sil"
          },
          "versionStrategy": {
            "strategy": "noAction"
          },
          "onExecute": [],
          "views": [],
          "type": "self"
        }
      ],
      "views": [
        {
          "key": "SchemaFullView",
          "domain": "Core",
          "workflow": "View",
          "version": "1.0.0"
        }
      ],
      "responses": [],
      "onFirstEntry": [],
      "onFirstExit": [],
      "onEntry": [],
      "onExit": [],
      "versionStrategy": {
        "strategy": "noAction"
      },
      "type": "start"
    },
    {
      "key": "active",
      "labels": {
        "en": "Active State",
        "tr": "Aktif Durumu"
      },
      "transitions": [
        {
          "key": "deactivate",
          "target": "passive",
          "labels": {
            "en": "Deactivate Schema",
            "tr": "Şemayı Pasifleştir"
          },
          "versionStrategy": {
            "strategy": "noAction"
          },
          "onExecute": [],
          "views": [],
          "type": "forward"
        },
        {
          "key": "update",
          "target": "active",
          "labels": {
            "en": "Update Schema",
            "tr": "Şemayı Güncelle"
          },
          "versionStrategy": {
            "strategy": "noAction"
          },
          "onExecute": [],
          "views": [],
          "type": "self"
        }
      ],
      "views": [
        {
          "key": "SchemaFullView",
          "domain": "Core",
          "workflow": "View",
          "version": "1.0.0"
        }
      ],
      "responses": [],
      "onFirstEntry": [],
      "onFirstExit": [],
      "onEntry": [],
      "onExit": [],
      "versionStrategy": {
        "strategy": "noAction"
      },
      "type": "normal"
    },
    {
      "key": "passive",
      "labels": {
        "en": "Passive State",
        "tr": "Pasif Durumu"
      },
      "transitions": [
        {
          "key": "reactivate",
          "target": "active",
          "labels": {
            "en": "Reactivate Schema",
            "tr": "Şemayı Yeniden Aktifleştir"
          },
          "versionStrategy": {
            "strategy": "noAction"
          },
          "onExecute": [],
          "views": [],
          "type": "forward"
        },
        {
          "key": "archive",
          "target": null,
          "labels": {
            "en": "Archive Schema",
            "tr": "Şemayı Arşivle"
          },
          "versionStrategy": {
            "strategy": "noAction"
          },
          "onExecute": [],
          "views": [],
          "type": "self"
        }
      ],
      "views": [
        {
          "key": "SchemaFullView",
          "domain": "Core",
          "workflow": "View",
          "version": "1.0.0"
        }
      ],
      "responses": [],
      "onFirstEntry": [],
      "onFirstExit": [],
      "onEntry": [],
      "onExit": [],
      "versionStrategy": {
        "strategy": "noAction"
      },
      "type": "finish"
    }
  ],
  "modelSchema": {
    "key": "Schema",
    "domain": "Core",
    "workflow": "Schema",
    "version": "1.0.0"
  }
}
```

---

### Function v1.0.0

- **Domain:** Core
- **Flow:** Workflow
- **File:** `Core/Workflow/Function.1.0.0.json`
- **Description:** No description
- **Tags:** Core, Function, Lifecycle, Repository

```json
{
  "timeout": null,
  "type": "flow",
  "labels": {
    "en": "Function Lifecycle Management",
    "tr": "Fonksiyon Yaşam Döngüsü Yönetimi"
  },
  "functions": [],
  "sharedTransitions": [],
  "extensions": [],
  "features": [],
  "startTransition": {
    "key": "create-function",
    "target": "draft",
    "labels": {
      "en": "Create Function",
      "tr": "Fonksiyon Oluştur"
    },
    "versionStrategy": {
      "strategy": "noAction"
    },
    "schema": {
      "key": "function-creation-input",
      "domain": "Core",
      "workflow": "Function",
      "version": "1.0.0"
    },
    "onExecute": [],
    "views": [],
    "type": "forward"
  },
  "states": [
    {
      "key": "draft",
      "labels": {
        "en": "Draft State",
        "tr": "Taslak Durumu"
      },
      "transitions": [
        {
          "key": "activate",
          "target": "active",
          "labels": {
            "en": "Activate Function",
            "tr": "Fonksiyonu Aktifleştir"
          },
          "versionStrategy": {
            "strategy": "noAction"
          },
          "onExecute": [],
          "views": [],
          "type": "forward"
        },
        {
          "key": "delete",
          "target": null,
          "labels": {
            "en": "Delete Draft",
            "tr": "Taslağı Sil"
          },
          "versionStrategy": {
            "strategy": "noAction"
          },
          "onExecute": [],
          "views": [],
          "type": "self"
        }
      ],
      "views": [],
      "responses": [],
      "onFirstEntry": [],
      "onFirstExit": [],
      "onEntry": [],
      "onExit": [],
      "versionStrategy": {
        "strategy": "noAction"
      },
      "type": "start"
    },
    {
      "key": "active",
      "labels": {
        "en": "Active State",
        "tr": "Aktif Durumu"
      },
      "transitions": [
        {
          "key": "deactivate",
          "target": "passive",
          "labels": {
            "en": "Deactivate Function",
            "tr": "Fonksiyonu Pasifleştir"
          },
          "versionStrategy": {
            "strategy": "noAction"
          },
          "onExecute": [],
          "views": [],
          "type": "forward"
        },
        {
          "key": "update",
          "target": "active",
          "labels": {
            "en": "Update Function",
            "tr": "Fonksiyonu Güncelle"
          },
          "versionStrategy": {
            "strategy": "noAction"
          },
          "onExecute": [],
          "views": [],
          "type": "self"
        }
      ],
      "views": [],
      "responses": [],
      "onFirstEntry": [],
      "onFirstExit": [],
      "onEntry": [],
      "onExit": [],
      "versionStrategy": {
        "strategy": "noAction"
      },
      "type": "normal"
    },
    {
      "key": "passive",
      "labels": {
        "en": "Passive State",
        "tr": "Pasif Durumu"
      },
      "transitions": [
        {
          "key": "reactivate",
          "target": "active",
          "labels": {
            "en": "Reactivate Function",
            "tr": "Fonksiyonu Yeniden Aktifleştir"
          },
          "versionStrategy": {
            "strategy": "noAction"
          },
          "onExecute": [],
          "views": [],
          "type": "forward"
        },
        {
          "key": "archive",
          "target": null,
          "labels": {
            "en": "Archive Function",
            "tr": "Fonksiyonu Arşivle"
          },
          "versionStrategy": {
            "strategy": "noAction"
          },
          "onExecute": [],
          "views": [],
          "type": "self"
        }
      ],
      "views": [],
      "responses": [],
      "onFirstEntry": [],
      "onFirstExit": [],
      "onEntry": [],
      "onExit": [],
      "versionStrategy": {
        "strategy": "noAction"
      },
      "type": "finish"
    }
  ],
  "modelSchema": {
    "key": "Function",
    "domain": "Core",
    "workflow": "Schema",
    "version": "1.0.0"
  }
}
```

---

### SchemaFullView v1.0.0

- **Domain:** Core
- **Flow:** View
- **File:** `Core/View/SchemaFullView.1.0.0.json`
- **Description:** No description
- **Tags:** Core, View, Schema, FullPage

```json
{
  "type": "dynamic-flutter",
  "display": "full-page",
  "content": "",
  "labels": {
    "en": "Schema Management View",
    "tr": "Şema Yönetimi Görünümü"
  },
  "metadata": {
    "dismissible": false,
    "backdrop": true,
    "animation": "slide"
  }
}
```

---

### Workflow v1.0.0

- **Domain:** Core
- **Flow:** Schema
- **File:** `Core/Schema/Workflow.1.0.0.json`
- **Description:** Amorphie platformunda iş akışı tanımlarını yapılandıran şema. Sadece workflow attributes yapısını tanımlar.
- **Tags:** Core, Workflow, StateMachine, Schema

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://schemas.amorphie.com/core/workflow.json",
  "title": "Workflow Definition",
  "description": "Amorphie platformunda iş akışı tanımlarını yapılandıran şema. Sadece workflow attributes yapısını tanımlar.",
  "type": "object",
  "properties": {
    "timeout": {
      "$ref": "Transition.1.0.0.json#/attributes",
      "description": "Workflow genel timeout tanımı"
    },
    "type": {
      "oneOf": [
        {
          "const": "flow",
          "description": "Ana iş akışı türü"
        },
        {
          "const": "subflow",
          "description": "Alt iş akışı türü"
        },
        {
          "const": "process",
          "description": "İş süreci türü"
        }
      ],
      "description": "Workflow'un türü"
    },
    "labels": {
      "$ref": "Label.1.0.0.json#/attributes",
      "description": "Workflow'un çoklu dil etiketleri"
    },
    "functions": {
      "type": "array",
      "items": {
        "$ref": "Reference.1.0.0.json#/attributes"
      },
      "description": "Workflow ile ilişkili function referansları"
    },
    "sharedTransitions": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "transition": {
            "$ref": "Transition.1.0.0.json#/attributes",
            "description": "Paylaşılan transition tanımı"
          },
          "availableIn": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "description": "Bu transition'ın kullanılabileceği state'lerin listesi"
          }
        },
        "required": [
          "transition",
          "availableIn"
        ],
        "additionalProperties": false
      },
      "description": "Birden fazla state'de kullanılabilecek ortak transition'lar"
    },
    "extensions": {
      "type": "array",
      "items": {
        "$ref": "Reference.1.0.0.json#/attributes"
      },
      "description": "Workflow ile ilişkili extension referansları"
    },
    "features": {
      "type": "array",
      "items": {
        "$ref": "Reference.1.0.0.json#/attributes"
      },
      "description": "Workflow ile ilişkili feature referansları"
    },
    "startTransition": {
      "$ref": "Transition.1.0.0.json#/attributes",
      "description": "Workflow'u başlatan initial transition"
    },
    "states": {
      "type": "array",
      "items": {
        "$ref": "State.1.0.0.json#/attributes"
      },
      "description": "Workflow'u oluşturan state'lerin listesi"
    },
    "modelSchema": {
      "$ref": "Reference.1.0.0.json#/attributes",
      "description": "Workflow'un kullandığı veri model şemasının referansı"
    }
  },
  "required": [
    "timeout",
    "type",
    "labels",
    "functions",
    "sharedTransitions",
    "features",
    "startTransition",
    "states",
    "modelSchema"
  ],
  "additionalProperties": false
}
```

---

### View v1.0.0

- **Domain:** Core
- **Flow:** Schema
- **File:** `Core/Schema/View.1.0.0.json`
- **Description:** Amorphie platformunda kullanıcı arayüzü view tanımları için şema. Dinamik UI render edilebilir içerik ve gösterim şekli bilgilerini içerir.
- **Tags:** Core, Schema, View, UI

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://schemas.amorphie.com/core/view.json",
  "title": "View Definition",
  "description": "Amorphie platformunda kullanıcı arayüzü view tanımları için şema. Dinamik UI render edilebilir içerik ve gösterim şekli bilgilerini içerir.",
  "type": "object",
  "properties": {
    "type": {
      "type": "string",
      "description": "View'in render teknolojisi veya türü",
      "oneOf": [
        {
          "const": "dynamic-flutter",
          "description": "Flutter ile dinamik render edilecek view"
        },
        {
          "const": "dynamic-html",
          "description": "HTML olarak dinamik render edilecek view"
        },
        {
          "const": "static-html",
          "description": "Statik HTML içerik"
        },
        {
          "const": "native",
          "description": "Platform native view referansı"
        }
      ]
    },
    "display": {
      "type": "string",
      "description": "View'in ekranda gösterim şekli",
      "oneOf": [
        {
          "const": "full-page",
          "description": "Tam sayfa olarak gösterilir"
        },
        {
          "const": "popup",
          "description": "Popup/modal olarak gösterilir"
        },
        {
          "const": "bottom-sheet",
          "description": "Alt taraftan açılan sheet olarak gösterilir"
        },
        {
          "const": "top-sheet",
          "description": "Üst taraftan açılan sheet olarak gösterilir"
        },
        {
          "const": "drawer",
          "description": "Yan menü/drawer olarak gösterilir"
        },
        {
          "const": "inline",
          "description": "Sayfa içinde inline olarak gösterilir"
        }
      ]
    },
    "content": {
      "type": "string",
      "description": "View'in render edilecek içeriği. Flutter/HTML/Native kod içerir."
    },
    "metadata": {
      "type": "object",
      "description": "View'e özgü ek metadata bilgileri",
      "properties": {
        "minHeight": {
          "type": "integer",
          "description": "Minimum yükseklik (pixel)"
        },
        "maxHeight": {
          "type": "integer",
          "description": "Maksimum yükseklik (pixel)"
        },
        "dismissible": {
          "type": "boolean",
          "description": "Kullanıcı tarafından kapatılabilir mi?"
        },
        "backdrop": {
          "type": "boolean",
          "description": "Arka plan gösterilsin mi?"
        },
        "animation": {
          "type": "string",
          "description": "Açılış/kapanış animasyon türü"
        }
      },
      "additionalProperties": true
    },
    "labels": {
      "$ref": "Label.1.0.0.json#/attributes",
      "description": "View'in çoklu dil başlıkları"
    }
  },
  "required": [
    "type",
    "display",
    "content"
  ],
  "additionalProperties": false
}
```

---

### VersionStrategy v1.0.0

- **Domain:** Core
- **Flow:** Schema
- **File:** `Core/Schema/VersionStrategy.1.0.0.json`
- **Description:** İş akışı geçişlerinde kullanılan versiyon artırma stratejisi
- **Tags:** Core, Schema, VersionStrategy

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://schemas.amorphie.com/core/version-strategy.json",
  "title": "Version Strategy",
  "description": "İş akışı geçişlerinde kullanılan versiyon artırma stratejisi",
  "type": "string",
  "oneOf": [
    {
      "const": "noAction",
      "description": "Version olusturmaz"
    },
    {
      "const": "increaseMinor",
      "description": "Sadece minor versiyonu arttir ve patch versiyonu sifirlar."
    },
    {
      "const": "increaseMajor",
      "description": "Major versiyonu arttirir ve minor versiyonu sifirlar."
    },
    {
      "const": "increasePatch",
      "description": "Sadece patch versiyonunu arttirir."
    }
  ]
}
```

---

### Transition v1.0.0

- **Domain:** Core
- **Flow:** Schema
- **File:** `Core/Schema/Transition.1.0.0.json`
- **Description:** İş akışında state'ler arası geçişi tanımlayan şema. Kullanıcı etkileşimi, otomatik tetikleme ve veri validasyonu içerir.
- **Tags:** Core, Schema, Transition, Workflow

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://schemas.amorphie.com/core/transition.json",
  "title": "Transition",
  "description": "İş akışında state'ler arası geçişi tanımlayan şema. Kullanıcı etkileşimi, otomatik tetikleme ve veri validasyonu içerir.",
  "type": "object",
  "properties": {
    "key": {
      "type": "string",
      "description": "Geçişin anahtar değeri. Geçiş talebinde kullanılır ve akış özelinde tekildir.",
      "pattern": "^[a-z0-9-_]+$"
    },
    "target": {
      "type": [
        "string",
        "null"
      ],
      "description": "Geçiş başarılı tamamlandığında erişeceği state key'i. Null ise bulunduğu state kabul edilir (type=self)."
    },
    "labels": {
      "$ref": "Label.1.0.0.json#/attributes",
      "description": "Çok dilli geçiş ismi"
    },
    "versionStrategy": {
      "$ref": "VersionStrategy.1.0.0.json#/attributes",
      "description": "Başarılı geçiş sonrasında versiyon artış stratejisi"
    },
    "schema": {
      "$ref": "Reference.1.0.0.json#/attributes",
      "description": "Geçişi çalıştırmak için gönderilmesi gereken veri şeması referansı"
    },
    "timer": {
      "type": "object",
      "description": "Otomatik olarak geçiş çalışacak ise zamanlama bilgisi",
      "properties": {
        "duration": {
          "type": "string",
          "format": "duration",
          "description": "Süre bilgisi (ISO 8601 formatında)",
          "examples": [
            "PT30S",
            "PT5M",
            "PT1H"
          ]
        },
        "reset": {
          "type": "string",
          "description": "Zamanlayıcı hangi durumlarda sıfırlanacak",
          "oneOf": [
            {
              "const": "never",
              "description": "Geçiş akışa tanımlanmışsa akış boyunca sayaç resetlenmez"
            },
            {
              "const": "stateEntry",
              "description": "State değiştiğinde sayaç resetlenir"
            }
          ]
        },
        "payload": {
          "type": "object",
          "description": "Zamanlayıcı ile tetiklenecek transition için geçilecek veri kümesi. Her akış ve geçişte değişebileceği için complex bırakılmıştır.",
          "additionalProperties": true
        }
      },
      "required": [
        "reset",
        "duration",
        "payload"
      ],
      "additionalProperties": false
    },
    "onExecute": {
      "type": "array",
      "description": "Geçiş tetiklendiğinde çalıştırılacak görevler dizisi",
      "items": {
        "type": "object",
        "properties": {
          "order": {
            "type": "integer",
            "description": "Görevin çalışma sırası. Aynı sıradaki görevler paralel çalıştırılır."
          },
          "task": {
            "$ref": "Reference.1.0.0.json#/attributes",
            "description": "Çalıştırılacak task referansı (Task.1.0.0.json şemasına uygun)"
          },
          "mapping": {
            "$ref": "Mapping.1.0.0.json#/attributes",
            "description": "Göreve iletilecek ve geri dönüşümde alınacak verilerin mapping tanımı"
          }
        },
        "required": [
          "order",
          "task",
          "mapping"
        ],
        "additionalProperties": false
      }
    },
    "views": {
      "type": "array",
      "description": "Geçişte kullanılacak arayüz bilgileri",
      "items": {
        "$ref": "Reference.1.0.0.json#/attributes"
      }
    },
    "rule": {
      "$ref": "Code.1.0.0.json#/attributes",
      "description": "Kural tabanlı ilerleme olacak ise kuralın tanımlandığı kod referansı"
    },
    "triggers": {
      "type": "array",
      "description": "Dapr input binding ile transition tetikleme (kafka mesajı ile akış başlatma/ilerletme)",
      "items": {
        "type": "object",
        "properties": {
          "mapping": {
            "$ref": "Code.1.0.0.json#/attributes",
            "description": "Gelen verinin maplenması için kullanılan kod"
          },
          "task": {
            "$ref": "Reference.1.0.0.json#/attributes",
            "description": "Bu transition'ı tetikleyen task referansı"
          }
        },
        "required": [
          "mapping",
          "task"
        ],
        "additionalProperties": false
      }
    },
    "type": {
      "type": "string",
      "description": "Geçişin kavramsal türünü belirler",
      "oneOf": [
        {
          "const": "forward",
          "description": "Akışın ileri doğru hareketini belirler"
        },
        {
          "const": "back",
          "description": "Akışın geri gideceğini belirler. Sadece Wizard tipi state'lere tanımlanabilir"
        },
        {
          "const": "self",
          "description": "State değiştirmeyen geçişler için kullanılır. Target aynı state'i tanımlar"
        }
      ]
    }
  },
  "required": [
    "key",
    "labels",
    "versionStrategy",
    "onExecute",
    "type"
  ],
  "additionalProperties": false,
  "allOf": [
    {
      "if": {
        "properties": {
          "type": {
            "const": "self"
          }
        }
      },
      "then": {
        "properties": {
          "target": {
            "type": "null"
          }
        }
      }
    },
    {
      "if": {
        "properties": {
          "type": {
            "enum": [
              "forward",
              "back"
            ]
          }
        }
      },
      "then": {
        "properties": {
          "target": {
            "type": "string"
          }
        },
        "required": [
          "target"
        ]
      }
    }
  ]
}
```

---

### Task v1.0.0

- **Domain:** Core
- **Flow:** Schema
- **File:** `Core/Schema/Task.1.0.0.json`
- **Description:** Dapr binding tabanlı görev tanımı. Mikroservis çağrıları, HTTP istekleri, mesaj kuyruğu işlemleri için kullanılır.
- **Tags:** Core, Schema, Task, Dapr, Binding

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://schemas.amorphie.com/core/task.json",
  "title": "Task",
  "description": "Dapr binding tabanlı görev tanımı. Mikroservis çağrıları, HTTP istekleri, mesaj kuyruğu işlemleri için kullanılır.",
  "type": "object",
  "properties": {
    "binding": {
      "type": "string",
      "description": "Kullanılacak Dapr binding tipi",
      "examples": [
        "dapr.bindings.http",
        "dapr.bindings.kafka",
        "dapr.bindings.redis",
        "dapr.bindings.postgresql",
        "dapr.bindings.blob-storage",
        "dapr.bindings.rabbitmq"
      ]
    },
    "configuration": {
      "type": "string",
      "description": "Görev için kullanılacak konfigürasyon referansı",
      "examples": [
        "fora-services",
        "banking-config",
        "notification-config"
      ]
    },
    "metadata": {
      "type": "object",
      "description": "Binding tipine özel metadata bilgileri. Developer Dapr documentation'dan bakarak ilgili alanları ekler.",
      "additionalProperties": true,
      "examples": [
        {
          "url": "/api/service/endpoint/{param}",
          "operation": "post",
          "successResponses": [
            200,
            201
          ],
          "incident": false,
          "timeout": "PT30S"
        },
        {
          "topic": "user-events",
          "partition": "user-{userId}",
          "timeout": "PT30S",
          "maxRetries": 3
        },
        {
          "query": "INSERT INTO audit_log (user_id, action) VALUES (?, ?)",
          "timeout": "PT10S"
        }
      ]
    }
  },
  "required": [
    "binding",
    "configuration",
    "metadata"
  ],
  "additionalProperties": false,
  "examples": [
    {
      "binding": "dapr.bindings.http",
      "configuration": "fora-services",
      "metadata": {
        "url": "/fora/DigitalServices/AccountService.svc/accounts/checking/new/{tckn}",
        "operation": "post",
        "successResponses": [
          200,
          467
        ],
        "incident": false
      }
    },
    {
      "binding": "dapr.bindings.kafka",
      "configuration": "messaging-config",
      "metadata": {
        "topic": "user-notifications",
        "partition": "user-{userId}",
        "timeout": "PT30S"
      }
    },
    {
      "binding": "dapr.bindings.postgresql",
      "configuration": "database-config",
      "metadata": {
        "query": "INSERT INTO audit_log (user_id, action, timestamp) VALUES (?, ?, ?)",
        "timeout": "PT10S"
      }
    }
  ]
}
```

---

### State v1.0.0

- **Domain:** Core
- **Flow:** Schema
- **File:** `Core/Schema/State.1.0.0.json`
- **Description:** Amorphie workflow state machine içindeki bir state'in tanımı. State'ler workflow'un temel yapı taşlarıdır.
- **Tags:** Core, State, Workflow, StateMachine

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://schemas.amorphie.com/core/state.json",
  "title": "State Definition",
  "description": "Amorphie workflow state machine içindeki bir state'in tanımı. State'ler workflow'un temel yapı taşlarıdır.",
  "type": "object",
  "properties": {
    "key": {
      "type": "string",
      "description": "State'in anahtar değeri. Workflow içinde benzersiz olmalıdır.",
      "pattern": "^[a-z0-9-_]+$"
    },
    "labels": {
      "$ref": "Label.1.0.0.json#/attributes",
      "description": "State'in çoklu dil etiketleri"
    },
    "transitions": {
      "type": "array",
      "items": {
        "$ref": "Transition.1.0.0.json#/attributes"
      },
      "description": "Bu state'den çıkış yapılabilecek geçişlerin listesi."
    },
    "views": {
      "type": "array",
      "items": {
        "$ref": "Reference.1.0.0.json#/attributes"
      },
      "description": "Bu state ile ilişkili kullanıcı arayüzü view'larının referansları."
    },
    "responses": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "key": {
            "type": "string",
            "description": "Response mapping'in anahtar değeri."
          },
          "mapping": {
            "$ref": "Code.1.0.0.json#/attributes",
            "description": "State'de workflow verilerinin dönüş şeklini belirleyen mapping kodu referansı."
          }
        },
        "required": [
          "key",
          "mapping"
        ],
        "additionalProperties": false
      },
      "description": "State'de workflow verilerinin görünüm katmanına nasıl döneceğini belirten mapping'ler."
    },
    "onFirstEntry": {
      "type": "array",
      "description": "State'e ilk kez girildiğinde çalıştırılacak görevler dizisi",
      "items": {
        "type": "object",
        "properties": {
          "order": {
            "type": "integer",
            "description": "Görevin çalışma sırası. Aynı sıradaki görevler paralel çalıştırılır."
          },
          "task": {
            "$ref": "Reference.1.0.0.json#/attributes",
            "description": "Çalıştırılacak task referansı"
          },
          "mapping": {
            "$ref": "Mapping.1.0.0.json#/attributes",
            "description": "Göreve iletilecek ve geri dönüşümde alınacak verilerin mapping tanımı"
          }
        },
        "required": [
          "order",
          "task",
          "mapping"
        ],
        "additionalProperties": false
      }
    },
    "onFirstExit": {
      "type": "array",
      "description": "State'den ilk kez çıkılırken çalıştırılacak görevler dizisi",
      "items": {
        "type": "object",
        "properties": {
          "order": {
            "type": "integer",
            "description": "Görevin çalışma sırası. Aynı sıradaki görevler paralel çalıştırılır."
          },
          "task": {
            "$ref": "Reference.1.0.0.json#/attributes",
            "description": "Çalıştırılacak task referansı"
          },
          "mapping": {
            "$ref": "Mapping.1.0.0.json#/attributes",
            "description": "Göreve iletilecek ve geri dönüşümde alınacak verilerin mapping tanımı"
          }
        },
        "required": [
          "order",
          "task",
          "mapping"
        ],
        "additionalProperties": false
      }
    },
    "onEntry": {
      "type": "array",
      "description": "State'e her girildiğinde çalıştırılacak görevler dizisi",
      "items": {
        "type": "object",
        "properties": {
          "order": {
            "type": "integer",
            "description": "Görevin çalışma sırası. Aynı sıradaki görevler paralel çalıştırılır."
          },
          "task": {
            "$ref": "Reference.1.0.0.json#/attributes",
            "description": "Çalıştırılacak task referansı"
          },
          "mapping": {
            "$ref": "Mapping.1.0.0.json#/attributes",
            "description": "Göreve iletilecek ve geri dönüşümde alınacak verilerin mapping tanımı"
          }
        },
        "required": [
          "order",
          "task",
          "mapping"
        ],
        "additionalProperties": false
      }
    },
    "onExit": {
      "type": "array",
      "description": "State'den her çıkılırken çalıştırılacak görevler dizisi",
      "items": {
        "type": "object",
        "properties": {
          "order": {
            "type": "integer",
            "description": "Görevin çalışma sırası. Aynı sıradaki görevler paralel çalıştırılır."
          },
          "task": {
            "$ref": "Reference.1.0.0.json#/attributes",
            "description": "Çalıştırılacak task referansı"
          },
          "mapping": {
            "$ref": "Mapping.1.0.0.json#/attributes",
            "description": "Göreve iletilecek ve geri dönüşümde alınacak verilerin mapping tanımı"
          }
        },
        "required": [
          "order",
          "task",
          "mapping"
        ],
        "additionalProperties": false
      }
    },
    "versionStrategy": {
      "$ref": "VersionStrategy.1.0.0.json#/attributes",
      "description": "State'in versiyon yönetim stratejisi."
    },
    "type": {
      "oneOf": [
        {
          "const": "start",
          "description": "Workflow'un başlangıç state'i."
        },
        {
          "const": "wizard",
          "description": "Çok adımlı form state'i."
        },
        {
          "const": "normal",
          "description": "Normal işlem state'i."
        },
        {
          "const": "finish",
          "description": "Workflow'un sonlandırıldığı final state'i."
        },
        {
          "const": "subFlow",
          "description": "Alt workflow çağıran state."
        }
      ],
      "description": "State'in türü."
    },
    "subFlow": {
      "$ref": "Reference.1.0.0.json#/attributes",
      "description": "SubFlow state türü için çağrılacak alt workflow'un referansı."
    }
  },
  "required": [
    "key",
    "labels",
    "transitions",
    "views",
    "responses",
    "onFirstEntry",
    "onFirstExit",
    "onEntry",
    "onExit",
    "versionStrategy",
    "type"
  ],
  "additionalProperties": false
}
```

---

### Schema v1.0.0

- **Domain:** Core
- **Flow:** Schema
- **File:** `Core/Schema/Schema.1.0.0.json`
- **Description:** Gerçek JSON Schema tanımının bulunduğu alan. Bu alan valid bir JSON Schema olmalıdır.
- **Tags:** Core, Schema, MetaSchema, Base

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://schemas.amorphie.com/core/schema.json",
  "title": "Schema Definition",
  "description": "Gerçek JSON Schema tanımının bulunduğu alan. Bu alan valid bir JSON Schema olmalıdır.",
  "type": "object",
  "properties": {
    "$schema": {
      "type": "string",
      "format": "uri",
      "description": "JSON Schema versiyonu"
    },
    "$id": {
      "type": "string",
      "format": "uri",
      "description": "Şemanın benzersiz URI'si"
    },
    "title": {
      "type": "string",
      "description": "Şemanın başlığı"
    },
    "description": {
      "type": "string",
      "description": "Şemanın açıklaması"
    },
    "type": {
      "type": [
        "string",
        "array"
      ],
      "description": "JSON Schema type tanımı"
    }
  },
  "required": [
    "$schema",
    "$id",
    "title",
    "description",
    "type"
  ],
  "additionalProperties": true
}
```

---

### Reference v1.0.0

- **Domain:** Core
- **Flow:** Schema
- **File:** `Core/Schema/Reference.1.0.0.json`
- **Description:** Cross-domain kayıtlara referans vermek için kullanılan ortak şema. Farklı runtime'lar arasında referans mekanizması sağlar.
- **Tags:** Core, Schema, Reference, CrossDomain

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://schemas.amorphie.com/core/reference.json",
  "title": "Reference",
  "description": "Cross-domain kayıtlara referans vermek için kullanılan ortak şema. Farklı runtime'lar arasında referans mekanizması sağlar.",
  "type": "object",
  "properties": {
    "id": {
      "type": "string",
      "format": "uuid",
      "description": "Referans edilen kaydın benzersiz tanımlayıcısı (UUID v7 formatında)"
    },
    "key": {
      "type": "string",
      "description": "Referans edilen kaydın anahtar değeri (okunabilir identifier)"
    },
    "domain": {
      "type": "string",
      "description": "Referans edilen kaydın bulunduğu domain (cross-domain referanslar için zorunlu)",
      "examples": [
        "Core",
        "IDM",
        "Banking",
        "Payment"
      ]
    },
    "workflow": {
      "type": "string",
      "description": "Referans edilen kaydın bulunduğu workflow adı"
    },
    "version": {
      "type": "string",
      "pattern": "^\\d+\\.\\d+(\\.\\d+)?$",
      "description": "Referans edilen kaydın sürüm bilgisi (semantic versioning)"
    },
    "metadata": {
      "type": "object",
      "description": "İstemci tarafından serbest şekilde eklenebilecek metadata bilgileri (displayName, description vb.)",
      "additionalProperties": true
    }
  },
  "anyOf": [
    {
      "required": [
        "id"
      ]
    },
    {
      "required": [
        "key"
      ]
    }
  ],
  "additionalProperties": false,
  "examples": [
    {
      "id": "01234567-89ab-cdef-0123-456789abcdef",
      "domain": "IDM",
      "workflow": "UserAuthentication",
      "version": "1.0.0",
      "metadata": {
        "displayName": "Mobil Uygulama Kullanıcısı",
        "channel": "mobile",
        "priority": "high"
      }
    },
    {
      "key": "user-login-state",
      "domain": "Core",
      "workflow": "Authentication",
      "version": "2.1.0",
      "metadata": {
        "displayName": "Kullanıcı Giriş Durumu",
        "timeout": 300,
        "retryable": true
      }
    },
    {
      "id": "98765432-10ab-cdef-9876-543210abcdef",
      "key": "payment-validation-task",
      "domain": "Banking",
      "workflow": "PaymentProcess",
      "version": "1.2.3",
      "metadata": {
        "description": "Ödeme doğrulama görevi"
      }
    }
  ]
}
```

---

### Mapping v1.0.0

- **Domain:** Core
- **Flow:** Schema
- **File:** `Core/Schema/Mapping.1.0.0.json`
- **Description:** Veri dönüşüm mapping'leri için standart yapı. Input, output ve asenkron output mapping'lerini tanımlar.
- **Tags:** Core, Mapping, DataTransformation, Reference

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://schemas.amorphie.com/core/mapping.json",
  "title": "Data Mapping Definition",
  "description": "Veri dönüşüm mapping'leri için standart yapı. Input, output ve asenkron output mapping'lerini tanımlar.",
  "type": "object",
  "properties": {
    "input": {
      "$ref": "Code.1.0.0.json#/attributes",
      "description": "Göreve iletilecek veri mapping kodu. Gelen veriyi task'ın beklediği formata dönüştürür."
    },
    "output": {
      "$ref": "Code.1.0.0.json#/attributes",
      "description": "Görevden dönecek veri mapping kodu. Task sonucunu workflow verisi formatına dönüştürür."
    },
    "asyncOutput": {
      "$ref": "Code.1.0.0.json#/attributes",
      "description": "Görevin asenkron dönüş veri mapping kodu. Async callback verisini workflow formatına dönüştürür."
    }
  },
  "required": [
    "input",
    "output",
    "asyncOutput"
  ],
  "additionalProperties": false
}
```

---

### Label v1.0.0

- **Domain:** Core
- **Flow:** Schema
- **File:** `Core/Schema/Label.1.0.0.json`
- **Description:** Çoklu dil desteği için kullanılan etiket yapısı. Her dil kodu için ayrı değer saklar.
- **Tags:** Core, Schema, Label, Localization

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://schemas.amorphie.com/core/label.json",
  "title": "Multi-language Label",
  "description": "Çoklu dil desteği için kullanılan etiket yapısı. Her dil kodu için ayrı değer saklar.",
  "type": "object",
  "patternProperties": {
    "^[a-z]{2}(-[A-Z]{2})?$": {
      "type": "string",
      "description": "Belirtilen dil kodu için etiket değeri"
    }
  },
  "additionalProperties": false,
  "minProperties": 1,
  "examples": [
    {
      "en": "User Login",
      "tr": "Kullanıcı Girişi"
    },
    {
      "en": "Data Processing",
      "tr": "Veri İşleme",
      "de": "Datenverarbeitung"
    },
    {
      "en-US": "American English Label",
      "en-GB": "British English Label",
      "tr": "Türkçe Etiket"
    }
  ]
}
```

---

### Code v1.0.0

- **Domain:** Core
- **Flow:** Schema
- **File:** `Core/Schema/Code.1.0.0.json`
- **Description:** Çalıştırılacak kod parçacığının tanımı. BASE64 formatında kod ve interface bilgisi içerir.
- **Tags:** Core, Schema, Code, Task

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://schemas.amorphie.com/core/code.json",
  "title": "Code Definition",
  "description": "Çalıştırılacak kod parçacığının tanımı. BASE64 formatında kod ve interface bilgisi içerir.",
  "type": "object",
  "properties": {
    "code": {
      "type": "string",
      "description": "Çalıştırılacak kodun BASE64 formatındaki hali",
      "pattern": "^[A-Za-z0-9+/]*={0,2}$"
    },
    "interface": {
      "type": "string",
      "description": "Kodun implement edeceği interface türü",
      "oneOf": [
        {
          "const": "TaskMapper",
          "description": "Task mapping işlemleri için kullanılan interface"
        },
        {
          "const": "ResponseDataMapper",
          "description": "Response data mapping işlemleri için kullanılan interface"
        },
        {
          "const": "Script",
          "description": "Genel script çalıştırma için kullanılan interface"
        },
        {
          "const": "ExtensionTaskMapper",
          "description": "Extension task mapping işlemleri için kullanılan interface"
        },
        {
          "const": "FunctionTaskMapper",
          "description": "Function task mapping işlemleri için kullanılan interface"
        }
      ]
    }
  },
  "required": [
    "code",
    "interface"
  ],
  "additionalProperties": false
}
```

---


---
*Generated on 6/12/2025, 12:05:41 PM by Amorphie Definition Documenter*
