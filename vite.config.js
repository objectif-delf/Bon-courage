import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' => chemins relatifs : fonctionne sur GitHub Pages
// (https://pseudo.github.io/nom-du-depot/) comme sur Vercel/Netlify, sans rien changer.
export default defineConfig({
  plugins: [react()],
  base: './',
  build: { chunkSizeWarningLimit: 1500 }
})
