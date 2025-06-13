# Amorphie Definition Core Project Rules

## Workflow Transition Kuralları

- **Transition'larda `target` asla null olamaz (self dahil).**
- Her transition bir state'e yönlendirilmelidir. `type: self` ise target bulunduğu state'in key'i olmalıdır.
- Silme veya bitirme işlemleri için mutlaka bir state'e yönlendirme yapılmalıdır (örn: `deleted` state).
- Bu sayede workflow state makinesi her zaman deterministik ve geri alınabilir olur.
- **State ve transition key'leri camelCase olmalıdır.**
- Tüm modellerde (ör: state, transition, schema, vs.) key alanlarında camelCase kullanımı zorunludur. 