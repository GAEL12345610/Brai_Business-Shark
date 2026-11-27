import { useCallback, useState, type CSSProperties, type ReactNode } from 'react'
import { Link, useParams } from 'react-router'
import { ArrowRight, Expand } from 'lucide-react'
import { SelloRegistroBrai } from '../components/marca'
import { Capa, Compartir, VisorObra } from '../components/visor'
import { ARTISTA, ES_FICTICIA, CODIGO_DEMO, MODO_JOSE_LUIS, OBRAS, anioTexto, esMia, fecha, getObra } from '../data/demo'
import { varsTema } from '../lib/tema'
import { Ficticio } from '../components/demo'
import NoEncontrada from './NoEncontrada'

const i = (n: number) => ({ '--i': n }) as CSSProperties

/** Marco y barra del artista: lo comparten la obra, reclamar y la página del artista. */
export function PaginaArtista({ children }: { children: ReactNode }) {
  return (
    <div style={varsTema(ARTISTA.acento)} className="relative min-h-[100dvh] overflow-x-clip bg-lienzo">
      <div className="luz opacity-70" aria-hidden="true">
        <i className="l1" />
        <i className="l2" />
      </div>
      <header className="sticky top-3 z-30 px-3 sm:px-6">
        <div className="vidrio mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full px-5 py-3 sm:px-7">
          <Link to={`/a/${ARTISTA.slug}`} className="font-display text-[1.35rem] font-semibold leading-none tracking-tight hover:text-[var(--acento-texto)] sm:text-2xl">
            {ARTISTA.nombre}
            {ES_FICTICIA && <Ficticio>Ficticia</Ficticio>}
          </Link>
          <span className="hidden font-mono text-xs uppercase tracking-[0.16em] text-verde sm:inline">{ARTISTA.disciplina}</span>
        </div>
      </header>
      <div className="relative">{children}</div>
      {ARTISTA.ejemplo && (
        <p className="relative mx-auto max-w-3xl px-5 pb-10 text-center text-sm leading-relaxed text-tinta/70">
          {MODO_JOSE_LUIS ? (
            <>
              Demostración sobre la obra pública de {ARTISTA.nombre}. Él no la ha revisado ni aprobado. Ninguna de estas obras está registrada en Brai. Para
              probar, el código público de la demo es <span className="font-mono font-medium text-tinta">{CODIGO_DEMO}</span>.{' '}
              <a href="/?salir-demo" className="underline underline-offset-2">Salir de la demo</a>
            </>
          ) : !ES_FICTICIA ? (
            <>
              Demo personalizada con el nombre de {ARTISTA.nombre}, solo en este navegador. La obra, su registro y sus dueños son inventados. Para probar,
              el código público de la demo es <span className="font-mono font-medium text-tinta">{CODIGO_DEMO}</span>.
            </>
          ) : (
            <>
              {ARTISTA.nombre} es una artista ficticia: esta obra, su registro y sus dueños son inventados. Para probar, el código público de la demo es{' '}
              <span className="font-mono font-medium text-tinta">{CODIGO_DEMO}</span>, con un correo inventado que termine en @example.com.
            </>
          )}
        </p>
      )}
    </div>
  )
}

export function Etiqueta({ children }: { children: ReactNode }) {
  return <h2 className="rotulo text-verde">{children}</h2>
}

/** El momento de verificar: es lo primero que se lee al tocar el sello. */
function SelloVerificado({ texto, detalle, className = '' }: { texto: string; detalle: string; className?: string }) {
  return (
    <div className={`verifica-sello relative items-center gap-4 overflow-hidden rounded-[26px] bg-dorado-suave p-4 shadow-[0_0_0_1.5px_var(--color-dorado),0_30px_60px_-36px_rgba(201,162,75,.9)] sm:gap-5 sm:p-5 ${className}`}>
      <span className="verifica-brillo pointer-events-none absolute inset-0" aria-hidden="true" />
      <span className="relative grid size-16 shrink-0 place-items-center sm:size-20">
        <span className="verifica-anillo absolute inset-0 rounded-full border-2 border-dorado" style={{ animationDelay: '900ms' }} aria-hidden="true" />
        <span className="verifica-anillo absolute inset-0 rounded-full border-2 border-dorado" style={{ animationDelay: '1300ms' }} aria-hidden="true" />
        <img src="/brand/isotipo.svg" alt="" className="relative size-14 sm:size-16" />
      </span>
      <span className="relative leading-tight">
        <span className="block text-[1.3rem] font-semibold sm:text-2xl">{texto}</span>
        <span className="mt-1.5 block font-mono text-sm text-tinta/75">{detalle}</span>
      </span>
    </div>
  )
}

export default function Obra() {
  const { codigo = '' } = useParams()
  const obra = getObra(codigo)
  const [verObra, setVerObra] = useState(false)
  const cerrarObra = useCallback(() => setVerObra(false), [])
  if (!obra) return <NoEncontrada />

  const mia = esMia(obra.codigo)
  const registro = obra.eventos.find((e) => e.tipo === 'registro')
  const otras = OBRAS.filter((o) => o.codigo !== obra.codigo)
  const ficha: [string, string][] = [
    ['Registro', obra.registro],
    ['Técnica', obra.tecnica],
    ['Medidas', obra.medidas],
    ['Año', anioTexto(obra)],
  ]
  const detalle = registro ? (MODO_JOSE_LUIS ? obra.registro : `${obra.registro} · ${fecha(registro.fecha)}`) : obra.registro
  const sello = MODO_JOSE_LUIS ? 'Así se verá: registrada por el artista' : ARTISTA.ejemplo ? 'Ejemplo: registrada por el artista' : 'Registrada por el artista'

  return (
    <PaginaArtista>
      {mia && (
        <p className="entra-g mx-auto mt-6 flex w-fit max-w-[92%] items-center gap-3 rounded-full bg-dorado-suave px-5 py-2.5 text-base font-semibold shadow-[0_0_0_1.5px_var(--color-dorado)]">
          <span className="size-3 shrink-0 rounded-full bg-dorado" /> Simulación: la reclamaste en este navegador. En público aparecerías como {obra.dueno}
        </p>
      )}

      <main className="mx-auto max-w-6xl px-4 pb-32 pt-8 sm:px-6 lg:grid lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:pb-20 lg:pt-14">
        {registro && <SelloVerificado className="mb-6 flex lg:hidden" texto={sello} detalle={detalle} />}
        {/* La obra, con el marco del color del artista. Se toca para verla en grande. */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <button
            type="button"
            onClick={() => setVerObra(true)}
            className="cortina group relative block w-full bg-[var(--acento)] p-3 text-left shadow-[0_60px_90px_-55px_rgba(43,38,34,.8)] transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] hover:scale-[1.015] sm:p-5"
            aria-label={`Ver ${obra.titulo} en grande`}
          >
            <span className="block overflow-hidden">
              <img src={obra.imagen} alt={`${obra.titulo}, de ${ARTISTA.nombre}`} className="block aspect-[3/4] w-full object-cover" />
            </span>
            <span className="vidrio absolute bottom-6 right-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-tinta sm:bottom-9 sm:right-9">
              <Expand size={16} /> Ver en grande
            </span>
          </button>
          {ARTISTA.ejemplo && (
            <p className="pt-3 font-mono text-xs text-verde">{MODO_JOSE_LUIS ? 'Foto pendiente: la tomamos contigo en la sesión de registro' : 'Imagen de ejemplo'}</p>
          )}
        </div>

        <div className="pt-9 lg:pt-0">
          {registro && <SelloVerificado className="hidden lg:flex" texto={sello} detalle={detalle} />}

          <p className="entra-g rotulo mt-9 text-verde" style={i(3)}>
            {ARTISTA.nombre}
          </p>
          <h1 className="entra-g titular-2 mt-3" style={i(4)}>
            {obra.titulo}
          </h1>

          <dl className="entra-g mt-9 border-t border-tinta/15" style={i(5)}>
            {ficha.map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-6 border-b border-tinta/15 py-4">
                <dt className="rotulo text-verde">{k}</dt>
                <dd className="text-right font-mono text-lg sm:text-xl">{v}</dd>
              </div>
            ))}
            <div className="flex items-baseline justify-between gap-6 py-4">
              <dt className="rotulo text-verde">Dueño</dt>
              <dd className="flex items-center gap-2.5 text-right text-lg font-semibold sm:text-xl">
                <i className={`size-2.5 rounded-full ${obra.dueno ? 'bg-[var(--acento)]' : 'bg-dorado'}`} />
                {obra.dueno ?? 'Sin reclamar'}
              </dd>
            </div>
          </dl>

          {/* Acción principal */}
          {!obra.dueno ? (
            <>
              <div className="vidrio fixed inset-x-3 bottom-3 z-20 rounded-full p-2 lg:hidden">
                <Link to={`/o/${obra.codigo}/reclamar`} className="boton boton-acento w-full">
                  Reclamar mi obra <ArrowRight size={20} />
                  <span className="font-mono text-xs font-normal opacity-80">DEMO</span>
                </Link>
              </div>
              <div className="entra-g mt-8 hidden lg:block" style={i(6)}>
                <Link to={`/o/${obra.codigo}/reclamar`} className="boton boton-acento">
                  Reclamar mi obra <ArrowRight size={20} />
                  <span className="font-mono text-xs font-normal opacity-80">DEMO</span>
                </Link>
                <p className="mt-4 text-base text-tinta/70">¿Es tuya? Escribe el código de tu tarjeta. En esta demo el reclamo es simulado.</p>
              </div>
            </>
          ) : (
            !mia && (
              <p className="cuerpo-g mt-8 border-l-[3px] border-[var(--acento)] pl-5 text-tinta/80">
                Esta obra ya tiene dueño. Si la compraste de segunda mano, pídele a {obra.dueno} que te la transfiera.
              </p>
            )
          )}

          <div className="entra-g mt-8" style={i(7)}>
            <Compartir titulo={`${obra.titulo}, de ${ARTISTA.nombre}`} texto={`Mira la historia de ${obra.titulo}, registrada por ${ARTISTA.nombre}.`} />
          </div>

          <section className="revela mt-16">
            <Etiqueta>Historia de la obra</Etiqueta>
            {ARTISTA.ejemplo && (
              <p className="mt-2 font-mono text-xs text-verde">
                {obra.fuente ? (
                  <>
                    Dato público, fuente:{' '}
                    <a href={obra.fuente.url} target="_blank" rel="noreferrer" className="underline underline-offset-2">
                      {obra.fuente.texto}
                    </a>
                    . En la versión real lo escribe el artista.
                  </>
                ) : (
                  'Texto de ejemplo. Lo escribe el artista.'
                )}
              </p>
            )}
            <div className="mt-6 space-y-6">
              {obra.historia.map((p, n) => (
                <p key={n} className={n === 0 && !obra.fuente ? 'font-display text-[clamp(1.6rem,2.6vw,2.2rem)] italic leading-[1.25]' : 'cuerpo-g text-tinta/85'}>
                  {p}
                </p>
              ))}
            </div>
          </section>

          <section className="revela mt-16">
            <Etiqueta>Línea de tiempo</Etiqueta>
            <ol className="relative mt-7 pl-8">
              <span aria-hidden="true" className="crece absolute bottom-2 left-[5px] top-2 w-[3px] rounded-full bg-[var(--acento)]" />
              {obra.eventos.map((e, n) => (
                <li key={n} className="relative pb-8 last:pb-0">
                  <span className="absolute -left-8 top-1.5 size-[13px] rounded-full border-[3px] border-[var(--acento)] bg-lienzo" />
                  <p className="font-mono text-sm text-verde">{fecha(e.fecha)}</p>
                  <p className="cuerpo-g mt-1">{e.texto}</p>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-base text-tinta/70">Por privacidad, los dueños aparecen solo con sus iniciales.</p>
          </section>
        </div>
      </main>

      {/* Más obras */}
      <section id="mas-obras" className="relative border-t border-linea bg-white py-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-baseline justify-between gap-4 px-4 sm:px-6">
            <h2 className="titular-3">Más obras de {ARTISTA.nombre}</h2>
            <Link to={`/a/${ARTISTA.slug}`} className="shrink-0 text-lg font-semibold text-terracota-btn hover:underline">
              Ver todas
            </Link>
          </div>
          <div className="mt-8 flex snap-x scroll-px-4 gap-6 overflow-x-auto px-4 pb-4 sm:scroll-px-6 sm:px-6">
            {otras.map((o, n) => (
              <Link key={o.codigo} to={`/o/${o.codigo}`} className="revela r-zoom group w-56 shrink-0 snap-start sm:w-64" style={i(n)}>
                <div className="overflow-hidden bg-[var(--acento)] p-2 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-2 group-hover:scale-[1.03]">
                  <img src={o.imagen} alt="" className="aspect-[3/4] w-full object-cover" />
                </div>
                <p className="mt-4 font-display text-xl font-semibold leading-tight">{o.titulo}</p>
                <p className="mt-1 font-mono text-sm text-verde">
                  {o.registro} · {anioTexto(o)}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer className="relative mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-5 px-4 pb-32 pt-10 sm:px-6 lg:pb-10">
        <SelloRegistroBrai registro={obra.registro} />
        <div className="flex flex-wrap gap-x-7 gap-y-2 text-base font-semibold">
          <Link to="/" className="text-terracota-btn hover:underline">
            Verificar otra obra
          </Link>
          <Link to="/panel" className="text-terracota-btn hover:underline">
            Panel del artista
          </Link>
        </div>
      </footer>

      <Capa abierta={verObra} alCerrar={cerrarObra} titulo={obra.titulo}>
        <VisorObra imagen={obra.imagen} alt={`${obra.titulo}, de ${ARTISTA.nombre}`} />
      </Capa>
    </PaginaArtista>
  )
}
