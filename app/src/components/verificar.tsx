import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { ArrowRight } from 'lucide-react'
import { OBRAS, todasLasObras } from '../data/demo'

/** Acepta el código del sello (7KQ2X) o el número de registro (BRAI-0001 o 0001). */
export function buscarObra(texto: string) {
  const limpio = texto.toUpperCase().replace(/[^A-Z0-9]/g, '')
  if (!limpio) return null
  const numero = limpio.replace(/^BRAI/, '')
  return (
    todasLasObras().find((o) => o.codigo === limpio || o.registro.replace(/[^A-Z0-9]/g, '') === limpio || o.registro.replace(/\D/g, '') === numero.padStart(4, '0')) ?? null
  )
}

/** La puerta de Brai sin NFC: escribir el código que viene junto al sello. */
export function VerificarCodigo({ id = 'codigo-obra', compacto = false, claro = false }: { id?: string; compacto?: boolean; claro?: boolean }) {
  const navegar = useNavigate()
  const [valor, setValor] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [intento, setIntento] = useState(0)
  const ejemplo = OBRAS[0].codigo

  const enviar = (e: FormEvent) => {
    e.preventDefault()
    const obra = buscarObra(valor)
    if (obra) return navegar(`/o/${obra.codigo}`)
    setError(valor.trim() ? 'No encontramos una obra con ese código. Revisa el que viene junto al sello.' : 'Escribe el código que viene junto al sello.')
    setIntento((n) => n + 1)
  }

  return (
    <form onSubmit={enviar} noValidate className="w-full">
      {!compacto && (
        <label htmlFor={id} className={`rotulo block ${claro ? 'text-lienzo/75' : 'text-verde'}`}>
          Código de la obra
        </label>
      )}
      <div key={intento} className={`${compacto ? '' : 'mt-3'} flex flex-col gap-3 sm:flex-row ${error ? 'sacude' : ''}`}>
        <input
          id={id}
          value={valor}
          onChange={(e) => {
            setValor(e.target.value.toUpperCase().slice(0, 12))
            setError(null)
          }}
          aria-label={compacto ? 'Código de la obra' : undefined}
          aria-invalid={Boolean(error)}
          aria-describedby={`${id}-ayuda`}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="characters"
          spellCheck={false}
          placeholder={ejemplo}
          className="campo-codigo min-w-0 flex-1 text-tinta"
        />
        <button type="submit" className="boton shrink-0">
          Verificar obra <ArrowRight size={20} strokeWidth={2.2} />
        </button>
      </div>
      <p id={`${id}-ayuda`} role={error ? 'alert' : undefined} className={`mt-3 text-base ${claro ? 'text-lienzo/80' : 'text-tinta/75'}`}>
        {error ? (
          <span className={`font-semibold ${claro ? 'text-lienzo' : 'text-terracota-active'}`}>{error}</span>
        ) : (
          <>
            ¿No tienes una obra a la mano?{' '}
            <button
              type="button"
              onClick={() => navegar(`/o/${ejemplo}`)}
              className={`font-semibold underline underline-offset-4 ${claro ? 'text-lienzo hover:text-white' : 'text-terracota-btn hover:text-terracota-hover'}`}
            >
              Prueba con la obra de ejemplo
            </button>
            .
          </>
        )}
      </p>
    </form>
  )
}
