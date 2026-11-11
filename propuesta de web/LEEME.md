# Propuesta de web de Brai

Esta carpeta contiene una versión independiente. No reemplaza `app/` ni modifica la web original. La configuración de Vercel del proyecto original no cambia.

**Versión anterior, conservada:** https://chatgptdameunnombre-png.github.io/brai-propuesta-premium

**Variante premium para comparar:** https://chatgptdameunnombre-png.github.io/brai-propuesta-premium/premium

La variante es opcional: no reemplaza la portada anterior. Su inicio muestra el logo ampliado con botones como subtítulos; debajo conserva el contenido, las animaciones originales, «Lo que nos preguntan» y el cierre de la versión anterior. Su código está en `app/src/pages/Premium.tsx` y `app/src/pages/premium.css`. El ZIP original de referencia está en `sugerencias de diseño premium/estilo-web-premium.zip`.

## Organización

| Carpeta o archivo | Contenido |
|---|---|
| `app/` | Código editable de la web, recursos y pruebas. |
| `docs/COSTOS.md` | Desglose actualizado de la compra de NFC y cálculos de materiales. |
| `docs/` | Documentos de soporte, incluida comparación de costos y ofertas. |
| `pitch/` | Fuentes editables de las presentaciones, con costos actualizados. |
| `brand/`, `visuales/` | Recursos necesarios para abrir las presentaciones. |
| `portada.png` | Vista de la portada con letras naranjas y logo grande. |

## Qué cambia en la web

Logo más grande, letras naranjas de la marca, eslogan y navegación debajo. Introducción breve al problema con animación que puede pausarse. El isotipo sustituye a la mascota en las pantallas de la propuesta. Los datos siguen siendo de demostración y se guardan solo en el navegador.

## Compra de NFC confirmada

| Concepto | MXN |
|---|---:|
| Producto, paquete de 100 NTAG213 | 162.16 |
| Descuento | -8.19 |
| Envío | 99.00 |
| Total pagado | **252.97** |
| Costo por NFC, incluido envío | **2.53** |
| Materiales estimados por obra | **8.73** |

El costo exacto por sticker es 2.5297 MXN. La cantidad de 100 fue confirmada por el equipo. Los demás materiales siguen siendo estimaciones; el tipo de chip debe verificarse con NFC Tools. Esta compra no corresponde al NTAG 424 DNA. Los precios de venta de Brai (opciones A y B) se conservan.

No se adjunta el comprobante con datos de pago. Los PDF y videos generados de la versión anterior no se incluyen para evitar distribuir costos desactualizados. Sus fuentes editables están en `pitch/`.

## Ejecutar y verificar

Con Node 22.12 o posterior y pnpm, desde esta carpeta:

```sh
cd app
pnpm install --frozen-lockfile
pnpm dev
```

```sh
pnpm test
pnpm build
pnpm preview
```

Las pruebas utilizan también los documentos de `docs/` y `pitch/` incluidos aquí. No se necesita crear cuentas, conectar Supabase ni configurar secretos para probar la demo.

La lista original de pendientes del equipo sigue en `../TODO.md`.
