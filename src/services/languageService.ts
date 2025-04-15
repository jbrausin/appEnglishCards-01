// src/services/languageService.ts
import { supabase } from '../lib/supabase';
import type { Tables } from '../lib/supabase';

export async function getLanguages(): Promise<Language[]> {
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

export async function getLanguageById(id: string): Promise<Language | null> {
  const { data, error } = await supabase
    .from('languages')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching language:', error);
    return null;
  }
  
  return data;
}

export async function createLanguage(name: string): Promise<Language | null> {
  // Get user ID from auth if available
  const user = supabase.auth.getUser();
  const userId = (await user).data.user?.id;
  
  const { data, error } = await supabase
    .from('languages')
    .insert([{ name, user_id: userId }])
    .select()
    .single();
  
  if (error) {
    console.error('Error creating language:', error);
    return null;
  }
  
  return data;
}

export async function updateLanguage(id: string, name: string): Promise<Language | null> {
  const { data, error } = await supabase
    .from('languages')
    .update({ name })
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating language:', error);
    return null;
  }
  
  return data;
}

export async function deleteLanguage(id: string): Promise<boolean> {
  // First, get all groups associated with this language
  const { data: groups } = await supabase
    .from('study_groups')
    .select('id')
    .eq('language_id', id);
  
  if (groups && groups.length > 0) {
    // Delete all cards associated with these groups
    const groupIds = groups.map(group => group.id);
    
    const { error: cardsError } = await supabase
      .from('study_cards')
      .delete()
      .in('group_id', groupIds);
    
    if (cardsError) {
      console.error('Error deleting associated cards:', cardsError);
      return false;
    }
    
    // Delete the groups
    const { error: groupsError } = await supabase
      .from('study_groups')
      .delete()
      .eq('language_id', id);
    
    if (groupsError) {
      console.error('Error deleting associated groups:', groupsError);
      return false;
    }
  }
  
  // Finally, delete the language
  const { error } = await supabase
    .from('languages')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting language:', error);
    return false;
  }
  
  return true;
}