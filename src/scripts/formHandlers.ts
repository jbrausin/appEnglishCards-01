// src/scripts/formHandlers.ts
import { 
    closeCreateLanguageModal, 
    closeEditLanguageModal, 
    closeCreateGroupModal,
    closeEditGroupModal,
    closeAddCardModal,
    closeEditCardModal,
    closeDeleteLanguageModal,
    closeDeleteGroupModal,
    closeDeleteCardModal,
    getCurrentIds
  } from './modalHandlers';
  
  // Tipos de datos
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
  
  // Handlers para formularios de idioma
  export function setupLanguageFormHandlers() {
    // Formulario para crear idioma
    const createLanguageForm = document.getElementById('create-language-form');
    createLanguageForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('language-name');
      
      if (!nameInput || !(nameInput instanceof HTMLInputElement)) return;
      
      const languageName = nameInput.value.trim();
      
      if (languageName) {
        // Obtener idiomas existentes
        const languagesJson = localStorage.getItem('languages') || '[]';
        const languages = JSON.parse(languagesJson);
        
        // Crear nuevo idioma
        const newLanguage = {
          id: Date.now().toString(),
          name: languageName
        };
        
        // Guardar en localStorage
        languages.push(newLanguage);
        localStorage.setItem('languages', JSON.stringify(languages));
        
        // Cerrar modal y mostrar notificación
        closeCreateLanguageModal();
        window.showToast('¡Idioma creado con éxito!');
        
        // Recargar la página para mostrar el nuevo idioma
        window.location.reload();
      }
    });
    
    // Formulario para editar idioma
    const editLanguageForm = document.getElementById('edit-language-form');
    editLanguageForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('edit-language-name');
      const { languageId } = getCurrentIds();
      
      if (!nameInput || !(nameInput instanceof HTMLInputElement)) return;
      
      const languageName = nameInput.value.trim();
      
      if (languageName && languageId) {
        // Obtener idiomas existentes
        const languagesJson = localStorage.getItem('languages') || '[]';
        const languages = JSON.parse(languagesJson);
        
        // Actualizar el nombre del idioma
        const updatedLanguages = languages.map((language: Language) => {
          if (language.id === languageId) {
            return { ...language, name: languageName };
          }
          return language;
        });
        
        // Guardar en localStorage
        localStorage.setItem('languages', JSON.stringify(updatedLanguages));
        
        // Cerrar modal y mostrar notificación
        closeEditLanguageModal();
        window.showToast('¡Idioma actualizado con éxito!');
        
        // Recargar la página para mostrar los cambios
        window.location.reload();
      }
    });
  
    // Confirmar eliminación de idioma
    document.getElementById('confirm-delete-language')?.addEventListener('click', () => {
      const { languageId } = getCurrentIds();
      
      if (languageId) {
        // Obtener idiomas existentes
        const languagesJson = localStorage.getItem('languages') || '[]';
        const languages = JSON.parse(languagesJson);
        
        // Obtener grupos del idioma
        const groupsJson = localStorage.getItem('studyGroups') || '[]';
        const groups = JSON.parse(groupsJson);
        const languageGroups = groups.filter((group: StudyGroup) => group.languageId === languageId);
        
        // Eliminar tarjetas de cada grupo
        languageGroups.forEach((group: StudyGroup) => {
          localStorage.removeItem(`cards_${group.id}`);
        });
        
        // Filtrar grupos para eliminar los del idioma
        const updatedGroups = groups.filter((group: StudyGroup) => group.languageId !== languageId);
        localStorage.setItem('studyGroups', JSON.stringify(updatedGroups));
        
        // Filtrar el idioma a eliminar
        const updatedLanguages = languages.filter((language: Language) => language.id !== languageId);
        
        // Guardar idiomas actualizados
        localStorage.setItem('languages', JSON.stringify(updatedLanguages));
        
        // Cerrar modal y mostrar notificación
        closeDeleteLanguageModal();
        window.showToast('Idioma eliminado correctamente');
        
        // Recargar la página
        window.location.reload();
      }
    });
  }
  
  // Handlers para formularios de grupo
  export function setupGroupFormHandlers() {
    // Formulario para crear grupo
    const createGroupForm = document.getElementById('create-group-form');
    createGroupForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('group-name');
      const languageIdInput = document.getElementById('group-language-id');
      
      if (!nameInput || !(nameInput instanceof HTMLInputElement) || 
          !languageIdInput || !(languageIdInput instanceof HTMLInputElement)) return;
      
      const groupName = nameInput.value.trim();
      const languageId = languageIdInput.value;
      
      if (groupName && languageId) {
        // Obtener grupos existentes
        const groupsJson = localStorage.getItem('studyGroups') || '[]';
        const groups = JSON.parse(groupsJson);
        
        // Crear nuevo grupo
        const newGroup = {
          id: Date.now().toString(),
          name: groupName,
          languageId: languageId
        };
        
        // Guardar en localStorage
        groups.push(newGroup);
        localStorage.setItem('studyGroups', JSON.stringify(groups));
        
        // Inicializar array de tarjetas vacío para este grupo
        localStorage.setItem(`cards_${newGroup.id}`, JSON.stringify([]));
        
        // Cerrar modal y mostrar notificación
        closeCreateGroupModal();
        window.showToast('¡Grupo creado con éxito!');
        
        // Recargar la página para mostrar el nuevo grupo
        window.location.reload();
      }
    });
    
    // Formulario para editar grupo
    const editGroupForm = document.getElementById('edit-group-form');
    editGroupForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('edit-group-name');
      const languageIdInput = document.getElementById('edit-group-language-id');
      const { groupId } = getCurrentIds();
      
      if (!nameInput || !(nameInput instanceof HTMLInputElement) || 
          !languageIdInput || !(languageIdInput instanceof HTMLInputElement)) return;
      
      const groupName = nameInput.value.trim();
      const languageId = languageIdInput.value;
      
      if (groupName && groupId) {
        // Obtener grupos existentes
        const groupsJson = localStorage.getItem('studyGroups') || '[]';
        const groups = JSON.parse(groupsJson);
        
        // Actualizar el nombre del grupo
        const updatedGroups = groups.map((group: StudyGroup) => {
          if (group.id === groupId) {
            return { ...group, name: groupName, languageId: languageId };
          }
          return group;
        });
        
        // Guardar en localStorage
        localStorage.setItem('studyGroups', JSON.stringify(updatedGroups));
        
        // Cerrar modal y mostrar notificación
        closeEditGroupModal();
        window.showToast('¡Grupo actualizado con éxito!');
        
        // Recargar la página para mostrar los cambios
        window.location.reload();
      }
    });
  
    // Confirmar eliminación de grupo
    document.getElementById('confirm-delete-group')?.addEventListener('click', () => {
      const { groupId } = getCurrentIds();
      
      if (groupId) {
        // Obtener grupos existentes
        const groupsJson = localStorage.getItem('studyGroups') || '[]';
        const groups = JSON.parse(groupsJson);
        
        // Filtrar el grupo a eliminar
        const updatedGroups = groups.filter((group: StudyGroup) => group.id !== groupId);
        
        // Guardar grupos actualizados
        localStorage.setItem('studyGroups', JSON.stringify(updatedGroups));
        
        // Eliminar las tarjetas asociadas al grupo
        localStorage.removeItem(`cards_${groupId}`);
        
        // Cerrar modal y mostrar notificación
        closeDeleteGroupModal();
        window.showToast('Grupo eliminado correctamente');
        
        // Redirigir a la página de idioma si estamos en la vista de estudio
        if (window.location.pathname.includes('/study/')) {
          const languageIdInput = document.getElementById('delete-group-language-id');
          if (languageIdInput && languageIdInput instanceof HTMLInputElement) {
            window.location.href = `/language/${languageIdInput.value}`;
          } else {
            window.location.href = '/';
          }
        } else {
          // Recargar la página para actualizar la lista de grupos
          window.location.reload();
        }
      }
    });
  }
  
  // Handlers para formularios de tarjetas
  export function setupCardFormHandlers() {
    // Formulario para añadir tarjeta
    const addCardForm = document.getElementById('add-card-form');
    addCardForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const englishInput = document.getElementById('card-english');
      const translationInput = document.getElementById('card-translation');
      const { groupId } = getCurrentIds();
      
      if (!englishInput || !(englishInput instanceof HTMLInputElement) || 
          !translationInput || !(translationInput instanceof HTMLInputElement)) return;
      
      const english = englishInput.value.trim();
      const translation = translationInput.value.trim();
      
      if (english && translation && groupId) {
        // Obtener tarjetas existentes del grupo
        const cardsJson = localStorage.getItem(`cards_${groupId}`) || '[]';
        const cards = JSON.parse(cardsJson);
        
        // Crear nueva tarjeta
        const newCard = {
          id: Date.now().toString(),
          english,
          translation,
          learned: false
        };
        
        // Guardar en localStorage
        cards.push(newCard);
        localStorage.setItem(`cards_${groupId}`, JSON.stringify(cards));
        
        // Cerrar modal y mostrar notificación
        closeAddCardModal();
        window.showToast('¡Tarjeta añadida con éxito!');
        
        // Recargar la página si estamos en la vista de estudio
        if (window.location.pathname.includes('/study/')) {
          window.location.reload();
        }
      }
    });
    
    // Formulario para editar tarjeta
    const editCardForm = document.getElementById('edit-card-form');
    editCardForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const idInput = document.getElementById('edit-card-id');
      const groupIdInput = document.getElementById('edit-card-group-id');
      const englishInput = document.getElementById('edit-card-english');
      const translationInput = document.getElementById('edit-card-translation');
      
      if (!idInput || !(idInput instanceof HTMLInputElement) || 
          !groupIdInput || !(groupIdInput instanceof HTMLInputElement) || 
          !englishInput || !(englishInput instanceof HTMLInputElement) || 
          !translationInput || !(translationInput instanceof HTMLInputElement)) return;
      
      const cardId = idInput.value;
      const groupId = groupIdInput.value;
      const english = englishInput.value.trim();
      const translation = translationInput.value.trim();
      
      if (cardId && groupId && english && translation) {
        // Obtener tarjetas existentes del grupo
        const cardsJson = localStorage.getItem(`cards_${groupId}`) || '[]';
        const cards = JSON.parse(cardsJson);
        
        // Actualizar la tarjeta
        const updatedCards = cards.map((card: StudyCard) => {
          if (card.id === cardId) {
            return { ...card, english, translation };
          }
          return card;
        });
        
        // Guardar en localStorage
        localStorage.setItem(`cards_${groupId}`, JSON.stringify(updatedCards));
        
        // Cerrar modal y mostrar notificación
        closeEditCardModal();
        window.showToast('¡Tarjeta actualizada con éxito!');
        
        // Recargar la página
        window.location.reload();
      }
    });
  
    // Confirmar eliminación de tarjeta
    document.getElementById('confirm-delete-card')?.addEventListener('click', () => {
      const idInput = document.getElementById('delete-card-id');
      const groupIdInput = document.getElementById('delete-card-group-id');
      
      if (!idInput || !(idInput instanceof HTMLInputElement) || 
          !groupIdInput || !(groupIdInput instanceof HTMLInputElement)) return;
      
      const cardId = idInput.value;
      const groupId = groupIdInput.value;
      
      if (cardId && groupId) {
        // Obtener tarjetas existentes del grupo
        const cardsJson = localStorage.getItem(`cards_${groupId}`) || '[]';
        const cards = JSON.parse(cardsJson);
        
        // Filtrar la tarjeta a eliminar
        const updatedCards = cards.filter((card: StudyCard) => card.id !== cardId);
        
        // Guardar en localStorage
        localStorage.setItem(`cards_${groupId}`, JSON.stringify(updatedCards));
        
        // Cerrar modal y mostrar notificación
        closeDeleteCardModal();
        window.showToast('Tarjeta eliminada correctamente');
        
        // Recargar la página
        window.location.reload();
      }
    });
  }
  
  // Configurar todos los handlers
  export function setupAllFormHandlers() {
    setupLanguageFormHandlers();
    setupGroupFormHandlers();
    setupCardFormHandlers();
  }