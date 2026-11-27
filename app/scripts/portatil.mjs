// Junta la web en UN solo archivo que se abre con doble clic, sin servidor ni internet:
// listo-para-abrir/Brai-web.html. Corre después de `vite build --mode portatil`
// (ver "portatil" en package.json). Mete dentro el código, los estilos, las fuentes,
// el logo y las obras de ejemplo.
import { readFileSync, writeFileSync, readdirSync, statSync, mkdirSync } from 'node:fs'
import { join, extname } from 'node:path'
import { fileURLToPath } from 'node:url'

const APP = fileURLToPath(new URL('..', import.meta.url))
const DIST = join(APP, 'dist-portatil')
const SALIDA = join(APP, '..', 'listo-para-abrir')
const TIPOS = { '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg' }
const dato = (ruta) => `data:${TIPOS[extname(ruta)]};base64,${readFileSync(ruta).toString('base64')}`

function archivos(dir) {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n)
    return statSync(p).isDirectory() ? archivos(p) : [p]
  })
}

// Lo que la app pide por dirección (/brand/isotipo.svg, /obras/...) viaja dentro del archivo
const activos = {}
for (const carpeta of ['brand', 'obras']) {
  for (const ruta of archivos(join(APP, 'public', carpeta))) {
    if (TIPOS[extname(ruta)]) activos[ruta.slice(join(APP, 'public').length).split('\\').join('/')] = dato(ruta)
  }
}

let html = readFileSync(join(DIST, 'index.html'), 'utf8')
const css = html.match(/<link rel="stylesheet"[^>]*href="\.\/(assets\/[^"]+)"[^>]*>/)
const js = html.match(/<script type="module"[^>]*src="\.\/(assets\/[^"]+)"[^>]*><\/script>/)
if (!css || !js) throw new Error('portatil: no encontré el CSS o el JS en dist-portatil/index.html')

const puente = `<script>
window.__BRAI_ACTIVOS = ${JSON.stringify(activos)};
(function () {
  var A = window.__BRAI_ACTIVOS
  var poner = Element.prototype.setAttribute
  Element.prototype.setAttribute = function (nombre, valor) {
    if (this.tagName === 'IMG' && nombre === 'src' && A[valor]) valor = A[valor]
    return poner.call(this, nombre, valor)
  }
  var prop = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src')
  Object.defineProperty(HTMLImageElement.prototype, 'src', {
    get: prop.get,
    set: function (valor) { prop.set.call(this, A[valor] || valor) },
    configurable: true,
    enumerable: true,
  })
  function arreglar(n) {
    if (n.nodeType !== 1) return
    var imgs = [].slice.call(n.querySelectorAll('img[src^="/"]'))
    if (n.matches('img[src^="/"]')) imgs.push(n)
    imgs.forEach(function (i) { var s = i.getAttribute('src'); if (A[s]) i.setAttribute('src', A[s]) })
    ;[].slice.call(n.querySelectorAll('a[href="/privacidad"]')).forEach(function (a) { a.style.display = 'none' })
  }
  new MutationObserver(function (cambios) {
    cambios.forEach(function (c) {
      if (c.type === 'attributes') arreglar(c.target)
      else [].forEach.call(c.addedNodes, arreglar)
    })
  }).observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['src'] })
})()
</script>`

html = html
  .replace(css[0], () => `<style>${readFileSync(join(DIST, css[1]), 'utf8')}</style>`)
  .replace(js[0], '')
  .replace(/<link rel="apple-touch-icon"[^>]*>\s*/, '')
  .replace(/<meta property="og:image[^>]*>\s*/g, '')
  .replace(/<meta name="twitter:card"[^>]*>\s*/, '')
  .replace('href="/favicon.svg"', () => `href="${dato(join(APP, 'public', 'favicon.svg'))}"`)
  .replace('</head>', () => `${puente}\n  </head>`)
  .replace('</body>', () => `<script type="module">${readFileSync(join(DIST, js[1]), 'utf8').split('</script').join('<\\/script')}</script>\n  </body>`)

mkdirSync(SALIDA, { recursive: true })
writeFileSync(join(SALIDA, 'Brai-web.html'), html)
console.log(`portatil: listo-para-abrir/Brai-web.html (${(html.length / 1048576).toFixed(1)} MB)`)
