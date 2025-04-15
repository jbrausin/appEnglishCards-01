// src/services/groupService.ts
import { supabase } from '../lib/supabase';

export async function getGroups(languageId: string): Promise<StudyGroup[]> {
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

export async function getGroupById(id: string): Promise<StudyGroup | null> {
  const { data, error } = await supabase
    .from('study_groups')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching group:', error);
    return null;
  }
  
  return data;
}

export async function createGroup(name: string, languageId: string): Promise<StudyGroup | null> {
  // Get user ID from auth if available
  const user = supabase.auth.getUser();
  const userId = (await user).data.user?.id;
  
  const { data, error } = await supabase
    .from('study_groups')
    .insert([{ 
      name, 
      language_id: languageId,
      user_id: userId 
    }])
    .select()
    .single();
  
  if (error) {
    console.error('Error creating group:', error);
    return null;
  }
  
  return data;
}

export async function updateGroup(id: string, name: string, languageId: string): Promise<StudyGroup | null> {
  const { data, error } = await supabase
    .from('study_groups')
    .update({ 
      name,
      language_id: languageId
    })
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating group:', error);
    return null;
  }
  
  return data;
}

export async function deleteGroup(id: string): Promise<boolean> {
  // First, delete all cards associated with this group
  const { error: cardsError } = await supabase
    .from('study_cards')
    .delete()
    .eq('group_id', id);
  
  if (cardsError) {
    console.error('Error deleting associated cards:', cardsError);
    return false;
  }
  
  // Then, delete the group
  const { error } = await supabase
    .from('study_groups')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting group:', error);
    return false;
  }
  
  return true;
}

export async function getGroupsCount(): Promise<number> {
  const { count, error } = await supabase
    .from('study_groups')
    .select('*', { count: 'exact', head: true });
  
  if (error || count === null) {
    console.error('Error counting groups:', error);
    return 0;
  }
  
  return count;
}