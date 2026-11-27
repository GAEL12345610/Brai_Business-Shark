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
// En la versión portátil se puede abrir una pantalla directa con ?ruta=/o/7KQ2X,
// por ejemplo desde un sello NFC o un QR de prueba.
const pedida = PORTATIL ? (new URLSearchParams(location.search).get('ruta') ?? '') : ''
const inicio = /^\/[\w\-/]*$/.test(pedida) ? pedida : '/'
const contenido = (
  <>
    <ArribaAlCambiar />
    <App />
  </>
)

const arbol = <StrictMode>{PORTATIL ? <MemoryRouter initialEntries={[inicio]}>{contenido}</MemoryRouter> : <BrowserRouter>{contenido}</BrowserRouter>}</StrictMode>

const raiz = document.getElementById('root')!
// La landing llega prerenderizada (memoria/contenido-en-html-crudo.md): se hidrata.
// Cualquier otra ruta se pinta desde cero.
// En la demo personalizada (?para= o /jose-luis) el contenido cambia respecto al HTML prerenderizado: se pinta desde cero.
if (!PORTATIL && location.pathname === '/' && raiz.firstElementChild && !DEMO_PERSONALIZADA) hydrateRoot(raiz, arbol)
else {
  raiz.textContent = ''
  createRoot(raiz).render(arbol)
}
