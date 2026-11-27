// Plan del infomercial: subtítulos, momentos (b) y sonidos de cada escena.
// Todos los tiempos son segundos DESDE EL INICIO DE LA ESCENA.
// La voz entra en VOZ_INICIO (0.6 s) dentro de cada escena.
// Los cortes de subtítulos salen de las pausas reales medidas en cada mp3.
// Las duraciones de escena viven en un solo lugar: window.OM_SCENES en video-infomercial.dc.html.
window.BRAI_PLAN_INFO = {
  carpeta: 'audio/infomercial/',
  voz_inicio: 0.6,
  musica: { entra: 'el-artista', fundido_entrada: 1.6, sube_en: 'cierre' },
  escenas: {
    'gancho': {
      voz: null,
      subs: [],
      b: { luz: 0, enso: 0.0, cel: 1.9, toque: 2.9, pantalla: 3.05 },
      sfx: [['vibracion', 'toque']]
    },
    'el-artista': {
      voz: 'i02-el-artista.mp3',
      subs: [[0.62, 'Un artista pinta un cuadro durante meses.'], [4.0, 'Lo vende.'], [5.17, 'Y nunca vuelve a saber de él.', 7.3]],
      b: { entra: 0.1, vende: 4.0, pierde: 5.17, pregunta: 6.1, golpe: 6.75 },
      sfx: [['golpeGrave', 'golpe']]
    },
    'las-dudas': {
      voz: 'i03-las-dudas.mp3',
      subs: [[0.63, '¿Es original?'], [1.84, '¿Dónde está?'], [3.04, '¿Cuál es su historia?'], [4.35, 'Nadie lo sabe.', 5.75]],
      b: { titulo: 0.1, d1: 0.63, d2: 1.84, d3: 3.04, nadie: 4.35 },
      sfx: [['golpeSuave', 'd1'], ['golpeSuave', 'd2'], ['golpeSuave', 'd3']]
    },
    'brai': {
      voz: 'i04-brai.mp3',
      subs: [[0.62, 'Por eso creamos Brai.'], [2.62, 'Un sello detrás de cada obra.', 4.95]],
      b: { enso: 0.0, brai: 0.85, lema: 1.45, toque: 2.0, corte: 2.55, titulo: 2.75 },
      sfx: [['brillo', 'toque']]
    },
    'el-toque': {
      voz: 'i05-el-toque.mp3',
      subs: [[0.64, 'Acercas tu celular, y la obra te cuenta su historia.'], [4.37, 'Sin descargar nada.', 5.95]],
      b: { cel: 0.75, toque: 1.75, pantalla: 1.9, toda: 2.25, chip: 4.37 },
      sfx: [['vibracion', 'toque'], ['campanitaSuave', 'pantalla']]
    },
    'registrada': {
      // Voz real i06-registrada.mp3 (7.24 s). Tiempos medidos con sus pausas.
      voz: 'i06-registrada.mp3',
      subs: [[0.6, 'Ves quién la pintó, y que la registró el propio artista.'], [4.5, 'Si es tuya, la reclamas con tu tarjeta firmada.', 7.65]],
      b: { mueve: 0.0, sello: 2.4, tarjeta: 5.5, dueno: 7.0 },
      sfx: [['campanita', 'sello'], ['desliza', 'tarjeta'], ['clic', 'dueno']]
    },
    'el-artista-sabe': {
      voz: 'i07-el-artista-sabe.mp3',
      subs: [[0.67, 'Así, quien la pintó sabe quién la reclamó.', 4.3]],
      b: { titulo: 0.15, panel: 0.3, fila: 2.3 },
      sfx: [['clic', 'fila']]
    },
    'cualquier-celular': {
      voz: 'i08-cualquier-celular.mp3',
      subs: [[0.62, 'Con NFC, con QR o con un código.'], [4.84, 'Funciona en cualquier celular.', 7.0]],
      b: { cards: 0.15, i1: 0.67, i2: 2.32, i3: 3.39, titulo: 4.84 },
      sfx: [['tic', 'i1'], ['tic', 'i2'], ['tic', 'i3']]
    },
    'cierre': {
      voz: 'i09-cierre.mp3',
      subs: [[0.61, 'Somos Brai.'], [2.0, 'Cada obra sabe de dónde viene.', 4.3]],
      b: { enso: 0.0, toque: 1.85, frase: 2.0, linea: 2.9 },
      sfx: [['brillo', 'toque']]
    }
  }
};
