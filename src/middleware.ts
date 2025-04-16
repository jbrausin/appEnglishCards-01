// src/middleware.ts
import { defineMiddleware } from 'astro:middleware';
import { supabase } from './lib/supabase';

// Rutas públicas (no requieren autenticación)
const publicRoutes = ['/', '/login', '/register', '/reset-password'];

// Definir el middleware
export const onRequest = defineMiddleware(async ({ request, locals, redirect }) => {
  // Obtener la ruta actual
  const url = new URL(request.url);
  const path = url.pathname;
  
  // No verificar autenticación para rutas públicas
  if (publicRoutes.includes(path)) {
    return;
  }
  
  // Verificar si el usuario está autenticado
  const { data } = await supabase.auth.getSession();
  
  // Si no hay sesión y la ruta no es pública, redirigir a login
  if (!data.session) {
    return redirect('/login', 302);
  }
  
  // Establecer el usuario en locals
  locals.user = data.session.user;
});