import { useState, useRef, useEffect } from 'react';
import VoiceSelector from '../VoiceSelector/VoiceSelector';
import { convertTextToSpeech } from '../../services/voice.service';
import styles from './TextToSpeech.module.css';

interface ConversionOptions {
  text: string;
  voiceId: string;
  speed: number;
  quality: 'low' | 'medium' | 'high';
}

export default function TextToSpeech() {
  const [text, setText] = useState('');
  const [voiceId, setVoiceId] = useState('');
  const [speed, setSpeed] = useState(1);
  const [quality, setQuality] = useState<'low' | 'medium' | 'high'>('medium');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [_isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  const handleConvert = async () => {
    try {
      if (!text.trim()) {
        throw new Error('Please enter some text to convert');
      }

      if (!voiceId) {
        throw new Error('Please select a voice');
      }

      setIsLoading(true);
      setError(null);

      // Clean up previous audio URL
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }

      const options: ConversionOptions = {
        text: text.trim(),
        voiceId,
        speed,
        quality
      };

      const audioData = await convertTextToSpeech(options);
      const blob = new Blob([audioData], { type: 'audio/mpeg' });
      const url = URL.createObjectURL(blob);
      
      setAudioUrl(url);
      if (audioRef.current) {
        audioRef.current.load();
         audioRef.current.play();
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Conversion error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleConvert();
      e.preventDefault();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Text to Speech Converter</h1>
        <p className={styles.subtitle}>Convert your text into natural-sounding speech</p>
      </div>

      <div className={styles.mainSection}>
        <div className={styles.inputSection}>
          <div className={styles.textareaWrapper}>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter your text here... (Press Ctrl/⌘ + Enter to convert)"
              className={styles.textarea}
              rows={6}
            />
            <div className={styles.shortcutHint}>
              <i className="fas fa-keyboard"></i>
              Ctrl/⌘ + Enter to convert
            </div>
          </div>

          <div className={styles.optionsPanel}>
            <div className={styles.optionGroup}>
              <label className={styles.optionLabel}>
                <i className="fas fa-tachometer-alt"></i>
                Speed
              </label>
              <div className={styles.speedControl}>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}
                  className={styles.slider}
                />
                <span className={styles.speedValue}>{speed}x</span>
              </div>
            </div>

            <div className={styles.optionGroup}>
              <label className={styles.optionLabel}>
                <i className="fas fa-cog"></i>
                Quality
              </label>
              <select
                value={quality}
                onChange={(e) => setQuality(e.target.value as 'low' | 'medium' | 'high')}
                className={styles.select}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <button
              onClick={handleConvert}
              disabled={isLoading}
              className={styles.convertButton}
              title={`Convert text to speech (${navigator.platform.includes('Mac') ? '⌘' : 'Ctrl'} + Enter)`}
            >
              {isLoading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  Converting...
                </>
              ) : (
                <>
                  <i className="fas fa-play"></i>
                  Convert to Speech
                </>
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className={styles.error}>
            <i className="fas fa-exclamation-circle"></i>
            {error}
          </div>
        )}

        {audioUrl && (
          <div className={styles.audioResult}>
            <div className={styles.audioPlayer}>
              <audio ref={audioRef} controls src={audioUrl}>
                Your browser does not support the audio element.
              </audio>
            </div>
            <button 
              className={styles.downloadButton}
              onClick={() => {
                const a = document.createElement('a');
                a.href = audioUrl;
                a.download = 'converted-speech.mp3';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
              }}
            >
              <i className="fas fa-download"></i>
              Download Audio
            </button>
          </div>
        )}
        <VoiceSelector
          selectedVoiceId={voiceId}
          onVoiceSelect={setVoiceId}
          disabled={isLoading}
        />
      </div>
    </div>
  );
}