import { useState, useEffect } from 'react';
import { Voice } from '../../types/voice';
import { fetchVoices } from '../../services/voice.service';
import styles from './VoiceSelector.module.css';

interface VoiceSelectorProps {
  selectedVoiceId: string;
  onVoiceSelect: (voiceId: string) => void;
  disabled?: boolean;
}

export default function VoiceSelector({
  selectedVoiceId,
  onVoiceSelect,
  disabled = false
}: VoiceSelectorProps) {
  const [voices, setVoices] = useState<Voice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [filter, setFilter] = useState({
    language: '',
    gender: '',
    style: ''
  });

  useEffect(() => {
    loadVoices();
  }, []);

  const selectedVoice = voices.find(v => v.id === selectedVoiceId);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  async function loadVoices() {
    try {
      setIsLoading(true);
      const voiceList = await fetchVoices();
      setVoices(voiceList);
      if (!selectedVoiceId && voiceList.length > 0) {
        onVoiceSelect(voiceList[0].id);
      }
    } catch (err) {
      setError('Failed to load voices');
    } finally {
      setIsLoading(false);
    }
  }

  const filteredVoices = voices.filter(voice => {
    return (
      (!filter.language || voice.languageCode.includes(filter.language)) &&
      (!filter.gender || voice.gender === filter.gender) &&
      (!filter.style || voice.styles?.includes(filter.style))
    );
  });

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <i className="fas fa-spinner fa-spin"></i>
        Loading voices...
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <i className="fas fa-exclamation-circle"></i>
        {error}
      </div>
    );
  }

  return (
    <div className={styles.voiceSelectorWrapper}>
      <div className={styles.selectedVoiceBar} onClick={toggleExpanded}>
        <div className={styles.selectedVoiceInfo}>
          <div className={styles.selectedVoiceDetails}>
            <h3 className={styles.selectedVoiceName}>
              {selectedVoice ? selectedVoice.name : 'Select a voice'}
            </h3>
            {selectedVoice && (
              <p className={styles.selectedVoiceLanguage}>
                {selectedVoice.language} • {selectedVoice.gender}
              </p>
            )}
          </div>
          {selectedVoice && (
            <audio 
              className={styles.miniPlayer}
              controls
              src={selectedVoice.sampleUrl}
            />
          )}
        </div>
        <button 
          className={`${styles.expandButton} ${isExpanded ? styles.expanded : ''}`}
          aria-label={isExpanded ? 'Collapse voice options' : 'Expand voice options'}
        >
          <i className={`fas fa-chevron-${isExpanded ? 'up' : 'down'}`}></i>
        </button>
      </div>

      <div className={`${styles.voiceSelectorContent} ${isExpanded ? styles.expanded : ''}`}>
        <div className={styles.filtersContainer}>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Language</label>
            <select
              className={styles.filterSelect}
              value={filter.language}
              onChange={(e) => setFilter(prev => ({ ...prev, language: e.target.value }))}
            >
              <option value="">All Languages</option>
              {Array.from(new Set(voices.map(v => v.languageCode))).map(code => (
                <option key={code} value={code}>{code}</option>
              ))}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Gender</label>
            <select
              className={styles.filterSelect}
              value={filter.gender}
              onChange={(e) => setFilter(prev => ({ ...prev, gender: e.target.value }))}
            >
              <option value="">All Genders</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Style</label>
            <select
              className={styles.filterSelect}
              value={filter.style}
              onChange={(e) => setFilter(prev => ({ ...prev, style: e.target.value }))}
            >
              <option value="">All Styles</option>
              {Array.from(new Set(voices.flatMap(v => v.styles)))?.map(style => (
                <option key={style} value={style}>{style}</option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.voiceGrid}>
          {filteredVoices?.map((voice) => (
            <div
              key={voice.id}
              className={`${styles.voiceCard} ${selectedVoiceId === voice.id ? styles.selected : ''}`}
              onClick={() => !disabled && onVoiceSelect(voice.id)}
            >
              <div className={styles.voiceInfo}>
                <div>
                  <h3 className={styles.voiceName}>{voice.name}</h3>
                  <p className={styles.voiceLanguage}>{voice.language}</p>
                </div>
                <div className={styles.voiceBadges}>
                  <span className={styles.genderBadge}>{voice.gender}</span>
                    {voice?.styles?.map(style => (
                    <span key={style} className={styles.styleBadge}>{style}</span>
                  ))}
                </div>
              </div>
              
              <div className={styles.voicePreview}>
                <audio 
                  className={styles.audioPlayer}
                  controls
                  src={voice.sampleUrl}
                >
                  <source src={voice.sampleUrl} type="audio/wav" />
                </audio>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}