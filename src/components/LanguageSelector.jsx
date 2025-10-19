import React, { useState } from 'react';
import '../styles/languageSelector.css';

const LanguageSelector = ({ isOpen, onClose, onSelect, songTitle }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const languages = [
    { name: 'English', emoji: '🇬🇧' },
    { name: 'Telugu', emoji: '🇮🇳' },
    { name: 'Hindi', emoji: '🇮🇳' },
    { name: 'Tamil', emoji: '🇮🇳' },
    { name: 'Bengali', emoji: '🇧🇩' },
    { name: 'Japanese', emoji: '🇯🇵' },
    { name: 'Korean', emoji: '🇰🇷' },
    { name: 'Spanish', emoji: '🇪🇸' },
    { name: 'French', emoji: '🇫🇷' },
    { name: 'German', emoji: '🇩🇪' },
    { name: 'Portuguese', emoji: '🇵🇹' },
    { name: 'Chinese', emoji: '🇨🇳' },
    { name: 'Arabic', emoji: '🇸🇦' },
    { name: 'Russian', emoji: '🇷🇺' },
    { name: 'Italian', emoji: '🇮🇹' },
    { name: 'Punjabi', emoji: '🇮🇳' },
    { name: 'Kannada', emoji: '🇮🇳' },
    { name: 'Malayalam', emoji: '🇮🇳' },
    { name: 'Marathi', emoji: '🇮🇳' },
    { name: 'Gujarati', emoji: '🇮🇳' }
  ];

  const handleSubmit = () => {
    onSelect(selectedLanguage);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="language-modal-overlay" onClick={onClose}>
      <div className="language-modal" onClick={(e) => e.stopPropagation()}>
        <div className="language-modal-header">
          <h2>Select Language</h2>
          <button className="close-btn" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="language-modal-body">
          <p className="modal-subtitle">Adding "{songTitle}" to your library</p>
          
          <div className="language-grid">
            {languages.map((lang) => (
              <button
                key={lang.name}
                className={`language-option ${selectedLanguage === lang.name ? 'selected' : ''}`}
                onClick={() => setSelectedLanguage(lang.name)}
              >
                <span className="language-emoji">{lang.emoji}</span>
                <span className="language-name">{lang.name}</span>
                {selectedLanguage === lang.name && (
                  <svg className="check-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="language-modal-footer">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="add-btn" onClick={handleSubmit}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            Add to Favorites
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;
