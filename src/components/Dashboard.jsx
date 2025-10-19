import React, { useState, useEffect } from 'react';
import { API_URL } from '../config';
import '../styles/dashboard.css';
import AudioPlayer from './Audioplayer';

const Dashboard = ({ user, onLogout, onBackToSearch }) => {
  const [favorites, setFavorites] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedSong, setSelectedSong] = useState(null);
  const [expandedLanguages, setExpandedLanguages] = useState({});
  const [filterLanguage, setFilterLanguage] = useState('all');

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/favorites`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        setFavorites(data);
        // Expand all languages by default
        const expanded = {};
        Object.keys(data).forEach(lang => {
          expanded[lang] = true;
        });
        setExpandedLanguages(expanded);
      }
    } catch (err) {
      console.error('Error fetching favorites:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleLanguage = (language) => {
    setExpandedLanguages(prev => ({
      ...prev,
      [language]: !prev[language]
    }));
  };

  const handleLogout = async () => {
    try {
      await fetch(`${API_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      });
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      onLogout();
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const removeFavorite = async (songId) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`${API_URL}/api/favorites/${songId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include'
      });
      fetchFavorites(); // Refresh the list
    } catch (err) {
      console.error('Error removing favorite:', err);
    }
  };

  const getLanguageEmoji = (language) => {
    const emojiMap = {
      'English': '🇬🇧',
      'Telugu': '🇮🇳',
      'Hindi': '🇮🇳',
      'Bengali': '🇧🇩',
      'Tamil': '🇮🇳',
      'Japanese': '🇯🇵',
      'Korean': '🇰🇷',
      'Spanish': '🇪🇸',
      'French': '🇫🇷',
      'German': '🇩🇪',
      'Chinese': '🇨🇳',
      'Arabic': '🇸🇦',
      'Portuguese': '🇵🇹',
      'Russian': '🇷🇺'
    };
    return emojiMap[language] || '🎵';
  };

  const filteredFavorites = filterLanguage === 'all' 
    ? favorites 
    : { [filterLanguage]: favorites[filterLanguage] || [] };

  const languages = Object.keys(favorites);
  const totalSongs = Object.values(favorites).reduce((sum, songs) => sum + songs.length, 0);

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Loading your music library...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <button className="back-btn" onClick={onBackToSearch} title="Back to Search">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="19" y1="12" x2="5" y2="12"/>
              <polyline points="12 19 5 12 12 5"/>
            </svg>
          </button>
          <div className="logo">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18V5l12-2v13"/>
              <circle cx="6" cy="18" r="3"/>
              <circle cx="18" cy="16" r="3"/>
            </svg>
            <h1>Music Library</h1>
          </div>
        </div>
        <div className="header-right">
          <div className="user-info">
            <div className="user-avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="user-details">
              <span className="user-name">{user.name}</span>
              <span className="user-email">{user.email}</span>
            </div>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Logout
          </button>
        </div>
      </header>

      {/* Stats Bar */}
      <div className="stats-bar">
        <div className="stat-item">
          <span className="stat-value">{totalSongs}</span>
          <span className="stat-label">Total Songs</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{languages.length}</span>
          <span className="stat-label">Languages</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{new Set(Object.values(favorites).flat().map(s => s.artist)).size}</span>
          <span className="stat-label">Artists</span>
        </div>
      </div>

      {/* Language Filter */}
      <div className="language-filter">
        <button 
          className={filterLanguage === 'all' ? 'active' : ''}
          onClick={() => setFilterLanguage('all')}
        >
          All Languages
        </button>
        {languages.map(lang => (
          <button
            key={lang}
            className={filterLanguage === lang ? 'active' : ''}
            onClick={() => setFilterLanguage(lang)}
          >
            {getLanguageEmoji(lang)} {lang}
          </button>
        ))}
      </div>

      {/* Albums by Language */}
      <div className="albums-container">
        {totalSongs === 0 ? (
          <div className="empty-state">
            <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M9 18V5l12-2v13"/>
              <circle cx="6" cy="18" r="3"/>
              <circle cx="18" cy="16" r="3"/>
            </svg>
            <h2>No Favorites Yet</h2>
            <p>Start adding songs to your library to see them here!</p>
            <button className="browse-btn" onClick={onBackToSearch}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
              Browse Music
            </button>
          </div>
        ) : (
          Object.entries(filteredFavorites).map(([language, songs]) => (
            <div key={language} className="language-section">
              <div className="language-header" onClick={() => toggleLanguage(language)}>
                <div className="language-title">
                  <span className="language-emoji">{getLanguageEmoji(language)}</span>
                  <h2>{language}</h2>
                  <span className="song-count">{songs.length} songs</span>
                </div>
                <button className="collapse-btn">
                  <svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor"
                    style={{ transform: expandedLanguages[language] ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  >
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>
              </div>

              {expandedLanguages[language] && (
                <div className="songs-grid">
                  {songs.map((song) => (
                    <div key={song._id} className="song-card-dashboard">
                      <div 
                        className="song-cover"
                        onClick={() => setSelectedSong(song)}
                      >
                        <img 
                          src={song.coverArt || 'https://via.placeholder.com/200?text=Music'} 
                          alt={song.title}
                          onError={(e) => e.target.src = 'https://via.placeholder.com/200?text=Music'}
                        />
                        <div className="play-overlay">
                          <svg width="48" height="48" viewBox="0 0 24 24" fill="white">
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                          </svg>
                        </div>
                      </div>
                      <div className="song-details">
                        <h3 className="song-title">{song.title}</h3>
                        <p className="song-artist">{song.artist}</p>
                        <p className="song-album">{song.album}</p>
                      </div>
                      <button 
                        className="remove-btn"
                        onClick={() => removeFavorite(song.songId)}
                        title="Remove from favorites"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Audio Player */}
      {selectedSong && (
        <AudioPlayer 
          song={selectedSong} 
          onClose={() => setSelectedSong(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;
