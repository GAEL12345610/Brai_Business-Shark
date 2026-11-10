import { useState } from 'react'
import { ArrowRight, Pause, Play } from 'lucide-react'
import { Isotipo } from './marca'

export default function HistoriaObra({ imagen }: { imagen: string }) {
  const [pausada, setPausada] = useState(false)
  return (
    <figure className={`historia-obra ${pausada ? 'historia-pausada' : ''}`} aria-labelledby="historia-titulo">
      <div className="historia-cabecera">
        <figcaption id="historia-titulo">Una obra cambia de manos. Su historia puede seguir con ella.</figcaption>
        <button type="button" onClick={() => setPausada(!pausada)} aria-pressed={pausada} className="historia-control">
          {pausada ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
          {pausada ? 'Reanudar' : 'Pausar'}
        </button>
      </div>
      <div className="historia-escena" aria-hidden="true">
        <div className="historia-persona">
          <span className="historia-numero">01</span>
          <span className="historia-rol">El artista</span>
          <span className="historia-detalle">Aquí empieza todo.</span>
        </div>
        <div className="historia-via"><span className="historia-trazo" /><span className="historia-pulso" /></div>
        <div className="historia-cuadro">
          <div className="historia-marco"><img src={imagen} alt="" width="120" height="150" /></div>
          <span className="historia-sello"><Isotipo size={24} /></span>
          <span className="historia-ficha">LA OBRA</span>
        </div>
        <div className="historia-via historia-via-final"><span className="historia-trazo" /><span className="historia-pulso" /></div>
        <div className="historia-persona">
          <span className="historia-numero">02</span>
          <span className="historia-rol">Su comprador</span>
          <span className="historia-detalle">Una nueva casa.</span>
        </div>
      </div>
      <div className="historia-comparacion">
        <p><span className="historia-muestra historia-muestra-rota" />Sin registro, el contacto puede perderse.</p>
        <ArrowRight size={18} aria-hidden="true" className="historia-comparacion-flecha" />
        <p><span className="historia-muestra" />Con Brai, proponemos conservar el vínculo.</p>
      </div>
      <p className="historia-nota">Animación ilustrativa. El contacto depende de que el comprador reclame la obra y comparta su correo.</p>
    </figure>
  )
}
