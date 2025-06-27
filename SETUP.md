# Amorphie Definition Core - Geliştirici Kurulumu

Bu paket, Amorphie platform ile çalışırken ihtiyaç duyacağınız tüm geliştirici araçlarını ve şablon dosyalarını otomatik olarak projenize kurar.

## 🚀 Hızlı Başlangıç

### 1. Paketi Yükleyin

```bash
npm install @amorphie/definition-core
```

Paket kurulduktan sonra otomatik olarak setup çalışacak ve gerekli dosyalar projenize kopyalanacaktır.

### 2. Manuel Setup (Gerekirse)

Eğer otomatik setup çalışmazsa:

```bash
npx amorphie-setup
```

## 📁 Kurulan Dosyalar

### VSCode Konfigürasyonu (`.vscode/`)

- **tasks.json**: Workflow validasyon, CSX update görevleri
- **settings.json**: Proje özel ayarlar
- **workflow.code-snippets**: Workflow yaratma snippet'ları
- **scripts/**: Validasyon ve automation script'leri
- **schemas/**: JSON Schema validasyon dosyaları
- **examples/**: CSX template dosyaları (temiz proje yapısı için)

### Core Şemalar (Programatik Erişim)

Core şemalar paket içinde kalır ve programatik olarak erişilir:

```javascript
const {
  loadSchema,
  getAvailableSchemas,
} = require("@amorphie/definition-core");

// Mevcut şemaları listele
const schemas = getAvailableSchemas();

// Belirli bir şemayı yükle
const stateSchema = loadSchema("State", "1.0.0");
const latestWorkflow = loadSchema("Workflow"); // latest version
```

## 🛠️ Kullanım

### VSCode Tasks

Ctrl+Shift+P → "Tasks: Run Task" ile erişilebilir görevler:

#### Validation & Linting

1. **Lint Current JSON**: Mevcut JSON dosyasını lint et (gelişmiş validasyon)
2. **Lint All JSON Files**: Tüm JSON dosyalarını lint et
3. **Lint on Save (Watch)**: JSON değişikliklerini otomatik izle ve lint et
4. **Validate Workflow JSON**: Mevcut workflow'u doğrula (temel)
5. **Validate All Workflow JSONs**: Tüm JSON dosyalarını doğrula (temel)

#### Development Tools

6. **Create Workflow Mapping**: Yeni mapping dosyası oluştur
7. **Create Workflow Rule**: Yeni rule dosyası oluştur
8. **Update Workflow CSX**: CSX dosyalarını JSON'a aktar
9. **Watch Workflow Changes**: CSX değişikliklerini otomatik izle

### Code Snippets

JSON dosyalarında şu snippet'ları kullanabilirsiniz:

- `workflow-basic`: Temel workflow yapısı
- `state-initial`: Başlangıç state'i
- `state-intermediate`: Ara state
- `state-final`: Son state
- `transitions`: Geçiş dizisi konfigürasyonu
- `functions`: Fonksiyon dizisi konfigürasyonu
- `extensions`: Uzantı dizisi konfigürasyonu
- `transition-manual`: Manuel geçiş
- `transition-auto`: Otomatik geçiş
- `shared-transition`: Paylaşımlı geçiş
- `task-onentry`: OnEntry görevi
- `timeout-config`: Timeout konfigürasyonu
- `labels`: Çoklu dil desteği dizisi
- `label`: Çoklu dil desteği
- `shared-transition`: Timeout konfigürasyonu
- `function-ref`: Fonksiyon referansı
- `extension-ref`: Uzantı referansı
- `task-ref`: Görev referansı
- `view-ref`: Görünüm referansı
- `schema-ref`: Şema referansı
- `mapping`: Mapping konfigürasyonu
- `rule`: Kural konfigürasyonu
- `onentries`: Giriş dizisi konfigürasyonu
- `onexits`: Çıkış dizisi konfigürasyonu
- `onexecutiontasks`: Çalıştırılabilir göre dizisi konfigürasyonu

### CSX Template Kullanımı

1. Yeni mapping oluşturmak için:

   ```bash
   Ctrl+Shift+P → Tasks: Run Task → Create Workflow Mapping
   ```

2. Template dosyaları `.vscode/examples/template/src/` altında:

   ```csx
   #load "ScriptGlobals.csx"

   public class MyCustomMapping : ScriptBase, IMapping
   {
       public async Task<ScriptResponse> InputHandler(WorkflowTask task, ScriptContext context)
       {
           // Input processing logic
       }

       public async Task<ScriptResponse> OutputHandler(ScriptContext context)
       {
           // Output processing logic
       }
   }
   ```

## 🔧 Konfigürasyon

### BBT.Workflow Paketleri

CSX dosyalarında BBT.Workflow paketleri NuGet üzerinden yüklenir:

```csx
#r "nuget: BBT.Workflow.Domain, *"
#r "nuget: BBT.Workflow.Application, *"
#r "nuget: BBT.Workflow.Scripting, *"
```

### Core Şema Erişimi

Programatik olarak Core şemalarına erişim:

```javascript
const core = require("@amorphie/definition-core");

// Tüm mevcut şemaları listele
console.log(core.getAvailableSchemas());

// Belirli şemayı yükle
const schema = core.loadSchema("State", "1.0.0");

// Workflow tanımlarına erişim
const workflows = core.getAvailableWorkflows();
const workflow = core.loadWorkflow("Schema", "latest");

// Validation
const result = core.validateDefinition(myDefinition, "State");
```

## 📝 Proje Yapısı

Kurulum sonrası proje yapınız:

```
my-project/
├── .vscode/
│   ├── tasks.json
│   ├── workflow.code-snippets
│   ├── settings.json
│   ├── scripts/
│   ├── schemas/
│   └── examples/              # CSX templates burada
│       └── template/src/
│           ├── ScriptGlobals.csx
│           └── MappingTemplate.csx
├── workflow/                  # Sizin workflow dosyalarınız
│   ├── MyWorkflow.1.0.0.json
│   └── src/
│       └── MyMapping.csx
└── .cursorrules              # AI assistant rules
```

## 📝 Dosya Adlandırma Kuralları

Tüm definition dosyaları semantic versioning kullanmalıdır:

```
[DefinitionName].[Version].json
```

Örnekler:

- `MyWorkflow.1.0.0.json`
- `CustomerState.2.1.0.json`
- `PaymentTransition.1.5.2.json`

## 🔍 Validasyon ve Linting

### Gerçek Zamanlı Linting (VSCode)

JSON dosyalarında çalışırken otomatik olarak:

- ❌ **Kırmızı çizgiler**: Schema violations ve syntax errors
- ⚠️ **Sarı çizgiler**: Warnings ve best practice ihlalleri
- 💡 **IntelliSense**: Otomatik tamamlama ve öneri

### Linting Kuralları

Workflow dosyalarınız otomatik olarak şu kurallara göre kontrol edilir:

#### Schema Validation

1. **JSON Schema Uyumluluğu**: Dosya yapısı şemaya uygun olmalı
2. **Semantic Versioning**: Version formatları doğru olmalı
3. **Required Fields**: Zorunlu alanlar eksik olmamalı

#### Business Rules

4. **Dosya Adı Kontrolü**: Dosya adı içindeki key ve version eşleşmeli
5. **Referans Kontrolü**: Tüm referanslar geçerli olmalı
6. **Label Completeness**: tr-TR ve en-US dil desteği
7. **State Machine Validation**: Start/finish state kontrolü

#### Build-time Linting

8. **Pre-commit Hooks**: Commit öncesi otomatik linting
9. **CI/CD Integration**: Build sırasında linting kontrolü

### NPM Scripts

```bash
# Linting commands
npm run lint              # Lint current directory
npm run lint:json         # Lint all JSON files
npm run lint:watch        # Watch mode linting
npm run test              # Run all tests (includes linting)

# Development
npm run setup:hooks       # Setup Git hooks manually
npm run validate          # Basic validation
npm run validate:all      # Validate all files
```

## 🚨 Sık Karşılaşılan Sorunlar

### 1. JSON Linting Hataları

```
Schema validation failed at /attributes/states: must be array
```

**Çözüm**: JSON Schema'ya uygun format kullanın. Linter mesajında hangi property'de hata olduğu belirtilir.

### 2. Filename Consistency Hataları

```
Filename 'MyWorkflow.1.0.0' does not match key.version 'MyWorkflow.1.1.0'
```

**Çözüm**: Dosya adını JSON içindeki key ve version ile eşleştirin.

### 3. Assembly Loading Hataları

```
Warning: Some BBT.Workflow assemblies could not be loaded
```

**Çözüm**: NuGet paketlerini yükleyin - ScriptGlobals.csx'de otomatik olarak NuGet referansları kullanılır.

### 4. VSCode Tasks Görünmüyor

**Çözüm**: VSCode'u yeniden başlatın veya "Reload Window" yapın.

### 5. Snippets Çalışmıyor

**Çözüm**: JSON dosyasında olduğunuzdan emin olun ve Ctrl+Space ile snippet listesini açın.

### 6. Core Şemalar Bulunamıyor

**Çözüm**: Programatik erişim kullanın:

```javascript
const { loadSchema } = require("@amorphie/definition-core");
const schema = loadSchema("State");
```

### 7. Pre-commit Hook Çalışmıyor

**Çözüm**: Git hooks'u manuel olarak kurun:

```bash
npm run setup:hooks
```

## 📞 Destek

Sorunlarınız için:

1. GitHub Issues: [Repo Issues](https://github.com/amorphie/definition-core/issues)
2. Documentation: [Amorphie Docs](https://docs.amorphie.com)
3. Team Channel: #amorphie-support

## 🔄 Güncelleme

Paketi güncellemek için:

```bash
npm update @amorphie/definition-core
npm run setup  # Yeni dosyaları almak için
```
