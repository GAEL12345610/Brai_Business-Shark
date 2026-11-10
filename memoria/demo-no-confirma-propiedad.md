---
name: demo-no-confirma-propiedad
description: No confirmar propiedad ni notificaciones en una demo local y fallar explícitamente cuando no se guarda el reclamo.
---
La demo mostraba un registro real y aviso al artista aunque solo escribía en sessionStorage. Si fallaba el almacenamiento devolvía éxito. Separar siempre simulación y persistencia real.
