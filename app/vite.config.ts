import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// `vite build --mode portatil` arma la versión que se abre con doble clic:
// todo en un solo paquete y sin partes que se carguen después (scripts/portatil.mjs).
export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss()],
  base: mode === 'portatil' ? './' : '/',
  build:
    mode === 'portatil'
      ? { outDir: 'dist-portatil', assetsInlineLimit: 100_000_000, cssCodeSplit: false, rollupOptions: { output: { inlineDynamicImports: true } } }
      : {},
  server: { host: true, port: 5173 },
  preview: { host: true, port: 4173 },
}))
