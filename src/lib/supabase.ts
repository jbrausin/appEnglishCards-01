// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Anon Key must be defined in environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos para Supabase
export type Tables = {
  languages: {
    id: string;
    name: string;
    user_id: string;
    created_at: string;
  };
  study_groups: {
    id: string;
    name: string;
    language_id: string;
    user_id: string;
    created_at: string;
  };
  study_cards: {
    id: string;
    english: string;
    translation: string;
    learned: boolean;
    group_id: string;
    user_id: string;
    created_at: string;
  };
};