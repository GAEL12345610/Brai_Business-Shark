// video-completo.jsx — la presentación de 15 láminas narrada (2:54), una escena por lámina.
// Duraciones: window.OM_SCENES (en el .dc.html). Momentos, subtítulos y sonidos: plan-completo.js.

const ORDEN_COMPLETO = ['portada', 'problema', 'solucion', 'pasos', 'sistema', 'demo', 'innovacion', 'costo', 'costos-fijos', 'precios', 'margen', 'ganancia', 'mercado', 'competencia', 'cierre'];
const LAMINAS = { portada: L01, problema: L02, solucion: L03, pasos: L04, sistema: L05, demo: L06, innovacion: L07, costo: L08, 'costos-fijos': L09, precios: L10, margen: L11, ganancia: L12, mercado: L13, competencia: L14, cierre: L15 };

function PiezaCompleto() {
  const { T, CUES, authoredTotal } = useComposition();
  const P = window.BRAI_PLAN_COMPLETO.escenas;
  const subs = React.useMemo(() => subsAbs(window.BRAI_PLAN_COMPLETO, CUES, ORDEN_COMPLETO), [CUES]);
  return (
    <div style={{ position: 'absolute', inset: 0, background: C.tinta }}>
      {ORDEN_COMPLETO.map((id, i) => {
        const L = LAMINAS[id];
        const desde = CUES[id];
        const hasta = i + 1 < ORDEN_COMPLETO.length ? CUES[ORDEN_COMPLETO[i + 1]] : authoredTotal + 1;
        return (
          <Capa key={id} T={T} desde={desde} hasta={hasta} entra={i === 0 ? 0 : 0.6} z={i + 1}>
            <L T={T} t={T - desde} b={P[id].b} num={String(i + 1).padStart(2, '0')} />
          </Capa>
        );
      })}
      <Subtitulos T={T} items={subs} />
    </div>
  );
}

function VideoCompleto() {
  return (
    <CompositionStage width={1920} height={1080} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg={C.tinta}>
      <PiezaCompleto />
      <AudioMezcla src="audio/completo-mezcla.wav" />
    </CompositionStage>
  );
}

window.VideoCompleto = VideoCompleto;
