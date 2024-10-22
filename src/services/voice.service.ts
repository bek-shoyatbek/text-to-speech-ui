import { API_URL } from '../api';
import { Voice } from '../types/voice';

export async function fetchVoices(): Promise<Voice[]> {
  try {
    const response = await fetch(`${API_URL}/voices`);
    if (!response.ok) {
      throw new Error('Failed to fetch voices');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching voices:', error);
    throw error;
  }
}

export async function convertTextToSpeech(options: {
  text: string;
  voiceId: string;
  speed: number;
  quality: 'low' | 'medium' | 'high';
}): Promise<ArrayBuffer> {
  const params = new URLSearchParams({
    text: options.text,
    voiceId: options.voiceId,
    speed: options.speed.toString(),
    quality: options.quality
  });

  const response = await fetch(`${API_URL}/text-to-speech?${params}`);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to convert text to speech');
  }

  return await response.arrayBuffer();
}