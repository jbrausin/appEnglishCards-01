/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface StudyGroup {
    id: string;
    name: string;
  }
  
  interface StudyCard {
    id: string;
    english: string;
    translation: string;
    learned: boolean;
  }
  
  // Extend Window interface to include our custom functions
  interface Window {
    openCreateGroupModal: () => void;
    openEditGroupModal: (groupId: string, groupName: string) => void;
    openAddCardModal: (groupId: string) => void;
    openDeleteGroupModal: (groupId: string) => void;
    openEditCardModal: (cardId: string, english: string, translation: string, groupId?: string) => void;
    openDeleteCardModal: (cardId: string, groupId?: string) => void;
  }