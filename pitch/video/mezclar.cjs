// Rehace la mezcla de audio de un video (voz + música + sonidos).
// Hay que correrlo cada vez que cambie una voz, una duración o un sonido.
// Uso, desde la raíz del repo:   node pitch/video/mezclar.cjs infomercial
//                                 node pitch/video/mezclar.cjs completo
// Necesita Playwright con Chromium. La mezcla la arma fuente/mezcla.js dentro del navegador.
const { chromium } = require('playwright')
const http = require('node:http')
const fs = require('node:fs')
const path = require('node:path')

const video = process.argv[2]
if (!['infomercial', 'completo'].includes(video)) {
  console.error('Dime cuál: node pitch/video/mezclar.cjs infomercial   o   completo')
  process.exit(1)
}
const FUENTE = path.join(__dirname, 'fuente')
const PLAN = video === 'infomercial' ? 'BRAI_PLAN_INFO' : 'BRAI_PLAN_COMPLETO'
const TIPOS = { '.html': 'text/html', '.js': 'text/javascript', '.mp3': 'audio/mpeg', '.wav': 'audio/wav' }

;(async () => {
  const servidor = await new Promise((listo) => {
    const s = http.createServer((q, r) => {
      const f = path.join(FUENTE, decodeURIComponent(q.url.split('?')[0]))
      if (!f.startsWith(FUENTE) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { r.writeHead(404); return r.end() }
      r.writeHead(200, { 'Content-Type': TIPOS[path.extname(f)] || 'application/octet-stream' })
      fs.createReadStream(f).pipe(r)
    }).listen(0, '127.0.0.1', () => listo(s))
  })
  const navegador = await chromium.launch()
  const p = await navegador.newPage()
  await p.goto(`http://127.0.0.1:${servidor.address().port}/herramientas/mezclar.html`)
  const r = await p.evaluate(async ([dc, plan]) => {
    const ctx = new AudioContext({ sampleRate: 44100 })
    const html = await (await fetch('../' + dc)).text()
    const scenes = html.match(/window\.OM_SCENES = '([^']+)'/)[1]
    const cargar = async (ruta) => {
      const q = await fetch('../' + ruta)
      if (!q.ok) return null
      return (await ctx.decodeAudioData(await q.arrayBuffer())).getChannelData(0)
    }
    const m = await BraiMezcla.mezclar({ scenes, plan: window[plan], cargar, sr: 44100 })
    const bytes = new Uint8Array(BraiMezcla.wav(m.datos, m.sr))
    let texto = ''
    for (let i = 0; i < bytes.length; i += 32768) texto += String.fromCharCode.apply(null, bytes.subarray(i, i + 32768))
    return { total: m.total, faltan: m.faltan, b64: btoa(texto) }
  }, [`video-${video}.dc.html`, PLAN])
  await navegador.close()
  servidor.close()
  fs.writeFileSync(path.join(FUENTE, 'audio', `${video}-mezcla.wav`), Buffer.from(r.b64, 'base64'))
  if (r.faltan.length) console.log('OJO, faltan voces:', r.faltan.join(', '))
  console.log(`listo: fuente/audio/${video}-mezcla.wav, ${r.total} s`)
})()
