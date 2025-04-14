import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  output: 'server', // Cambiado de 'hybrid' a 'server' para mejor manejo de rutas dinámicas
  // Configuración para TypeScript
  vite: {
    ssr: {
      // Necesario para que TypeScript funcione correctamente con Astro
      noExternal: ['@astrojs/*']
    }
  }
});