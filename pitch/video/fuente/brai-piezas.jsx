// brai-piezas.jsx — las 15 láminas de presentacion.html, como funciones del tiempo.
// Cada lámina recibe t (segundos desde que empieza su capa), T (reloj global) y b (momentos).
// Diseño 1:1 con presentacion/presentacion.html. Solo cambia cuándo entra cada cosa.

const C = { terracota: '#C06E52', btn: '#A2563D', tinta: '#2B2622', dorado: '#C9A24B', oro: '#F3EBD8', lienzo: '#F6F1EA', verde: '#5E6C52', linea: '#E5DDCF', arena: '#E9E1D4' };
const F = { serif: 'Fraunces, Georgia, serif', sans: 'Schibsted, system-ui, sans-serif', mono: 'Plex, ui-monospace, monospace' };
const RUTA = 'assets/';
const OBRAS = { s1: RUTA + 'obras/sin-titulo-1.svg', s2: RUTA + 'obras/sin-titulo-2.svg', s3: RUTA + 'obras/sin-titulo-3.svg', lo: RUTA + 'obras/los-olvidados.svg' };
const ISO = RUTA + 'isotipo.svg';

const cl = (v, a, b) => Math.min(b, Math.max(a, v));
const pr = (t, at, d) => (at == null ? 0 : cl((t - at) / d, 0, 1));
const eo = (p) => 1 - Math.pow(1 - p, 4);
const eio = (p) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
const mix = (a, b, k) => a + (b - a) * k;

// Los tres movimientos del video
const MOV = {
  // entradas de presentacion.html: sube, z (zoom), izq, gira, fade
  entra(t, at, tipo = 'sube', d = 1) {
    if (at == null) return { opacity: 0 };
    const e = eo(pr(t, at, d)), k = 1 - e;
    const o = { opacity: e };
    if (tipo === 'sube') o.transform = `translateY(${70 * k}px)`;
    else if (tipo === 'z') o.transform = `scale(${0.6 + 0.4 * e})`;
    else if (tipo === 'izq') o.transform = `translateX(${-110 * k}px)`;
    else if (tipo === 'gira') o.transform = `translateY(${80 * k}px) rotate(${-8 * k}deg)`;
    else if (tipo === 'poco') o.transform = `translateY(${28 * k}px)`;
    return o;
  },
  // trazo: avance 0..1 con la curva de la presentación
  traza(t, at, d) { return eo(pr(t, at, d)); },
  // sello: cae grande, rebota y se asienta (el momento "registrada")
  sella(t, at, d = 0.8) {
    if (at == null || t < at) return { opacity: 0 };
    const p = pr(t, at, d);
    let s, r, o;
    if (p < 0.6) { const q = eo(p / 0.6); s = mix(2.2, 0.94, q); r = mix(-14, 0, q); o = q; }
    else { const q = eo((p - 0.6) / 0.4); s = mix(0.94, 1, q); r = 0; o = 1; }
    return { opacity: o, transform: `scale(${s}) rotate(${r}deg)` };
  }
};

// números con coma de miles y punto decimal, como en numeros.md
function fmt(v, d) {
  const f = Math.abs(v).toFixed(d || 0).split('.');
  const ent = f[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return (v < 0 ? '−' : '') + ent + (f[1] ? '.' + f[1] : '');
}
function Cuenta({ t, at, fin, d = 0, p = '', s = '', dur = 1.5 }) {
  const k = eo(pr(t, at, dur));
  const txt = p + fmt(k >= 1 ? fin : fin * k, d) + s;
  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      <span style={{ visibility: 'hidden' }}>{p + fmt(fin, d) + s}</span>
      <span style={{ position: 'absolute', left: 0, top: 0, whiteSpace: 'nowrap' }}>{txt}</span>
    </span>
  );
}

// Palabras que suben (.pal de la presentación)
function Pal({ t, at, children }) {
  const e = eo(pr(t, at, 1.15)), k = 1 - e;
  return (
    <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', paddingBottom: '.14em', marginBottom: '-.14em' }}>
      <b style={{ display: 'inline-block', fontWeight: 'inherit', transform: `translateY(${115 * k}%) rotate(${5 * k}deg)` }}>{children}</b>
    </span>
  );
}
function Pals({ t, at, texto, paso = 0.11 }) {
  const ws = texto.split(' ');
  return ws.map((w, i) => <React.Fragment key={i}>{i > 0 ? ' ' : null}<Pal t={t} at={at == null ? null : at + i * paso}>{w}</Pal></React.Fragment>);
}

// Estilos de la presentación
const S = {
  rot: (osc) => ({ fontFamily: F.mono, fontSize: 24, letterSpacing: '.2em', textTransform: 'uppercase', color: osc ? 'rgba(246,241,234,.7)' : C.verde, display: 'flex', alignItems: 'center', gap: 22 }),
  t0: { fontFamily: F.serif, fontWeight: 560, fontSize: 230, lineHeight: 0.9, letterSpacing: '-.04em' },
  t1: { fontFamily: F.serif, fontWeight: 560, fontSize: 148, lineHeight: 0.96, letterSpacing: '-.035em' },
  t2: { fontFamily: F.serif, fontWeight: 560, fontSize: 104, lineHeight: 1, letterSpacing: '-.03em' },
  t3: { fontFamily: F.serif, fontWeight: 560, fontSize: 60, lineHeight: 1.05, letterSpacing: '-.02em' },
  tx: { fontSize: 38, lineHeight: 1.35 },
  tm: { fontSize: 30, lineHeight: 1.4 },
  nota: (osc) => ({ fontFamily: F.mono, fontSize: 21, lineHeight: 1.5, color: osc ? 'rgba(246,241,234,.6)' : 'rgba(43,38,34,.66)' }),
  tc: (osc) => ({ color: osc ? C.terracota : C.btn }),
  pil: { fontFamily: F.mono, fontSize: 19, letterSpacing: '.14em', padding: '7px 18px', borderRadius: 99, background: C.dorado, color: C.tinta, textTransform: 'uppercase' },
  vid: (osc) => osc
    ? { background: 'linear-gradient(140deg, rgba(246,241,234,.13), rgba(246,241,234,.04))', border: '1.5px solid rgba(246,241,234,.18)', borderRadius: 44, boxShadow: 'inset 0 1px 0 rgba(246,241,234,.16)' }
    : { background: 'linear-gradient(140deg, rgba(255,255,255,.82), rgba(255,255,255,.48))', border: '1.5px solid rgba(255,255,255,.9)', borderRadius: 44, boxShadow: 'inset 0 1px 0 #fff, 0 50px 90px -50px rgba(43,38,34,.5)' },
  chip: { display: 'inline-flex', alignItems: 'center', gap: 10, padding: '8px 16px', borderRadius: 99, background: C.oro, fontWeight: 600, fontSize: 17, boxShadow: '0 0 0 2px ' + C.dorado, color: C.tinta },
  ico: { fill: 'none', stroke: C.btn, strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' }
};
function Punto({ size = 11 }) { return <i style={{ width: size, height: size, borderRadius: '50%', background: C.dorado, flex: 'none' }}></i>; }
function Chip({ children, style, punto = 11 }) { return <span style={{ ...S.chip, ...style }}><Punto size={punto} />{children}</span>; }

// Luz que deriva (radiales de la presentación)
const LUCES = {
  l1: { w: 1300, pos: { left: -420, top: -520 }, c: '192,110,82', a: 0.36, per: 20, rev: false },
  l2: { w: 1150, pos: { right: -360, top: -160 }, c: '201,162,75', a: 0.32, per: 26, rev: true },
  l3: { w: 1000, pos: { left: '30%', bottom: -620 }, c: '94,108,82', a: 0.22, per: 30, rev: false }
};
function Luz({ T, cuales, osc }) {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: -2, opacity: osc ? 0.55 : 1 }}>
      {cuales.map((n) => {
        const L = LUCES[n]; let k = (1 - Math.cos(Math.PI * T / L.per)) / 2; if (L.rev) k = 1 - k;
        return <i key={n} style={{ position: 'absolute', ...L.pos, width: L.w, height: L.w, borderRadius: '50%', background: `radial-gradient(closest-side, rgba(${L.c},${L.a}), rgba(${L.c},0))`, transform: `translate3d(${140 * k}px, ${90 * k}px, 0) scale(${1 + 0.14 * k})` }}></i>;
      })}
    </div>
  );
}
function Grano() {
  return <img src={RUTA + 'grano.svg'} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.07, mixBlendMode: 'multiply', pointerEvents: 'none', zIndex: -1 }} />;
}
function Pie({ osc, texto, num }) {
  return (
    <div style={{ position: 'absolute', left: 130, right: 130, bottom: 44, display: 'flex', justifyContent: 'space-between', fontFamily: F.mono, fontSize: 19, letterSpacing: '.1em', color: osc ? 'rgba(246,241,234,.5)' : 'rgba(43,38,34,.55)' }}>
      <span>{texto}</span><span>{num ? num + ' / 15' : ''}</span>
    </div>
  );
}
// Contenedor de lámina (.lam)
function Lam({ osc, arena, centro, medio, T, luz, pie, num, children, style }) {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', isolation: 'isolate', padding: '96px 130px 110px', background: osc ? C.tinta : arena ? C.arena : C.lienzo, color: osc ? C.lienzo : C.tinta, display: 'flex', flexDirection: 'column', fontFamily: F.sans, ...(centro ? { alignItems: 'center', justifyContent: 'center', textAlign: 'center' } : {}), ...(medio ? { justifyContent: 'center' } : {}), ...style }}>
      {luz ? <Luz T={T} cuales={luz} osc={osc} /> : null}
      <Grano />
      {children}
      {pie != null ? <Pie osc={osc} texto={pie} num={num} /> : null}
    </div>
  );
}

// Logo: el archivo isotipo.svg revelado como trazo de luz (nunca se redibuja)
function Enso({ size, p, brillo = 1, osc }) {
  const deg = 360 * p;
  const mask = p >= 1 ? 'none' : `conic-gradient(from 60deg, #000 ${deg}deg, transparent ${deg}deg)`;
  const a = (60 + deg) * Math.PI / 180;
  const cx = size * 0.5 + size * 0.405 * Math.sin(a), cy = size * 0.52 - size * 0.405 * Math.cos(a);
  const vivo = p > 0 && p < 1 ? 1 : 0;
  const halo = brillo * (p < 1 ? Math.min(1, p * 6) : 0);
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <img src={ISO} alt="" style={{ position: 'absolute', inset: 0, width: size, height: size, filter: `blur(${size * 0.045}px) brightness(1.5)`, opacity: halo * 0.9, WebkitMaskImage: mask, maskImage: mask }} />
      <img src={ISO} alt="" style={{ position: 'absolute', inset: 0, width: size, height: size, WebkitMaskImage: mask, maskImage: mask }} />
      <i style={{ position: 'absolute', left: cx - size * 0.13, top: cy - size * 0.13, width: size * 0.26, height: size * 0.26, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,248,236,1) 0, rgba(255,226,196,.75) 22%, rgba(255,214,170,0) 70%)', opacity: vivo * brillo, mixBlendMode: osc ? 'screen' : 'normal' }}></i>
    </div>
  );
}
function Orbita({ T }) {
  return <span style={{ position: 'absolute', inset: '-22%', borderRadius: '50%', border: '2px dashed rgba(192,110,82,.45)', transform: `rotate(${T * 7.2}deg)` }}></span>;
}

// Columnas de obras a los lados
function Lado({ T, lado, osc }) {
  const der = lado === 'der';
  const orden = der ? ['s3', 'lo', 's2', 's1'] : ['s1', 's2', 's3', 'lo'];
  const k = der ? 1 - ((T / 48) % 1) : (T / 40) % 1;
  return (
    <div style={{ position: 'absolute', top: 0, bottom: 0, width: 290, [der ? 'right' : 'left']: 70, overflow: 'hidden', zIndex: 1, WebkitMaskImage: 'linear-gradient(180deg, transparent, #000 16%, #000 84%, transparent)', maskImage: 'linear-gradient(180deg, transparent, #000 16%, #000 84%, transparent)' }}>
      <div style={{ transform: `translateY(${-50 * k}%)` }}>
        {orden.concat(orden).map((o, i) => (
          <div key={i} style={{ width: '78%', margin: i % 2 ? '0 0 48px 18%' : '0 0 48px 4%', padding: 11, background: osc ? '#171412' : C.tinta, boxShadow: osc ? '0 0 0 1px rgba(246,241,234,.14)' : '0 40px 60px -36px rgba(43,38,34,.8)', transform: `rotate(${i % 2 ? 3.5 : -4}deg)` }}>
            <img src={OBRAS[o]} alt="" style={{ display: 'block', width: '100%', aspectRatio: '3 / 4', objectFit: 'cover' }} />
          </div>
        ))}
      </div>
    </div>
  );
}

// Iconos de la presentación (mismos trazos)
const ICO = {
  duda: <><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><path d="M12 17h.01" /></>,
  rastro: <><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /><path d="M3 2l18 20" /></>,
  libro: <><path d="M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2z" /><path d="M22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7z" /><path d="M3 2l18 20" /></>,
  nfc: <><circle cx="12" cy="12" r="3" /><path d="M6.3 6.3a8 8 0 0 0 0 11.4M17.7 6.3a8 8 0 0 1 0 11.4M3.5 3.5a12 12 0 0 0 0 17M20.5 3.5a12 12 0 0 1 0 17" /></>,
  tel: <><rect x="6" y="2" width="12" height="20" rx="2.5" /><path d="M10.5 18.5h3" /></>,
  db: <><ellipse cx="12" cy="5.5" rx="8" ry="3" /><path d="M4 5.5v6.5c0 1.7 3.6 3 8 3s8-1.3 8-3V5.5M4 12v6.5c0 1.7 3.6 3 8 3s8-1.3 8-3V12" /></>,
  panel: <><rect x="3" y="4" width="18" height="13" rx="2" /><path d="M8 21h8M12 17v4M7 13v-2M12 13V8M17 13v-4" /></>,
  server: <><rect x="3" y="3" width="18" height="7" rx="2" /><rect x="3" y="14" width="18" height="7" rx="2" /><path d="M7 6.5h.01M7 17.5h.01" /></>,
  globo: <><circle cx="12" cy="12" r="9.5" /><path d="M2.5 12h19M12 2.5c3 3.3 3 15.7 0 19M12 2.5c-3 3.3-3 15.7 0 19" /></>,
  camara: <><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3z" /><circle cx="12" cy="13" r="3" /></>,
  qr: <><path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" /><rect x="7" y="7" width="4" height="4" /><rect x="13" y="7" width="4" height="4" /><rect x="7" y="13" width="4" height="4" /><path d="M13 13h4v4" /></>,
  teclado: <><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M6 9h.01M10 9h.01M14 9h.01M18 9h.01M6 13h.01M10 13h.01M14 13h.01M18 13h.01M8 16h8" /></>
};
function Ico({ n, size = 88, style, stroke }) {
  return <svg viewBox="0 0 24 24" width={size} height={size} style={{ ...S.ico, ...(stroke ? { stroke } : {}), ...style }}>{ICO[n]}</svg>;
}

// Ondas del sello
function Ondas({ t, desde }) {
  return [0, 0.7].map((dl, i) => {
    const t0 = desde == null ? null : desde + dl;
    if (t0 == null || t < t0) return <span key={i} style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '3px solid ' + C.terracota, opacity: 0 }}></span>;
    const e = eo(((t - t0) % 2.2) / 2.2);
    return <span key={i} style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '3px solid ' + C.terracota, opacity: 0.8 * (1 - e), transform: `scale(${1 + 1.8 * e})` }}></span>;
  });
}
function Sello({ size = 180, t, ondas, style, enso }) {
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: C.lienzo, display: 'grid', placeItems: 'center', boxShadow: 'inset 0 0 0 2px #d8cdbb, 0 14px 26px -12px rgba(43,38,34,.55)', position: 'relative', ...style }}>
      <Ondas t={t} desde={ondas} />
      <div style={{ position: 'relative', width: 96, height: 96 }}>
        {enso ? <Enso size={96} p={enso.p} brillo={enso.brillo} /> : <img src={ISO} alt="" style={{ width: 96, display: 'block' }} />}
      </div>
    </div>
  );
}
function Tarjeta({ style }) {
  return (
    <div style={{ position: 'relative', width: 300, aspectRatio: '85 / 55', padding: '20px 22px', borderRadius: 12, background: C.lienzo, boxShadow: 'inset 0 0 0 1px #d8cdbb, 0 26px 40px -26px rgba(43,38,34,.7)', textAlign: 'left', transform: 'rotate(-3deg)', ...style }}>
      <p style={{ margin: 0, fontFamily: F.serif, fontWeight: 560, fontSize: 24 }}>Figuras del barrio</p>
      <span style={{ fontFamily: F.mono, fontSize: 14, color: C.verde }}>BRAI-0001</span>
      <i style={{ position: 'absolute', left: 22, bottom: 18, width: 150, paddingTop: 4, borderTop: '1.5px solid ' + C.tinta, fontFamily: F.serif, fontSize: 22 }}>Lucía Arce</i>
      <img src={ISO} alt="" style={{ position: 'absolute', right: 18, top: 16, width: 40 }} />
    </div>
  );
}
function Tel({ src, style, w = 330 }) {
  return (
    <div style={{ flex: 'none', width: w, padding: 10, borderRadius: 52, background: 'linear-gradient(145deg, #5b5650, #1f1c19 38%, #3a3632 70%, #14110f)', boxShadow: '0 0 0 2px #0e0c0b, inset 0 0 0 2px rgba(255,255,255,.14), 0 60px 80px -40px rgba(0,0,0,.85)', ...style }}>
      <img src={RUTA + 'capturas-web/' + src} alt="" style={{ display: 'block', width: '100%', borderRadius: 43 }} />
    </div>
  );
}
function Navegador({ src, w = 900, alto, style, children }) {
  return (
    <div style={{ flex: 'none', width: w, paddingTop: 38, borderRadius: 22, overflow: 'hidden', background: `radial-gradient(circle at 26px 19px, ${C.terracota} 6px, transparent 7px), ${C.tinta}`, boxShadow: '0 60px 90px -50px rgba(43,38,34,.8)', ...style }}>
      <div style={{ position: 'relative', height: alto || 'auto', overflow: 'hidden' }}>
        <img src={RUTA + 'capturas-web/' + src} alt="" style={{ display: 'block', width: '100%' }} />
        {children}
      </div>
    </div>
  );
}

// Teléfono de la lámina 03 (con la página de la obra en HTML)
function Cel({ t, b, style }) {
  const on = eo(pr(t, b.pantalla, 0.45));
  return (
    <div style={{ position: 'absolute', left: 230, top: 110, width: 330, padding: 11, borderRadius: 46, background: C.tinta, boxShadow: '0 70px 90px -40px rgba(43,38,34,.85)', zIndex: 3, ...style }}>
      <div style={{ borderRadius: 36, overflow: 'hidden', background: C.lienzo, position: 'relative' }}>
        <div style={{ background: '#2F5D62', padding: 12 }}><img src={OBRAS.lo} alt="" style={{ display: 'block', width: '100%', aspectRatio: '3 / 4', objectFit: 'cover' }} /></div>
        <div style={{ padding: '16px 18px 22px', textAlign: 'left' }}>
          <p style={{ ...S.nota(false), margin: 0, fontSize: 13, letterSpacing: '.12em' }}>LUCÍA ARCE · EJEMPLO</p>
          <p style={{ ...S.t3, fontSize: 30, margin: '4px 0 12px' }}>Figuras del barrio</p>
          <span style={{ ...S.chip, fontSize: 14, padding: '6px 13px', ...MOV.sella(t, b.sello) }}><Punto />Registrada por el artista</span>
        </div>
        <div style={{ position: 'absolute', inset: 0, background: '#0f0d0c', opacity: b.pantalla == null ? 0 : 1 - on }}></div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, rgba(255,250,240,.5), rgba(255,250,240,0) 60%)', opacity: on * (1 - pr(t, b.pantalla + 0.3, 0.8)) }}></div>
      </div>
    </div>
  );
}
// Reverso del cuadro con sello y teléfono. celExtra/revExtra: movimientos extra del infomercial.
function Reverso({ t, b, celExtra, revExtra, enso }) {
  const e = eo(pr(t, b.cel, 1.6)), k = 1 - e;
  const acerca = b.cel == null ? { opacity: 0 } : { opacity: e, transform: `translate(${260 * k}px, ${380 * k}px) rotate(${20 * k}deg)` };
  return (
    <div style={{ position: 'relative', width: 600, height: 750 }}>
      <div style={{ position: 'absolute', inset: 0, borderRadius: 8, background: '#E8DCC8', boxShadow: 'inset 0 0 0 22px #C9AE8A, inset 0 0 0 24px #B39570, 0 70px 100px -60px rgba(43,38,34,.7)', ...revExtra }}>
        <i style={{ position: 'absolute', left: 22, right: 22, top: '50%', height: 30, marginTop: -15, background: '#C9AE8A' }}></i>
        <i style={{ position: 'absolute', top: 22, bottom: 22, left: '50%', width: 30, marginLeft: -15, background: '#C9AE8A' }}></i>
        <Sello t={t} ondas={b.toque} enso={enso} style={{ position: 'absolute', left: 86, top: 96, zIndex: 2 }} />
      </div>
      <div style={{ position: 'absolute', inset: 0, ...celExtra }}>
        <div style={{ position: 'absolute', inset: 0, ...acerca }}><Cel t={t} b={b} /></div>
      </div>
    </div>
  );
}

// ─── Láminas ────────────────────────────────────────────────────────────

function L01({ T, t, b, num }) {
  return (
    <Lam centro T={T} luz={['l1', 'l2', 'l3']} pie="" num={num}>
      <Lado T={T} lado="izq" /><Lado T={T} lado="der" />
      <div style={{ display: 'flex', alignItems: 'center', gap: 46, position: 'relative', zIndex: 2 }}>
        <div style={{ position: 'relative', width: 260, height: 260, ...MOV.entra(t, b.enso, 'z', 1.2) }}>
          <Orbita T={T} />
          <Enso size={260} p={MOV.traza(t, b.enso + 0.15, 2)} />
        </div>
        <h1 style={{ ...S.t0, ...S.tc(false), fontSize: 340, margin: 0 }}><Pal t={t} at={b.brai}>Brai</Pal></h1>
      </div>
      <p style={{ ...S.t2, margin: '26px 0 0', fontSize: 78, ...MOV.entra(t, b.lema) }}>Cada obra sabe de dónde viene.</p>
      <p style={{ ...S.rot(false), margin: '76px 0 0', ...MOV.entra(t, b.pil) }}><span style={S.pil}>Prototipo</span> Business Shark 8°</p>
    </Lam>
  );
}

// Lámina 02. Con b.carga (infomercial) la obra del centro llega antes, grande, y se aleja.
function L02({ T, t, b, num, pie = 'Brai' }) {
  const osc = true;
  const dudas = [
    { o: OBRAS.s2, ico: 'duda', q: '¿Es original?', r: 'Nadie lo sabe.', at: b.d1, rr: b.r1, rot: -3 },
    { o: OBRAS.lo, ico: 'rastro', q: '¿Dónde está?', r: 'Pierdes el rastro.', at: b.d2, rr: b.r2, rot: 0 },
    { o: OBRAS.s3, ico: 'libro', q: '¿Y su historia?', r: 'Jamás se cuenta.', at: b.d3, rr: b.r3, rot: 3 }
  ];
  const carga = b.carga;
  let centro = null;
  if (carga) {
    const ent = eo(pr(t, b.entra, 1.4));
    const lejos = eio(pr(t, b.vende, b.golpe + 0.6 - b.vende));
    const push = pr(t, b.entra, b.vende - b.entra);
    const sBig = mix(2.15, 1.9, ent) + 0.05 * push;
    const s = mix(sBig, 1, lejos);
    const ty = mix(-62, 0, lejos);
    const brillo = t < b.d2 ? mix(1, 0.2, lejos) : mix(0.2, 0.62, eo(pr(t, b.d2, 0.8)));
    const sat = t < b.d2 ? mix(1, 0.45, lejos) : mix(0.45, 0.55, eo(pr(t, b.d2, 0.8)));
    centro = { marco: { opacity: ent, transform: `translateY(${ty}px) scale(${s}) rotate(${mix(-2, 0, lejos)}deg)` }, filtro: `saturate(${sat}) brightness(${brillo})` };
  }
  const tituloAt = b.titulo;
  const sale = carga ? eo(pr(t, b.titulo - 0.35, 0.5)) : 0;
  return (
    <Lam osc medio T={T} luz={['l1', 'l2']} pie={pie} num={num}>
      <p style={{ ...S.rot(osc), margin: 0, ...MOV.entra(t, tituloAt) }}><span style={S.pil}>Hipótesis</span> El problema</p>
      <div style={{ position: 'relative', marginTop: 26 }}>
        <h2 style={{ ...S.t2, margin: 0, ...MOV.entra(t, tituloAt + 0.13) }}>Una obra <span style={S.tc(osc)}>sin registro.</span></h2>
        {carga ? (
          <h2 style={{ ...S.t2, margin: 0, position: 'absolute', left: 0, top: 0, whiteSpace: 'nowrap', opacity: 1 - sale, transform: `translateY(${-40 * sale}px)` }}>
            <Pals t={t} at={b.pregunta} texto="¿Sabes dónde está" /> <span style={S.tc(osc)}><Pals t={t} at={b.pregunta + 0.4} texto="tu obra hoy?" /></span>
          </h2>
        ) : null}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 70, marginTop: 48 }}>
        {dudas.map((d, i) => {
          const esCentro = carga && i === 1;
          const fig = esCentro ? {} : MOV.entra(t, d.at, 'gira');
          const pop = MOV.entra(t, d.at == null ? null : d.at + (esCentro ? 0 : 0.25), 'z', 0.7);
          return (
            <figure key={i} style={{ margin: 0, textAlign: 'center', ...fig }}>
              <div style={{ position: 'relative', width: 300, margin: '0 auto 34px', padding: 14, background: '#171412', boxShadow: '0 0 0 1px rgba(246,241,234,.16), 0 50px 70px -40px rgba(0,0,0,.9)', transform: `rotate(${d.rot}deg)`, ...(esCentro ? centro.marco : {}), zIndex: esCentro ? 5 : 1 }}>
                <img src={d.o} alt="" style={{ display: 'block', width: '100%', aspectRatio: '3 / 4', objectFit: 'cover', filter: esCentro ? centro.filtro : 'saturate(.55) brightness(.62)' }} />
                <span style={{ position: 'absolute', left: '50%', top: '50%', width: 150, height: 150, margin: '-75px 0 0 -75px', borderRadius: '50%', display: 'grid', placeItems: 'center', background: 'rgba(246,241,234,.94)', boxShadow: '0 0 0 3px ' + C.dorado + ', 0 20px 40px -14px rgba(0,0,0,.7)', ...pop }}>
                  <Ico n={d.ico} size={82} style={{ strokeWidth: 1.6 }} />
                </span>
              </div>
              <figcaption>
                <p style={{ ...S.t3, margin: 0, ...(esCentro ? MOV.entra(t, d.at) : {}) }}>{d.q}</p>
                <p style={{ ...S.tx, ...S.tc(osc), margin: '8px 0 0', ...MOV.entra(t, d.rr == null ? d.at : d.rr, 'poco', 0.8) }}>{d.r}</p>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </Lam>
  );
}

// Lámina 03. Opciones del infomercial: tituloAlt (otra frase en el mismo lugar), izq (opacidad de la columna), celExtra, revExtra, enso, extra.
function L03({ T, t, b, num, izq = 1, tituloAlt, celExtra, revExtra, enso, sinEntrada, extra, pie = 'Brai · Innovación' }) {
  const fueraA = tituloAlt ? eo(pr(t, tituloAlt.sale, 0.5)) : 0;
  return (
    <Lam medio T={T} luz={['l1', 'l2']} pie={pie} num={num}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
        <div style={{ opacity: izq }}>
          <p style={{ ...S.rot(false), margin: 0, ...MOV.entra(t, b.rot) }}>La solución</p>
          <div style={{ position: 'relative', marginTop: 48 }}>
            <h2 style={{ ...S.t1, margin: 0 }}>
              <Pal t={t} at={b.un}>Un</Pal> <Pal t={t} at={b.un == null ? null : b.un + 0.11}>toque.</Pal><br />
              <span style={S.tc(false)}><Pals t={t} at={b.toda} texto="Toda su historia." /></span>
            </h2>
            {tituloAlt ? (
              <h2 style={{ ...S.t1, fontSize: tituloAlt.size || 148, margin: 0, position: 'absolute', left: 0, top: 0, opacity: 1 - fueraA, transform: `translateY(${-50 * fueraA}px)` }}>
                <Pals t={t} at={tituloAlt.at} texto={tituloAlt.l1} /><br />
                <span style={S.tc(false)}><Pals t={t} at={tituloAlt.at + 0.33} texto={tituloAlt.l2} /></span>
              </h2>
            ) : null}
          </div>
          <p style={{ ...S.tm, margin: '76px 0 0', ...MOV.entra(t, b.chip) }}><Chip style={{ fontSize: 30, padding: '14px 28px' }} punto={16}>Sin descargar nada.</Chip></p>
        </div>
        <div style={{ display: 'grid', placeItems: 'center' }}>
          <div style={sinEntrada ? {} : MOV.entra(t, b.reverso, 'z')}>
            <Reverso t={t} b={b} celExtra={celExtra} revExtra={revExtra} enso={enso} />
          </div>
        </div>
      </div>
      {extra}
    </Lam>
  );
}

function L04({ T, t, b, num }) {
  const pasos = [
    { at: b.p1, n: 1, h: 'Registra', s: 'Fotos e historia.', dib: <><div style={{ width: 150, padding: 9, background: C.tinta, boxShadow: '0 30px 50px -30px rgba(43,38,34,.8)', transform: 'rotate(-4deg)' }}><img src={OBRAS.s1} alt="" style={{ display: 'block', width: '100%', aspectRatio: '3 / 4', objectFit: 'cover' }} /></div><span style={{ position: 'absolute', right: '22%', bottom: '8%', width: 76, height: 76, borderRadius: '50%', display: 'grid', placeItems: 'center', background: C.btn, boxShadow: '0 14px 26px -12px rgba(43,38,34,.7)', ...MOV.entra(t, b.p1 + 0.35, 'z', 0.6) }}><Ico n="camara" size={40} stroke={C.lienzo} style={{ strokeWidth: 1.7 }} /></span></> },
    { at: b.p2, n: 2, h: 'Sella', s: 'NFC y QR detrás.', dib: <Sello size={170} t={t} ondas={b.p2 + 0.5} /> },
    { at: b.p3, n: 3, h: 'Entrega', s: 'Tarjeta firmada.', dib: <Tarjeta /> },
    { at: b.p4, n: 4, h: 'Reclama', s: 'Queda como dueño.', dib: <span style={MOV.sella(t, b.p4 + 0.3)}><Chip style={{ fontSize: 26, padding: '16px 26px' }} punto={16}>Dueño: A. L.</Chip></span> }
  ];
  return (
    <Lam arena medio T={T} pie="Brai · Innovación" num={num}>
      <p style={{ ...S.rot(false), margin: 0, ...MOV.entra(t, b.titulo) }}>Cómo funciona</p>
      <h2 style={{ ...S.t2, margin: '26px 0 0', ...MOV.entra(t, b.titulo + 0.13) }}>Cuatro pasos.</h2>
      <div style={{ marginTop: 48, height: 4, borderRadius: 4, background: C.terracota, transform: `scaleX(${MOV.traza(t, b.linea, 1.8)})`, transformOrigin: 'left' }}></div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 34, marginTop: 48 }}>
        {pasos.map((p) => (
          <div key={p.n} style={{ ...S.vid(false), padding: '44px 40px 48px', ...MOV.entra(t, p.at) }}>
            <div style={{ height: 230, display: 'grid', placeItems: 'center', position: 'relative', marginBottom: 20 }}>{p.dib}</div>
            <p style={{ fontFamily: F.mono, fontSize: 24, color: C.btn, margin: '0 0 4px' }}>{p.n}</p>
            <p style={{ ...S.t3, margin: 0 }}>{p.h}</p>
            <p style={{ ...S.tm, margin: '8px 0 0' }}>{p.s}</p>
          </div>
        ))}
      </div>
    </Lam>
  );
}

function Flecha({ T, t, at }) {
  const k = MOV.traza(t, at, 0.7);
  const ph = ((T % 1.8) / 1.8);
  return (
    <div style={{ flex: '0 0 70px', alignSelf: 'center', height: 4, borderRadius: 4, background: `linear-gradient(90deg, ${C.terracota}, ${C.dorado})`, position: 'relative', transform: `scaleX(${k})`, transformOrigin: 'left' }}>
      <span style={{ position: 'absolute', right: -4, top: -9, width: 0, height: 0, borderLeft: '16px solid ' + C.dorado, borderTop: '11px solid transparent', borderBottom: '11px solid transparent' }}></span>
      <i style={{ position: 'absolute', top: -6, left: ph * 100 + '%', width: 16, height: 16, borderRadius: '50%', background: C.dorado, opacity: k >= 1 ? 1 - ph : 0 }}></i>
    </div>
  );
}
function Nodo({ children, style }) { return <div style={{ ...S.vid(false), flex: 1, padding: '42px 34px', textAlign: 'center', ...style }}>{children}</div>; }

function L05({ T, t, b, num }) {
  const nodos = [
    ['nfc', 'Sello NFC', ['NTAG213 hoy', '424 DNA después'], b.n1],
    ['tel', 'Página', ['brai.art/o/CÓDIGO', 'React y Vercel'], b.n2],
    ['db', 'Registro', ['Supabase', 'seguridad por fila'], b.n3],
    ['panel', 'Panel', ['El artista ve', 'quién la reclamó'], b.n4]
  ];
  const fl = [b.f1, b.f2, b.f3];
  return (
    <Lam medio T={T} luz={['l2', 'l3']} pie="Brai · Prototipo: la demo corre sin base de datos conectada" num={num}>
      <p style={{ ...S.rot(false), margin: 0, ...MOV.entra(t, b.titulo) }}>El sistema</p>
      <h2 style={{ ...S.t2, margin: '26px 0 0', ...MOV.entra(t, b.titulo + 0.13) }}>Del sello al registro, <span style={S.tc(false)}>en un segundo.</span></h2>
      <div style={{ display: 'flex', gap: 22, marginTop: 76 }}>
        {nodos.map((n, i) => (
          <React.Fragment key={i}>
            {i > 0 ? <Flecha T={T} t={t} at={fl[i - 1]} /> : null}
            <Nodo style={MOV.entra(t, n[3], 'z')}>
              <Ico n={n[0]} />
              <p style={{ ...S.t3, margin: '26px 0 0' }}>{n[1]}</p>
              <p style={{ ...S.nota(false), margin: '26px 0 0' }}>{n[2][0]}<br />{n[2][1]}</p>
            </Nodo>
          </React.Fragment>
        ))}
      </div>
      <p style={{ ...S.tm, margin: '76px 0 0', ...MOV.entra(t, b.qr) }}>Sin NFC también funciona: <b>QR</b> junto al sello o <b>código</b> escrito en la web.</p>
    </Lam>
  );
}

function L06({ T, t, b, num }) {
  const osc = true;
  return (
    <Lam osc medio T={T} luz={['l1', 'l2']} pie="Brai · Personas y obras de ejemplo" num={num}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
        <div>
          <p style={{ ...S.rot(osc), margin: 0, ...MOV.entra(t, b.rot) }}><span style={S.pil}>Demo</span> Pruébalo ahora</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 50, marginTop: 48 }}>
            <div style={{ ...S.vid(osc), padding: 36, background: C.lienzo, ...MOV.entra(t, b.qr, 'z') }}><img src={RUTA + 'qr-inicio.svg'} alt="Código QR de la demo" width="330" height="330" style={{ display: 'block' }} /></div>
          </div>
          <p style={{ ...S.t2, fontSize: 92, margin: '48px 0 0', ...MOV.entra(t, b.url) }}>braiart.vercel.app</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: 50 }}>
          <Tel src="cel-inicio.jpg" style={MOV.entra(t, b.tel1, 'gira')} />
          <Tel src="cel-obra.jpg" style={{ marginTop: 90, ...MOV.entra(t, b.tel2, 'gira') }} />
        </div>
      </div>
    </Lam>
  );
}

function L07({ T, t, b, num }) {
  const brilla = b.chip == null ? 0 : Math.max(0, 1 - Math.abs(t - b.chip - 0.5) / 0.9);
  return (
    <Lam medio T={T} luz={['l1', 'l3']} pie="Brai · Arte y Español" num={num}>
      <p style={{ ...S.rot(false), margin: 0, ...MOV.entra(t, b.rot) }}>Innovación</p>
      <h2 style={{ ...S.t2, margin: '26px 0 0' }}><Pals t={t} at={b.sv} texto="Se ve," /> <span style={S.tc(false)}><Pals t={t} at={b.nse} texto="no se explica." /></span></h2>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 60, marginTop: 48 }}>
        <Navegador src="web-inicio.jpg" style={MOV.entra(t, b.nav, 'izq')} />
        <Tel src="cel-ficha.jpg" w={300} style={{ marginBottom: -10, ...MOV.entra(t, b.tel, 'gira') }} />
        <div style={{ flex: 1, paddingBottom: 40 }}>
          <p style={{ margin: 0, ...MOV.sella(t, b.chip) }}><Chip style={{ fontSize: 30, padding: '14px 28px', boxShadow: `0 0 0 2px ${C.dorado}, 0 0 ${60 * brilla}px ${18 * brilla}px rgba(201,162,75,${0.45 * brilla})` }} punto={16}>Registrada por el artista</Chip></p>
          <p style={{ ...S.t3, margin: '48px 0 0', ...MOV.entra(t, b.manda) }}>Manda el artista.</p>
          <p style={{ ...S.tm, margin: '10px 0 0', ...MOV.entra(t, b.color) }}>Su nombre y su color.</p>
        </div>
      </div>
    </Lam>
  );
}

function L08({ T, t, b, num }) {
  const osc = true;
  const seg = [[2.90, '#D98A6C', '$2.90', 'Tarjeta', 'estimado'], [2.53, C.dorado, '$2.53', 'Sello NFC', 'compra real'], [1.60, '#E9E1D4', '$1.60', 'Etiqueta', 'estimado'], [1.00, '#B9C4AD', '$1.00', 'QR', 'estimado'], [0.70, '#F6F1EA', '$0.70', 'VOID', null]];
  return (
    <Lam osc medio T={T} luz={['l1', 'l2']} pie="Brai · Fuente: docs/COSTOS.md. Sello NFC: 100 por $252.97 MXN" num={num}>
      <p style={{ ...S.rot(osc), margin: 0, ...MOV.entra(t, b.rot) }}><span style={S.pil}>Dato</span> Viabilidad · Cuánto nos cuesta una obra</p>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 50, marginTop: 26 }}>
        <p style={{ ...S.t0, ...S.tc(osc), fontSize: 330, margin: 0, ...MOV.entra(t, b.num, 'z') }}><Cuenta t={t} at={b.cuenta} fin={8.73} d={2} p="$" /></p>
        <p style={{ ...S.t3, margin: 0, paddingBottom: 54, ...MOV.entra(t, b.pesos) }}>pesos<br />por obra registrada</p>
      </div>
      <div style={{ marginTop: 48 }}>
        <div style={{ display: 'flex', height: 120, borderRadius: 30, overflow: 'hidden', transform: `scaleX(${MOV.traza(t, b.tira, 1.6)})`, transformOrigin: 'left' }}>
          {seg.map((s, i) => <span key={i} style={{ flex: s[0], background: s[1], display: 'grid', placeItems: 'center', fontFamily: F.mono, fontSize: 26, color: C.tinta }}>{s[2]}</span>)}
        </div>
        <div style={{ display: 'flex' }}>
          {seg.map((s, i) => (
            <div key={i} style={{ flex: s[0], paddingTop: 22, fontSize: 27, lineHeight: 1.25, ...MOV.entra(t, i === 1 ? b.sello : b.leyenda, 'poco', 0.8) }}>{s[3]}{s[4] ? <b style={{ display: 'block', fontFamily: F.mono, fontWeight: 400, fontSize: 22, opacity: 0.65 }}>{s[4]}</b> : null}</div>
          ))}
        </div>
      </div>
    </Lam>
  );
}

function L09({ T, t, b, num }) {
  const card = (ico, val, lab, at) => (
    <Nodo style={MOV.entra(t, at, 'z')}><Ico n={ico} /><p style={{ ...S.t2, fontSize: 92, margin: '26px 0 0' }}>{val}</p><p style={{ ...S.nota(false), margin: '26px 0 0' }}>{lab}</p></Nodo>
  );
  const signo = (s, at) => <p style={{ ...S.t2, ...S.tc(false), margin: 0, ...MOV.entra(t, at) }}>{s}</p>;
  return (
    <Lam medio T={T} luz={['l2', 'l3']} pie="Brai · Fuente: docs/COSTOS.md" num={num}>
      <p style={{ ...S.rot(false), margin: 0, ...MOV.entra(t, b.rot) }}>Viabilidad · Costo fijo al mes, con clientes</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 26, marginTop: 76 }}>
        {card('server', '$376', 'Servidor', b.c1)}{signo('+', b.m1)}
        {card('db', '$470', 'Base de datos', b.c2)}{signo('+', b.m2)}
        {card('globo', '$33', 'Dominio', b.c3)}{signo('=', b.eq)}
        <Nodo style={{ background: C.tinta, color: C.lienzo, borderColor: 'transparent', flex: 1.25, ...MOV.entra(t, b.total, 'z') }}>
          <p style={{ ...S.rot(true), justifyContent: 'center', margin: 0 }}>Al mes</p>
          <p style={{ ...S.t1, color: C.terracota, margin: '26px 0 0' }}><Cuenta t={t} at={b.total + 0.1} fin={880} p="$" dur={1.2} /></p>
          <p style={{ ...S.nota(true), margin: '26px 0 0' }}>aproximado</p>
        </Nodo>
      </div>
      <p style={{ ...S.tx, margin: '76px 0 0', ...MOV.entra(t, b.hoy) }}>Hoy, como prototipo: <b style={{ ...S.tc(false), display: 'inline-block', ...MOV.entra(t, b.n49, 'poco', 0.7) }}>$49 al año.</b></p>
    </Lam>
  );
}

function L10({ T, t, b, num }) {
  const pulso = b.nadie == null ? 0 : Math.max(0, 1 - Math.abs(t - b.nadie - 0.4) / 0.7);
  const op = (at, rot, n, ini, mas, ano, an, am) => (
    <div style={{ ...S.vid(false), padding: '44px 40px 48px', ...MOV.entra(t, at, 'gira') }}>
      <p style={{ ...S.rot(false), margin: 0 }}>{rot}</p>
      <p style={{ ...S.t1, margin: '26px 0 0', ...MOV.entra(t, an - 0.1, 'poco', 0.6) }}><Cuenta t={t} at={an} fin={n} p="$" /></p>
      <p style={{ ...S.tx, margin: 0 }}>{ini}</p>
      <p style={{ ...S.t3, ...S.tc(false), margin: '48px 0 0', ...MOV.entra(t, am, 'poco', 0.8) }}>{mas}</p>
      <p style={{ ...S.nota(false), margin: '48px 0 0', ...MOV.entra(t, am + 0.5, 'poco', 0.8) }}>{ano}</p>
    </div>
  );
  return (
    <Lam arena medio T={T} pie="Brai · Ningún artista ha pagado todavía. Supuesto: 10 obras al año" num={num}>
      <p style={{ ...S.rot(false), margin: 0, ...MOV.entra(t, b.rot) }}><span style={{ ...S.pil, transform: `scale(${1 + 0.12 * pulso})`, boxShadow: `0 0 0 ${8 * pulso}px rgba(201,162,75,${0.3 * pulso})` }}>En prueba</span> Viabilidad · Lo que cobramos</p>
      <h2 style={{ ...S.t2, margin: '26px 0 0' }}><Pals t={t} at={b.dos} texto="Dos precios." /> <span style={S.tc(false)}><Pals t={t} at={b.decide} texto="La entrevista decide." /></span></h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, marginTop: 76 }}>
        {op(b.a, 'Opción A · Mensualidad', 7500, 'de arranque, con 20 obras', 'más $990 al mes', 'Año 1: $19,380 por artista', b.an, b.a990)}
        {op(b.b, 'Opción B · Por obra', 2500, 'de arranque, con 5 obras', 'más $450 por obra', 'Año 1: $4,750 por artista', b.bn, b.b450)}
      </div>
    </Lam>
  );
}

function L11({ T, t, b, num }) {
  const osc = true;
  return (
    <Lam osc medio T={T} luz={['l1', 'l2']} pie="Brai · Opción B, obra adicional. (450 menos 8.73) entre 450" num={num}>
      <p style={{ ...S.rot(osc), margin: 0, ...MOV.entra(t, b.rot) }}>Viabilidad · Margen por obra</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, marginTop: 48, alignItems: 'end' }}>
        <div style={MOV.entra(t, b.cob, 'izq')}>
          <p style={{ ...S.tx, opacity: 0.75, margin: 0 }}>Cobramos</p>
          <p style={{ ...S.t0, fontSize: 280, margin: 0 }}><Cuenta t={t} at={b.n450} fin={450} p="$" /></p>
        </div>
        <div style={MOV.entra(t, b.cuesta, 'izq')}>
          <p style={{ ...S.tx, opacity: 0.75, margin: 0 }}>Nos cuesta</p>
          <p style={{ ...S.t0, ...S.tc(osc), fontSize: 280, margin: 0 }}><Cuenta t={t} at={b.n873} fin={8.73} d={2} p="$" /></p>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: 76 }}>
        <span style={MOV.entra(t, b.chip, 'z')}><Chip style={{ fontSize: 40, padding: '18px 36px' }} punto={20}><Cuenta t={t} at={b.chip} fin={98} s="%" dur={1} /> de margen en materiales</Chip></span>
      </div>
    </Lam>
  );
}

function L12({ T, t, b, num }) {
  const osc = true;
  const col = (tipo, valor, h, atB, atV, neg) => {
    const k = MOV.traza(t, atB, 1.3);
    return (
      <div style={{ width: 150, position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', height: '100%' }}>
        <span style={{ fontFamily: F.serif, fontSize: 44, letterSpacing: '-.02em', marginBottom: 14, whiteSpace: 'nowrap', color: tipo === 'B' ? '#B9C4AD' : C.lienzo, ...MOV.entra(t, atV, 'poco', 0.8) }}>{valor}</span>
        {neg
          ? <div style={{ position: 'absolute', top: '100%', width: '100%', height: h, borderRadius: '0 0 14px 14px', boxShadow: 'inset 0 0 0 3px ' + C.verde, transform: `scaleY(${k})`, transformOrigin: 'top' }}></div>
          : <div style={{ width: '100%', height: h, borderRadius: '18px 18px 0 0', background: tipo === 'A' ? `linear-gradient(180deg, #D98A6C, ${C.terracota})` : `linear-gradient(180deg, #8A9A7C, ${C.verde})`, transform: `scaleY(${k})`, transformOrigin: 'bottom' }}></div>}
      </div>
    );
  };
  const grupo = (hijos) => <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 30, position: 'relative', height: '100%' }}>{hijos}</div>;
  return (
    <Lam osc T={T} luz={['l2']} pie="Brai · Ingreso menos costo fijo y materiales" num={num}>
      <p style={{ ...S.rot(osc), margin: 0, ...MOV.entra(t, b.rot) }}><span style={S.pil}>Proyección</span> Viabilidad · Ganancia del año 1</p>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 18 }}>
        <h2 style={{ ...S.t2, fontSize: 84, margin: 0, ...MOV.entra(t, b.titulo) }}>15 artistas, un año.</h2>
        <p style={{ ...S.tm, margin: 0, whiteSpace: 'nowrap', ...MOV.entra(t, b.titulo + 0.13) }}><span style={{ color: C.terracota }}>■</span> Opción A &nbsp; <span style={{ color: '#8A9A7C' }}>■</span> Opción B</p>
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 110, height: 560, borderBottom: '3px solid rgba(246,241,234,.35)', padding: '0 30px', marginTop: 26 }}>
        {grupo(<>{col('A', '$8,743', 16, b.g1, b.g1 + 0.5)}{col('B', '−$5,887', 11, b.g1 + 0.15, b.g1 + 0.6, true)}</>)}
        {grupo(<>{col('A', '$85,914', 147, b.g5, b.g5 + 0.8)}{col('B', '$12,764', 22, b.g5 + 0.15, b.g5 + 0.9)}</>)}
        {grupo(<>{col('A', '$278,841', 478, b.a15, b.va15)}{col('B', '$59,391', 102, b.b15, b.vb15)}</>)}
      </div>
      <div style={{ display: 'flex', gap: 110, padding: '22px 30px 0', ...MOV.entra(t, b.titulo + 0.3, 'poco') }}>
        {['1 artista', '5 artistas', '15 artistas'].map((x) => <div key={x} style={{ flex: 1, textAlign: 'center', fontSize: 32 }}>{x}</div>)}
      </div>
    </Lam>
  );
}

function L13({ T, t, b, num }) {
  const marca = b.supuesto == null ? 0 : eo(pr(t, b.supuesto, 0.6));
  return (
    <Lam arena medio T={T} pie="Brai · Es un techo, no una meta" num={num}>
      <p style={{ ...S.rot(false), margin: 0, ...MOV.entra(t, b.rot) }}><span style={S.pil}>Hipótesis</span> Viabilidad · El mercado</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 60, marginTop: 76, alignItems: 'end' }}>
        <div style={MOV.entra(t, b.n1)}>
          <p style={{ ...S.t1, margin: 0 }}><Cuenta t={t} at={b.c1} fin={8870} /></p>
          <p style={{ ...S.tx, margin: '26px 0 0' }}>artistas visuales en Jalisco</p>
          <p style={{ ...S.nota(false), margin: '26px 0 0' }}>DataMéxico, ENOE 2025</p>
        </div>
        <div style={MOV.entra(t, b.n2)}>
          <p style={{ ...S.t1, ...S.tc(false), margin: 0 }}><Cuenta t={t} at={b.c2} fin={177} /></p>
          <p style={{ ...S.tx, margin: '26px 0 0' }}>podrían ser clientes, si el 2% cumple el perfil</p>
          <p style={{ ...S.nota(false), margin: '26px 0 0', color: `rgba(${mix(43, 162, marca)},${mix(38, 86, marca)},${mix(34, 61, marca)},${mix(0.66, 1, marca)})` }}>Supuesto nuestro, sin validar</p>
        </div>
        <div style={MOV.entra(t, b.n3)}>
          <p style={{ ...S.t1, margin: 0 }}><Cuenta t={t} at={b.c3} fin={3.4} d={1} p="$" s=" M" /></p>
          <p style={{ ...S.tx, margin: '26px 0 0' }}>techo teórico al año con la Opción A</p>
          <p style={{ ...S.nota(false), margin: '26px 0 0' }}>$840 mil con la Opción B</p>
        </div>
      </div>
    </Lam>
  );
}

function L14({ T, t, b, num }) {
  const cols = '251px 464px 231px 231px 1fr';
  const fila = (celdas, at, brai) => (
    <div style={{ display: 'grid', gridTemplateColumns: cols, ...(brai ? { background: C.tinta, color: C.lienzo, fontWeight: 600, borderRadius: 26 } : { borderTop: '2px solid ' + C.linea }), ...(brai ? MOV.entra(t, at, 'z', 0.9) : MOV.entra(t, at, 'poco', 0.8)) }}>
      {celdas.map((c, i) => <div key={i} style={{ padding: '23px 22px', ...c[1] }}>{c[0]}</div>)}
    </div>
  );
  const si = { color: C.verde, fontWeight: 700 }, no = { opacity: 0.4 };
  const enc = (at) => ({ color: C.dorado, opacity: at == null ? 1 : mix(0.25, 1, eo(pr(t, at, 0.5))), display: 'inline-block', transform: `scale(${at == null ? 1 : 1 + 0.15 * Math.max(0, 1 - Math.abs(t - at - 0.25) / 0.4)})`, transformOrigin: 'left center' });
  return (
    <Lam medio T={T} luz={['l2']} pie="Brai · Precios consultados el 5 nov 2026" num={num}>
      <p style={{ ...S.rot(false), margin: 0, ...MOV.entra(t, b.rot) }}>Competencia</p>
      <h2 style={{ ...S.t2, fontSize: 88, margin: '26px 0 0' }}><Pals t={t} at={b.t1} texto="Lo digital ya es gratis." /> <span style={S.tc(false)}><Pals t={t} at={b.t2} texto="Lo nuestro es en persona." /></span></h2>
      <div style={{ marginTop: 48, fontSize: 33 }}>
        <div style={{ display: 'grid', gridTemplateColumns: cols, ...MOV.entra(t, b.th, 'poco', 0.8) }}>
          {['', 'Precio', 'En persona', 'En español', 'El comprador se registra'].map((h, i) => <div key={i} style={{ fontFamily: F.mono, fontSize: 21, letterSpacing: '.14em', textTransform: 'uppercase', color: C.verde, padding: '0 22px 20px' }}>{h}</div>)}
        </div>
        {fila([['markmy.art'], ['Gratis'], ['No', no], ['Sí', si], ['No lo describe', no]], b.r1)}
        {fila([['Verisart'], ['0 a 99.99 USD al mes'], ['No', no], ['No', no], ['Transferencias']], b.r2)}
        {fila([['Tagsmart'], ['20 a 120 libras por obra'], ['Servicio', si], ['No', no], ['?', no]], b.r3)}
        <div style={{ borderTop: '2px solid ' + C.linea }}></div>
        {fila([['Brai'], ['En prueba'], [<span style={enc(b.persona)}>Sí</span>], [<span style={enc(b.espanol)}>Sí</span>], [<span style={enc(b.registra)}>Sí, al reclamar</span>]], b.brai, true)}
      </div>
    </Lam>
  );
}

function L15({ T, t, b, num, linea, pie = 'Brai · Business Shark 8°' }) {
  const osc = true;
  return (
    <Lam osc centro T={T} luz={['l1', 'l2']} pie={pie} num={num}>
      <Lado T={T} lado="izq" osc /><Lado T={T} lado="der" osc />
      <div style={{ position: 'relative', width: 220, height: 220, zIndex: 2, ...MOV.entra(t, b.enso, 'z', 1.2) }}>
        <Orbita T={T} />
        <Enso size={220} p={MOV.traza(t, b.enso + 0.1, 1.9)} osc />
      </div>
      <h2 style={{ ...S.t1, margin: '76px 0 0', position: 'relative', zIndex: 2 }}>
        <Pals t={t} at={b.frase} texto="Cada obra sabe" /><br />
        <span style={S.tc(osc)}><Pals t={t} at={b.frase + 0.33} texto="de dónde viene." /></span>
      </h2>
      {linea ? <p style={{ ...S.rot(osc), margin: '48px 0 0', position: 'relative', zIndex: 2, ...MOV.entra(t, b.linea) }}><span style={{ ...S.pil, background: 'none', boxShadow: 'inset 0 0 0 2px currentColor', color: 'inherit' }}>Prototipo de estudiantes</span> <span style={{ textTransform: 'none', letterSpacing: '.08em' }}>braiart.vercel.app</span></p> : null}
    </Lam>
  );
}

// ─── Montaje: capas, subtítulos y audio ──────────────────────────────────

// Capa: aparece con fundido cruzado sobre la anterior; se oculta (sin desmontar) fuera de su ventana.
function Capa({ T, desde, hasta, entra = 0.6, z, children, cam }) {
  const m = entra / 2;
  const vis = T >= desde - m && T < hasta + 0.35;
  const o = entra > 0 ? cl((T - (desde - m)) / entra, 0, 1) : (T >= desde ? 1 : 0);
  const dur = hasta - desde, k = cl((T - desde) / dur, 0, 1);
  const camara = cam || `scale(${1 + 0.022 * k})`;
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: z, visibility: vis ? 'visible' : 'hidden', opacity: o, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, transform: camara, transformOrigin: '50% 50%' }}>{children}</div>
    </div>
  );
}

function Subtitulos({ T, items }) {
  let act = null;
  for (let i = 0; i < items.length; i++) { if (T >= items[i].at && T < items[i].hasta) act = items[i]; }
  if (!act) return null;
  const o = cl(Math.min((T - act.at) / 0.16, (act.hasta - T) / 0.16), 0, 1);
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 70, display: 'flex', justifyContent: 'center', pointerEvents: 'none', zIndex: 50 }}>
      <div style={{ maxWidth: 1560, padding: '12px 30px 14px', borderRadius: 18, background: 'rgba(43,38,34,.86)', boxShadow: '0 0 0 1px rgba(246,241,234,.1)', color: C.lienzo, fontFamily: F.sans, fontWeight: 500, fontSize: 38, lineHeight: 1.3, textAlign: 'center', textWrap: 'balance', opacity: o, transform: `translateY(${8 * (1 - o)}px)` }}>{act.texto}</div>
    </div>
  );
}

// Convierte el plan (tiempos por escena) a tiempos absolutos usando los CUES.
function subsAbs(plan, CUES, orden) {
  const out = [];
  orden.forEach((id) => {
    const es = plan.escenas[id]; if (!es) return;
    const ini = CUES[id];
    es.subs.forEach((s, i) => {
      const sig = es.subs[i + 1];
      out.push({ at: ini + s[0], hasta: ini + (s[2] != null ? s[2] : sig[0]), texto: s[1] });
    });
  });
  return out;
}

// Reproduce la mezcla .wav en la vista previa, sincronizada con la línea de tiempo.
function AudioMezcla({ src }) {
  const c = useComposition();
  const ref = React.useRef(null);
  React.useEffect(() => { const a = new Audio(src); a.preload = 'auto'; ref.current = a; return () => { a.pause(); ref.current = null; }; }, [src]);
  React.useEffect(() => {
    const a = ref.current; if (!a) return;
    if (c.playing) {
      if (Math.abs(a.currentTime - c.time) > 0.25) { try { a.currentTime = c.time; } catch (e) {} }
      if (a.paused) a.play().catch(() => {});
    } else if (!a.paused) a.pause();
  }, [c.playing, c.time]);
  return null;
}

Object.assign(window, { C, F, RUTA, OBRAS, ISO, MOV, cl, pr, eo, eio, mix, fmt, Cuenta, Pal, Pals, S, Chip, Punto, Luz, Grano, Pie, Lam, Enso, Orbita, Lado, Ico, Ondas, Sello, Tarjeta, Tel, Navegador, Cel, Reverso, Nodo, L01, L02, L03, L04, L05, L06, L07, L08, L09, L10, L11, L12, L13, L14, L15, Capa, Subtitulos, subsAbs, AudioMezcla });
