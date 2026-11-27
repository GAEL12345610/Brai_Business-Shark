// Plan del video completo: subtítulos, momentos (b) y sonidos de cada escena.
// Todos los tiempos son segundos DESDE EL INICIO DE LA ESCENA.
// La voz entra en VOZ_INICIO (0.6 s) dentro de cada escena.
// Los cortes de subtítulos salen de las pausas reales medidas en cada mp3.
// Las duraciones de escena viven en un solo lugar: window.OM_SCENES en video-completo.dc.html.
window.BRAI_PLAN_COMPLETO = {
  carpeta: 'audio/completo/',
  voz_inicio: 0.6,
  musica: { entra: 'portada', fundido_entrada: 2.5, sube_en: 'cierre' },
  escenas: {
    'portada': {
      voz: 'c01-portada.mp3',
      subs: [[0.61, 'Somos Brai.'], [2.02, 'Cada obra sabe de dónde viene.', 4.5]],
      b: { enso: 0.0, brai: 0.66, toque: 1.9, lema: 2.02, pil: 2.7 },
      sfx: [['brillo', 'toque']]
    },
    'problema': {
      voz: 'c02-problema.mp3',
      subs: [[0.66, 'Creemos que cuando una obra se vende, empiezan tres dudas.'], [4.99, '¿Es original?'], [6.14, 'Nadie lo sabe.'], [7.54, '¿Dónde está?'], [8.70, 'El artista pierde el rastro.'], [10.79, '¿Y su historia?'], [11.83, 'Jamás se cuenta.', 13.3]],
      b: { titulo: 0.2, d1: 4.99, r1: 6.14, d2: 7.54, r2: 8.70, d3: 10.79, r3: 11.83 },
      sfx: [['golpeSuave', 'd1'], ['golpeSuave', 'd2'], ['golpeSuave', 'd3']]
    },
    'solucion': {
      voz: 'c03-solucion.mp3',
      subs: [[0.62, 'Nuestra idea es simple.'], [2.54, 'Un toque con el celular, y la obra te cuenta toda su historia.'], [6.67, 'Sin descargar nada.', 8.1]],
      b: { rot: 0.2, reverso: 0.35, un: 2.6, cel: 2.7, toque: 3.7, pantalla: 3.85, toda: 4.6, sello: 5.6, chip: 6.67 },
      sfx: [['vibracion', 'toque'], ['campanita', 'sello']]
    },
    'pasos': {
      voz: 'c04-pasos.mp3',
      subs: [[0.64, 'Funciona en cuatro pasos.'], [2.84, 'El artista registra su obra con fotos e historia.'], [6.46, 'Le ponemos un sello detrás.'], [8.74, 'La entrega con una tarjeta firmada.'], [11.33, 'Y quien la compra la reclama y queda como su dueño.', 14.6]],
      b: { titulo: 0.2, linea: 0.8, p1: 2.84, p2: 6.46, p3: 8.74, p4: 11.33 },
      sfx: [['clic', 'p1'], ['clic', 'p2'], ['clic', 'p3'], ['clic', 'p4']]
    },
    'sistema': {
      voz: 'c05-sistema.mp3',
      subs: [[0.62, 'Por dentro, el sello abre una página, la página lee el registro,'], [5.38, 'y el artista ve en su panel quién reclamó cada obra.'], [9.19, 'Si tu celular no tiene NFC, también funciona con QR o con un código.', 14.6]],
      b: { titulo: 0.2, n1: 1.5, f1: 2.15, n2: 2.6, f2: 3.7, n3: 4.5, f3: 5.7, n4: 6.6, qr: 9.19 },
      sfx: [['tic', 'n1'], ['tic', 'n2'], ['tic', 'n3'], ['tic', 'n4']]
    },
    'demo': {
      voz: 'c06-demo.mp3',
      subs: [[0.59, 'Ya lo pueden probar.'], [2.05, 'Escaneen el código y abran una obra de ejemplo.', 5.3]],
      b: { rot: 0.2, qr: 2.05, url: 2.5, tel1: 3.0, tel2: 3.6 },
      sfx: [['enfoque', 'qr']]
    },
    'innovacion': {
      voz: 'c07-innovacion.mp3',
      subs: [[0.62, 'Lo diseñamos para que se vea, no para explicarlo.'], [4.41, 'En cada página manda el artista, con su nombre y su color.'], [8.84, 'Y solo decimos lo que sí hace: registrada por el artista.', 13.1]],
      b: { rot: 0.2, sv: 0.65, nav: 1.0, nse: 2.75, tel: 4.41, manda: 5.0, color: 6.83, chip: 11.37 },
      sfx: [['campanita', 'chip']]
    },
    'costo': {
      voz: 'c08-costo.mp3',
      subs: [[0.61, 'Ahora los números.'], [2.23, 'Registrar una obra nos cuesta ocho pesos con setenta y tres centavos.'], [6.93, 'El sello ya lo compramos.'], [8.58, 'Lo demás es un estimado.', 10.4]],
      b: { rot: 0.2, num: 2.3, cuenta: 4.2, pesos: 4.4, tira: 6.5, sello: 6.93, leyenda: 8.58 },
      sfx: [['contador', 'cuenta']]
    },
    'costos-fijos': {
      voz: 'c09-costos-fijos.mp3',
      subs: [[0.61, 'Hoy, como prototipo, casi no gastamos: cuarenta y nueve pesos al año.'], [6.03, 'Con clientes de verdad, serían unos ochocientos ochenta pesos al mes.', 10.6]],
      b: { rot: 0.2, hoy: 0.7, n49: 3.95, c1: 6.1, m1: 6.5, c2: 6.8, m2: 7.2, c3: 7.5, eq: 7.9, total: 8.2 },
      sfx: [['clic', 'c1'], ['clic', 'c2'], ['clic', 'c3'], ['golpeSuave', 'total']]
    },
    'precios': {
      voz: 'c10-precios.mp3',
      subs: [[0.62, 'Estamos probando dos precios.'], [2.93, 'Uno con mensualidad: siete mil quinientos de arranque y novecientos noventa al mes.'], [8.49, 'Otro por obra: dos mil quinientos de arranque y cuatrocientos cincuenta por cada obra.'], [14.36, 'Todavía nadie ha pagado.'], [16.16, 'Las entrevistas van a decidir.', 17.9]],
      b: { rot: 0.2, dos: 0.62, a: 2.93, an: 4.4, a990: 6.5, b: 8.49, bn: 9.8, b450: 12.0, nadie: 14.36, decide: 16.16 },
      sfx: [['desliza', 'a'], ['desliza', 'b']]
    },
    'margen': {
      voz: 'c11-margen.mp3',
      subs: [[0.67, 'Por cada obra cobraríamos cuatrocientos cincuenta pesos,'], [4.6, 'y los materiales nos cuestan menos de nueve.', 7.3]],
      b: { rot: 0.2, cob: 0.6, n450: 1.6, cuesta: 4.6, n873: 5.0, chip: 6.7 },
      sfx: [['contador', 'n450'], ['contador', 'n873'], ['campanita', 'chip']]
    },
    'ganancia': {
      voz: 'c12-ganancia.mp3',
      subs: [[0.66, 'Es una proyección.'], [2.36, 'Si llegamos a quince artistas, en un año ganaríamos doscientos setenta y ocho mil pesos con el primer precio,'], [9.29, 'o cincuenta y nueve mil con el segundo.', 11.8]],
      b: { rot: 0.2, titulo: 0.5, g1: 2.4, g5: 3.0, a15: 4.4, va15: 5.5, b15: 9.3, vb15: 9.9 },
      sfx: [['subida', 'g1', 3.2], ['subida', 'b15', 1.4]]
    },
    'mercado': {
      voz: 'c13-mercado.mp3',
      subs: [[0.64, 'En Jalisco hay ocho mil ochocientos setenta artistas visuales.'], [5.15, 'Si dos de cada cien fueran clientes, serían ciento setenta y siete.'], [9.97, 'Es una suposición nuestra, todavía sin validar.', 12.9]],
      b: { rot: 0.2, n1: 0.6, c1: 1.3, n2: 7.4, c2: 7.6, n3: 9.9, c3: 10.1, supuesto: 9.97 },
      sfx: [['contador', 'c1'], ['contador', 'c2'], ['contador', 'c3']]
    },
    'competencia': {
      voz: 'c14-competencia.mp3',
      subs: [[0.6, 'Ya existen certificados digitales, y algunos son gratis.'], [4.79, 'Lo nuestro es distinto: lo hacemos en persona, en español, y el comprador se registra solo.', 11.7]],
      b: { rot: 0.2, t1: 0.5, th: 1.0, r1: 1.3, r2: 1.9, r3: 2.5, t2: 4.79, brai: 5.3, persona: 6.84, espanol: 8.42, registra: 9.6 },
      sfx: [['golpeSuave', 'brai']]
    },
    'cierre': {
      voz: 'c15-cierre.mp3',
      subs: [[0.61, 'Somos Brai.'], [2.02, 'Cada obra sabe de dónde viene.', 4.7]],
      b: { enso: 0.0, toque: 1.85, frase: 2.02 },
      sfx: [['brillo', 'toque']]
    }
  }
};
