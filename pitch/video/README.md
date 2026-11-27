# Videos de Brai

Dos videos horizontales (1920 × 1080) con voz, música, sonidos y subtítulos.

| Video | Archivo | Dura | Para qué |
|---|---|---|---|
| Infomercial | `Brai-infomercial.mp4` | 59 s | El que pide el concurso para pasar la eliminatoria (de 30 s a 1 min y medio, con subtítulos) |
| Completo | `Brai-completo.mp4` | 2 min 54 s | La presentación de 15 láminas, narrada |

La voz habla como el equipo ("Somos Brai"). Se generó en ElevenLabs con la voz Kate.

## PENDIENTE: sacar los números reales
**Hoy el único número real es el del sello NFC** ($2.53 por sello: se compraron 100 por $252.97). Todo lo demás que dicen los videos y la presentación es estimado, supuesto o proyección. Hay que conseguir los números reales y cambiarlos. La lista completa, con qué falta y cómo conseguirlo, está en `TODO.md`, sección "Sacar los números reales". Cuando cambie un número, sigue el renglón "Un número" de la tabla de abajo.

## Qué hay en esta carpeta
```
Brai-infomercial.mp4   Brai-completo.mp4    los videos terminados
grabar.cjs             vuelve a grabar un video a MP4
mezclar.cjs            rehace el audio (voz + música + sonidos)
guion/                 lo que dice cada escena, los textos para ElevenLabs y la hoja de números
fuente/                el video editable: láminas, tiempos, voces y música
```

## Cómo cambiar algo
Los videos no se editan en un programa de video: están hechos con código, igual que la presentación. Cambias un archivo y lo vuelves a grabar.

| Quiero cambiar | Dónde | Después corre |
|---|---|---|
| Un texto de una lámina (título, tarjeta, rótulo) | `fuente/brai-piezas.jsx`. Lo exclusivo del infomercial está en `fuente/video-infomercial.jsx` | grabar |
| Un subtítulo | `subs` de esa escena en `fuente/plan-infomercial.js` o `fuente/plan-completo.js` | grabar |
| El momento en que aparece algo | `b` de esa escena en el mismo plan. Son segundos desde que empieza la escena | grabar |
| Un sonido de una animación | `sfx` de esa escena en el plan | mezclar y grabar |
| La música | `fuente/mezcla.js` | mezclar y grabar |
| Una voz | Ver "Cambiar una voz", abajo | mezclar y grabar |
| Cuánto dura una escena | `window.OM_SCENES` en `fuente/video-infomercial.dc.html` o `fuente/video-completo.dc.html` | mezclar y grabar |
| Un número | 1. El documento dueño del dato (`docs/COSTOS.md` o `docs/OFERTA.md`). 2. `guion/numeros.md`. 3. La lámina en `fuente/brai-piezas.jsx`. 4. El subtítulo en el plan. 5. La voz, si lo dice | mezclar y grabar |
| Quitar o mover una escena | `fuente/video-infomercial.jsx` o `fuente/video-completo.jsx` y `OM_SCENES`. Es lo más delicado: pídele ayuda a Claude | mezclar y grabar |

Los colores, las letras y el logo son los de la marca (`brand/BRAND.md`). El logo es `fuente/assets/isotipo.svg` y nunca se redibuja.

## Cambiar una voz
1. Abre `guion/voz-elevenlabs-infomercial.md` o `guion/voz-elevenlabs-completo.md` y cambia el texto del bloque. Los números van con letra para que la voz los diga bien.
2. Genera el audio en ElevenLabs, **un bloque por archivo**, con la misma voz.
3. Guárdalo con el mismo nombre que ya tiene en `fuente/audio/infomercial/` o `fuente/audio/completo/`.
4. Mide cuánto dura el audio nuevo. La escena dura **eso más 1.4 segundos**. Pon ese número en `dur` de esa escena, en `OM_SCENES`.
5. En el plan, ajusta los tiempos de `subs` y de `b` de esa escena para que cada cosa aparezca cuando la voz la dice. La voz empieza a los 0.6 s de la escena.
6. Corre mezclar y luego grabar.

Si la duración cambia, todo lo que viene después se recorre solo.

## Verlo antes de grabar
Desde la raíz del repo:
```
npx serve pitch/video/fuente
```
Abre la dirección que imprime y entra a `video-infomercial.dc.html` o a `video-completo.dc.html`. Trae un reproductor abajo. Para que suene hay que darle clic a reproducir.

## Regrabar
Desde la raíz del repo. Necesita Node, Playwright con Chromium (igual que `pitch/jurado-26nov/exportar.cjs`) y ffmpeg.
```
node pitch/video/mezclar.cjs infomercial
node pitch/video/grabar.cjs infomercial
```
Con `completo` en lugar de `infomercial` para el otro. `mezclar` solo hace falta si cambió una voz, una duración, un sonido o la música. El infomercial tarda unos 5 minutos y el completo unos 15. El MP4 nuevo reemplaza al de esta carpeta.

## Reglas que no se rompen
- Los números salen de `guion/numeros.md`. Si un número no está ahí, no va en el video.
- Brai dice "registrada por el artista". Nunca "imposible de falsificar", "infalible", "blockchain" ni "verificado por Brai". Nunca dice que ya hay clientes.
- La obra y la artista "Lucía Arce" son de ejemplo, y la franja de DEMO de las capturas de la web se queda.
- Puntuación sencilla en pantalla: comas y puntos.

## Cómo se hicieron
El 26 y 27 de noviembre de 2026. Las láminas son las de `pitch/jurado-26nov/presentacion.html`, animadas al ritmo de la voz. La música y los sonidos se generan por código en `fuente/mezcla.js`, sin archivos de terceros. Las notas de quien los animó están en `fuente/LEEME-CLAUDE-CODE.md`.

Dos cosas por revisar de oído:
- En el segundo 20 del infomercial la voz dice "Por eso creamos Brai". Un transcriptor automático entendió "Braille". Si suena así, se regenera `i04-brai.mp3`.
- En la escena de "registrada" del infomercial, la etiqueta "Dueño: A. L." queda un poco encimada sobre la firma de la tarjeta.
