# @amorphie/definition-core

Amorphie Low-Code platformunun temel tanım paketleridir.

## Kurulum

```bash
npm install @amorphie/definition-core
```

## İçerik

- **Core/Schema/** - Tüm temel şema tanımları (11 adet)
- **Core/Workflow/** - Lifecycle workflow tanımları (5 adet)
- **Core/View/** - UI view instance örnekleri
- **Core/Task/** - (Gelecekte eklenecek)
- **Core/Function/** - (Gelecekte eklenecek)
- **Core/Extension/** - (Gelecekte eklenecek)
- **Core/Feature/** - (Gelecekte eklenecek)

## Kullanım

```javascript
// Schema tanımlarına erişim
const referenceSchema = require('@amorphie/definition-core/Core/Schema/Reference.1.0.0.json');
const stateSchema = require('@amorphie/definition-core/Core/Schema/State.1.0.0.json');

// Workflow tanımlarına erişim
const schemaLifecycle = require('@amorphie/definition-core/Core/Workflow/Schema.1.0.0.json');
```

## Önemli Dosyalar

- `.cursorrules` - Proje geliştirme kuralları
- `.cursor/project-context.md` - Detaylı proje dokümantasyonu
- `Core/Schema/README.md` - Schema tanımları dokümantasyonu

## Versiyon

Current: 1.0.0

## Lisans

MIT 

## Workflow Model Kuralları

- Hiçbir transition'ın target'ı null olamaz. Her transition bir state'e yönlenmelidir.
- Silme veya arşivleme işlemleri için deleted adında bir state tanımlanmalı ve ilgili transition'lar bu state'e yönlendirilmelidir.
- deleted state'inden recover transition'ı ile active state'e dönüş sağlanmalıdır. 