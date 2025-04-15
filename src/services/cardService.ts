// src/services/cardService.ts
import { supabase } from '../lib/supabase';

export async function getCards(groupId: string): Promise<StudyCard[]> {
  const { data, error } = await supabase
    .from('study_cards')
    .select('*')
    .eq('group_id', groupId)
    .order('created_at', { ascending: true });
  
  if (error) {
    console.error('Error fetching cards:', error);
    return [];
  }
  
  return data || [];
}

export async function getCardById(id: string): Promise<StudyCard | null> {
  const { data, error } = await supabase
    .from('study_cards')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching card:', error);
    return null;
  }
  
  return data;
}

export async function createCard(
  english: string, 
  translation: string, 
  groupId: string
): Promise<StudyCard | null> {
  // Get user ID from auth if available
  const user = supabase.auth.getUser();
  const userId = (await user).data.user?.id;
  
  const { data, error } = await supabase
    .from('study_cards')
    .insert([{ 
      english, 
      translation, 
      learned: false,
      group_id: groupId,
      user_id: userId 
    }])
    .select()
    .single();
  
  if (error) {
    console.error('Error creating card:', error);
    return null;
  }
  
  return data;
}

export async function updateCard(
  id: string, 
  english: string, 
  translation: string
): Promise<StudyCard | null> {
  const { data, error } = await supabase
    .from('study_cards')
    .update({ english, translation })
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating card:', error);
    return null;
  }
  
  return data;
}

export async function toggleCardLearned(id: string, learned: boolean): Promise<StudyCard | null> {
  const { data, error } = await supabase
    .from('study_cards')
    .update({ learned })
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error toggling card learned status:', error);
    return null;
  }
  
  return data;
}

export async function deleteCard(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('study_cards')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting card:', error);
    return false;
  }
  
  return true;
}

export async function getCardsStats(): Promise<{ total: number, learned: number }> {
  // Get total count
  const { count: total, error: totalError } = await supabase
    .from('study_cards')
    .select('*', { count: 'exact', head: true });
  
  // Get learned count
  const { count: learned, error: learnedError } = await supabase
    .from('study_cards')
    .select('*', { count: 'exact', head: true })
    .eq('learned', true);
  
  if (totalError || learnedError || total === null || learned === null) {
    console.error('Error getting cards stats:', totalError || learnedError);
    return { total: 0, learned: 0 };
  }
  
  return { total, learned };
}