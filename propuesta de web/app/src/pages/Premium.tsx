import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { ArrowDownRight, ArrowRight, ArrowUpRight, Check, Fingerprint, ScanLine, ShieldCheck } from 'lucide-react'
import { Isotipo, TarjetaDueno } from '../components/marca'
import { Raspadita } from '../components/interaccion'
import { ARTISTA, CODIGO_DEMO, OBRAS } from '../data/demo'
import './premium.css'

const PASOS = [
  { nombre: 'Registras su historia.', texto: 'Ficha, fotos y palabras del artista. Todo empieza en su taller.', pantalla: 'La historia', detalle: 'Quién la creó. Cómo nació.' },
  { nombre: 'El sello la acompaña.', texto: 'NFC y QR abren la página de la obra. Sin instalar una app.', pantalla: 'El sello', detalle: 'Una puerta a su registro.' },
  { nombre: 'Tu comprador la reclama.', texto: 'Una tarjeta firmada, un código y su correo. En esta demo, el reclamo es simulado.', pantalla: 'Su comprador', detalle: 'Un vínculo que empieza aquí.' },
  { nombre: 'La relación puede seguir.', texto: 'Si comparte su contacto, puedes escribirle cuando tengas obra nueva.', pantalla: 'El vínculo', detalle: 'Más allá de la primera venta.' },
]

function HistoriaPremium() {
  const ref = useRef<HTMLElement>(null)
  const [paso, setPaso] = useState(0)
  useEffect(() => {
    const section = ref.current
    if (!section) return
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    const pintar = () => {
      frame = 0
      if (media.matches) return
      const items = section.querySelectorAll<HTMLElement>('.pr-step')
      let siguiente = 0
      items.forEach((item, i) => {
        if (item.getBoundingClientRect().top <= window.innerHeight * .58) siguiente = i
      })
      setPaso(siguiente)
    }
    const pedir = () => { if (!frame) frame = requestAnimationFrame(pintar) }
    pintar()
    window.addEventListener('scroll', pedir, { passive: true })
    window.addEventListener('resize', pedir)
    media.addEventListener('change', pedir)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', pedir)
      window.removeEventListener('resize', pedir)
      media.removeEventListener('change', pedir)
    }
  }, [])
  const obra = OBRAS[0]
  return (
    <section id="premium-como" ref={ref} className="pr-story pr-container">
      <div className="pr-story-visual">
        <p className="pr-label">Cómo funciona</p>
        <h2>Su historia.<br /><em>Siempre cerca.</em></h2>
        <div className="pr-stage pr-glass" data-paso={paso}>
          <div className="pr-stage-back" aria-hidden="true"><Fingerprint size={110} strokeWidth={.6} /></div>
          <div className="pr-stage-art"><img src={obra.imagen} alt={`Imagen de demostración: ${obra.titulo}`} loading="lazy" width="180" height="225" /></div>
          <div className="pr-stage-seal" aria-hidden="true"><Isotipo size={38} /></div>
          <div className="pr-stage-caption">
            <span className="pr-label">0{paso + 1} / 04</span>
            <h3>{PASOS[paso].pantalla}</h3>
            <p>{PASOS[paso].detalle}</p>
          </div>
        </div>
        <div className="pr-stage-dots" aria-label="Pasos de la demostración">
          {PASOS.map((p, i) => <button key={p.nombre} type="button" onClick={() => setPaso(i)} aria-label={`Mostrar paso ${i + 1}: ${p.nombre}`} aria-pressed={paso === i}><span /></button>)}
        </div>
        <p className="pr-micro">Animación ilustrativa. El sello NFC aún no funciona en la demo.</p>
      </div>
      <ol className="pr-story-steps">
        {PASOS.map((p, i) => (
          <li key={p.nombre} className={`pr-step ${paso === i ? 'pr-step-active' : ''}`}>
            <span className="pr-step-number">0{i + 1}</span>
            <div><h3>{p.nombre}</h3><p>{p.texto}</p></div>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default function Premium() {
  const obra = OBRAS[0]
  const [raspada, setRaspada] = useState(false)
  useEffect(() => {
    const id = window.location.hash.slice(1)
    if (!['premium-inicio', 'premium-como', 'premium-artistas', 'premium-precios'].includes(id)) return
    const frame = requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: 'instant' }))
    return () => cancelAnimationFrame(frame)
  }, [])
  return (
    <div className="pr-page">
      <header className="pr-header pr-container">
        <a href="#premium-inicio" className="pr-brand" aria-label="Brai, inicio de la propuesta premium"><Isotipo size={52} /><span>Brai</span></a>
        <Link to="/" className="pr-compare">Versión anterior <ArrowUpRight size={14} aria-hidden="true" /></Link>
      </header>
      <main>
        <section id="premium-inicio" className="pr-hero pr-container">
          <div className="pr-hero-copy">
            <p className="pr-label"><span className="pr-dot" /> Registro de obra para artistas</p>
            <h1>Cada obra sabe<br /><em>de dónde viene.</em></h1>
            <nav className="pr-hero-nav" aria-label="Secciones de la propuesta premium">
              <a href="#premium-como">Cómo funciona</a><a href="#premium-artistas">Para artistas</a><a href="#premium-precios">La propuesta</a>
            </nav>
            <Link to="/recorrido" className="pr-button">Recorrer la demo <ArrowUpRight size={18} aria-hidden="true" /></Link>
            <p className="pr-micro">Prototipo estudiantil. Sin cuentas ni datos reales.</p>
          </div>
          <div className="pr-hero-gallery">
            <div className="pr-gallery-halo" aria-hidden="true" />
            <div className="pr-gallery-frame"><img src={obra.imagen} alt={`${obra.titulo}, imagen de demostración`} width="340" height="425" fetchPriority="high" /></div>
            <div className="pr-work-label"><span>{ARTISTA.nombre}</span><strong>{obra.titulo}</strong><span>Demostración, sin registro real.</span></div>
            <div className="pr-gallery-note pr-glass"><Isotipo size={32} /><div><span>Una obra, una historia.</span><small>Un sello que abre su página.</small></div><ArrowDownRight size={20} aria-hidden="true" /></div>
          </div>
        </section>

        <section className="pr-problem pr-container" aria-labelledby="pr-problem-title">
          <div className="pr-section-top"><p className="pr-label">El problema</p><span className="pr-section-number">01 / 05</span></div>
          <h2 id="pr-problem-title">La obra se va.<br /><em>El vínculo también puede irse.</em></h2>
          <div className="pr-problem-bottom"><p>Después de la venta, el artista puede perder el contacto con quien la compró. Brai propone que su historia y esa relación tengan un lugar donde seguir.</p><span className="pr-problem-stamp" aria-hidden="true"><ScanLine size={38} strokeWidth={1} /></span></div>
        </section>

        <HistoriaPremium />

        <section id="premium-artistas" className="pr-artists pr-container">
          <div className="pr-section-top"><p className="pr-label">Para artistas</p><span className="pr-section-number">03 / 05</span></div>
          <div className="pr-artists-intro"><h2>Una obra vendida.<br /><em>Una relación abierta.</em></h2><p>Tu panel reúne las obras y a los compradores que decidieron reclamarlas y compartir su correo.</p></div>
          <div className="pr-panel pr-glass">
            <div className="pr-panel-top"><div><span className="pr-label">Tu taller, en orden</span><h3>Quién tiene tu obra</h3></div><span className="pr-pill">Ejemplo ficticio</span></div>
            <div className="pr-panel-row"><img src="/obras/sin-titulo-1.svg" alt="" width="54" height="66" loading="lazy" /><div><strong>Obra de ejemplo 02</strong><span>Compradora de ejemplo</span></div><span className="pr-panel-status"><span className="pr-dot" /> Reclamada en la demo</span><Check size={18} aria-hidden="true" /></div>
            <div className="pr-panel-row"><img src="/obras/los-olvidados.svg" alt="" width="54" height="66" loading="lazy" /><div><strong>Obra de ejemplo 01</strong><span>Obra de ejemplo</span></div><span className="pr-panel-status pr-muted">Sin reclamar</span><ArrowUpRight size={18} aria-hidden="true" /></div>
            <Link to="/panel" className="pr-text-link">Abrir el panel de ejemplo <ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
          <p className="pr-micro">Vista ilustrativa. No hay cuentas ni envío de correos; las personas de esta vista son ficticias.</p>
        </section>

        <section className="pr-ritual pr-container">
          <div className="pr-ritual-copy"><p className="pr-label">Lo que recibe tu comprador</p><h2>La entrega<br /><em>también es parte del arte.</em></h2><p>Un sello detrás del cuadro. Una tarjeta firmada. Una página con la historia que tú cuentas.</p><p className="pr-try"><span>01</span> Prueba la raspadita de la tarjeta.</p><p className="pr-micro">El código de esta demo es público y solo simula el reclamo.</p></div>
          <div className="pr-certificate">
            <span className="pr-certificate-tag">PIEZA DE DEMOSTRACIÓN</span>
            <TarjetaDueno titulo={obra.titulo} artista={ARTISTA.nombre} ficha={`${obra.registro} · ${obra.tecnica}`}><Raspadita codigo={CODIGO_DEMO} alRevelar={() => setRaspada(true)} /></TarjetaDueno>
            {raspada ? <Link to={`/o/${obra.codigo}/reclamar`} className="pr-text-link">Probar el reclamo simulado <ArrowRight size={16} aria-hidden="true" /></Link> : <p className="pr-micro">Arrastra sobre la franja o usa Tab y Enter.</p>}
          </div>
        </section>

        <section id="premium-precios" className="pr-pricing pr-container">
          <div className="pr-section-top"><p className="pr-label">La propuesta</p><span className="pr-section-number">05 / 05</span></div>
          <h2>Dos formas de empezar.<br /><em>Las estamos poniendo a prueba.</em></h2>
          <p className="pr-section-desc">Ningún artista ha pagado estos precios todavía. Primero queremos escuchar qué te serviría.</p>
          <div className="pr-plans">
            <article className="pr-plan"><span className="pr-label">Opción A · Precio sin validar</span><h3>Acompañamiento continuo</h3><p className="pr-price">$7,500 <span>MXN de arranque</span></p><p className="pr-plan-recurring">Después, $990 MXN al mes.</p><ul><li>Página del artista.</li><li>Hasta 20 obras con sello y tarjeta.</li><li>Mantenimiento propuesto de la plataforma.</li></ul></article>
            <article className="pr-plan pr-glass"><span className="pr-label">Opción B · Alternativa en prueba</span><h3>Obra por obra</h3><p className="pr-price">$2,500 <span>MXN de arranque</span></p><p className="pr-plan-recurring">Después, $450 MXN por obra adicional.</p><ul><li>Página del artista.</li><li>5 obras con sello y tarjeta.</li><li>Sin mensualidad propuesta.</li></ul></article>
          </div>
          <details className="pr-faq"><summary>¿Esto ya es un servicio disponible?</summary><p>Todavía es un prototipo. La ficha, el reclamo y el panel usan datos de demostración. No hay cuentas, los sellos NFC no están conectados y no se envían correos. <Link to="/demo">Ver qué hace la demo.</Link></p></details>
          <details className="pr-faq"><summary>¿Qué puede acreditar el registro?</summary><p>La propuesta busca documentar lo que registra el artista y el historial de la obra. No sustituye una prueba legal de propiedad ni garantiza autenticidad. Las fotos de detalle y los sellos forman parte del diseño previsto.</p></details>
          <details className="pr-faq"><summary>¿Qué pasa con los datos del comprador?</summary><p>La demo solo acepta correos de prueba y guarda los cambios en este navegador. En la versión prevista, el contacto existiría únicamente si el comprador reclama su obra y comparte su correo. En público solo se mostrarían sus iniciales.</p></details>
        </section>

        <section className="pr-ending pr-container"><ShieldCheck size={34} strokeWidth={1} aria-hidden="true" /><h2>El arte permanece.<br /><em>Su historia también merece hacerlo.</em></h2><Link to={`/o/${obra.codigo}`} className="pr-button">Ver una obra de ejemplo <ArrowUpRight size={18} aria-hidden="true" /></Link></section>
      </main>
      <footer className="pr-footer pr-container"><span>Brai · Business Shark 8°</span><div><Link to="/">Comparar versión anterior</Link><Link to="/demo">Qué es real</Link><a href="/privacidad">Datos de la demo</a></div><span className="pr-micro">Cada obra sabe de dónde viene.</span></footer>
    </div>
  )
}
