import { useState, type FormEvent } from 'react'
import { Link, useParams, useSearchParams } from 'react-router'
import { ArrowLeft } from 'lucide-react'
import { ARTISTA, CODIGO_DEMO, CORREO_PRUEBA, DOMINIO_PRUEBA, MODO_JOSE_LUIS, fecha, getObra, reclamar } from '../data/demo'
import { PaginaArtista } from './Obra'
import NoEncontrada from './NoEncontrada'

/** XXXX-XXXX mientras escribe, como viene impreso bajo la raspadita. */
function formatear(valor: string) {
  const limpio = valor.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8)
  return limpio.length > 4 ? `${limpio.slice(0, 4)}-${limpio.slice(4)}` : limpio
}

/** El momento dorado: el isotipo real (nunca redibujado) se sella con un halo. */
function SelloDorado() {
  return (
    <div className="relative size-40" aria-hidden="true">
      <span className="halo-dorado absolute inset-0 rounded-full border-2 border-dorado" />
      <span className="halo-dorado absolute inset-0 rounded-full border-2 border-dorado" style={{ animationDelay: '900ms' }} />
      <span className="absolute inset-[-22%] rounded-full border border-dashed border-dorado/60 gira-lento" />
      <img src="/brand/isotipo.svg" alt="" className="sello-entra relative size-40" />
    </div>
  )
}

export default function Reclamar() {
  const { codigo = '' } = useParams()
  const obra = getObra(codigo)
  const [params] = useSearchParams()
  // La raspadita de la landing manda el código ya escrito
  const [codigoDueno, setCodigoDueno] = useState(() => formatear(params.get('codigo') ?? ''))
  // Correo inventado ya escrito: la demo no debe invitar a dejar un correo real.
  const [correo, setCorreo] = useState(CORREO_PRUEBA)
  const [error, setError] = useState<string | null>(null)
  const [listo, setListo] = useState<string | null>(null)

  if (!obra) return <NoEncontrada />

  const enviar = (e: FormEvent) => {
    e.preventDefault()
    // En la versión real: una función de Supabase hace todo en un paso (docs/PROTOTIPO.md)
    const r = reclamar(obra.codigo, codigoDueno, correo.trim())
    if (r.ok) {
      setListo(r.iniciales)
      // un toque corto en el celular: la obra es tuya
      if ('vibrate' in navigator) navigator.vibrate([25, 60, 25])
    }
    else setError(r.error)
  }

  if (listo) {
    return (
      <PaginaArtista>
        <main className="mx-auto flex max-w-2xl flex-col items-start px-5 pb-20 pt-16 sm:px-8">
          <SelloDorado />
          <p className="entra-g rotulo mt-12 text-verde">{obra.registro}</p>
          <h1 className="entra-g titular-2 mt-3" style={{ animationDelay: '500ms' }}>Así se ve cuando la obra es tuya.</h1>
          <p className="cuerpo-g mt-6 text-tinta/85">
            Simulación: en este navegador, <span className="font-display italic">{obra.titulo}</span> quedó a nombre de{' '}
            <span className="font-semibold">{listo}</span> el {fecha(new Date().toISOString().slice(0, 10))}. En la versión real, quedarías en el
            registro de {ARTISTA.nombre} como su dueño y el código de tu tarjeta dejaría de servir.
          </p>
          <p className="mt-5 rounded-2xl bg-arena px-5 py-4 text-base leading-relaxed text-tinta/80">
            No se registró nada en ningún servidor ni se mandó ningún correo.
            {MODO_JOSE_LUIS && ' Esta obra no tiene dueño en Brai: es una demostración sobre una obra real.'}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              to={`/o/${obra.codigo}`}
              className="boton boton-acento"
            >
              Ver la obra
            </Link>
            <Link to="/panel" className="boton boton-linea">
              Ver lo que ve el artista
            </Link>
          </div>
        </main>
      </PaginaArtista>
    )
  }

  return (
    <PaginaArtista>
      <main className="mx-auto max-w-xl px-4 pb-20 pt-10 sm:px-6">
        <Link to={`/o/${obra.codigo}`} className="inline-flex items-center gap-2 text-base font-semibold text-terracota-btn hover:underline">
          <ArrowLeft size={16} /> Volver a la obra
        </Link>

        <div className="vidrio entra-g mt-6 rounded-[32px] p-6 sm:p-9">
        <div className="flex items-center gap-5">
          <div className="w-20 shrink-0 bg-[var(--acento)] p-1.5">
            <img src={obra.imagen} alt="" className="aspect-[3/4] w-full object-cover" />
          </div>
          <div>
            <p className="font-display text-2xl font-semibold leading-tight">{obra.titulo}</p>
            <p className="mt-1 font-mono text-sm text-verde">{obra.registro}</p>
          </div>
        </div>

        <h1 className="titular-2 mt-9">Reclama tu obra</h1>
        <p className="mt-4 text-lg leading-relaxed text-tinta/85">
          Raspa la tarjeta que te entregó {ARTISTA.nombre} y escribe el código. En la versión real es de un solo uso. En esta demo el código
          es público y el reclamo es simulado.
        </p>

        {obra.dueno ? (
          <p className="cuerpo-g mt-8 border-l-[3px] border-[var(--acento)] pl-5">Esta obra ya tiene dueño: {obra.dueno}.</p>
        ) : (
          <form onSubmit={enviar} className="mt-8 space-y-6" noValidate>
            <div>
              <label htmlFor="codigo" className="rotulo block text-verde">
                Código de dueño
              </label>
              <input
                id="codigo"
                value={codigoDueno}
                onChange={(e) => {
                  setCodigoDueno(formatear(e.target.value))
                  setError(null)
                }}
                inputMode="text"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="characters"
                spellCheck={false}
                placeholder="XXXX-XXXX"
                className="campo-codigo mt-3"
              />
              <p className="mt-2.5 text-base text-tinta/75">
                Código público de la demo:{' '}
                <button type="button" onClick={() => { setCodigoDueno(CODIGO_DEMO); setError(null) }} className="font-mono font-medium text-terracota-btn underline underline-offset-4">
                  {CODIGO_DEMO}
                </button>
              </p>
            </div>
            <div>
              <label htmlFor="correo" className="rotulo block text-verde">
                Correo de prueba
              </label>
              <input
                id="correo"
                type="email"
                value={correo}
                onChange={(e) => {
                  setCorreo(e.target.value)
                  setError(null)
                }}
                autoComplete="off"
                aria-describedby="correo-ayuda"
                placeholder={CORREO_PRUEBA}
                className="mt-3 w-full rounded-[18px] border-[1.5px] border-tinta/15 bg-white/85 px-5 py-4 text-lg focus:border-terracota-btn focus:outline-none"
              />
              <p id="correo-ayuda" className="mt-3 text-[15px] leading-snug text-tinta/70">
                <span className="font-semibold text-tinta">No escribas tu correo real.</span> La demo solo acepta correos inventados que terminan
                en @{DOMINIO_PRUEBA}. No se manda a nadie y se queda solo en este navegador. En la versión real, solo el artista vería tu correo
                y en público saldrían tus iniciales.{' '}
                <a href="/privacidad" target="_blank" rel="noopener" className="underline underline-offset-2">
                  Qué datos guarda la demo
                </a>
                .
              </p>
            </div>
            {error && (
              <p role="alert" className="sacude rounded-2xl bg-terracota/15 px-5 py-4 text-base font-medium">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={codigoDueno.length < 9 || !correo}
              className="boton boton-acento w-full"
            >
              Simular reclamo
            </button>
          </form>
        )}
        </div>
      </main>
    </PaginaArtista>
  )
}
