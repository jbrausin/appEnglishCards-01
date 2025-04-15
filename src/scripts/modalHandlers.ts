// src/scripts/modalHandlers.ts

// Variables para mantener el estado actual
let currentLanguageId: string | null = null;
let currentGroupId: string | null = null;

// Funciones para los modales de idioma
export function openCreateLanguageModal() {
  const modal = document.getElementById('create-language-modal');
  if (modal) {
    modal.classList.remove('hidden');
    const input = document.getElementById('language-name');
    if (input && input instanceof HTMLInputElement) input.focus();
  }
}

export function closeCreateLanguageModal() {
  const modal = document.getElementById('create-language-modal');
  if (modal) {
    modal.classList.add('hidden');
    const form = document.getElementById('create-language-form');
    if (form && form instanceof HTMLFormElement) form.reset();
  }
}

export function openEditLanguageModal(languageId: string, languageName: string) {
  const modal = document.getElementById('edit-language-modal');
  const input = document.getElementById('edit-language-name');
  
  if (modal && input && input instanceof HTMLInputElement) {
    currentLanguageId = languageId;
    input.value = languageName;
    modal.classList.remove('hidden');
    input.focus();
  }
}

export function closeEditLanguageModal() {
  const modal = document.getElementById('edit-language-modal');
  if (modal) {
    modal.classList.add('hidden');
    currentLanguageId = null;
  }
}

export function openDeleteLanguageModal(languageId: string) {
  const modal = document.getElementById('delete-language-modal');
  if (modal) {
    currentLanguageId = languageId;
    modal.classList.remove('hidden');
  }
}

export function closeDeleteLanguageModal() {
  const modal = document.getElementById('delete-language-modal');
  if (modal) {
    modal.classList.add('hidden');
    currentLanguageId = null;
  }
}

// Funciones para los modales de grupo
export function openCreateGroupModal(languageId: string) {
  const modal = document.getElementById('create-group-modal');
  const languageIdInput = document.getElementById('group-language-id');
  
  if (modal && languageIdInput && languageIdInput instanceof HTMLInputElement) {
    languageIdInput.value = languageId;
    modal.classList.remove('hidden');
    const input = document.getElementById('group-name');
    if (input && input instanceof HTMLInputElement) input.focus();
  }
}

export function closeCreateGroupModal() {
  const modal = document.getElementById('create-group-modal');
  if (modal) {
    modal.classList.add('hidden');
    const form = document.getElementById('create-group-form');
    if (form && form instanceof HTMLFormElement) form.reset();
  }
}

export function openEditGroupModal(groupId: string, groupName: string, languageId: string) {
  const modal = document.getElementById('edit-group-modal');
  const input = document.getElementById('edit-group-name');
  const languageIdInput = document.getElementById('edit-group-language-id');
  
  if (modal && input && input instanceof HTMLInputElement && languageIdInput && languageIdInput instanceof HTMLInputElement) {
    currentGroupId = groupId;
    input.value = groupName;
    languageIdInput.value = languageId;
    modal.classList.remove('hidden');
    input.focus();
  }
}

export function closeEditGroupModal() {
  const modal = document.getElementById('edit-group-modal');
  if (modal) {
    modal.classList.add('hidden');
    currentGroupId = null;
  }
}

export function openDeleteGroupModal(groupId: string, languageId: string) {
  const modal = document.getElementById('delete-group-modal');
  const languageIdInput = document.getElementById('delete-group-language-id');
  
  if (modal && languageIdInput && languageIdInput instanceof HTMLInputElement) {
    currentGroupId = groupId;
    languageIdInput.value = languageId;
    modal.classList.remove('hidden');
  }
}

export function closeDeleteGroupModal() {
  const modal = document.getElementById('delete-group-modal');
  if (modal) {
    modal.classList.add('hidden');
    currentGroupId = null;
  }
}

// Funciones para los modales de tarjetas
export function openAddCardModal(groupId: string) {
  const modal = document.getElementById('add-card-modal');
  if (modal) {
    currentGroupId = groupId;
    modal.classList.remove('hidden');
    const input = document.getElementById('card-english');
    if (input && input instanceof HTMLInputElement) input.focus();
  }
}

export function closeAddCardModal() {
  const modal = document.getElementById('add-card-modal');
  if (modal) {
    modal.classList.add('hidden');
    const form = document.getElementById('add-card-form');
    if (form && form instanceof HTMLFormElement) form.reset();
    currentGroupId = null;
  }
}

export function openEditCardModal(cardId: string, english: string, translation: string, groupId?: string) {
  const modal = document.getElementById('edit-card-modal');
  const idInput = document.getElementById('edit-card-id');
  const groupIdInput = document.getElementById('edit-card-group-id');
  const englishInput = document.getElementById('edit-card-english');
  const translationInput = document.getElementById('edit-card-translation');
  
  if (modal && idInput && groupIdInput && englishInput && translationInput) {
    if (idInput instanceof HTMLInputElement) idInput.value = cardId;
    if (groupIdInput instanceof HTMLInputElement) groupIdInput.value = groupId || (currentGroupId || "");
    if (englishInput instanceof HTMLInputElement) englishInput.value = english;
    if (translationInput instanceof HTMLInputElement) translationInput.value = translation;
    
    modal.classList.remove('hidden');
    if (englishInput instanceof HTMLInputElement) englishInput.focus();
  }
}

export function closeEditCardModal() {
  const modal = document.getElementById('edit-card-modal');
  if (modal) {
    modal.classList.add('hidden');
  }
}

export function openDeleteCardModal(cardId: string, groupId?: string) {
  const modal = document.getElementById('delete-card-modal');
  const idInput = document.getElementById('delete-card-id');
  const groupIdInput = document.getElementById('delete-card-group-id');
  
  if (modal && idInput && groupIdInput) {
    if (idInput instanceof HTMLInputElement) idInput.value = cardId;
    if (groupIdInput instanceof HTMLInputElement) groupIdInput.value = groupId || (currentGroupId || "");
    modal.classList.remove('hidden');
  }
}

export function closeDeleteCardModal() {
  const modal = document.getElementById('delete-card-modal');
  if (modal) {
    modal.classList.add('hidden');
  }
}

// Obtener el estado actual
export function getCurrentIds() {
  return {
    languageId: currentLanguageId,
    groupId: currentGroupId
  };
}

// Establecer valores en el window para acceso global
export function setupGlobalHandlers() {
  if (typeof window !== 'undefined') {
    window.openCreateLanguageModal = openCreateLanguageModal;
    window.openEditLanguageModal = openEditLanguageModal;
    window.openDeleteLanguageModal = openDeleteLanguageModal;
    window.openCreateGroupModal = openCreateGroupModal;
    window.openEditGroupModal = openEditGroupModal;
    window.openAddCardModal = openAddCardModal;
    window.openDeleteGroupModal = openDeleteGroupModal;
    window.openEditCardModal = openEditCardModal;
    window.openDeleteCardModal = openDeleteCardModal;
  }
}