import { TextToSpeechResponse } from '../types';
import { API_URL } from '../api';

export async function convertTextToSpeech(text: string): Promise<TextToSpeechResponse> {
  try {
    const response = await fetch(`${API_URL}/text-to-speech?text=${encodeURIComponent(text)}`);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to convert text to speech');
    }

    const audioData = await response.arrayBuffer();
    return { audioData };
  } catch (error) {
    return { 
      error: error instanceof Error ? error.message : 'An unexpected error occurred' 
    };
  }
}