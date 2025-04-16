// src/services/authService.ts
import { supabase } from '../lib/supabase';

// Tipos para la autenticación
export interface UserCredentials {
  email: string;
  password: string;
}

export interface UserData {
  id: string;
  email: string;
  role?: string;
  last_sign_in_at?: string;
}

// Iniciar sesión con email y contraseña
export async function signIn(credentials: UserCredentials): Promise<UserData | null> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: credentials.email,
    password: credentials.password,
  });
  
  if (error) {
    console.error('Error during sign in:', error);
    return null;
  }
  
  if (!data.user) {
    return null;
  }
  
  return {
    id: data.user.id,
    email: data.user.email || '',
    role: data.user.role,
    last_sign_in_at: data.user.last_sign_in_at
  };
}

// Registrar un nuevo usuario
export async function signUp(credentials: UserCredentials): Promise<UserData | null> {
  const { data, error } = await supabase.auth.signUp({
    email: credentials.email,
    password: credentials.password,
  });
  
  if (error) {
    console.error('Error during sign up:', error);
    return null;
  }
  
  if (!data.user) {
    return null;
  }
  
  return {
    id: data.user.id,
    email: data.user.email || '',
    role: data.user.role,
    last_sign_in_at: data.user.last_sign_in_at
  };
}

// Cerrar sesión
export async function signOut(): Promise<boolean> {
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    console.error('Error during sign out:', error);
    return false;
  }
  
  return true;
}

// Obtener usuario actual
export async function getCurrentUser(): Promise<UserData | null> {
  const { data, error } = await supabase.auth.getUser();
  
  if (error || !data.user) {
    return null;
  }
  
  return {
    id: data.user.id,
    email: data.user.email || '',
    role: data.user.role,
    last_sign_in_at: data.user.last_sign_in_at
  };
}

// Verificar si el usuario está autenticado
export async function isAuthenticated(): Promise<boolean> {
  const { data } = await supabase.auth.getSession();
  return !!data.session;
}

// Recuperar contraseña
export async function resetPassword(email: string): Promise<boolean> {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });
  
  if (error) {
    console.error('Error sending password reset email:', error);
    return false;
  }
  
  return true;
}

// Actualizar contraseña
export async function updatePassword(password: string): Promise<boolean> {
  const { error } = await supabase.auth.updateUser({
    password
  });
  
  if (error) {
    console.error('Error updating password:', error);
    return false;
  }
  
  return true;
}