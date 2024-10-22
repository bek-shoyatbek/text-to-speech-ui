// src/types/voice.ts

export interface Voice {
    voiceEngine: string;
    id: string;
    name: string;
    sampleUrl: string;
    language: string;
    languageCode: string;
    gender: string;
    ageGroup: string;
    styles: string[];
    isCloned: boolean;
  }
  
  export interface SpeechOptions {
    text: string;
    voiceId: string;
    speed: number;
    quality: 'low' | 'medium' | 'high';
  }
  
  export interface VoiceState {
    voices: Voice[];
    isLoading: boolean;
    error: string | null;
  }