import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter, MemoryRouter, useLocation } from 'react-router'
import { useEffect } from 'react'
import App from './App'
import { DEMO_PERSONALIZADA } from './data/demo'
import './index.css'

function ArribaAlCambiar() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

// La versión portátil se abre como archivo, sin servidor: ahí la dirección no sirve
// para saber en qué pantalla estás, así que la navegación vive en memoria.
const PORTATIL = import.meta.env.MODE === 'portatil'
const Enrutador = PORTATIL ? MemoryRouter : BrowserRouter

const arbol = (
  <StrictMode>
    <Enrutador>
      <ArribaAlCambiar />
      <App />
    </Enrutador>
  </StrictMode>
)

const raiz = document.getElementById('root')!
// La landing llega prerenderizada (memoria/contenido-en-html-crudo.md): se hidrata.
// Cualquier otra ruta se pinta desde cero.
// En la demo personalizada (?para= o /jose-luis) el contenido cambia respecto al HTML prerenderizado: se pinta desde cero.
if (!PORTATIL && location.pathname === '/' && raiz.firstElementChild && !DEMO_PERSONALIZADA) hydrateRoot(raiz, arbol)
else {
  raiz.textContent = ''
  createRoot(raiz).render(arbol)
}
