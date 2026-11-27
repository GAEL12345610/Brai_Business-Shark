# TODO de Brai

**Responsable del repositorio desde el 1 nov 2026: Ricardo.**
Actualizado: 31 oct 2026. Lo hecho se marca con `[x]` y se deja; lo que deja de importar se tacha con `~~así~~` y se dice por qué.

Cómo leer esto: **Para quién** dice si lo hace Ricardo, el equipo o un adulto. **Dónde** dice qué archivo tocar o leer.

---

## Sacar los números reales (27 nov 2026)

**Hoy el único número real es el del sello NFC: $2.53 por sello (se compraron 100 por $252.97).** Todo lo demás que sale en la presentación (`pitch/jurado-26nov/presentacion.html`), en los videos (`pitch/video/`) y en `docs/COSTOS.md` es estimado, supuesto o proyección. Hay que conseguir el dato real de cada uno y cambiarlo en su documento dueño. Cómo cambiarlo después en los videos: `pitch/video/README.md`.

| | Número | Hoy dice | Qué es hoy | Cómo sacar el real | Para quién |
|---|---|---|---|---|---|
| [x] | Sello NFC | $2.53 | **Real**: compra de 100 por $252.97 | Falta confirmar el tipo de chip con NFC Tools | Equipo |
| [ ] | Tarjeta de dueño | $2.90 | Estimado de páginas en línea | Cotizar en una imprenta de Guadalajara o imprimir una hoja de prueba y dividir | Equipo con adulto |
| [ ] | Etiqueta | $1.60 | Estimado de MercadoLibre | Comprar un paquete o tomar captura del precio el día de la compra | Equipo con adulto |
| [ ] | QR impreso | $1.00 | Supuesto | Imprimir una hoja de etiquetas y dividir el costo entre las que salen | Equipo |
| [ ] | Etiqueta VOID | $0.70 | Estimado de MercadoLibre | Comprar un paquete o tomar captura del precio el día de la compra | Equipo con adulto |
| [ ] | Costo por obra | $8.73 | Suma de lo de arriba | Se vuelve a sumar cuando estén los cuatro reales | Equipo |
| [ ] | Servidor y base de datos | $376 y $470 al mes | Precio de lista en dólares, pasado a pesos | Confirmar el plan que de verdad se usaría y el tipo de cambio del día | Ricardo |
| [ ] | Dominio | $49 el primer año, $395 al renovar | Precio visto en línea | Se confirma al comprar `brai.art` | Adulto |
| [ ] | Precios A y B | $7,500 más $990 al mes, o $2,500 más $450 por obra | En prueba: nadie ha pagado | Entrevistas con artistas: cuál escogen y cuánto pagarían | Equipo con adulto |
| [ ] | Obras por artista al año | 10 | Supuesto | Preguntarlo en cada entrevista | Equipo con adulto |
| [ ] | Horas por artista | 13 | Supuesto | Tomar el tiempo en el primer registro de verdad | Equipo |
| [ ] | Ganancia del año 1 | hasta $278,841 con 15 artistas | Proyección hecha con los supuestos de arriba | Se recalcula cuando cambien el costo, el precio y las obras por año | Equipo |
| [ ] | Posibles clientes | 177 | Supuesto: 2% de 8,870 artistas de Jalisco | Entrevistas y una fuente que diga cuántos venden obra original | Equipo |

Cuando un número cambie: primero en `docs/COSTOS.md` o `docs/OFERTA.md`, luego en `pitch/video/guion/numeros.md`, y de ahí a la presentación y a los videos.

---

## 0. Revisar el trabajo del 5 nov (publicado el 6 nov)

Claude dejó la demo diciendo la verdad sobre sí misma, el paquete de la reunión y los materiales del 26 nov. **Se unió a `main` y se publicó en `braiart.vercel.app` el 6 nov 2026, a pedido de Gael.** Falta que el equipo lo revise: si algo no les gusta, se cambia y se vuelve a publicar.

| | Tarea | Para quién | Dónde |
|---|---|---|---|
| [ ] | Leer las propuestas P1 a P11 (ya publicadas) y quedarse con ellas, cambiarlas o revertirlas | Equipo | `docs/DECISIONES.md`, sección 5 nov |
| [ ] | Decidir con un adulto si `/jose-luis` sigue publicado antes de que él lo vea, o se apaga con `VITE_DEMO_JOSE_LUIS=0` | Equipo con adulto | `docs/DEMO_JOSE_LUIS.md`, propuesta P8 |
| [ ] | Recorrer la demo publicada en el celular | Ricardo | `braiart.vercel.app`, `pitch/reunion-jose-luis/checklist-demo.md` |
| [ ] | Probarla en un iPhone y un Android de verdad (Claude solo la probó emulada) | Ricardo | `braiart.vercel.app` |
| [x] | ~~Volver a generar `visuales/`~~: regenerados el 5 nov. La próxima vez, `bash visuales/regenerar-todo.sh` | Ricardo | `visuales/README.md` |
| [ ] | Definir el precio de fundador del mes 4 con la Opción B | Equipo | `docs/OFERTA.md` |
| [ ] | Leer `PERSPECTIVAS.md` y `MERCADO.md`: el certificado digital ya es gratis en markmy.art; decidir qué se vende entonces | Equipo | `docs/PERSPECTIVAS.md`, `docs/MERCADO.md` |
| [ ] | Conseguir una obra real de alguien cercano, con permiso por escrito revisado por un adulto, para la demo del 26 nov (`CONCURSO.md` la pide) | Equipo con adulto | `docs/PERSPECTIVAS.md`, sección 3 |
| [ ] | Llenar las láminas 12 y 14 del deck del jurado con entrevistas reales y el equipo | Equipo | `pitch/jurado-26nov/` |

## Calendario propuesto hasta el 26 nov (lo ajusta el equipo)

Lo que más sube la calificación no es código: son las entrevistas y una obra real con permiso (`docs/PERSPECTIVAS.md`).

| Semana | Qué | Listo cuando |
|---|---|---|
| **5 a 11 nov** | Revisar y unir la rama del 5 nov. Un adulto agenda las 8 entrevistas. Conseguir una obra real con permiso por escrito. Definir roles con nombres. Llenar los `?` de `COSTOS.md` | Hay 8 fechas en el calendario y roles en `CONCURSO.md` |
| **12 a 18 nov** | Hacer las entrevistas con las hojas impresas (`visuales/documentos/hojas-de-entrevista.pdf`). Confirmar con el profe la fecha del infomercial y grabarlo | Fichas llenas en `CLIENTES.md`. Video grabado |
| **19 a 25 nov** | Decidir A o B si 2 de 3 coinciden (DECISIONES #26). Llenar las láminas 12 y 14 del deck. Probar la demo en un iPhone y un Android. Ensayar la presentación 2 veces con reloj | Deck final en PDF. Ensayo sin pasarse de tiempo |
| **26 nov** | Propuesta final | |

## 1. Antes de la reunión con José Luis (urgente)

| | Tarea | Para quién | Dónde |
|---|---|---|---|
| [ ] | Crear un correo normal del proyecto (Gmail, por ejemplo). **Nunca el correo personal de un integrante.** | Equipo con un adulto | |
| [ ] | Poner ese correo en el aviso de privacidad (hoy es un borrador no vigente) y en `/demo`, sección Contacto. Quitar de `app/pruebas/claims.test.ts` la regla del correo solo si el correo ya existe | Ricardo | `app/public/privacidad.html`, `app/src/pages/Demo.tsx` |
| [ ] | Pedirle a José Luis permiso y fotos de sus obras para la demo, **por escrito y después de la plática**, nunca antes | Equipo con adulto | `docs/DEMO_JOSE_LUIS.md` |
| [ ] | Que un adulto lea el aviso de privacidad antes de que alguien real deje su correo | Adulto | `app/public/privacidad.html` |
| [ ] | Agendar la reunión con José Luis, con un adulto presente. El mensaje de contacto ya está en borrador | Adulto y equipo | `docs/REUNION_JOSE_LUIS.md`, `pitch/reunion-jose-luis/borradores-adulto.md` |
| [ ] | Probar el link de la demo en un iPhone y un Android | Ricardo | `braiart.vercel.app/jose-luis` |
| [ ] | Imprimir el one-pager y, si quieren, las piezas de la obra de ejemplo (dicen DEMO). ~~Piezas de *Toricleto*~~: es una obra real a la venta; la demo genérica va primero | Equipo | `pitch/reunion-jose-luis/one-pager.pdf`, `braiart.vercel.app/imprimir/7KQ2X` |

## 2. Antes del 26 de noviembre (propuesta final)

| | Tarea | Para quién | Dónde |
|---|---|---|---|
| [ ] | Entrevistar a José Luis + 2 artistas más + 5 compradores | Equipo con adulto | `docs/ENTREVISTAS.md`, `docs/CLIENTES.md` |
| [ ] | Decidir Oferta A o B con lo que digan los artistas | Equipo | `docs/OFERTA.md`, `docs/DECISIONES.md` #26 |
| [ ] | Hacer el deck del 26 nov | Equipo | skill `brai-slides`; las imágenes ya están en `visuales/` |
| [ ] | Grabar el infomercial (obligatorio para pasar) y confirmar la fecha con el profe. Hay un animatic de guía con tiempos y textos | Equipo | `pitch/infomercial_guion.md`, `pitch/clips/animatic-infomercial.mp4` |
| [ ] | Comprar `brai.art` **antes de bloquear cualquier sello** | Adulto | ~49 MXN el primer año, `docs/COSTOS.md` |
| [ ] | Llenar los `?` de costos con capturas de MercadoLibre (etiquetas VOID, tarjetas) | Equipo | `docs/COSTOS.md` |
| [ ] | Revisar con NFC Tools de qué tipo son los 50 stickers que ya tenemos | Equipo | `docs/SEGURIDAD_OBRA.md` |
| [ ] | Cotizar el envío de 50 NTAG 424 DNA | Equipo | `docs/COSTOS.md`, decisión #27 |
| [ ] | Definir roles con nombres | Equipo | `docs/CONCURSO.md` |

## 3. Técnico (Ricardo), en este orden

| | Tarea | Dónde |
|---|---|---|
| [ ] | Crear el proyecto en Supabase y correr las 5 migraciones (con un adulto) | `docs/PROTOTIPO.md`, sección "Conectar Supabase" |
| [ ] | Cambiar la app para que lea de Supabase en lugar de `src/data/demo.ts`. Ojo: el color va en `tema.acento` y `reclamar_obra` pide nombre | `app/src/data/demo.ts`, `docs/PROTOTIPO.md` |
| [ ] | Conectar el panel a Supabase (login con enlace al correo, registrar obra con fotos reales). Hay una versión vieja en el historial: commit `2676021`, `app/src/app/paginas/Panel.tsx` | `app/src/pages/Panel.tsx` |
| [ ] | Correr el agente `app-security-auditor` antes de guardar datos reales | `.claude/agents/` |
| [ ] | Pantalla de "sello original" para el 424 DNA en la página de la obra (el backend ya está) | `app/supabase/functions/sello/` |
| [ ] | Transferir una obra desde el dueño, no solo desde el artista | `docs/SEGURIDAD_OBRA.md`, paso 5 |
| [ ] | Aviso por correo al artista cuando su obra cambia de dueño | |

## Herramientas y cuentas (revisado el 31 oct 2026)
| Herramienta | Estado | Qué falta |
|---|---|---|
| Vercel | Publica `main` solo en `braiart.vercel.app` | Nada para la demo. Plan Hobby: gratis, pero no permite uso comercial (`docs/COSTOS.md`) |
| Supabase | **Sin cuenta.** La sesión no tenía llave de Supabase | Crear el proyecto (gratis) con un adulto y correr las migraciones (`docs/PROTOTIPO.md`) |
| GitHub | Funciona | |
| AWS y Google Cloud | Había credenciales en la sesión, pero **no eran válidas**. Brai no las necesita | Nada |
| Dominio `brai.art` | No comprado | ~2.60 USD el primer año en Porkbun. **Es el único gasto pendiente** |

No se gastó dinero en ninguna herramienta.

## 4. Deuda conocida (no es urgente, pero que no se olvide)
- La demo usa el mismo código de dueño (`4K7P-9QX2`) para todas las obras y cuenta los intentos en memoria. Es a propósito para la demo y la app lo dice; la versión real está escrita en las migraciones, no conectada.
- Accesibilidad sin auditar: contraste formal, lector de pantalla y celulares reales. La raspadita ya se usa con teclado (5 nov).
- El video del artista y las fotos huella siguen siendo de ejemplo.
- No hay `Content-Security-Policy` en `app/vercel.json` porque `app/index.html` tiene un script en línea. Para ponerla, mover ese script a un archivo.
- El video del artista en la página de la obra es una portada sin video.
- La huella de la demo usa FNV (rápida, para enseñar); la de Supabase usa SHA-256.

## Cómo trabajar en el repo (Ricardo, léelo una vez)
1. Al empezar: `git fetch --all` y `git branch -a`. **Si hay ramas `claude/*` sin unir, revisarlas antes de construir** (`memoria/una-sesion-a-la-vez.md`).
2. Todo cambio en una rama y luego Pull Request a `main`. **Lo que llega a `main` se publica solo en Vercel.**
3. Antes de unir: `pnpm build`, `pnpm test` y, si tocaste la base, `pnpm test:db`. Luego abre la página en el celular: compilar no es verificar.
4. `CLAUDE.md` le explica a Claude cómo trabajar. `docs/DECISIONES.md` dice por qué está todo como está.
5. Cada error nuevo, una nota en `memoria/`.

## Hecho el 31 oct 2026
- [x] Landing, página de la obra, reclamar, página del artista, imprimir piezas.
- [x] Panel del artista de ejemplo y recorrido de 5 pasos con calculadora de precios.
- [x] Mascota Punto y kit de marca vivo en `/marca`.
- [x] Imagen para compartir (`og.png`) y clip vertical de la escena del sello.
- [x] Demo pública de José Luis en `/jose-luis` con sus obras reales y fuentes (`docs/DEMO_JOSE_LUIS.md`).
- [x] Punto v2 (principios de Clawd).
- [x] Todos los visuales en PNG, PDF, PPTX y GIF en `visuales/` (para la Chromebook). Se regeneran con `visuales/generar.cjs` y `visuales/deck.cjs`.
- [x] Backend en migraciones con 21 pruebas, verificación del 424 DNA y cadena de huellas.
- [x] Competencia, costos cotizados, Oferta B en prueba.
