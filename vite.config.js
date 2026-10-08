import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' → the built site works from any folder (Hostinger public_html or a subfolder)
export default defineConfig({ plugins: [react()], base: './' })
