export interface ConversionState {
    isLoading: boolean;
    error: string | undefined;
    audioUrl: string | undefined;
    audioBlob: Blob | undefined;
  }
  
  export interface TextToSpeechResponse {
    error?: string;
    audioData?: ArrayBuffer;
  }