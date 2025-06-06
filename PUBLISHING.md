# Publishing Amorphie Definition Core

## Setup (Bir kez yapılacak)

### 1. GitHub Personal Access Token Oluşturma

1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. "Generate new token" → "Generate new token (classic)"
3. İzinler:
   - `repo` (tüm repo erişimi)
   - `write:packages` (paket yayınlama)
   - `read:packages` (paket okuma)
   - `delete:packages` (opsiyonel, paket silme için)

### 2. Token'ı Environment Variable Olarak Kaydetme

**macOS/Linux:**
```bash
# ~/.zshrc veya ~/.bashrc dosyanıza ekleyin
export NPM_TOKEN="ghp_YOUR_TOKEN_HERE"

# Değişikliği aktif edin
source ~/.zshrc  # veya source ~/.bashrc
```

**Windows:**
```cmd
# Sistem environment variable olarak ekleyin
setx NPM_TOKEN "ghp_YOUR_TOKEN_HERE"
```

### 3. .npmrc Dosyasını Oluşturma

```bash
# Core dizininde
echo '@amorphieteam:registry=https://npm.pkg.github.com' > .npmrc
echo '//npm.pkg.github.com/:_authToken=${NPM_TOKEN}' >> .npmrc
```

## Publishing

### Manuel Publish

```bash
# Versiyon güncelleme (patch/minor/major)
npm version patch  # 1.0.0 → 1.0.1
npm version minor  # 1.0.0 → 1.1.0
npm version major  # 1.0.0 → 2.0.0

# Publish
npm publish
```

### Otomatik Publish (GitHub Actions)

Release oluşturduğunuzda otomatik publish için `.github/workflows/publish.yml` kullanın.

## Test Etme

```bash
# Login kontrolü
npm whoami --registry https://npm.pkg.github.com

# Dry run (gerçekten publish etmeden)
npm publish --dry-run
```

## Sorun Giderme

### 401 Unauthorized
- Token'ın doğru izinlere sahip olduğundan emin olun
- Token'ın expire olmadığından emin olun
- Environment variable'ın doğru set edildiğini kontrol edin: `echo $NPM_TOKEN`

### 403 Forbidden
- Organization'da package yazma izniniz olduğundan emin olun
- Package adının organization prefix'i ile başladığından emin olun (@amorphieteam/)

### 404 Not Found
- Registry URL'nin doğru olduğundan emin olun
- Organization adının doğru yazıldığından emin olun

## Güvenlik Notları

⚠️ **ÖNEMLİ:**
- Token'ınızı ASLA commit etmeyin
- .npmrc dosyası .gitignore'da olmalı
- Token'ları düzenli olarak rotasyon yapın
- Minimum gerekli izinleri kullanın 