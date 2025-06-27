# Core Schema Tanımları

Bu klasör Amorphie platformunun temel şema tanımlarını içerir.

## Şema Listesi

### 📋 Temel Şemalar

- **InstanceBase.1.0.0.json** - Tüm entity'ler için temel yapı
- **Schema.1.0.0.json** - Şema tanımları için meta-şema

### 🔗 Referans ve İlişki

- **Reference.1.0.0.json** - Cross-domain referans mekanizması
- **Label.1.0.0.json** - Çoklu dil desteği (i18n)

### 🔄 Workflow Bileşenleri

- **State.1.0.0.json** - Workflow state tanımları
- **Transition.1.0.0.json** - State geçiş tanımları
- **Workflow.1.0.0.json** - İş akışı tanımları

### 💻 Kod ve Görev

- **Task.1.0.0.json** - Dapr binding görev tanımları
- **Code.1.0.0.json** - Çalıştırılabilir kod tanımları
- **Mapping.1.0.0.json** - Veri dönüşüm tanımları

### 🎨 UI Bileşenleri

- **View.1.0.0.json** - Kullanıcı arayüzü tanımları

### 🔧 Yardımcı Şemalar

- **VersionStrategy.1.0.0.json** - Versiyon yönetim stratejileri

## Kullanım Örnekleri

### Reference Kullanımı

```json
{
  "key": "user-login",
  "domain": "idms",
  "workflow": "authentication",
  "version": "1.0.0"
}
```

### State Tanımı

```json
{
  "key": "active",
  "labels": {
    "en": "Active",
    "tr": "Aktif"
  },
  "type": "normal",
  "transitions": [...],
  "views": [...]
}
```

## Önemli Kurallar

1. **Instance Wrapper Pattern**: Tüm schema instance'ları InstanceBase yapısını kullanır
2. **Label Kullanımı**: Business logic içeren tanımlar (State, Transition) labels içerir
3. **Reference Pattern**: Foreign key mantığında çalışır, type property yoktur
4. **Versiyon**: Semantic versioning kullanılır (major.minor.patch)
