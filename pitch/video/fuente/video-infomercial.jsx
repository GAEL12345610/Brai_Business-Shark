// video-infomercial.jsx — el infomercial de ~1 minuto, armado con las láminas de brai-piezas.jsx.
// Duraciones: window.OM_SCENES (en el .dc.html). Momentos, subtítulos y sonidos: plan-infomercial.js.

const ORDEN_INFO = ['gancho', 'el-artista', 'las-dudas', 'brai', 'el-toque', 'registrada', 'el-artista-sabe', 'cualquier-celular', 'cierre'];

function Gancho({ T, t, b }) {
  // Primer plano del reverso: el logo del sello se dibuja con luz, el teléfono se acerca y la pantalla se enciende.
  const s = 1.32 + 0.1 * pr(t, 0, 5);
  const dx = -429 * s, dy = 7 * s;
  const cam = `translate(${dx}px, ${dy}px) scale(${s})`;
  const sx = 960 + (1265 - 960) * s + dx, sy = 540 + (344 - 540) * s + dy;
  const R = mix(110, 2300, eio(pr(t, 0.35, 2.7)));
  const velo = 1 - pr(t, 2.6, 0.8);
  return (
    <>
      <div style={{ position: 'absolute', inset: 0, background: C.lienzo }}></div>
      <div style={{ position: 'absolute', inset: 0, transform: cam, transformOrigin: '50% 50%' }}>
        <L03 T={T} t={t} b={{ cel: b.cel, toque: b.toque, pantalla: b.pantalla }} izq={0} sinEntrada pie={null}
          enso={{ p: MOV.traza(t, b.enso, 2.2), brillo: 1 }} />
      </div>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: velo, background: `radial-gradient(circle at ${sx}px ${sy}px, rgba(20,17,15,0) ${R}px, rgba(20,17,15,.92) ${R + 460}px)` }}></div>
    </>
  );
}

function Solucion({ T, t, b, K, R, re, br }) {
  // Del corte "un sello detrás" (K, negativo) al toque y luego a "registrada" (R).
  const p = eio(pr(t, K + 0.15, 2.9));
  const s = mix(2.1, 1, p) + 0.012 * pr(t, K + 3, 12);
  const cam = `translate(${-305 * s * (1 - p)}px, ${196 * s * (1 - p)}px) scale(${s})`;
  const mv = eio(pr(t, R + re.mueve, 1.1));
  const brilla = Math.max(0, 1 - Math.abs(t - (R + re.sello) - 0.55) / 0.9);
  const extra = (
    <>
      <div style={{ position: 'absolute', left: 1060, top: 210, zIndex: 4, ...MOV.sella(t, R + re.sello, 0.9) }}>
        <Chip style={{ fontSize: 44, padding: '20px 40px', boxShadow: `0 0 0 2px ${C.dorado}, 0 0 ${70 * brilla}px ${20 * brilla}px rgba(201,162,75,${0.45 * brilla})` }} punto={20}>Registrada por el artista</Chip>
      </div>
      <div style={{ position: 'absolute', left: 1120, top: 420, zIndex: 4, ...MOV.entra(t, R + re.tarjeta, 'gira', 1.1) }}>
        <div style={{ transform: 'scale(1.75)', transformOrigin: 'top left' }}><Tarjeta /></div>
      </div>
      <div style={{ position: 'absolute', left: 1130, top: 790, zIndex: 4, ...MOV.sella(t, R + re.dueno) }}>
        <Chip style={{ fontSize: 26, padding: '16px 26px' }} punto={16}>Dueño: A. L.</Chip>
      </div>
    </>
  );
  return (
    <div style={{ position: 'absolute', inset: 0, transform: cam, transformOrigin: '50% 50%' }}>
      <L03 T={T} t={t} b={b} sinEntrada pie="Brai" izq={1 - eo(pr(t, R - 0.1, 0.6))}
        tituloAlt={{ at: K + (br.titulo - br.corte), l1: 'Un sello detrás', l2: 'de cada obra.', sale: b.toque - 0.35, size: 112 }}
        revExtra={{ transform: `translateX(${520 * mv}px) rotate(${6 * mv}deg)`, opacity: 1 - mv }}
        celExtra={{ transform: `translate(${-784 * mv}px, ${-43 * mv}px) scale(${1 + 0.3 * mv})`, transformOrigin: '395px 404px', zIndex: 3 }}
        extra={extra} />
    </div>
  );
}

function PanelArtista({ T, t, b }) {
  const w = eio(pr(t, b.fila, 0.9));
  const luzFila = Math.max(0, 1 - Math.abs(t - b.fila - 0.9) / 1.2);
  return (
    <Lam centro T={T} luz={['l1', 'l3']} pie="Brai · Personas y obras de ejemplo">
      <p style={{ ...S.rot(false), margin: 0, ...MOV.entra(t, b.titulo) }}>Panel del artista</p>
      <h2 style={{ ...S.t2, fontSize: 80, whiteSpace: 'nowrap', margin: '26px 0 0', ...MOV.entra(t, b.titulo + 0.13) }}>Registro de propiedad <span style={S.tc(false)}>y procedencia.</span></h2>
      <div style={{ marginTop: 48, transform: `scale(${1 + 0.05 * eio(pr(t, b.fila - 0.2, 2.6))})`, transformOrigin: '50% 90%' }}>
        <Navegador src="web-panel.jpg" w={1100} alto={520} style={{ textAlign: 'left', ...MOV.entra(t, b.panel, 'sube') }}>
          <div style={{ position: 'absolute', left: 0, right: 0, top: 474, height: 41, background: 'rgba(192,110,82,.14)', opacity: luzFila, boxShadow: 'inset 5px 0 0 ' + C.terracota }}></div>
          <div style={{ position: 'absolute', left: 0, right: 0, top: 474, height: 41, background: '#FFFFFF', transform: `scaleX(${1 - w})`, transformOrigin: 'right' }}></div>
        </Navegador>
      </div>
    </Lam>
  );
}

function CualquierCelular({ T, t, b }) {
  const items = [['nfc', 'Toca', 'NFC', b.i1], ['qr', 'Escanea', 'QR', b.i2], ['teclado', 'Escribe', 'Código', b.i3]];
  return (
    <Lam medio T={T} luz={['l2', 'l3']} pie="Brai">
      <p style={{ ...S.rot(false), margin: 0, ...MOV.entra(t, b.cards) }}>El sistema</p>
      <h2 style={{ ...S.t2, margin: '26px 0 0' }}><Pals t={t} at={b.titulo} texto="Funciona en" /> <span style={S.tc(false)}><Pals t={t} at={b.titulo + 0.22} texto="cualquier celular." /></span></h2>
      <div style={{ display: 'flex', gap: 40, marginTop: 76 }}>
        {items.map((it, i) => {
          const base = MOV.entra(t, b.cards + 0.12 * i, 'poco');
          const lit = eo(pr(t, it[3], 0.5));
          const bump = Math.max(0, 1 - Math.abs(t - it[3] - 0.15) / 0.35);
          return (
            <Nodo key={i} style={{ padding: '56px 34px', opacity: base.opacity * mix(0.38, 1, lit), transform: `${base.transform} scale(${mix(0.96, 1, lit) + 0.05 * bump})`, boxShadow: `inset 0 1px 0 #fff, 0 50px 90px -50px rgba(43,38,34,.5), 0 0 0 ${3 * lit}px rgba(192,110,82,${0.55 * lit})` }}>
              <Ico n={it[0]} size={120} stroke={lit > 0.5 ? C.btn : 'rgba(43,38,34,.45)'} />
              <p style={{ ...S.t3, margin: '26px 0 0' }}>{it[1]}</p>
              <p style={{ ...S.nota(false), margin: '14px 0 0', fontSize: 24 }}>{it[2]}</p>
            </Nodo>
          );
        })}
      </div>
    </Lam>
  );
}

function PiezaInfomercial() {
  const { T, CUES, authoredTotal } = useComposition();
  const P = window.BRAI_PLAN_INFO.escenas;
  const c = (id) => CUES[id];
  const B = (id) => P[id].b;
  const fin = authoredTotal;
  const subs = React.useMemo(() => subsAbs(window.BRAI_PLAN_INFO, CUES, ORDEN_INFO), [CUES]);

  const ar = B('el-artista'), du = B('las-dudas'), br = B('brai'), to = B('el-toque'), re = B('registrada');
  const D = c('las-dudas') - c('el-artista');
  const bProblema = { carga: true, entra: ar.entra, vende: ar.vende, pierde: ar.pierde, pregunta: ar.pregunta, golpe: ar.golpe, titulo: D + du.titulo, d1: D + du.d1, d2: D + du.d2, d3: D + du.d3, r1: D + du.nadie, r2: D + du.nadie, r3: D + du.nadie };
  const corte = c('brai') + br.corte;
  const K = corte - c('el-toque'), R = c('registrada') - c('el-toque');
  const bSol = { rot: K + 0.2, un: to.toque, toda: to.toda, chip: to.chip, cel: to.cel, toque: to.toque, pantalla: to.pantalla, sello: R + re.sello };

  return (
    <div style={{ position: 'absolute', inset: 0, background: C.tinta }}>
      <Capa T={T} desde={c('gancho')} hasta={c('el-artista')} entra={0} z={1} cam="none">
        <Gancho T={T} t={T - c('gancho')} b={B('gancho')} />
      </Capa>
      <Capa T={T} desde={c('el-artista')} hasta={c('brai')} z={2}>
        <L02 T={T} t={T - c('el-artista')} b={bProblema} />
      </Capa>
      <Capa T={T} desde={c('brai')} hasta={corte} z={3}>
        <L01 T={T} t={T - c('brai')} b={{ enso: br.enso, brai: br.brai, lema: br.lema, pil: null }} />
      </Capa>
      <Capa T={T} desde={corte} hasta={c('el-artista-sabe')} entra={0} z={4} cam="none">
        <Solucion T={T} t={T - c('el-toque')} b={bSol} K={K} R={R} re={re} br={br} />
      </Capa>
      <Capa T={T} desde={c('el-artista-sabe')} hasta={c('cualquier-celular')} z={5}>
        <PanelArtista T={T} t={T - c('el-artista-sabe')} b={B('el-artista-sabe')} />
      </Capa>
      <Capa T={T} desde={c('cualquier-celular')} hasta={c('cierre')} z={6}>
        <CualquierCelular T={T} t={T - c('cualquier-celular')} b={B('cualquier-celular')} />
      </Capa>
      <Capa T={T} desde={c('cierre')} hasta={fin + 1} z={7}>
        <L15 T={T} t={T - c('cierre')} b={B('cierre')} linea />
      </Capa>
      <Subtitulos T={T} items={subs} />
    </div>
  );
}

function VideoInfomercial() {
  return (
    <CompositionStage width={1920} height={1080} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg={C.tinta}>
      <PiezaInfomercial />
      <AudioMezcla src="audio/infomercial-mezcla.wav" />
    </CompositionStage>
  );
}

window.VideoInfomercial = VideoInfomercial;
