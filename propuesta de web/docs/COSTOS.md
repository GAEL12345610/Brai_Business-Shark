# Mesa de costos de Brai (para Viabilidad)

**Actualizada: 8 nov 2026**. NTAG213 actualizado con el comprobante facilitado y la cantidad de 100 stickers confirmada por el equipo. El resto conserva sus estimaciones anteriores.

**Referencias previas: 5 nov 2026** (VOID, tarjetas y envío del 424 DNA cotizados en línea; antes, 31 oct). Los precios son de páginas públicas consultadas ese día: confirmar con captura antes de entregar.
**Tipo de cambio:** 18.80 MXN por USD (FIX de Banxico del 30 oct 2026: 18.7962). **21 MXN por EUR** es supuesto: confirmar con el banco antes de entregar.
Lo que dice `?` no se pudo cotizar en México todavía. **Antes del 26 nov alguien del equipo abre cada liga, toma captura de pantalla y la guarda** (los precios de MercadoLibre cambian).

## 1. Costo de una obra registrada

### Versión 1: NTAG213 (pedido de 100 stickers confirmado)

Compra real: producto 162.16 MXN, descuento 8.19 MXN y envío 99.00 MXN. Total pagado: **252.97 MXN por 100 stickers**. Costo exacto por sticker: **2.5297 MXN**; presentado a dos decimales: **2.53 MXN**, incluido envío. Fuente: comprobante facilitado y cantidad confirmada por el equipo. No se incluyen datos personales del comprobante. El nombre del producto indica NTAG213; falta verificar físicamente con NFC Tools.

Este precio corresponde al NTAG213 básico, no al NTAG 424 DNA.

| Pieza | Costo por obra | De dónde sale |
|---|---|---|
| Sticker NFC NTAG213 | **2.53 MXN** | Compra real: 252.97 MXN / 100, incluido envío. Antes se estimaban 3.40 MXN. |
| Etiqueta raspadita | **1.60 MXN** | MercadoLibre México: 300 etiquetas rascables en 477.80 MXN (también hay 300 en 119.82 con descuento). Tomamos el caro. |
| Etiqueta antidesprendible (VOID) para el sello | **~0.70 MXN** | MercadoLibre México, 5 nov 2026: lotes de 500 hologramas VOID entre 208 y 349 MXN ([listado](https://listado.mercadolibre.com.mx/etiquetas-de-seguridad-void)). Tomamos el caro. Antes suponíamos 3.50 con un precio de Argentina. |
| Tarjeta de dueño impresa | **~2.90 MXN** | 100 tarjetas en opalina: 130 MXN a una cara ([Pop México](https://popmexico.com.mx/products/tarjetas-de-presentacion-opalina-texturizada)) o 2.88 MXN por pieza a doble cara sin IVA ([Printec](https://printec.mx/papeleria/tarjetas-de-presentacion/)). Tomamos el caro. **Ojo:** cada tarjeta lleva un código distinto, y una imprenta normal imprime 100 iguales; lo realista es imprimir en casa sobre opalina. Imprenta física en Guadalajara: `?` (pedir cotización a Imprematic o Todo en Vinil GDL). |
| QR impreso | **~1 MXN** | Se imprime en la misma hoja de etiquetas. |
| **Total por obra** | **~8.73 MXN** | 2.5297 + 1.60 + 0.70 + 2.90 + 1 = 8.7297. Solo el NFC es compra comprobada; los otros materiales siguen estimados. |

### Versión 2: NTAG 424 DNA (sello que no se puede copiar)

| Pieza | Costo por obra | De dónde sale |
|---|---|---|
| Sticker NTAG 424 DNA 22 mm | **~18.50 MXN** | Shop NFC (Italia): 0.88 EUR por pieza en lote de 50. |
| Envío a México | **0 MXN** (estándar, 8 a 16 días hábiles) | [Shop NFC, envíos](https://shopnfc.com/en/content/1-shipping-and-delivery): "Rest of the World" estándar sin costo; exprés desde 19.90 EUR. México no aparece por nombre: confirmar en el carrito. |
| Impuestos de importación | **~6.20 MXN** (supuesto) | Shop NFC dice que la aduana la paga quien recibe. 50 piezas son ~44 EUR (~924 MXN). Por mensajería, la tasa global de México para orígenes sin tratado aplicable es 33.5% desde ago 2025 ([The Logistics World](https://thelogisticsworld.com/actualidad-logistica/mexico-lleva-al-33-5-el-impuesto-a-importaciones-por-paqueteria/)); si aplica, son ~310 MXN, ~6.20 por pieza. Hasta 50 USD podría estar exento: **no está confirmado para envíos de Europa**. Lo confirma un adulto con la paquetería |
| Resto (raspadita, VOID, tarjeta, QR) | ~6.20 MXN | Igual que la versión 1. |
| **Total por obra** | **~31 MXN** con impuesto, ~25 sin él | 18.50 + 6.20 + 6.20. |

**El dato que cambia todo:** el sello seguro cuesta ~22 MXN más que el barato (con impuesto), no 40 a 90 como creíamos. Ver `COMPETENCIA.md` sección 4.

## 2. Costos fijos

| Concepto | Prototipo (concurso) | Comercial (con clientes que pagan) |
|---|---|---|
| Hosting web (Vercel) | 0 (plan Hobby) | **376 MXN al mes** (Pro, 20 USD). **Hobby no permite uso comercial.** |
| Base de datos (Supabase) | 0 (plan Free) | **470 MXN al mes** (Pro, 25 USD por organización, incluye 10 USD de cómputo). **Free se pausa tras 7 días sin uso.** |
| Dominio `brai.art` | **~49 MXN** el primer año (Porkbun, 2.60 USD con cupón) | **~395 MXN al año** (renovación ~21 USD) |
| **Total** | **~49 MXN al año** | **~10,550 MXN al año (~880 al mes)** |

Costo total del prototipo, con impresión: **menos de 500 MXN.** Si compramos 50 NTAG 424 DNA para la Expo: +925 MXN más envío.

## 3. Ingreso por cliente: dos ofertas

La **Oferta A** es la vigente (`OFERTA.md`). La **Oferta B** es la que vamos a probar en las entrevistas porque la competencia cobra por obra (ver `COMPETENCIA.md`).

Supuesto: el artista registra **10 obras al año** (5 en el arranque y 5 después en el año 1).

| | Oferta A (setup + mensualidad) | Oferta B (por obra) |
|---|---|---|
| Cómo se cobra | 7,500 de setup (hasta 20 obras) + 990 al mes | 2,500 de arranque (incluye 5 obras) + 450 por obra adicional, sin mensualidad |
| **Año 1** | **19,380 MXN** | **4,750 MXN** |
| **Año 2 en adelante** | **11,880 MXN** | **4,500 MXN** |
| % de lo que vende el artista (10 obras de 12,000) | 16% el año 1, 10% después | 4% el año 1 y después |
| Materiales (versión 1, 10 obras) | ~87.30 al año | ~87.30 al año |

**La verdad sin suavizar:** B es mucho más fácil de vender (4% se parece a lo que ya pagan en comisiones de tarjeta, 16% no). Pero con B necesitas **4 veces más clientes** para ganar lo mismo. Ninguna de las dos está validada: la entrevista decide.

## 4. Escenarios del año 1 (modo comercial)

Costo fijo comercial: 10,550 MXN al año.

| Clientes | Oferta A ingreso | Oferta A utilidad | Oferta B ingreso | Oferta B utilidad |
|---|---|---|---|---|
| 1 | 19,380 | **8,742.70** | 4,750 | **-5,887.30** |
| 5 | 96,900 | **85,913.50** | 23,750 | **12,763.50** |
| 15 | 290,700 | **278,840.50** | 71,250 | **59,390.50** |

(Resultado antes de horas, transporte, impuestos y otros gastos = ingreso − 10,550 − materiales de 87.30 por cliente, para 10 obras. Se usa 8.73 por obra, redondeado. La tabla anterior usaba 150 por cliente sin coincidir con las 10 obras del supuesto.)

**Punto de equilibrio:**
- Oferta A: **1 cliente** cubre la infraestructura (990 > 880 al mes).
- Oferta B: **3 clientes** en el año 1 (3 × 4,750 = 14,250 > 10,550 + 261.90).

**Lo que NO está contado (y un buen profesor lo va a preguntar):** las horas del equipo. Un setup son ~8 horas (fotos, fichas, grabar sellos, imprimir). 5 clientes = ~40 horas. Si a esas horas les ponemos un precio de 100 MXN la hora, son 4,000 MXN: con Oferta A sigue ganando, con Oferta B se come un tercio de la utilidad.

## 5. Tamaño del mercado (para la diapositiva de crecimiento)

- **8,870** pintores, dibujantes artísticos, escultores y escenógrafos en Jalisco; **127,000** en México (DataMéxico, ENOE 2025-T1).
- *Hipótesis sin validar:* si el 2% cumple el perfil de cliente (vende 10+ obras al año a 10k+), son **~177 artistas en Jalisco**. Con Oferta A, año 1: ~3.4 millones MXN. Con Oferta B: ~840,000 MXN. Es un techo teórico, no una meta.
- 69% de los coleccionistas ya compró directo al artista, ~19 a 20% de su gasto (Art Basel y UBS, 2025 y 2026): el canal donde vive Brai crece.

## Fuentes
- Tipo de cambio: [Milenio, FIX 30 oct 2026](https://www.milenio.com/negocios/precio-del-dolar-hoy-30-octubre-2026-a-cuanto-cotiza-en-vivo-atm), [Banxico](https://www.banxico.org.mx/apps/dao-web/4/52/Fix48.html).
- NTAG213: [MercadoLibre, sticker NTAG213](https://listado.mercadolibre.com.mx/sticker-ntag213), [nfc ntag213](https://listado.mercadolibre.com.mx/nfc-ntag213).
- Raspadita: [MercadoLibre, 300 etiquetas rascables](https://articulo.mercadolibre.com.mx/MLM-3325917384--300-etiquetas-adhesivas-rascables-rasca-y-gana-sticker-_JM), [etiquetas rascables](https://listado.mercadolibre.com.mx/etiquetas-rascables).
- VOID (referencia): [500 etiquetas void](https://latinafy.com/products/500-security-labels-void-30x22-eggshell-holograms/).
- NTAG 424 DNA: [Shop NFC 22 mm](https://shopnfc.com/en/nfc-stickers/487-nfc-stickers-ntag424-dna-d22mm.html), [AliExpress](https://www.aliexpress.us/item/3256812450805762.html).
- Supabase y Vercel: [JetAdmin, Supabase 2026](https://www.jetadmin.io/blog/supabase-pricing-2026-guide-to-plans-limits-and-real-world-costs/), [JetAdmin, Vercel vs Supabase](https://www.jetadmin.io/blog/vercel-vs-supabase/amp/), [Vercel, plan Hobby](https://vercel.com/docs/plans/hobby).
- Dominio: [domainoffer, Porkbun .art](https://domainoffer.net/tld/art/porkbun), [comparador .art](https://domainoffer.net/price-compare-art).
- Mercado: [DataMéxico, subgrupo 216](https://www.economia.gob.mx/datamexico/es/profile/occupation/pintores-disenadores-y-dibujantes-artisticos-escultores-y-escenografos), [Survey of Global Collecting (Ocula)](https://ocula.com/magazine/art-news/2025-art-basel-ubs-survey-global-collecting/).
