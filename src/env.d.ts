/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface Language {
  id: string;
  name: string;
}

interface StudyGroup {
  id: string;
  name: string;
  languageId: string;
}

interface StudyCard {
  id: string;
  english: string;
  translation: string;
  learned: boolean;
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