// src/scripts/main.ts
import { setupGlobalHandlers } from './modalHandlers';
import { setupAllFormHandlers } from './formHandlers';

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  // Configurar handlers para modales
  setupGlobalHandlers();
  
  // Configurar handlers para formularios
  setupAllFormHandlers();
  
  // Inicialización adicional si es necesaria
  initializeLocalStorage();
});

// Función para asegurarse de que las estructuras de datos básicas existan en localStorage
function initializeLocalStorage() {
  // Verificar si existen las estructuras de datos básicas
  if (!localStorage.getItem('languages')) {
    localStorage.setItem('languages', JSON.stringify([]));
  }
  
  if (!localStorage.getItem('studyGroups')) {
    localStorage.setItem('studyGroups', JSON.stringify([]));
  }
}

// Declaración de tipos para window
declare global {
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
    showToast: (message: string, type?: string, duration?: number) => void;
  }
}