// PDF de la presentación animada (una lámina por página).
// Uso, desde la raíz del repo: node pitch/jurado-26nov/exportar-presentacion.cjs
// Necesita Playwright con Chromium, igual que exportar.cjs.
// Cada lámina se fotografía ya terminada su animación y las fotos se juntan en el PDF:
// así pesa poco y se ve idéntico a la pantalla.
const { chromium } = require('playwright')
const path = require('node:path')
const A = (f) => path.join(__dirname, f)

;(async () => {
  const b = await chromium.launch()
  const p = await b.newPage({ viewport: { width: 1920, height: 1080 } })
  await p.goto('file://' + A('presentacion.html'))
  await p.evaluate(() => document.fonts.ready)
  await p.addStyleTag({ content: '.ui{display:none!important}' })
  const total = await p.evaluate(() => document.querySelectorAll('.lam').length)
  const fotos = []
  for (let n = 0; n < total; n++) {
    await p.waitForTimeout(3800)
    fotos.push((await p.screenshot({ type: 'jpeg', quality: 86 })).toString('base64'))
    await p.keyboard.press('ArrowRight')
  }
  const hoja = await b.newPage()
  await hoja.setContent(
    '<style>@page{size:1920px 1080px;margin:0}body{margin:0}img{display:block;width:1920px;height:1080px;break-after:page}</style>' +
      fotos.map((f) => `<img src="data:image/jpeg;base64,${f}">`).join(''),
  )
  await hoja.pdf({ path: A('presentacion.pdf'), width: '1920px', height: '1080px', printBackground: true, preferCSSPageSize: true })
  await b.close()
  console.log('listo: presentacion.pdf,', total, 'láminas')
})()
