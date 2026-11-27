import { useEffect, useRef, type ReactNode, type PointerEvent } from 'react'
import { useLocation } from 'react-router'

/**
 * Revela los elementos .revela con un BARRIDO en cada scroll: todo lo que entró
 * o ya pasó. Solo IntersectionObserver deja secciones invisibles si alguien
 * salta al final (memoria/animacion-de-entrada-con-barrido.md).
 */
export function useRevela() {
  const { pathname } = useLocation()
  useEffect(() => {
    let pendiente = false
    const barrer = () => {
      pendiente = false
      const limite = window.innerHeight * 0.92
      document.querySelectorAll<HTMLElement>('.revela:not(.visible)').forEach((el) => {
        if (el.getBoundingClientRect().top < limite) el.classList.add('visible')
      })
    }
    const pedir = () => {
      if (!pendiente) {
        pendiente = true
        requestAnimationFrame(barrer)
      }
    }
    barrer()
    window.addEventListener('scroll', pedir, { passive: true })
    window.addEventListener('resize', pedir, { passive: true })
    return () => {
      window.removeEventListener('scroll', pedir)
      window.removeEventListener('resize', pedir)
    }
  }, [pathname])
}

/** Línea de progreso de lectura (pedida en el draft de la web). */
export function BarraProgreso() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const pintar = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? window.scrollY / max : 0
      if (ref.current) ref.current.style.transform = `scaleX(${p})`
    }
    pintar()
    window.addEventListener('scroll', pintar, { passive: true })
    window.addEventListener('resize', pintar, { passive: true })
    return () => {
      window.removeEventListener('scroll', pintar)
      window.removeEventListener('resize', pintar)
    }
  }, [])
  return (
    <div className="absolute inset-x-0 bottom-0 h-0.5 bg-linea" aria-hidden="true">
      <div ref={ref} className="h-full origin-left bg-terracota" style={{ transform: 'scaleX(0)' }} />
    </div>
  )
}

/** Tarjeta que se inclina siguiendo el dedo o el mouse. 3D con CSS, sin librería. */
export function TarjetaTilt({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const mover = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.setProperty('--ry', `${x * 14}deg`)
    el.style.setProperty('--rx', `${-y * 14}deg`)
    el.style.setProperty('--brillo-x', `${(x + 0.5) * 100}%`)
    el.style.setProperty('--brillo-y', `${(y + 0.5) * 100}%`)
  }
  const soltar = () => {
    ref.current?.style.setProperty('--ry', '0deg')
    ref.current?.style.setProperty('--rx', '0deg')
  }
  return (
    <div className="[perspective:900px]">
      <div
        ref={ref}
        onPointerMove={mover}
        onPointerLeave={soltar}
        onPointerUp={soltar}
        className={`group relative h-full touch-pan-y transition-transform duration-300 ease-out [transform-style:preserve-3d] [transform:rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))] ${className}`}
      >
        {children}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: 'radial-gradient(circle at var(--brillo-x,50%) var(--brillo-y,50%), rgba(255,255,255,.35), transparent 55%)' }}
        />
      </div>
    </div>
  )
}
