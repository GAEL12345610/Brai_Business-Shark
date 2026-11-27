# Listo para abrir

Dos archivos que se abren con doble clic, sin instalar nada y sin internet. Sirven en la Chromebook, en una USB o mandados por correo.

| Archivo | Qué es | Cómo se usa |
|---|---|---|
| `Brai-web.html` | La web completa del rediseño: portada, verificar una obra, página de la obra, reclamar, artista y panel | Ábrelo en Chrome. Para probar, escribe el código `7KQ2X`. El código de dueño de la demo es `4K7P-9QX2` |
| `Brai-presentacion.html` | La presentación animada de 15 láminas | Ábrelo en Chrome. Flechas o clic para avanzar, `F` para pantalla completa |

Cómo bajarlos desde GitHub: entra al archivo, toca el botón de descarga (flecha hacia abajo, "Download raw file") y abre lo que se descargó.

## Lo que hay que saber
- Son copias: lo que se edita vive en `app/` (la web) y en `pitch/jurado-26nov/presentacion.html` (la presentación).
- En `Brai-web.html` la navegación vive en memoria: si recargas la página, vuelves a la portada. Lo que reclames o registres se guarda solo en ese navegador.
- Para abrir una obra directo, agrega `?ruta=/o/7KQ2X` al final de la dirección. Sirve para probar un sello NFC o un QR que apunte a una obra.
- La web sigue siendo una demo con personas y obras de ejemplo. Nada se envía a ningún servidor.

## Cómo volver a generarlos
Después de cambiar la web o la presentación:

```
cd app
pnpm portatil
cd ..
node pitch/jurado-26nov/empaquetar.mjs
```
