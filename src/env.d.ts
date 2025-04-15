/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SUPABASE_URL: string;
  readonly PUBLIC_SUPABASE_ANON_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Language {
  id: string;
  name: string;
  user_id?: string;
  created_at?: string;
}

interface StudyGroup {
  id: string;
  name: string;
  language_id: string;
  user_id?: string;
  created_at?: string;
}

interface StudyCard {
  id: string;
  english: string;
  translation: string;
  learned: boolean;
  group_id: string;
  user_id?: string;
  created_at?: string;
}

// Extend Window interface to include our custom functions
interface Window {
  openCreateLanguageModal: () => void;
  openEditLanguageModal: (languageId: string, languageName: string) => void;
  openDeleteLanguageModal: (languageId: string) => void;
  openCreateGroupModal: (languageId: string) => void;
  openEditGroupModal: (groupId: string, groupName: string, languageId: string) => void;
  openAddCardModal: (groupId: string) => void;
  openDeleteGroupModal: (groupId: string, languageId: string) => void;
  openEditCardModal: (cardId: string, english: string, translation: string, groupId?: string) => void;
  openDeleteCardModal: (cardId: string, groupId?: string) => void;
}