import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router'

function sinMovimiento() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/* ------------------------------------------------------------------ */
/* Raspadita: el ritual de la tarjeta de dueño, con el dedo.            */
/* ------------------------------------------------------------------ */

export function Raspadita({ codigo, alRevelar }: { codigo: string; alRevelar?: () => void }) {
  const lienzo = useRef<HTMLCanvasElement>(null)
  const [revelado, setRevelado] = useState(false)
  const raspando = useRef(false)
  const toques = useRef(0)

  useEffect(() => {
    const c = lienzo.current
    if (!c) return
    const r = c.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1
    c.width = r.width * dpr
    c.height = r.height * dpr
    const ctx = c.getContext('2d')
    if (!ctx) return
    ctx.scale(dpr, dpr)
    const g = ctx.createLinearGradient(0, 0, r.width, r.height)
    g.addColorStop(0, '#bdb3a4')
    g.addColorStop(0.4, '#d6ccbd')
    g.addColorStop(1, '#b3a998')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, r.width, r.height)
    ctx.fillStyle = '#2B2622'
    ctx.font = '500 11px "IBM Plex Mono", monospace'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('RASPA AQUÍ CON EL DEDO', r.width / 2, r.height / 2)
  }, [])

  const raspar = (x: number, y: number) => {
    const c = lienzo.current
    const ctx = c?.getContext('2d')
    if (!c || !ctx || revelado) return
    const r = c.getBoundingClientRect()
    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.arc(x - r.left, y - r.top, 16, 0, Math.PI * 2)
    ctx.fill()
    // cada 8 toques medimos cuánto se ha raspado
    if (++toques.current % 8 !== 0) return
    const datos = ctx.getImageData(0, 0, c.width, c.height).data
    let vacios = 0
    let total = 0
    for (let i = 3; i < datos.length; i += 64) {
      total++
      if (datos[i] === 0) vacios++
    }
    if (vacios / total > 0.5) revelar()
  }

  const revelar = () => {
    if (revelado) return
    setRevelado(true)
    alRevelar?.()
  }

  return (
    <div className="relative overflow-hidden rounded-md">
      <div aria-live="polite" className="bg-white/70 px-2.5 py-2 text-center font-mono text-[15px] font-medium tracking-[0.2em]">
        {revelado ? codigo : <span aria-hidden="true">{codigo}</span>}
      </div>
      <canvas
        ref={lienzo}
        role="button"
        tabIndex={revelado ? -1 : 0}
        aria-label="Raspadita: arrastra el dedo para ver el código, o pulsa Enter"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            revelar()
          }
        }}
        onPointerDown={(e) => {
          raspando.current = true
          e.currentTarget.setPointerCapture(e.pointerId)
          raspar(e.clientX, e.clientY)
        }}
        onPointerMove={(e) => raspando.current && raspar(e.clientX, e.clientY)}
        onPointerUp={() => (raspando.current = false)}
        className={`absolute inset-0 size-full cursor-pointer touch-none rounded-md transition-opacity duration-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tinta ${revelado ? 'pointer-events-none opacity-0' : ''}`}
      />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Cifra que cuenta al aparecer.                                        */
/* ------------------------------------------------------------------ */

export function Cifra({ valor, prefijo = '', sufijo = '' }: { valor: number; prefijo?: string; sufijo?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [n, setN] = useState(valor)

  useEffect(() => {
    const el = ref.current
    if (!el || sinMovimiento()) return
    setN(0)
    let cuadro = 0
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        io.disconnect()
        const inicio = performance.now()
        const paso = (t: number) => {
          const k = Math.min(1, (t - inicio) / 1300)
          setN(Math.round(valor * (1 - (1 - k) ** 3)))
          if (k < 1) cuadro = requestAnimationFrame(paso)
        }
        cuadro = requestAnimationFrame(paso)
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(cuadro)
    }
  }, [valor])

  return (
    <span ref={ref} className="tabular-nums">
      {prefijo}
      {n.toLocaleString('es-MX')}
      {sufijo}
    </span>
  )
}

/* ------------------------------------------------------------------ */
/* Pregunta frecuente: <details> nativo, funciona sin JavaScript.       */
/* ------------------------------------------------------------------ */

export function Pregunta({ pregunta, children }: { pregunta: string; children: ReactNode }) {
  return (
    <details className="pregunta group border-b border-linea py-5">
      <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-lg font-semibold [&::-webkit-details-marker]:hidden">
        {pregunta}
        <span aria-hidden="true" className="mt-1.5 grid size-5 shrink-0 place-items-center">
          <span className="absolute h-0.5 w-3.5 bg-tinta" />
          <span className="absolute h-3.5 w-0.5 bg-tinta transition-transform duration-300 group-open:rotate-90 group-open:opacity-0" />
        </span>
      </summary>
      <div className="pregunta-cuerpo mt-3 max-w-2xl leading-relaxed text-tinta/80">{children}</div>
    </details>
  )
}

export function LinkReclamarDemo({ codigoObra, codigo, titulo }: { codigoObra: string; codigo: string; titulo: string }) {
  return (
    <Link
      to={`/o/${codigoObra}/reclamar?codigo=${encodeURIComponent(codigo)}`}
      className="boton !px-5 !py-3 !text-base"
    >
      Reclama {titulo} con este código
    </Link>
  )
}
