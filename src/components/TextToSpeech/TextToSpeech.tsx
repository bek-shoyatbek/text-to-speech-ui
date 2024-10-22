import { useState, useRef, useEffect } from 'react';
import { convertTextToSpeech } from '../../services/text-to-speech.service';
import { ConversionState } from '../../types';
import styles from './TextToSpeech.module.css';

export default function TextToSpeech() {
  const [text, setText] = useState('');
  const [conversionState, setConversionState] = useState<ConversionState>({
    isLoading: false,
    error: undefined,
    audioUrl: undefined,
    audioBlob: undefined
  });

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Cleanup function to revoke object URL when component unmounts
    // or when a new audio URL is created
    return () => {
      if (conversionState.audioUrl) {
        URL.revokeObjectURL(conversionState.audioUrl);
      }
    };
  }, [conversionState.audioUrl]);

  const handleConvert = async () => {
    const trimmedText = text.trim();
    if (!trimmedText) {
      setConversionState(prev => ({
        ...prev,
        error: 'Please enter some text to convert'
      }));
      return;
    }

    setConversionState(prev => ({
      ...prev,
      isLoading: true,
      error: undefined,
      audioUrl: undefined,
      audioBlob: undefined
    }));

    const response = await convertTextToSpeech(trimmedText);

    if (response.error) {
      setConversionState(prev => ({
        ...prev,
        isLoading: false,
        error: response.error
      }));
      return;
    }

    if (response.audioData) {
      const blob = new Blob([response.audioData], { type: 'audio/mpeg' });
      const url = URL.createObjectURL(blob);

      setConversionState(prev => ({
        ...prev,
        isLoading: false,
        audioUrl: url,
        audioBlob: blob
      }));
    }
  };

  const handleDownload = () => {
    if (conversionState.audioBlob && conversionState.audioUrl) {
      const a = document.createElement('a');
      a.href = conversionState.audioUrl;
      a.download = 'speech.mp3';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleConvert();
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Text to Speech Converter</h1>
      
      <textarea
        className={styles.textarea}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Enter your text here to convert it to speech..."
        rows={6}
      />

      <div className={styles.buttonGroup}>
        <button
          className={`${styles.button} ${styles.convertButton}`}
          onClick={handleConvert}
          disabled={conversionState.isLoading}
        >
          <i className="fas fa-play" />
          {conversionState.isLoading ? 'Converting...' : 'Convert to Speech'}
        </button>

        <button
          className={`${styles.button} ${styles.downloadButton}`}
          onClick={handleDownload}
          disabled={!conversionState.audioUrl}
        >
          <i className="fas fa-download" />
          Download Audio
        </button>
      </div>

      {conversionState.error && (
        <div className={styles.error}>
          {conversionState.error}
        </div>
      )}

      {conversionState.isLoading && (
        <div className={styles.loading}>
          <i className="fas fa-spinner fa-spin" /> Converting text to speech...
        </div>
      )}

      {conversionState.audioUrl && (
        <div className={styles.audioContainer}>
          <audio
            ref={audioRef}
            controls
            src={conversionState.audioUrl}
            className={styles.audio}
          />
        </div>
      )}
    </div>
  );
}