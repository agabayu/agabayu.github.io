import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// This repo is deployed as agabayu.github.io (a user site), so it is served
// from the domain root and needs no custom base path.
export default defineConfig({
  base: '/',
  plugins: [react()],
})
