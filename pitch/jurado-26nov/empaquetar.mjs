// Deja la presentación en UN solo archivo que se abre con doble clic, sin internet:
// listo-para-abrir/Brai-presentacion.html. Mete dentro las fuentes, el logo, las obras,
// las capturas y el QR. Uso, desde la raíz del repo: node pitch/jurado-26nov/empaquetar.mjs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { join, extname, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const AQUI = dirname(fileURLToPath(import.meta.url))
const SALIDA = join(AQUI, '..', '..', 'listo-para-abrir')
const TIPOS = { '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.woff2': 'font/woff2' }
const dato = (rel) => `data:${TIPOS[extname(rel)]};base64,${readFileSync(join(AQUI, rel)).toString('base64')}`

let html = readFileSync(join(AQUI, 'presentacion.html'), 'utf8')
html = html.replace(/url\((\.\.\/[^)]+\.woff2)\)/g, (_, rel) => `url(${dato(rel)})`)
html = html.replace(/src="([^"]+\.(?:svg|jpg|png))"/g, (_, rel) => `src="${dato(rel)}"`)

mkdirSync(SALIDA, { recursive: true })
writeFileSync(join(SALIDA, 'Brai-presentacion.html'), html)
console.log(`listo: listo-para-abrir/Brai-presentacion.html (${(html.length / 1048576).toFixed(1)} MB)`)
