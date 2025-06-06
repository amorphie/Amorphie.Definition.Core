# Amorphie.Definition.Core Projesi

## Platform Genel Bakış
Bu proje, Amorphie Low-Code platformunun temel (core) tanım dosyalarını içerir. Tüm domain projeleri bu temel tanımları miras alır ve kendi domain özel tanımlarıyla genişletir.

### Platform Özellikleri:
- **State Machine**: İş akışları state ve transition'larla modellenir  
- **Dinamik UI**: State ve transition'lara dinamik view'lar bağlanabilir
- **Dapr Entegrasyonu**: Platform Dapr üzerine kurgulanmıştır
- **Cross-Domain**: Farklı runtime'lar arası referans mekanizması
- **Ortak Tanımlar**: Tüm domain'lerde kullanılacak temel bileşenler

## Proje Yapısı

### Klasör Organizasyonu
```
Core/                          # Temel tanımlar
├── Feature/                   # Ortak kullanılabilir geçiş tanımları (Boş)
├── Function/                  # BFF servisleri (GET metodları) (Boş)
├── Schema/                    # JSON Schema tanımları ⭐ (11 schema)
├── Task/                      # Kod parçacıkları (Dapr Binding) (Boş)
├── View/                      # UI tanımları (Flutter/HTML) (1 instance)
├── Workflow/                  # İş akışı tanımları (5 workflow)
└── Extension/                 # Veri zenginleştirme tanımları (Boş)
```

### Klasör Prensipleri
- **Her klasör bir workflow'u temsil eder**
- **Klasör altındaki dosyalar o workflow'un instance'larıdır**
- **Schema klasörü tüm şema tanımlarını içerir**
- **Workflow klasörü tüm workflow lifecycle tanımlarını içerir**

## Schema Yapısı ⭐ GÜNCELLENDİ

### Schema Hiyerarşisi
Core projesinde şema yapısı üç katmanlı bir hiyerarşiye sahiptir:

```
InstanceBase.1.0.0.json        # Temel entity yapısı (platform managed)
    ↓
Schema.1.0.0.json             # Meta-şema (tüm şemalar için)
    ↓
[Concrete Schemas]            # Somut şema tanımları
├── VersionStrategy.1.0.0.json
├── Label.1.0.0.json  
├── Code.1.0.0.json
├── Reference.1.0.0.json
├── Task.1.0.0.json
├── Transition.1.0.0.json
├── State.1.0.0.json
├── Mapping.1.0.0.json
├── Workflow.1.0.0.json
└── View.1.0.0.json          # YENİ
```

### Instance Wrapper Yaklaşımı

#### ⚠️ ÖNEMLİ: Instance Wrapper vs Business Logic Ayrımı

**Platform Managed Properties (InstanceBase)**:
- `id`, `key`, `version`, `domain`, `flow`, `flowVersion`, `tags`, `eTag`
- Schema instance'ları bu property'leri içerir
- **labels İÇERMEZ** - labels business logic'e aittir

**Business Properties**:
- State, Transition, Workflow gibi business tanımları `labels` içerir
- View tanımları `labels` içerebilir
- Schema instance'ları (Label.1.0.0.json gibi) labels içermez

```json
// Schema Instance (Platform Managed)
{
  "key": "SchemaName",
  "version": "1.0.0", 
  "domain": "Core",
  "flow": "Schema",
  "flowVersion": "1.0.0",
  "tags": ["Core", "Schema", "..."],
  // labels YOK - platform managed
  "attributes": {
    // Gerçek JSON Schema buraya
  }
}

// Business Process Definition (State/Transition)
{
  "key": "draft",
  "labels": {  // Business logic - VAR
    "en": "Draft State",
    "tr": "Taslak Durumu"
  },
  "transitions": [...]
}
```

### Temel Şemalar

#### 1. **InstanceBase.1.0.0.json**
```yaml
Amaç: Tüm entity'ler için temel yapı
İçerik: id, eTag, key, version, domain, flow, flowVersion, tags
Kullanım: Platform genelinde entity standardı
NOT: labels İÇERMEZ - platform managed properties only
```

#### 2. **Schema.1.0.0.json** 
```yaml
Amaç: Şema tanımları için meta-şema
İçerik: InstanceBase + attributes (JSON Schema alanı)
Kullanım: Tüm şema dosyaları bunu conform eder
```

#### 3. **Reference.1.0.0.json** ⭐ GÜNCELLENDİ
```yaml
Amaç: Cross-domain referans mekanizması (Foreign Key gibi)
İçerik: id/key, domain, workflow, version, metadata
Özellik: anyOf(id OR key), type YOK
Kullanım: Farklı runtime'lar arası referanslar
Pattern: domain + workflow + (id veya key) + optional version
```

#### 4. **Label.1.0.0.json**
```yaml
Amaç: Çoklu dil desteği
İçerik: Pattern properties (dil kodları)
Format: {"en": "English", "tr": "Türkçe"}
Kullanım: Business process tanımlarında i18n
```

#### 5. **View.1.0.0.json** ⭐ YENİ
```yaml
Amaç: UI view tanımları için şema
İçerik: type (dynamic-flutter, dynamic-html vs.), display (full-page, popup vs.), content, labels, metadata
Kullanım: State'lere bağlanan UI tanımları
Özellik: Enum değerler oneOf pattern'i ile tanımlı
```

#### 6. **State.1.0.0.json** ⭐ GÜNCELLENDİ
```yaml
Amaç: Workflow state tanımları
İçerik: key, labels, type, transitions, views, responses, lifecycle events
Kullanım: Workflow'larda referans olarak
Pattern: Business logic - labels İÇERİR
Özel: onEntry, onExit vb. transition pattern'ını takip eder
```

#### 7. **Transition.1.0.0.json** ⭐ GÜNCELLENDİ
```yaml
Amaç: Workflow state geçişleri
İçerik: key, labels, target, onExecute (order+task+mapping), timer, triggers
Kullanım: State'ler arası geçiş logic'i
Pattern: Business logic - labels İÇERİR
Referanslar: Lokal dosya formatı kullanılır (Reference.1.0.0.json#/attributes)
```

#### 8. **Workflow.1.0.0.json** ⭐ GÜNCELLENDİ
```yaml
Amaç: Workflow tanımları için şema
İçerik: type, labels, states, transitions, modelSchema
Kullanım: İş akışı tanımları
Pattern: Business logic - labels İÇERİR
modelSchema: Schema workflow'una referans verir
```

## Reference Şeması ve Foreign Key Mantığı ⭐ ÖNEMLİ

### Reference Pattern
```json
{
  "key": "user-login-state",     // VEYA
  "id": "uuid-123",              // id veya key'den biri zorunlu
  "domain": "Core",              // Hangi domain'de
  "workflow": "Authentication",   // Hangi workflow (type görevi görür)
  "version": "2.1.0",            // Opsiyonel versiyon
  "metadata": {                  // Opsiyonel metadata
    "displayName": "..."
  }
}
```

### ❌ Reference'da type YOK
- `workflow` alanı zaten type görevi görür
- Schema → workflow: "Schema"
- View → workflow: "View"  
- Task → workflow: "Task"
- Platform genişletilebilir - yeni workflow'lar eklenebilir

## Workflow Lifecycle Management ⭐ YENİ

### Core/Workflow Klasörü
Tüm Core bileşenleri için lifecycle workflow'ları:

1. **Schema.1.0.0.json** → schema-lifecycle-workflow
2. **View.1.0.0.json** → view-lifecycle-workflow
3. **Function.1.0.0.json** → function-lifecycle-workflow
4. **Task.1.0.0.json** → task-lifecycle-workflow
5. **Workflow.1.0.0.json** → workflow-lifecycle-workflow (meta)

### Standart Lifecycle Pattern
Tüm workflow'lar aynı 3 state yapısını kullanır:
- **draft** (start) → Taslak durumu
- **active** (normal) → Aktif durumu  
- **passive** (finish) → Pasif durumu

### Standart Transitions
- `create-*` → draft'a giriş
- `activate` → draft'tan active'e
- `delete` → draft'ta silme
- `deactivate` → active'den passive'e
- `update` → active'de güncelleme
- `reactivate` → passive'den active'e
- `archive` → passive'de arşivleme

### modelSchema Referansları
Tüm workflow'lar Schema workflow'undaki ilgili şemaya referans verir:
```json
"modelSchema": {
  "key": "Schema",  // veya View, Task, Function, Workflow
  "domain": "Core",
  "workflow": "Schema",  // HEPSİ Schema workflow'una işaret eder
  "version": "1.0.0"
}
```

## View Management ⭐ YENİ

### Core/View Klasörü
Platform genelinde kullanılabilecek temel view instance'ları:

1. **SchemaFullView.1.0.0.json** → Schema workflow'u için full-page view

### View Instance Pattern
```json
{
  "key": "schema-full-view",
  "version": "1.0.0",
  "domain": "Core",
  "flow": "View",
  "flowVersion": "1.0.0",
  "tags": ["Core", "View", "Schema", "FullPage"],
  "attributes": {
    "type": "dynamic-flutter",
    "display": "full-page",
    "content": "",  // Render edilecek içerik
    "labels": {     // Business logic - view'lar label içerebilir
      "en": "Schema Management View",
      "tr": "Şema Yönetimi Görünümü"
    },
    "metadata": {
      "dismissible": false,
      "backdrop": true,
      "animation": "slide"
    }
  }
}
```

## Label ve i18n Desteği Kuralları ⭐ KRİTİK

### ✅ Labels İÇEREN Yapılar (Business Logic)
- State tanımları (State.1.0.0.json attributes içinde)
- Transition tanımları (Transition.1.0.0.json attributes içinde)
- Workflow tanımları (Workflow.1.0.0.json attributes içinde)
- View instance'ları (attributes içinde)
- Gerçek workflow instance'ları

### ❌ Labels İÇERMEYEN Yapılar (Platform Managed)
- InstanceBase.1.0.0.json
- Tüm Schema instance'ları:
  - Label.1.0.0.json
  - Schema.1.0.0.json
  - Reference.1.0.0.json
  - VersionStrategy.1.0.0.json
  - Code.1.0.0.json
  - Task.1.0.0.json
  - Mapping.1.0.0.json
  - State.1.0.0.json
  - Transition.1.0.0.json
  - Workflow.1.0.0.json
  - View.1.0.0.json

## ⚠️ Critical Learnings (Yeni Chat'lerde Dikkat!)

### 1. Reference Pattern
- **Reference'da type property YOK** - workflow alanı type görevi görür
- Foreign key mantığı: domain + workflow + (id veya key)
- Platform genişletilebilir - yeni workflow'lar eklenebilir

### 2. Label Pattern
- **Schema instance'larında labels YOK** - platform managed
- **Business process tanımlarında labels VAR** - State, Transition, Workflow
- InstanceBase'de labels YOK - sadece platform properties

### 3. modelSchema Pattern
- Tüm workflow'lar Schema workflow'undaki şemalara referans verir
- workflow alanı her zaman "Schema" olmalı
- type property kullanılmaz

### 4. Klasör = Workflow Prensibi
- Her klasör bir workflow'u temsil eder
- Klasör altındaki dosyalar instance'lardır
- Boş klasörler için instance'lar oluşturulmalı

### 5. Schema Referansları
- Tüm referanslar lokal dosya formatında: `Reference.1.0.0.json#/attributes`
- https://schemas.amorphie.com formatı kullanılmaz
- #/attributes ile attributes içindeki şemaya referans verilir

## JSON Schema Standartları

### Dönüşüm Süreci
Eski ApiDog formatından JSON Schema standardına geçiş:

```
❌ ApiDog Format:
- x-apidog-enum
- x-apidog-orders  
- x-apidog-refs

✅ JSON Schema Standard:
- oneOf + const + description
- Standart JSON Schema yapısı
- $schema, $id, title, description
```

### Enum Yapısı Dönüşümü
```json
// Eski (ApiDog)
"enum": ["value1", "value2"],
"x-apidog-enum": [
  {"value": "value1", "description": "Açıklama 1"}
]

// Yeni (JSON Schema)
"oneOf": [
  {"const": "value1", "description": "Açıklama 1"},
  {"const": "value2", "description": "Açıklama 2"}
]
```

## Tanım Bileşenleri

### 1. **Feature**
- Tüm domain'lerde kullanılabilecek ortak geçiş tanımları
- Platform genelinde paylaşılan fonksiyonaliteler
- **DURUM**: Boş - instance'lar eklenmeli

### 2. **Function**
- Temel BFF (Backend for Frontend) servisleri
- Platform genelinde kullanılacak API endpoint tanımları
- **DURUM**: Boş - instance'lar eklenmeli

### 3. **Schema** ✅
- Tüm şema tanımlarını içerir (11 adet)
- Instance wrapper pattern'ı kullanır
- Cross-domain referans desteği
- **DURUM**: Tam ve tutarlı

### 4. **Task**
- Platform genelinde kullanılacak kod parçacıkları
- Dapr Binding tanımları
- **DURUM**: Boş - instance'lar eklenmeli

### 5. **View** ⭐ YENİ
- UI bileşen tanımları
- Schema workflow için örnek view instance'ı var
- **DURUM**: 1 instance - daha fazla eklenmeli

### 6. **Workflow** ✅
- Tüm Core bileşenleri için lifecycle workflow'ları
- Standart 3-state pattern
- **DURUM**: Tam ve tutarlı (5 workflow)

### 7. **Extension**
- Veri zenginleştirme tanımları
- **DURUM**: Boş - instance'lar eklenmeli

## Core Proje Rolü

### Miras Yapısı
- **Temel Sağlayıcı**: Tüm domain projelerine temel tanımları sağlar
- **Schema Standardı**: InstanceBase + JSON Schema yapısı
- **Cross-Domain Hub**: Runtime'lar arası referans merkezi
- **Paket Dağıtımı**: NuGet/NPM ile domain projelerine dağıtılır

### Geliştirme Yaklaşımı
- **Schema-First**: Önce şema, sonra implementation
- **Version Control**: Semantic versioning ile geriye uyumluluk
- **Standard Compliance**: JSON Schema Draft 2020-12 uyumu
- **Cross-Domain Ready**: Farklı runtime'lar arası uyumluluk

## Platform Instance Management API

### Instance Lifecycle Management
Platform, workflow instance'larını yönetmek için kapsamlı REST API'ler sağlar:

```http
GET /{domain}/workflows/{workflow}/instances
GET /{domain}/workflows/{workflow}/instances/{instance}
POST /{domain}/workflows/{workflow}/instances/{instance}/start
PATCH /{domain}/workflows/{workflow}/instances/{instance}/transitions/{transition}
POST /{domain}/workflows/{workflow}/instances/{instance}/task/{task}/completed
POST /{domain}/workflows/{workflow}/instances/{instance}/task/{task}/action
GET /{domain}/workflows/{workflow}/instances/{instance}/transitions
```

### Key Features
- **Filtering & Pagination**: Advanced query capabilities
- **ETag Support**: Concurrency control
- **Extension Pipeline**: Core → Flow → On-demand extensions
- **Async Task Management**: External system integration
- **Audit Trail**: Complete transition history

## Sonraki Adımlar

### Eksik Instance'lar İçin Öneriler

#### Task Instance'ları
- `http-call.1.0.0.json` - HTTP çağrıları için
- `database-query.1.0.0.json` - Veritabanı sorguları için
- `message-publish.1.0.0.json` - Mesaj yayınlama için

#### View Instance'ları
- `form-input.1.0.0.json` - Form girişleri için
- `data-display.1.0.0.json` - Veri gösterimi için
- `list-view.1.0.0.json` - Liste görünümleri için

#### Function Instance'ları
- `get-user.1.0.0.json` - Kullanıcı bilgisi getirme
- `list-accounts.1.0.0.json` - Hesap listesi getirme

#### Extension Instance'ları
- `audit-log.1.0.0.json` - Audit log extension
- `data-enrichment.1.0.0.json` - Veri zenginleştirme

#### Feature Instance'ları
- `approval-flow.1.0.0.json` - Onay akışı feature
- `notification.1.0.0.json` - Bildirim feature 