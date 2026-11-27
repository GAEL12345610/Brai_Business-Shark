import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { useRevela } from './components/movimiento'
import { AvisoDemo } from './components/demo'
import { ARTISTA } from './data/demo'
import Landing from './pages/Landing'
import Obra from './pages/Obra'
import Reclamar from './pages/Reclamar'
import Artista from './pages/Artista'
import NoEncontrada from './pages/NoEncontrada'

// El panel solo lo abre el artista: se carga aparte para que la obra abra rápido
const Panel = lazy(() => import('./pages/Panel'))

export default function App() {
  useRevela()
  return (
    <>
    <AvisoDemo />
    <Routes>
      {/* Portada: verificar una obra con su código */}
      <Route path="/" element={<Landing />} />
      {/* Los sellos NFC apuntan aquí, siempre en brai.art (docs/DECISIONES.md #12) */}
      <Route path="/o/:codigo" element={<Obra />} />
      <Route path="/o/:codigo/reclamar" element={<Reclamar />} />
      <Route path="/a/:slug" element={<Artista />} />
      {/* Demo para José Luis Malo (DECISIONES #42): activa su modo y abre su página */}
      <Route path="/jose-luis" element={<Navigate to={`/a/${ARTISTA.slug}`} replace />} />
      <Route
        path="/panel"
        element={
          <Suspense fallback={null}>
            <Panel />
          </Suspense>
        }
      />
      <Route path="*" element={<NoEncontrada />} />
    </Routes>
    </>
  )
}
