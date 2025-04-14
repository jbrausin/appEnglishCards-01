/// <reference types="astro/client" />

interface ImportMetaEnv {
    // Define aquí las variables de entorno que podrías usar
    // readonly PUBLIC_API_URL: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  
  // Definir la interfaz StudyCard global
  interface StudyCard {
    id: string;
    english: string;
    translation: string;
    learned: boolean;
  }