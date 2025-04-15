import { createClient } from '@supabase/supabase-js';

// Importar variables de entorno
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

// Crear cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Interfaces para la base de datos
export interface Language {
  id: string;
  name: string;
  user_id?: string;
  created_at?: string;
}

export interface StudyGroup {
  id: string;
  name: string;
  language_id: string;
  user_id?: string;
  created_at?: string;
}

export interface StudyCard {
  id: string;
  english: string;
  translation: string;
  learned: boolean;
  group_id: string;
  user_id?: string;
  created_at?: string;
}

// Funciones CRUD para Languages
export async function getLanguages() {
  const { data, error } = await supabase
    .from('languages')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching languages:', error);
    return [];
  }
  
  return data || [];
}

export async function createLanguage(name: string) {
  const { data, error } = await supabase
    .from('languages')
    .insert([{ name }])
    .select();
  
  if (error) {
    console.error('Error creating language:', error);
    throw error;
  }
  
  return data?.[0];
}

export async function updateLanguage(id: string, name: string) {
  const { data, error } = await supabase
    .from('languages')
    .update({ name })
    .eq('id', id)
    .select();
  
  if (error) {
    console.error('Error updating language:', error);
    throw error;
  }
  
  return data?.[0];
}

export async function deleteLanguage(id: string) {
  // Primero obtenemos todos los grupos del idioma
  const { data: groups } = await supabase
    .from('study_groups')
    .select('id')
    .eq('language_id', id);
  
  // Para cada grupo, eliminamos sus tarjetas
  if (groups && groups.length > 0) {
    const groupIds = groups.map(group => group.id);
    
    // Eliminar todas las tarjetas asociadas a estos grupos
    const { error: cardsError } = await supabase
      .from('study_cards')
      .delete()
      .in('group_id', groupIds);
    
    if (cardsError) {
      console.error('Error deleting cards:', cardsError);
      throw cardsError;
    }
    
    // Eliminar todos los grupos
    const { error: groupsError } = await supabase
      .from('study_groups')
      .delete()
      .eq('language_id', id);
    
    if (groupsError) {
      console.error('Error deleting groups:', groupsError);
      throw groupsError;
    }
  }
  
  // Finalmente, eliminar el idioma
  const { error } = await supabase
    .from('languages')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting language:', error);
    throw error;
  }
  
  return true;
}

// Funciones CRUD para StudyGroups
export async function getGroupsByLanguage(languageId: string) {
  const { data, error } = await supabase
    .from('study_groups')
    .select('*')
    .eq('language_id', languageId)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching groups:', error);
    return [];
  }
  
  return data || [];
}

export async function createGroup(name: string, languageId: string) {
  const { data, error } = await supabase
    .from('study_groups')
    .insert([{ name, language_id: languageId }])
    .select();
  
  if (error) {
    console.error('Error creating group:', error);
    throw error;
  }
  
  return data?.[0];
}

export async function updateGroup(id: string, name: string) {
  const { data, error } = await supabase
    .from('study_groups')
    .update({ name })
    .eq('id', id)
    .select();
  
  if (error) {
    console.error('Error updating group:', error);
    throw error;
  }
  
  return data?.[0];
}

export async function deleteGroup(id: string) {
  // Primero eliminamos todas las tarjetas asociadas a este grupo
  const { error: cardsError } = await supabase
    .from('study_cards')
    .delete()
    .eq('group_id', id);
  
  if (cardsError) {
    console.error('Error deleting cards:', cardsError);
    throw cardsError;
  }
  
  // Luego eliminamos el grupo
  const { error } = await supabase
    .from('study_groups')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting group:', error);
    throw error;
  }
  
  return true;
}

// Funciones CRUD para StudyCards
export async function getCardsByGroup(groupId: string) {
  const { data, error } = await supabase
    .from('study_cards')
    .select('*')
    .eq('group_id', groupId)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching cards:', error);
    return [];
  }
  
  return data || [];
}

export async function createCard(english: string, translation: string, groupId: string) {
  const { data, error } = await supabase
    .from('study_cards')
    .insert([{ 
      english, 
      translation, 
      learned: false, 
      group_id: groupId 
    }])
    .select();
  
  if (error) {
    console.error('Error creating card:', error);
    throw error;
  }
  
  return data?.[0];
}

export async function updateCard(id: string, { english, translation }: { english?: string, translation?: string }) {
  const updates: any = {};
  if (english !== undefined) updates.english = english;
  if (translation !== undefined) updates.translation = translation;
  
  const { data, error } = await supabase
    .from('study_cards')
    .update(updates)
    .eq('id', id)
    .select();
  
  if (error) {
    console.error('Error updating card:', error);
    throw error;
  }
  
  return data?.[0];
}

export async function toggleCardLearned(id: string) {
  // Primero obtenemos el estado actual
  const { data: currentCard, error: fetchError } = await supabase
    .from('study_cards')
    .select('learned')
    .eq('id', id)
    .single();
  
  if (fetchError) {
    console.error('Error fetching card:', fetchError);
    throw fetchError;
  }
  
  // Luego invertimos el valor
  const { data, error } = await supabase
    .from('study_cards')
    .update({ learned: !currentCard.learned })
    .eq('id', id)
    .select();
  
  if (error) {
    console.error('Error toggling card learned status:', error);
    throw error;
  }
  
  return data?.[0];
}

export async function deleteCard(id: string) {
  const { error } = await supabase
    .from('study_cards')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting card:', error);
    throw error;
  }
  
  return true;
}

// Funciones para estadísticas
export async function getStatistics() {
  // Obtener el total de idiomas
  const { data: languages, error: langError } = await supabase
    .from('languages')
    .select('id');
  
  if (langError) {
    console.error('Error fetching languages:', langError);
    throw langError;
  }
  
  // Obtener el total de grupos
  const { data: groups, error: groupsError } = await supabase
    .from('study_groups')
    .select('id');
  
  if (groupsError) {
    console.error('Error fetching groups:', groupsError);
    throw groupsError;
  }
  
  // Obtener estadísticas de tarjetas
  const { data: cardStats, error: cardsError } = await supabase
    .from('study_cards')
    .select('learned');
  
  if (cardsError) {
    console.error('Error fetching cards:', cardsError);
    throw cardsError;
  }
  
  const totalCards = cardStats?.length || 0;
  const learnedCards = cardStats?.filter(card => card.learned)?.length || 0;
  
  return {
    totalLanguages: languages?.length || 0,
    totalGroups: groups?.length || 0,
    totalCards,
    learnedCards,
    progressPercentage: totalCards > 0 ? (learnedCards / totalCards * 100) : 0
  };
}