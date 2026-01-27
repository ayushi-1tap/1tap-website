/* eslint-env node */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(() => ({
  // When deploying to GitHub Pages, the site is served from "/<repo-name>/".
  // The workflow sets VITE_BASE accordingly; locally it defaults to "/".
  base: process.env.VITE_BASE || '/',
  plugins: [react()],
}))
