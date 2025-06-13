# Amorphie Definition Core Project Rules

## Workflow Transition Kuralları

- Hiçbir transition'ın `target` alanı `null` olamaz.
- Silme veya bitirme işlemleri için mutlaka bir state'e yönlendirme yapılmalıdır (örn: `deleted` state).
- Bu sayede workflow state makinesi her zaman deterministik ve geri alınabilir olur. 