import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves a project repo under /<repo>/ and a user site
// (<name>.github.io) at the root. The deploy workflow passes the right
// prefix in BASE_PATH; locally the site runs at the root.
export default defineConfig({
  plugins: [react()],
  base: process.env.BASE_PATH ?? '/',
})
