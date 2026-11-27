import { Link, useParams } from 'react-router'
import { SelloRegistroBrai } from '../components/marca'
import { ARTISTA, ES_FICTICIA, MODO_JOSE_LUIS, anioTexto, todasLasObras } from '../data/demo'
import NoEncontrada from './NoEncontrada'
import { Ficticio } from '../components/demo'
import { Etiqueta, PaginaArtista } from './Obra'

// Página del artista (docs/PROTOTIPO.md, punto 3). Con su color; Brai solo firma abajo.
export default function Artista() {
  const { slug = '' } = useParams()
  if (slug !== ARTISTA.slug) return <NoEncontrada />
  const obras = todasLasObras()
  const conDueno = obras.filter((o) => o.dueno).length

  return (
    <PaginaArtista>
      <main className="mx-auto max-w-6xl px-4 pb-20 pt-14 sm:px-6">
        <section className="entra max-w-3xl">
          <p className="rotulo text-verde">{ARTISTA.disciplina}</p>
          <h1 className="titular mt-4">
            {ARTISTA.nombre}
            {ES_FICTICIA && <Ficticio>Ficticia</Ficticio>}
          </h1>
          <p className="mt-4 font-mono text-base text-verde">{ARTISTA.ciudad}</p>
          {ARTISTA.ejemplo && (
            <p className="mt-3 font-mono text-[10px] text-verde">
              {MODO_JOSE_LUIS ? 'Datos de fuentes públicas, por confirmar con él. En la versión real lo escribe el artista.' : 'Texto de ejemplo. Lo escribe el artista.'}
            </p>
          )}
          <div className="cuerpo-g mt-6 space-y-4 text-tinta/85">
            {ARTISTA.bio.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          {ARTISTA.fuentes.length > 0 && (
            <p className="mt-4 text-xs leading-relaxed text-verde">
              Fuentes:{' '}
              {ARTISTA.fuentes.map((f, i) => (
                <span key={f.url}>
                  {i > 0 && ', '}
                  <a href={f.url} target="_blank" rel="noreferrer" className="underline underline-offset-2">
                    {f.texto}
                  </a>
                </span>
              ))}
              .
            </p>
          )}
          <dl className="mt-10 flex gap-14 border-t border-tinta/15 pt-7">
            <div>
              <dt className="rotulo text-verde">{MODO_JOSE_LUIS ? 'Obras en la demo' : 'Obras de ejemplo'}</dt>
              <dd className="mt-2 font-display text-7xl font-semibold leading-none text-[var(--acento-texto)]">{obras.length}</dd>
            </div>
            <div>
              <dt className="rotulo text-verde">Con dueño</dt>
              <dd className="mt-2 font-display text-7xl font-semibold leading-none text-[var(--acento-texto)]">{conDueno}</dd>
            </div>
          </dl>
        </section>

        <section className="mt-20">
          <Etiqueta>Obras</Etiqueta>
          <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 lg:gap-x-10">
            {obras.map((o, i) => (
              <Link key={o.codigo} to={`/o/${o.codigo}`} className="entra group" style={{ animationDelay: `${150 + i * 90}ms` }}>
                <div className="overflow-hidden bg-[var(--acento)] p-2 shadow-[0_40px_60px_-44px_rgba(43,38,34,.8)] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-2 group-hover:scale-[1.03] sm:p-3">
                  <img src={o.imagen} alt="" className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                </div>
                <p className="mt-5 font-display text-2xl font-semibold leading-tight">{o.titulo}</p>
                <p className="mt-1.5 font-mono text-sm text-verde">
                  {o.registro} · {o.tecnica} · {anioTexto(o)}
                </p>
                <p className="mt-2.5 inline-flex items-center gap-2 text-base font-semibold">
                  <i className={`size-2 rounded-full ${o.dueno ? 'bg-[var(--acento)]' : 'bg-dorado'}`} />
                  {o.dueno ? `Con dueño, ${o.dueno}` : MODO_JOSE_LUIS ? 'Sin dueño registrado' : 'Ejemplo, sin reclamar'}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <footer className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
        <SelloRegistroBrai />
      </footer>
    </PaginaArtista>
  )
}
