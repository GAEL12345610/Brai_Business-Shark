// Graba un video de Brai a MP4, cuadro por cuadro, y le pega su mezcla de audio.
// Uso, desde la raíz del repo:   node pitch/video/grabar.cjs infomercial
//                                 node pitch/video/grabar.cjs completo
// Necesita Playwright con Chromium (igual que pitch/jurado-26nov/exportar.cjs) y ffmpeg.
// Tarda: unos 5 minutos el infomercial y unos 15 el completo.
const { chromium } = require('playwright')
const http = require('node:http')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const { spawnSync } = require('node:child_process')

const video = process.argv[2]
if (!['infomercial', 'completo'].includes(video)) {
  console.error('Dime cuál: node pitch/video/grabar.cjs infomercial   o   completo')
  process.exit(1)
}
const FUENTE = path.join(__dirname, 'fuente')
const SALIDA = path.join(__dirname, `Brai-${video}.mp4`)
const FPS = 30
const TIPOS = { '.html': 'text/html', '.js': 'text/javascript', '.jsx': 'text/javascript', '.json': 'application/json', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.woff2': 'font/woff2', '.wav': 'audio/wav', '.mp3': 'audio/mpeg' }

// Servidor local chico. Manda el tipo correcto de cada archivo (sin eso los SVG salen rotos)
// y responde por pedazos, que es como el navegador pide el audio.
function servir(raiz) {
  return new Promise((listo) => {
    const s = http.createServer((q, r) => {
      const f = path.join(raiz, decodeURIComponent(q.url.split('?')[0]))
      if (!f.startsWith(raiz) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { r.writeHead(404); return r.end() }
      const peso = fs.statSync(f).size
      const tipo = TIPOS[path.extname(f)] || 'application/octet-stream'
      const m = /bytes=(\d*)-(\d*)/.exec(q.headers.range || '')
      if (m) {
        const a = m[1] ? +m[1] : 0
        const b = m[2] ? +m[2] : peso - 1
        r.writeHead(206, { 'Content-Type': tipo, 'Accept-Ranges': 'bytes', 'Content-Range': `bytes ${a}-${b}/${peso}`, 'Content-Length': b - a + 1 })
        fs.createReadStream(f, { start: a, end: b }).pipe(r)
      } else {
        r.writeHead(200, { 'Content-Type': tipo, 'Accept-Ranges': 'bytes', 'Content-Length': peso })
        fs.createReadStream(f).pipe(r)
      }
    }).listen(0, '127.0.0.1', () => listo(s))
  })
}

;(async () => {
  if (spawnSync('ffmpeg', ['-version']).status !== 0) { console.error('Falta ffmpeg. Instálalo y vuelve a correr esto.'); process.exit(1) }
  const servidor = await servir(FUENTE)
  const url = `http://127.0.0.1:${servidor.address().port}/video-${video}.dc.html`
  const cuadros = fs.mkdtempSync(path.join(os.tmpdir(), 'brai-video-'))
  const navegador = await chromium.launch()
  const marca = '[data-om-exportable-video-with-duration-secs]'

  // Primero se mide el escenario para pintarlo exacto a 1920 x 1080
  let p = await navegador.newPage({ viewport: { width: 1920, height: 1080 } })
  await p.goto(url, { waitUntil: 'load' })
  await p.waitForSelector(marca, { timeout: 30000 })
  const ancho = await p.evaluate((m) => document.querySelector(m).getBoundingClientRect().width, marca)
  await p.close()
  p = await navegador.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1920 / ancho })
  await p.goto(url, { waitUntil: 'load' })
  await p.waitForSelector(marca, { timeout: 30000 })
  await p.waitForTimeout(1500)
  const dura = await p.evaluate((m) => {
    const r = document.querySelector(m)
    // se esconde todo lo que no es el escenario (los controles del reproductor)
    for (let n = r; n && n !== document.body; n = n.parentElement) {
      for (const h of n.parentElement ? n.parentElement.children : []) if (h !== n && h.tagName !== 'SCRIPT' && h.tagName !== 'STYLE') h.style.visibility = 'hidden'
    }
    return +r.getAttribute('data-om-exportable-video-with-duration-secs')
  }, marca)

  const escenario = await p.$(marca)
  const total = Math.ceil(dura * FPS)
  console.log(`Grabando ${video}: ${dura} s, ${total} cuadros`)
  for (let i = 0; i < total; i++) {
    await p.evaluate(async ([m, t]) => {
      document.querySelector(m).dispatchEvent(new CustomEvent('data-om-seek-to-time-frame', { detail: { time: t, sync: true, playing: false } }))
      await new Promise((ok) => requestAnimationFrame(() => requestAnimationFrame(ok)))
    }, [marca, i / FPS])
    await escenario.screenshot({ path: path.join(cuadros, `f${String(i).padStart(5, '0')}.jpg`), type: 'jpeg', quality: 92 })
    if ((i + 1) % 300 === 0) console.log(`  ${i + 1} de ${total}`)
  }
  await navegador.close()
  servidor.close()

  const r = spawnSync('ffmpeg', ['-v', 'error', '-y', '-framerate', String(FPS), '-i', path.join(cuadros, 'f%05d.jpg'), '-i', path.join(FUENTE, 'audio', `${video}-mezcla.wav`),
    '-vf', 'scale=1920:1080:flags=lanczos,format=yuv420p', '-c:v', 'libx264', '-preset', 'slow', '-crf', video === 'completo' ? '25' : '20', '-c:a', 'aac', '-b:a', '192k',
    '-shortest', '-map_metadata', '-1', '-fflags', '+bitexact', '-movflags', '+faststart', SALIDA], { stdio: 'inherit' })
  fs.rmSync(cuadros, { recursive: true, force: true })
  if (r.status !== 0) { console.error('ffmpeg no pudo armar el MP4'); process.exit(1) }
  console.log(`listo: pitch/video/Brai-${video}.mp4`)
})()
