/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#a855f7',    // morado
        accent: '#d8f277',     // verde
        dark: '#111827',       // tono más oscuro para fondo sidebar
        light: '#faf9f5',      // tono de fondo pantalla principal
        card: '#ffffff',       // blanco para fondo de las tarjetas
      },
    },
  },
  plugins: [],
}