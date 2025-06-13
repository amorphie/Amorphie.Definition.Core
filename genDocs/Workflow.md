# Workflow Definitions

5 definitions in this category.


## Workflow v1.0.0

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

## View v1.0.0

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

## Task v1.0.0

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

## Schema v1.0.0

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

## Function v1.0.0

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

