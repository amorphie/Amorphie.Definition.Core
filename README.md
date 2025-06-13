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

- **Transition'larda `target` asla null olamaz (self dahil).**
- Her transition bir state'e yönlendirilmelidir. `type: self` ise target bulunduğu state'in key'i olmalıdır.
- Silme veya arşivleme işlemleri için deleted adında bir state tanımlanmalı ve ilgili transition'lar bu state'e yönlendirilmelidir.
- deleted state'inden recover transition'ı ile active state'e dönüş sağlanmalıdır.
- **State ve transition key'leri camelCase olmalıdır.**
- Tüm modellerde (ör: state, transition, schema, vs.) key alanlarında camelCase kullanımı zorunludur. 