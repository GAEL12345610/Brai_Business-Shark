import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react'
import { Isotipo, SelloNFC, TarjetaDueno } from '../components/marca'
import { EscenaSello, Raspadita } from '../components/interaccion'
import { ARTISTA, CODIGO_DEMO, OBRAS } from '../data/demo'
import HistoriaObra from '../components/HistoriaObra'
import './premium.css'

const PASOS = [
  { nombre: 'Registras la obra', texto: 'Ficha, historia y tres fotos de detalles únicos, tomadas con el artista.' },
  { nombre: 'Colocamos el sello', texto: 'NFC y QR detrás del cuadro, para abrir la página desde el celular.' },
  { nombre: 'Entregas la tarjeta', texto: 'Firmada a mano, con el código de dueño oculto bajo una raspadita.' },
  { nombre: 'Tu comprador la reclama', texto: 'Introduce el código y comparte su correo. En público, solo sus iniciales.' },
]

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
      <main>
        <section id="premium-inicio" className="pr-home" aria-label="Brai, inicio">
          <h1 className="pr-logo-home"><Isotipo size={170} /><span>Brai</span></h1>
        </section>
        <nav className="pr-content-nav pr-container" aria-label="Secciones de Brai">
          <a href="#premium-como">Cómo funciona</a>
          <a href="#premium-artistas">Para artistas</a>
          <a href="#premium-precios">Precios</a>
          <Link to="/recorrido">Ver demo <ArrowUpRight size={14} aria-hidden="true" /></Link>
        </nav>

        <section className="pr-problem pr-container" aria-labelledby="pr-problem-title">
          <p className="pr-label">El problema</p>
          <h2 id="pr-problem-title">La obra se va.<br /><em>Su historia no debería perderse.</em></h2>
          <p className="pr-problem-copy">Después de vender una obra, el artista puede perder el contacto con quien la compró. Brai propone conservar su historia, registrar su procedencia y mantener el vínculo con el comprador, si decide compartir su correo.</p>
          <HistoriaObra imagen={obra.imagen} />
        </section>

        <section id="premium-como" className="pr-how pr-container">
          <p className="pr-label">Cómo funciona</p>
          <h2>Acerca tu celular.<br /><em>La obra tiene algo que contar.</em></h2>
          <p className="pr-section-desc">El sello NFC abre la página. Si tu celular no tiene NFC, escaneas el QR. No hace falta instalar una app.</p>
          <div className="pr-nfc"><EscenaSello titulo={obra.titulo} artista={ARTISTA.nombre} registro={obra.registro} imagen={obra.imagen} /></div>
          <p className="pr-micro">Demostración del funcionamiento previsto. El NFC todavía no está conectado.</p>
          <ol className="pr-how-steps">{PASOS.map((p, i) => <li key={p.nombre}><span className="pr-step-number">0{i + 1}</span><h3>{p.nombre}</h3><p>{p.texto}</p></li>)}</ol>
        </section>

        <section id="premium-artistas" className="pr-artists pr-container">
          <p className="pr-label">Para artistas</p>
          <div className="pr-artists-intro"><h2>Una obra vendida.<br /><em>Una relación abierta.</em></h2><p>Tu panel muestra quién reclamó cada obra y compartió su correo. Así puedes avisarle cuando tengas obra nueva. Si no la reclama, no tendrás su contacto.</p></div>
          <div className="pr-panel pr-glass">
            <div className="pr-panel-top"><div><span className="pr-label">Tu taller, en orden</span><h3>Quién tiene tu obra</h3></div><span className="pr-pill">Ejemplo ficticio</span></div>
            <div className="pr-panel-row"><img src="/obras/sin-titulo-1.svg" alt="" width="54" height="66" loading="lazy" /><div><strong>Obra de ejemplo 02</strong><span>Compradora de ejemplo</span></div><span className="pr-panel-status"><span className="pr-dot" /> Reclamada en la demo</span><Check size={18} aria-hidden="true" /></div>
            <div className="pr-panel-row"><img src="/obras/los-olvidados.svg" alt="" width="54" height="66" loading="lazy" /><div><strong>Obra de ejemplo 01</strong><span>Obra de ejemplo</span></div><span className="pr-panel-status pr-muted">Sin reclamar</span><ArrowUpRight size={18} aria-hidden="true" /></div>
            <Link to="/panel" className="pr-text-link">Abrir el panel de ejemplo <ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
          <p className="pr-micro">Vista ilustrativa. No hay cuentas ni envío de correos; las personas de esta vista son ficticias.</p>
        </section>

        <section className="pr-pieces pr-container">
          <p className="pr-label">Lo que recibe tu comprador</p>
          <h2>Tres piezas.<br /><em>La historia completa.</em></h2>
          <div className="pr-piece-grid">
            <figure className="pr-piece"><div className="pr-piece-object"><SelloNFC registro={obra.registro} /></div><figcaption><h3>El sello</h3><p>NFC y QR detrás del cuadro, para abrir su página.</p></figcaption></figure>
            <figure className="pr-piece"><div className="pr-piece-object"><TarjetaDueno titulo={obra.titulo} artista={ARTISTA.nombre} ficha={`${obra.registro} · ${obra.tecnica}`}><Raspadita codigo={CODIGO_DEMO} alRevelar={() => setRaspada(true)} /></TarjetaDueno></div><figcaption><h3>La tarjeta de dueño</h3><p>Firmada por el artista, con el código bajo raspadita. Puedes probarla aquí.</p>{raspada && <Link to={`/o/${obra.codigo}/reclamar`} className="pr-text-link">Probar el reclamo simulado <ArrowRight size={16} aria-hidden="true" /></Link>}</figcaption></figure>
            <figure className="pr-piece"><div className="pr-piece-object"><Link to={`/o/${obra.codigo}`} className="pr-piece-page"><img src={obra.imagen} alt={`${obra.titulo}, obra de demostración`} width="150" height="180" loading="lazy" /><span>{obra.titulo}</span><small>Página de ejemplo <ArrowUpRight size={12} aria-hidden="true" /></small></Link></div><figcaption><h3>La página de la obra</h3><p>Su ficha, su historia, fotos de detalle y registro de dueños.</p></figcaption></figure>
          </div>
          <p className="pr-micro">Piezas de demostración. El código es público y el reclamo se simula en este navegador.</p>
        </section>

        <section id="premium-precios" className="pr-pricing pr-container">
          <p className="pr-label">La propuesta</p>
          <h2>Dos formas de empezar.<br /><em>Las estamos poniendo a prueba.</em></h2>
          <p className="pr-section-desc">Ningún artista ha pagado estos precios todavía. Primero queremos escuchar qué te serviría.</p>
          <div className="pr-plans">
            <article className="pr-plan"><span className="pr-label">Opción A · Precio sin validar</span><h3>Acompañamiento continuo</h3><p className="pr-price">$7,500 <span>MXN de arranque</span></p><p className="pr-plan-recurring">Después, $990 MXN al mes.</p><ul><li>Página del artista.</li><li>Hasta 20 obras con sello y tarjeta.</li><li>Mantenimiento propuesto de la plataforma.</li></ul></article>
            <article className="pr-plan pr-glass"><span className="pr-label">Opción B · Alternativa en prueba</span><h3>Obra por obra</h3><p className="pr-price">$2,500 <span>MXN de arranque</span></p><p className="pr-plan-recurring">Después, $450 MXN por obra adicional.</p><ul><li>Página del artista.</li><li>5 obras con sello y tarjeta.</li><li>Sin mensualidad propuesta.</li></ul></article>
          </div>
          <div className="pr-founders"><span className="pr-label">Propuesta para artistas fundadores</span><p>Buscamos a los primeros 3 artistas para probarlo: registrar de 3 a 5 obras, arranque y 3 meses sin costo, a cambio de un caso documentado con permiso. Las condiciones posteriores todavía están por definir.</p></div>
          <details className="pr-faq"><summary>¿Se puede copiar el sello?</summary><p>Un NFC básico, sí. Por eso la propuesta combina registro del artista, fotos de detalle, código bajo raspadita e historial. No prometemos una obra imposible de copiar.</p></details>
          <details className="pr-faq"><summary>¿Esto ya es un servicio disponible?</summary><p>Todavía es un prototipo. La ficha, el reclamo y el panel usan datos de demostración. No hay cuentas, los sellos NFC no están conectados y no se envían correos. <Link to="/demo">Ver qué hace la demo.</Link></p></details>
          <details className="pr-faq"><summary>¿Qué puede acreditar el registro?</summary><p>La propuesta busca documentar lo que registra el artista y el historial de la obra. No sustituye una prueba legal de propiedad ni garantiza autenticidad. Las fotos de detalle y los sellos forman parte del diseño previsto.</p></details>
          <details className="pr-faq"><summary>¿Qué pasa con los datos del comprador?</summary><p>La demo solo acepta correos de prueba y guarda los cambios en este navegador. En la versión prevista, el contacto existiría únicamente si el comprador reclama su obra y comparte su correo. En público solo se mostrarían sus iniciales.</p></details>
        </section>

      </main>
      <footer className="pr-footer pr-container"><span>Brai · Business Shark 8°</span><div><Link to="/">Comparar versión anterior</Link><Link to="/demo">Qué es real</Link><a href="/privacidad">Datos de la demo</a></div><span className="pr-micro">Cada obra sabe de dónde viene.</span></footer>
    </div>
  )
}
