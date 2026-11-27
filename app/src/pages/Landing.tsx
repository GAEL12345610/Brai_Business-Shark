import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Link } from 'react-router'
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Keyboard, Nfc, QrCode, X } from 'lucide-react'
import { cargarGsap } from '../lib/gsap'
import { TarjetaTilt } from '../components/movimiento'
import { Logo, SelloNFC, TarjetaDueno } from '../components/marca'
import { LinkReclamarDemo, Raspadita } from '../components/interaccion'
import { EscenaSello } from '../components/escena'
import { VerificarCodigo } from '../components/verificar'
import { ARTISTA, CODIGO_DEMO, OBRAS } from '../data/demo'

const OBRA_DEMO = OBRAS[0]

const i = (n: number) => ({ '--i': n }) as CSSProperties

const CAMINOS = [
  { Icono: Nfc, titulo: 'Toca', texto: 'Acerca tu celular al sello que va detrás del cuadro. La página se abre sola.' },
  { Icono: QrCode, titulo: 'Escanea', texto: '¿Tu celular no tiene NFC? El QR junto al sello abre la misma página.' },
  { Icono: Keyboard, titulo: 'Escribe', texto: 'Teclea el código impreso junto al sello. Llegas al mismo lugar.' },
]

const SI = [
  'Registrada por el artista, con fecha y fotos.',
  'Su historia, contada por quien la pintó.',
  'Cada dueño en orden, solo con iniciales.',
  'Un código de dueño de un solo uso, bajo raspadita.',
]
const NO = [
  'Que nadie pueda copiar jamás una obra. Nadie serio promete eso.',
  'Una prueba legal de propiedad. Es un registro, no una escritura.',
  'Ventas garantizadas.',
]

const BANDA = ['Registrada por el artista', 'Sello NFC', 'Historia de la obra', 'Código de dueño', 'QR de respaldo']

function Palabras({ texto, desde = 0, className = '' }: { texto: string; desde?: number; className?: string }) {
  return (
    <span className={`block ${className}`}>
      {texto.split(' ').map((p, n) => (
        <span key={n}>
          <span className="sube" style={i(desde + n)}>
            <span>{p}</span>
          </span>{' '}
        </span>
      ))}
    </span>
  )
}

/** Columna de obras que sube o baja sin parar, a un lado de la portada. */
function Carril({ lado }: { lado: 'izq' | 'der' }) {
  const obras = lado === 'izq' ? OBRAS : [...OBRAS].reverse()
  return (
    <div className={`lado lado-${lado} hidden xl:block`} aria-hidden="true">
      <div>
        <div className={`carril ${lado === 'der' ? 'carril-baja' : ''}`}>
          {[0, 1].map((k) => (
            <div key={k}>
              {obras.map((o, n) => (
                <div key={o.codigo} className={`pieza ${n % 2 ? 'pieza-b' : ''}`}>
                  <div className="marco-obra">
                    <img src={o.imagen} alt="" className="aspect-[3/4] object-cover" />
                  </div>
                  <span className="vidrio pieza-chip">
                    <i className="size-2.5 rounded-full bg-dorado" /> {o.registro}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Banda({ invertida = false }: { invertida?: boolean }) {
  const fila = [...BANDA, ...BANDA]
  return (
    <div className={`banda ${invertida ? 'banda-invertida' : ''}`} aria-hidden="true">
      {[0, 1].map((k) => (
        <div key={k} className="flex shrink-0 items-center">
          {fila.map((t, n) => (
            <span key={n} className="flex items-center">
              <span className={`whitespace-nowrap px-7 font-display text-[clamp(2rem,5vw,4.2rem)] ${invertida ? 'italic text-lienzo/35' : 'text-lienzo'}`}>{t}</span>
              <i className="size-3 shrink-0 rounded-full bg-dorado" />
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}

export default function Landing() {
  const raiz = useRef<HTMLDivElement>(null)
  const [raspada, setRaspada] = useState(false)

  useEffect(() => {
    const el = raiz.current
    if (!el) return
    let vivo = true
    let limpiar = () => {}
    cargarGsap().then((gsap) => {
      if (!vivo) return
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(el)

        // Capas con profundidad: se mueven distinto al hacer scroll
        q('[data-paralaje]').forEach((capa) => {
          gsap.to(capa, {
            yPercent: -Number(capa.getAttribute('data-paralaje')),
            ease: 'none',
            scrollTrigger: { trigger: capa.parentElement ?? capa, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
          })
        })
      })
      // La galería negra se queda fija y las obras pasan de lado con el scroll
      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(el)
        const seccion = q('.galeria')[0]
        const pista = q('.galeria-pista')[0]
        if (!seccion || !pista) return
        const recorrido = () => Math.max(0, pista.scrollWidth - window.innerWidth)
        gsap.to(pista, {
          x: () => -recorrido(),
          ease: 'none',
          scrollTrigger: { trigger: seccion, start: 'top top', end: () => `+=${recorrido()}`, pin: true, scrub: 0.7, invalidateOnRefresh: true, anticipatePin: 1 },
        })
      })
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(el)
        // El cierre se enciende palabra por palabra
        const cierre = q('.enciende')
        if (cierre.length)
          gsap.fromTo(cierre, { opacity: 0.13 }, { opacity: 1, stagger: 0.2, ease: 'none', scrollTrigger: { trigger: q('.cierre')[0], start: 'top 75%', end: 'top 20%', scrub: 0.5 } })
      })
      limpiar = () => mm.revert()
    })
    return () => {
      vivo = false
      limpiar()
    }
  }, [])

  return (
    <div ref={raiz}>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>

      <header className="sticky top-3 z-40 px-3 sm:px-6">
        <div className="vidrio mx-auto flex max-w-5xl items-center justify-between rounded-full py-2 pl-5 pr-2">
          <Logo />
          <nav aria-label="Principal" className="flex items-center gap-1 text-[1.02rem] font-medium">
            <a href="#como-funciona" className="hidden rounded-full px-4 py-2 transition-colors hover:bg-tinta/5 md:inline">Cómo funciona</a>
            <a href="#obras" className="hidden rounded-full px-4 py-2 transition-colors hover:bg-tinta/5 md:inline">Obras</a>
            <a href="#verificar" className="boton !px-5 !py-2.5 !text-base">Verificar obra</a>
          </nav>
        </div>
      </header>

      <main id="contenido">
        {/* Portada: la marca en grande y verificar es lo primero */}
        <section className="grano relative -mt-[4.25rem] overflow-hidden pt-[4.25rem]">
          <div className="luz" aria-hidden="true">
            <i className="l1" />
            <i className="l2" />
            <i className="l3" />
          </div>
          <span className="mota m1" aria-hidden="true" />
          <span className="mota m2" aria-hidden="true" />
          <span className="mota m3" aria-hidden="true" />
          <span className="mota m4" aria-hidden="true" />

          {/* A los lados: las obras suben y bajan sin parar */}
          <Carril lado="izq" />
          <Carril lado="der" />

          <div className="relative mx-auto flex min-h-[calc(100dvh-13rem)] max-w-5xl flex-col items-center justify-center px-5 pb-10 pt-10 text-center sm:px-8 xl:min-h-[calc(100dvh-6.5rem)] xl:pb-16">
            <h1 className="marca-g flex items-center justify-center gap-[.14em] text-terracota-btn">
              <span className="aparece-g relative block size-[.78em] shrink-0" style={i(-4)}>
                <span className="anillo-g" aria-hidden="true" />
                <span className="anillo-g" style={{ animationDelay: '1.3s' }} aria-hidden="true" />
                <span className="absolute inset-[-16%] rounded-full border border-dashed border-terracota/45 gira-lento" aria-hidden="true" />
                <img src="/brand/isotipo.svg" alt="" width="200" height="200" className="enso-trazo relative size-full" />
              </span>
              <span aria-label="Brai">
                {'Brai'.split('').map((letra, n) => (
                  <span key={n} className="sube" style={i(n + 2)} aria-hidden="true">
                    <span>{letra}</span>
                  </span>
                ))}
              </span>
            </h1>
            <p className="lema mt-4 sm:mt-2">
              <Palabras texto="Cada obra sabe de dónde viene." desde={7} />
            </p>
            <a href="#verificar" className="aparece-g baja mt-12 inline-flex flex-col items-center gap-3 text-tinta/70 transition-colors hover:text-terracota-btn xl:mt-16" style={i(9)}>
              <span className="rotulo">Verificar una obra</span>
              <span className="grid size-12 place-items-center rounded-full border border-tinta/25">
                <ArrowDown size={22} />
              </span>
            </a>
          </div>

          {/* En pantallas chicas las obras pasan en fila */}
          <div className="relative overflow-hidden pb-12 xl:hidden" aria-hidden="true">
            <div className="banda !gap-0" style={{ animationDuration: '30s' }}>
              {[0, 1].map((k) => (
                <div key={k} className="flex shrink-0">
                  {[...OBRAS, ...OBRAS].map((o, n) => (
                    <div key={n} className={`marco-obra mx-3 w-36 shrink-0 !p-2 ${n % 2 ? 'rotate-2' : '-rotate-2'}`}>
                      <img src={o.imagen} alt="" loading="lazy" className="aspect-[3/4] object-cover" />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Banda */}
        <section className="overflow-hidden bg-tinta py-7 sm:py-9" aria-label="Lo que guarda cada registro">
          <p className="sr-only">{BANDA.join(', ')}.</p>
          <Banda />
          <div className="mt-3 sm:mt-4">
            <Banda invertida />
          </div>
        </section>

        {/* Verificar: el código y las tres formas de llegar */}
        <section id="verificar" className="grano relative scroll-mt-0 overflow-hidden">
          <div className="luz" aria-hidden="true">
            <i className="l2" />
            <i className="l3" />
          </div>
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 sm:px-8 md:py-36 lg:grid-cols-[1.15fr_.85fr] lg:gap-16">
            <div>
              <p className="revela rotulo text-verde">Verifica una obra</p>
              <h2 className="revela titular-2 mt-5" style={i(1)}>
                ¿Tienes una obra enfrente? <span className="text-terracota-btn">Escribe su código.</span>
              </h2>
              <div className="vidrio revela r-zoom mt-10 max-w-xl rounded-[28px] p-5 sm:p-7" style={i(2)}>
                <VerificarCodigo />
              </div>
            </div>
            <ul className="space-y-5">
              {CAMINOS.map(({ Icono, titulo, texto }, n) => (
                <li key={titulo} className="revela r-der" style={i(n)}>
                  <div className="vidrio eleva group flex items-center gap-6 rounded-[28px] p-6 sm:p-7">
                    <span className="grid size-[4.5rem] shrink-0 place-items-center rounded-full bg-terracota/15 text-terracota-btn transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:rotate-[-8deg] group-hover:scale-110">
                      <Icono size={34} strokeWidth={1.6} />
                    </span>
                    <div>
                      <h3 className="titular-3">{titulo}</h3>
                      <p className="mt-1.5 text-lg leading-snug text-tinta/80">{texto}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <EscenaSello titulo={OBRA_DEMO.titulo} artista={ARTISTA.nombre} registro={OBRA_DEMO.registro} imagen={OBRA_DEMO.imagen} tecnica={OBRA_DEMO.tecnica} />

        {/* Las tres piezas */}
        <section className="grano relative overflow-hidden bg-arena">
          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-36">
            <div className="revela max-w-4xl">
              <p className="rotulo text-tinta/85">Lo que acompaña a cada obra</p>
              <h2 className="titular-2 mt-5">Tres piezas, como la cédula de un museo.</h2>
            </div>
            <div className="mt-16 grid items-end gap-14 md:grid-cols-3">
              <figure className="revela r-zoom flex flex-col items-center gap-7" style={i(0)}>
                <div data-paralaje="10">
                  <SelloNFC registro={OBRA_DEMO.registro} ondas />
                </div>
                <figcaption className="cuerpo-g max-w-xs text-center">
                  <span className="font-semibold">El sello.</span> Va detrás del cuadro y abre la página de la obra.
                </figcaption>
              </figure>
              <figure className="revela r-zoom flex flex-col items-center gap-7" style={i(1)}>
                <TarjetaTilt className="rounded-[10px] shadow-[0_40px_60px_-40px_rgba(43,38,34,.6)]">
                  <TarjetaDueno titulo={OBRA_DEMO.titulo} artista={ARTISTA.nombre} ficha={`${OBRA_DEMO.registro} · ${OBRA_DEMO.tecnica} · ${OBRA_DEMO.medidas}`}>
                    <Raspadita codigo={CODIGO_DEMO} alRevelar={() => setRaspada(true)} />
                  </TarjetaDueno>
                </TarjetaTilt>
                <figcaption className="cuerpo-g max-w-xs text-center">
                  {raspada ? (
                    <LinkReclamarDemo codigoObra={OBRA_DEMO.codigo} codigo={CODIGO_DEMO} titulo={OBRA_DEMO.titulo} />
                  ) : (
                    <>
                      <span className="font-semibold">La tarjeta de dueño.</span> Firmada a mano. Ráspala con el dedo. (En esta demo el código es público.)
                    </>
                  )}
                </figcaption>
              </figure>
              <figure className="revela r-zoom flex flex-col items-center gap-7" style={i(2)}>
                <Link to={`/o/${OBRA_DEMO.codigo}`} data-paralaje="14" className="group block w-48 overflow-hidden rounded-[26px] border-[7px] border-tinta bg-white shadow-[0_40px_60px_-36px_rgba(43,38,34,.7)]">
                  <img src={OBRA_DEMO.imagen} alt="" className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="px-3 py-2.5">
                    <div className="truncate font-display text-base font-semibold">{OBRA_DEMO.titulo}</div>
                    <div className="mt-1 flex items-center gap-1.5 text-[11px] font-semibold">
                      <i className="size-2 rounded-full bg-dorado" /> Ejemplo
                    </div>
                  </div>
                </Link>
                <figcaption className="cuerpo-g max-w-xs text-center">
                  <span className="font-semibold">La página de la obra.</span> Su historia, su ficha y sus dueños.
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* Promesa honesta */}
        <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-36">
          <div className="revela max-w-4xl">
            <p className="rotulo text-verde">Lo que prometemos</p>
            <h2 className="titular-2 mt-5">
              Lo que sí hace. <span className="text-tinta/35">Y lo que no.</span>
            </h2>
            <p className="cuerpo-g mt-6 max-w-2xl text-tinta/80">La verdad de una obra vive en su registro. El sello es la puerta.</p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            <ul className="vidrio revela r-izq space-y-5 rounded-[32px] p-8 sm:p-10">
              {SI.map((t) => (
                <li key={t} className="cuerpo-g flex gap-4">
                  <span className="mt-1 grid size-8 shrink-0 place-items-center rounded-full bg-verde text-lienzo">
                    <Check size={18} strokeWidth={2.6} />
                  </span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <ul className="revela r-der space-y-5 rounded-[32px] border border-linea p-8 text-tinta/70 sm:p-10">
              {NO.map((t) => (
                <li key={t} className="cuerpo-g flex gap-4">
                  <span className="mt-1 grid size-8 shrink-0 place-items-center rounded-full border border-tinta/30">
                    <X size={18} />
                  </span>
                  <span>{t}</span>
                </li>
              ))}
              <li className="pt-2 text-base">Hoy es un prototipo de estudiantes: el registro real todavía no está conectado y en esta demo se simula.</li>
            </ul>
          </div>
        </section>

        {/* Sección negra: obras de ejemplo que se recorren de lado */}
        <section id="obras" className="galeria relative overflow-hidden bg-tinta text-lienzo">
          <div className="luz opacity-60" aria-hidden="true">
            <i className="l1" />
            <i className="l2" />
          </div>
          <div className="galeria-caja relative flex h-[100dvh] min-h-[30rem] flex-col justify-center">
            <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
              <p className="rotulo text-lienzo/70">Obras de ejemplo</p>
              <h2 className="galeria-titulo mt-3">
                Toca una. <span className="text-terracota">Mira su registro.</span>
              </h2>
            </div>
            <div className="galeria-pista flex items-stretch gap-6 overflow-x-auto px-5 sm:px-8 md:overflow-visible xl:pl-[max(2rem,calc((100vw-80rem)/2+2rem))]">
              {OBRAS.map((o) => (
                <Link key={o.codigo} to={`/o/${o.codigo}`} className="vidrio-oscuro group min-w-[15.5rem] shrink-0 rounded-[28px] p-4 transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-2 hover:scale-[1.03] hover:shadow-[0_0_0_1px_rgba(201,162,75,.6),0_40px_80px_-40px_rgba(192,110,82,.7)]">
                  <div className="galeria-marco overflow-hidden p-2" style={{ background: ARTISTA.acento }}>
                    <div className="size-full overflow-hidden">
                      <img src={o.imagen} alt={o.titulo} loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-end justify-between gap-4">
                    <div>
                      <p className="font-mono text-sm text-lienzo/60">{o.registro}</p>
                      <p className="mt-0.5 font-display text-[1.5rem] font-semibold leading-tight">{o.titulo}</p>
                      <p className="mt-1 inline-flex items-center gap-2 text-base text-lienzo/80">
                        <i className={`size-2.5 rounded-full ${o.dueno ? 'bg-terracota' : 'bg-dorado'}`} />
                        {o.dueno ? `Con dueño, ${o.dueno}` : 'Sin reclamar'}
                      </p>
                    </div>
                    <span className="grid size-12 shrink-0 place-items-center rounded-full bg-lienzo text-tinta transition-transform duration-500 group-hover:rotate-45">
                      <ArrowUpRight size={22} />
                    </span>
                  </div>
                </Link>
              ))}
              <div className="flex w-[min(78vw,340px)] shrink-0 flex-col justify-between gap-4 rounded-[28px] bg-terracota-btn p-6">
                <div>
                  <p className="rotulo text-lienzo/75">¿Eres artista?</p>
                  <p className="mt-3 font-display text-[1.7rem] font-semibold leading-tight">Así ves quién tiene tu obra.</p>
                  <p className="solo-alto mt-3 text-lg leading-snug text-lienzo/85">Brai te ayuda a registrar la procedencia de cada obra que vendes.</p>
                </div>
                <div className="flex flex-col gap-2.5">
                  <Link to="/panel" className="boton boton-claro !py-3">
                    Ver el panel <ArrowRight size={20} />
                  </Link>
                  <Link to={`/a/${ARTISTA.slug}`} className="boton !bg-transparent !py-3 !shadow-[inset_0_0_0_1.5px_rgba(246,241,234,.6)] hover:!bg-lienzo/10">
                    Página de artista <ArrowUpRight size={20} />
                  </Link>
                </div>
              </div>
              <span className="w-1 shrink-0 md:w-10" aria-hidden="true" />
            </div>
            <p className="mx-auto w-full max-w-7xl px-5 font-mono text-xs text-lienzo/50 sm:px-8">Obras, registros y dueños de ejemplo, de una artista ficticia.</p>
          </div>
        </section>

        {/* Cierre */}
        <section className="cierre grano relative overflow-hidden">
          <div className="luz" aria-hidden="true">
            <i className="l2" />
            <i className="l3" />
          </div>
          <div className="relative mx-auto flex max-w-6xl flex-col items-center px-5 py-28 text-center sm:px-8 md:py-44">
            <div className="revela relative">
              <span className="absolute inset-[-28%] rounded-full border border-dashed border-terracota/40 gira-lento" aria-hidden="true" />
              <img src="/brand/isotipo.svg" alt="" width="150" height="150" className="enso-trazo espera relative size-[clamp(110px,16vw,170px)]" />
            </div>
            <h2 className="titular mt-14">
              {'Cada obra sabe de dónde viene.'.split(' ').map((p, n) => (
                <span key={n} className="enciende">
                  {p}{' '}
                </span>
              ))}
            </h2>
          </div>
        </section>
      </main>

      <footer className="relative overflow-hidden border-t border-linea bg-lienzo">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 py-14 sm:px-8 md:flex-row md:items-end md:justify-between md:py-20">
          <Link to="/" aria-label="Brai, inicio" className="pie-marca flex items-center gap-[.13em] text-terracota-btn">
            <span className="revela r-zoom relative block size-[.78em] shrink-0">
              <img src="/brand/isotipo.svg" alt="" width="300" height="300" className="enso-trazo espera size-full" />
            </span>
            <span aria-hidden="true">
              {'Brai'.split('').map((letra, n) => (
                <span key={n} className="revela pie-letra" style={i(n + 1)}>
                  {letra}
                </span>
              ))}
            </span>
          </Link>
          <nav aria-label="Brai" className="flex flex-col gap-3 text-lg font-medium md:items-end md:pb-[1.2vw]">
            <Link to={`/o/${OBRA_DEMO.codigo}`} className="hover:text-terracota-btn">Obra de ejemplo</Link>
            <Link to={`/a/${ARTISTA.slug}`} className="hover:text-terracota-btn">Artista</Link>
            <Link to="/panel" className="hover:text-terracota-btn">Panel</Link>
            <a href="/privacidad" className="hover:text-terracota-btn">Datos de la demo</a>
          </nav>
        </div>
        <p className="border-t border-linea px-5 py-4 text-center font-mono text-xs text-verde">Proyecto de estudiantes para Business Shark 8°, 2026.</p>
      </footer>
    </div>
  )
}
