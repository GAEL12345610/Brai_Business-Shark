import { Link } from 'react-router'
import { Logo } from '../components/marca'
import { VerificarCodigo } from '../components/verificar'

export default function NoEncontrada() {
  return (
    <main className="relative mx-auto flex min-h-[90dvh] max-w-2xl flex-col justify-center px-5 py-16 sm:px-8">
      <div className="luz" aria-hidden="true">
        <i className="l1" />
        <i className="l2" />
      </div>
      <div className="relative">
        <Logo />
        <h1 className="titular-2 mt-12">No encontramos esta obra.</h1>
        <p className="cuerpo-g mt-6 text-tinta/80">
          Revisa que el enlace esté completo. Si acercaste el celular a un sello y llegaste aquí, avísale al artista. También puedes escribir el código que
          viene junto al sello.
        </p>
        <div className="vidrio mt-9 rounded-[28px] p-5 sm:p-7">
          <VerificarCodigo id="codigo-404" />
        </div>
        <Link to="/" className="mt-8 inline-block text-lg font-semibold text-terracota-btn hover:underline">
          Ir al inicio de Brai
        </Link>
      </div>
    </main>
  )
}
