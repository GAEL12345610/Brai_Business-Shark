> Notas de quien animó los videos, con dos ajustes del 27 nov 2026 (la voz i06 y la tabla del infomercial). Cómo cambiar y regrabar: `../README.md`.

# Brai · videos para Business Shark 8°

Dos videos 1920 × 1080, pensados para grabarse a 30 fps cuadro por cuadro.

| Video | Archivo | Duración |
|---|---|---|
| Infomercial | `video-infomercial.dc.html` | **58.8 s** |
| Completo | `video-completo.dc.html` | **173.8 s (2:53.8)** |

Cada uno conserva `[data-om-exportable-video-with-duration-secs]` (en el `<svg>` del escenario) y responde al evento `data-om-seek-to-time-frame` con `detail.time` en segundos. Lo maneja `animations-v3.jsx`; no hay otro elemento con ese atributo.

## Qué hay en la carpeta
```
video-infomercial.dc.html   video-completo.dc.html     los dos videos
animations-v3.jsx           motor de línea de tiempo (exportable, seek)
brai-piezas.jsx             las 15 láminas de presentacion.html como funciones del tiempo, subtítulos y audio
video-infomercial.jsx       montaje del infomercial
video-completo.jsx          montaje del completo
plan-infomercial.js         subtítulos, momentos de animación y sonidos, por escena
plan-completo.js            lo mismo para el completo
mezcla.js                   genera la mezcla (voz + música + sonidos), todo sintetizado aquí
herramientas/mezclar.html   rehace los .wav si cambia una voz o una duración
assets/                     fuentes, isotipo.svg, obras, capturas de la web, QR, grano.svg
audio/infomercial/  audio/completo/   voces de ElevenLabs tal cual
audio/infomercial-mezcla.wav  audio/completo-mezcla.wav   mezclas finales, mono 44.1 kHz 16 bit
portada-infomercial.png  portada-completo.png   1920 × 1080
```
Nada va en base64: imágenes, fuentes y audios son archivos sueltos con rutas relativas. (Al exportar, el motor incrusta las fuentes en memoria para pintar cada cuadro; eso no se guarda en ningún archivo.)

## Dónde se ajusta el tiempo
- **Duración de cada escena:** un solo lugar, `window.OM_SCENES` en el `<helmet>` de cada `.dc.html`. Los `name` son los mismos de los archivos de voz. Todo lo demás (capas, subtítulos, sonidos) se calcula desde ahí.
- **Dentro de cada escena:** `plan-*.js`. Todos los tiempos son segundos desde que empieza la escena. La voz entra a los 0.6 s de cada escena y deja 0.8 s de aire al final (escena = audio + 1.4 s, como pide el guion).
- **Si se regenera una voz:** cambiar `dur` en `OM_SCENES`, revisar los tiempos de esa escena en el plan y rehacer la mezcla con `herramientas/mezclar.html` (abrir con un servidor local, por ejemplo `npx serve` en esta carpeta).

## Segundo en que empieza cada escena

### Infomercial (58.8 s)
| # | id | inicio | dura | voz |
|---|---|---|---|---|
| 1 | gancho | 0.0 | 5 | sin voz |
| 2 | el-artista | 5.0 | 8.1 | i02 |
| 3 | las-dudas | 13.1 | 6.5 | i03 |
| 4 | brai | 19.6 | 5.8 | i04 |
| 5 | el-toque | 25.4 | 6.8 | i05 |
| 6 | registrada | 32.2 | 8.6 | i06 |
| 7 | el-artista-sabe | 40.8 | 5 | i07 |
| 8 | cualquier-celular | 45.8 | 7.8 | i08 |
| 9 | cierre | 53.6 | 5.2 | i09 |

### Completo (173.8 s)
| # | id | inicio | dura |
|---|---|---|---|
| 1 | portada | 0.0 | 5.4 |
| 2 | problema | 5.4 | 14.2 |
| 3 | solucion | 19.6 | 9.0 |
| 4 | pasos | 28.6 | 15.6 |
| 5 | sistema | 44.2 | 15.5 |
| 6 | demo | 59.7 | 6.2 |
| 7 | innovacion | 65.9 | 13.9 |
| 8 | costo | 79.8 | 11.2 |
| 9 | costos-fijos | 91.0 | 11.4 |
| 10 | precios | 102.4 | 18.9 |
| 11 | margen | 121.3 | 8.1 |
| 12 | ganancia | 129.4 | 12.6 |
| 13 | mercado | 142.0 | 13.9 |
| 14 | competencia | 155.9 | 12.5 |
| 15 | cierre | 168.4 | 5.4 |

## Lo que decidí
- **Sincronía con la voz real.** Medí las pausas de cada mp3 (silencios de más de 0.12 s). Cada subtítulo entra cuando empieza su frase y cada número, tarjeta o ícono aparece cuando la voz lo nombra (por ejemplo: el contador de $8.73 arranca en "ocho pesos", la etiqueta dorada en "registrada por el artista", cada paso en su frase, "La entrevista decide." sube cuando la voz lo dice).
- **Subtítulos:** el texto de los `.srt`, sin cambiar palabras. Tres frases largas del completo las partí en dos en la pausa natural (escena 5, 11 y 12) para que nunca pasen de 2 líneas. Van en una caja tinta al 86 % con texto lienzo, Schibsted 38 px, abajo y encima del pie de lámina.
- **Diseño:** cada lámina es la misma de `presentacion.html` (mismas medidas, colores, fuentes y entradas: sube, zoom, gira, palabras que suben, barras, contadores, ondas). Solo cambié cuándo entra cada cosa. El grano, que en la presentación era un SVG en base64, ahora es `assets/grano.svg`.
- **Inicio cinematográfico (infomercial):** primer plano del reverso a oscuras; una luz se abre desde el sello mientras su logo se dibuja con un punto de luz recorriendo el trazo. El teléfono se acerca, vibra y la pantalla se enciende. Desde el cuadro 1 hay movimiento.
- **Logo:** siempre `isotipo.svg` como imagen, revelado con una máscara cónica que arranca en el hueco de las 2 en punto, con halo y chispa por fuera. Nunca se redibuja.
- **Nada quieto más de 2 s:** luces que derivan, acercamiento lento de cámara en cada escena (2 %), columnas de obras, órbita punteada, puntos que viajan por las flechas y ondas del sello.
- **Continuidad:** en el infomercial la obra de la escena 2 es la misma del centro en la escena 3 (se aleja hasta su lugar exacto), y el reverso y el teléfono son la misma pieza de la escena 4 a la 6. Así nada se ve doble en las transiciones. Entre las demás escenas hay fundido cruzado de 0.6 s, la nueva encima de la anterior.
- **Escena 6 del infomercial (registrada):** el teléfono va al centro, cae el sello dorado en su pantalla y la etiqueta grande "Registrada por el artista", luego la tarjeta firmada y "Dueño: A. L.".
- **Escena 7 (el artista sabe):** captura real del panel (con su franja DEMO). El renglón del dueño aparece barriéndose y se marca en terracota. Rótulo nuevo: "Panel del artista".
- **Escena 8 (cualquier celular):** tres tarjetas Toca, Escanea, Escribe con íconos de línea del mismo estilo que los de la presentación (NFC es el de la lámina 05; QR y teclado son trazos simples nuevos).
- **Cierre del infomercial:** lámina 15 con la línea "Prototipo de estudiantes · braiart.vercel.app" (en contorno, sin dorado).
- **Audio:** música, sonidos y mezcla sintetizados por código en `mezcla.js` (sin archivos de terceros, sin licencias que comprobar). Música: pad suave en Re con bajo y notas sueltas, unos 15 dB debajo de la voz y baja 6 dB más cuando hablan. En el infomercial entra con la escena 2, como dice el guion; en el completo desde el inicio. Al final sube y se apaga. Un sonido corto por animación según cada guion: vibración, golpe grave, golpes suaves, toque brillante, campanita, clic, tic, contador, enfoque, deslizamiento y subida de tono. Pico normalizado a −1 dBFS.
- **Vista previa:** el `.dc.html` reproduce la mezcla `.wav` sincronizada al tocar play (el navegador pide un clic antes de sonar).

## Lo que no pude hacer o hay que revisar
1. **`i06-registrada.mp3` ya está (27 nov 2026).** Llegó después de la entrega: la escena pasó de 10 s estimados a 8.6 s reales, se ajustaron sus tiempos en `plan-infomercial.js` y se rehizo `audio/infomercial-mezcla.wav`.
2. **Números fuera de `numeros.md`.** Como ahí dice "si un número no está aquí, no va en el video", quité de las láminas: la línea del 69 % de coleccionistas (lámina 13), "$10,550" y "$87.30" del pie de la lámina 12 y "$395 al año al renovar, $49 el primero" del pie de la lámina 09. Los pies quedaron "Ingreso menos costo fijo y materiales", "Fuente: docs/COSTOS.md" y "Es un techo, no una meta". Dejé los precios de la competencia en la tabla (lámina 14) y "20 obras", "5 obras" de las opciones, porque son parte del diseño aprobado; si tampoco deben ir, se quitan en `brai-piezas.jsx`.
3. **Dorado.** Las píldoras doradas (Hipótesis, Prototipo, Demo, Dato, En prueba, Proyección), el chip "Sin descargar nada", la barra del sello NFC y el punto que viaja son dorados en la presentación y los dejé así para no rediseñar. El único momento que brilla y se anima en dorado es "registrada".
4. **Máscaras al exportar.** La lámina 01 y la 15 desvanecen arriba y abajo las columnas de obras con `mask-image`. Si el grabador no respeta máscaras, las columnas se verán cortadas en seco en los bordes; no es grave.
5. **No escuché la mezcla.** Revisé niveles por número (voz cerca de −19 dBFS RMS, música sola cerca de −35), pero conviene oírla una vez antes de entregar.
6. La mezcla es mono. Si el grabador pide estéreo, duplicar el canal al unir video y audio.
