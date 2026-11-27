import { useEffect, useRef, useState } from 'react'
import { cargarGsap } from '../lib/gsap'
import { BatteryFull, Camera, Flashlight, Lock, Nfc, Signal, Wifi } from 'lucide-react'
import { Isotipo } from './marca'

const MOMENTOS = [
  { titulo: 'Acerca tu celular.', texto: 'Detrás del cuadro hay un sello. Sin descargar ninguna app.' },
  { titulo: 'Se abre su historia.', texto: 'Quién la pintó, cuándo y cómo nació.' },
  { titulo: 'Registrada por el artista.', texto: 'Ves que la registró el propio artista y, si su dueño la reclamó, sus iniciales.' },
]

/**
 * El gesto que explica Brai, guiado por el scroll: el celular se acerca al
 * sello, se abre la obra y aparece el sello dorado del registro.
 */
export function EscenaSello({ titulo, artista, registro, imagen, tecnica }: { titulo: string; artista: string; registro: string; imagen: string; tecnica: string }) {
  const raiz = useRef<HTMLElement>(null)
  const [paso, setPaso] = useState(0)
  const [quieta, setQuieta] = useState(false)

  useEffect(() => {
    const el = raiz.current
    if (!el) return
    let vivo = true
    let limpiar = () => {}
    cargarGsap().then((gsap) => {
      if (!vivo) return
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: reduce)', () => {
        setQuieta(true)
        setPaso(2)
      })
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(el)
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.7,
            onUpdate: (s) => setPaso(s.progress < 0.42 ? 0 : s.progress < 0.68 ? 1 : 2),
          },
        })
        gsap.set(q('.es-bloqueo'), { opacity: 1 })
        gsap.set(q('.es-pagina'), { opacity: 0, yPercent: 12 })
        gsap.set(q('.es-oro'), { opacity: 0, scale: 0.2 })
        gsap.set(q('.es-aviso'), { opacity: 0, yPercent: -60, scale: 0.9 })
        tl.fromTo(q('.es-cel'), { xPercent: 78, yPercent: 58, rotate: 20, opacity: 0 }, { xPercent: 0, yPercent: 0, rotate: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }, 0)
          .to(q('.es-aviso'), { opacity: 1, yPercent: 0, scale: 1, duration: 0.07, ease: 'back.out(2)' }, 0.3)
          .to(q('.es-bloqueo'), { opacity: 0, duration: 0.07 }, 0.44)
          .to(q('.es-pagina'), { opacity: 1, yPercent: 0, duration: 0.14, ease: 'power2.out' }, 0.45)
          .to(q('.es-oro'), { opacity: 1, scale: 1, duration: 0.1, ease: 'back.out(2.6)' }, 0.68)
          .to(q('.es-cel'), { scale: 1.16, rotate: -3, duration: 0.3, ease: 'power1.inOut' }, 0.7)
          .to(q('.es-reverso'), { scale: 0.93, opacity: 0.45, duration: 0.3, ease: 'power1.inOut' }, 0.7)
          .fromTo(q('.es-barra'), { scaleX: 0 }, { scaleX: 1, duration: 1 }, 0)
      })
      limpiar = () => mm.revert()
    })
    return () => {
      vivo = false
      limpiar()
    }
  }, [])

  return (
    <section ref={raiz} id="como-funciona" aria-label="Cómo funciona el sello" className={`relative scroll-mt-0 bg-white ${quieta ? 'py-24' : 'h-[340vh]'}`}>
      <div className={`${quieta ? '' : 'sticky top-0 h-[100dvh]'} overflow-hidden`}>
        <div className="mx-auto grid h-full max-w-7xl content-center items-center gap-8 px-5 sm:px-8 md:grid-cols-[1.05fr_1fr] md:gap-16">
          {/* Los tres momentos, uno a la vez y en grande */}
          <div className="order-2 md:order-1">
            <p className="rotulo text-verde">Cómo funciona</p>
            <div className={quieta ? 'mt-6 space-y-10' : 'relative mt-5 h-[13.5rem] sm:h-[17rem] md:mt-8 md:h-[26rem]'}>
              {MOMENTOS.map((m, i) => (
                <div
                  key={m.titulo}
                  aria-hidden={!quieta && i !== paso}
                  className={
                    quieta
                      ? ''
                      : `absolute inset-0 transition-[opacity,transform] duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${
                          i === paso ? 'opacity-100' : i < paso ? '-translate-y-10 opacity-0' : 'translate-y-10 opacity-0'
                        }`
                  }
                >
                  <p className="font-mono text-lg text-terracota-btn">0{i + 1} de 03</p>
                  <h2 className="titular-2 mt-3">{m.titulo}</h2>
                  <p className="cuerpo-g mt-5 max-w-lg text-tinta/80">{m.texto}</p>
                </div>
              ))}
            </div>
            {!quieta && (
              <div className="mt-6 h-1 w-full max-w-sm overflow-hidden rounded-full bg-linea" aria-hidden="true">
                <div className="es-barra h-full origin-left rounded-full bg-terracota" />
              </div>
            )}
          </div>

          {/* Escenario: el reverso del cuadro, el sello y el celular */}
          <div className={`relative order-1 mx-auto aspect-[4/5] h-[42dvh] max-h-[640px] md:order-2 md:h-[76dvh] ${paso >= 1 ? 'escena-activa' : ''}`}>
            <div className="es-reverso absolute inset-0 rounded-md bg-[#E8DCC8] shadow-[inset_0_0_0_14px_#C9AE8A,inset_0_0_0_15px_#B39570,0_50px_80px_-50px_rgba(43,38,34,.6)]">
              <div className="absolute inset-x-[14px] top-1/2 h-5 -translate-y-1/2 bg-[#C9AE8A]" />
              <div className="absolute inset-y-[14px] left-1/2 w-5 -translate-x-1/2 bg-[#C9AE8A]" />
              <p className="absolute bottom-7 left-7 font-mono text-xs text-tinta/70">Reverso de la obra</p>
              <div className="absolute left-[27%] top-[24%] aspect-square w-[30%] -translate-x-1/2 -translate-y-1/2">
                <span className="onda-g" />
                <span className="onda-g" style={{ animationDelay: '.5s' }} />
                <span className="onda-g" style={{ animationDelay: '1s' }} />
                <div className="relative flex size-full flex-col items-center justify-center gap-1 rounded-full bg-lienzo shadow-[inset_0_0_0_1px_#d8cdbb,0_8px_18px_-8px_rgba(43,38,34,.5)]">
                  <Isotipo size={40} />
                  <span className="font-mono text-[9px] text-verde">{registro}</span>
                </div>
              </div>
            </div>

            <div className="es-cel absolute left-[31%] top-[9%] w-[50%] will-change-transform">
              <div className="iphone">
                <span className="iphone-tecla t1" aria-hidden="true" />
                <span className="iphone-tecla t2" aria-hidden="true" />
                <span className="iphone-tecla t3" aria-hidden="true" />
                <div className="iphone-pantalla">
                  {/* La página de la obra, que aparece al tocar el sello */}
                  <div className="es-pagina absolute inset-0 bg-lienzo">
                    <div className="iphone-estado text-tinta">
                      <span>9:41</span>
                      <span className="flex items-center gap-[1.4cqw]">
                        <Signal className="size-[4.6cqw]" strokeWidth={2.6} />
                        <Wifi className="size-[4.6cqw]" strokeWidth={2.6} />
                        <BatteryFull className="size-[6cqw]" strokeWidth={2} />
                      </span>
                    </div>
                    <div className="mx-[3cqw] bg-[#2F5D62] p-[2.6cqw]">
                      <img src={imagen} alt="" className="aspect-[4/5] w-full object-cover" />
                    </div>
                    <div className="px-[5cqw] pt-[3.4cqw]">
                      <p className="text-[2.9cqw] font-semibold uppercase tracking-wider text-verde">{artista}</p>
                      <p className="font-display text-[6.6cqw] font-semibold leading-tight">{titulo}</p>
                      <p className="es-oro mt-[2.4cqw] inline-flex origin-left items-center gap-[1.6cqw] rounded-full bg-dorado-suave px-[3cqw] py-[1.3cqw] text-[3.2cqw] font-semibold shadow-[0_0_0_1px_var(--color-dorado)]">
                        <i className="size-[2cqw] rounded-full bg-dorado" /> Registrada por el artista
                      </p>
                      <div className="mt-[2.6cqw] grid grid-cols-[auto_1fr] gap-x-[4cqw] border-t border-linea pt-[2cqw] font-mono text-[2.9cqw] leading-[1.7]">
                        <span className="text-verde">Registro</span>
                        <span>{registro}</span>
                        <span className="text-verde">Técnica</span>
                        <span>{tecnica}</span>
                        <span className="text-verde">Dueño</span>
                        <span>Sin reclamar</span>
                      </div>
                    </div>
                  </div>

                  {/* Pantalla de bloqueo, como la de un teléfono de verdad */}
                  <div className="es-bloqueo iphone-bloqueo opacity-0">
                    <div className="iphone-estado">
                      <span />
                      <span className="flex items-center gap-[1.4cqw]">
                        <Signal className="size-[4.6cqw]" strokeWidth={2.6} />
                        <Wifi className="size-[4.6cqw]" strokeWidth={2.6} />
                        <BatteryFull className="size-[6cqw]" strokeWidth={2} />
                      </span>
                    </div>
                    <Lock className="mx-auto mt-[5cqw] size-[5.4cqw]" strokeWidth={2.4} />
                    <p className="mt-[2.4cqw] text-center text-[5.6cqw] font-medium">jueves, 26 de noviembre</p>
                    <p className="iphone-hora">9:41</p>
                    <div className="es-aviso iphone-aviso">
                      <span className="grid size-[10cqw] shrink-0 place-items-center rounded-[2.6cqw] bg-lienzo text-terracota-btn">
                        <Nfc className="size-[6.4cqw]" strokeWidth={2} />
                      </span>
                      <span className="min-w-0 leading-tight">
                        <span className="block text-[3.7cqw] font-semibold">Etiqueta NFC</span>
                        <span className="block truncate text-[3.5cqw] opacity-85">Abrir brai.art en el navegador</span>
                      </span>
                    </div>
                    <div className="iphone-accesos">
                      <span>
                        <Flashlight className="size-[6.4cqw]" strokeWidth={1.8} />
                      </span>
                      <span>
                        <Camera className="size-[6.4cqw]" strokeWidth={1.8} />
                      </span>
                    </div>
                  </div>

                  <span className="iphone-isla" aria-hidden="true" />
                  <span className="iphone-barra" aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
