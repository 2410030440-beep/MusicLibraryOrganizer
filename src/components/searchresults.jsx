import React, { useState, useEffect } from 'react';
import { API_URL } from '../config';
import LanguageSelector from './LanguageSelector';
import '../styles/searchresults.css';

const SearchResults = ({ results, onSelect, loading, user }) => {
  const [favoriteIds, setFavoriteIds] = useState(new Set());
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [selectedSongForFavorite, setSelectedSongForFavorite] = useState(null);
  const [addingFavorite, setAddingFavorite] = useState(false);

  useEffect(() => {
    // Fetch user's favorites to check which songs are already favorited
    const fetchFavoriteIds = async () => {
      if (!user) return;
      
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
          const ids = new Set();
          Object.values(data).forEach(songs => {
            songs.forEach(song => {
              if (song.youtubeId) ids.add(song.youtubeId);
            });
          });
          setFavoriteIds(ids);
        }
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchFavoriteIds();
  }, [user]);

  const handleAddToFavorites = (song, e) => {
    e.stopPropagation();
    setSelectedSongForFavorite(song);
    setShowLanguageModal(true);
  };

  const handleRemoveFromFavorites = async (song, e) => {
    e.stopPropagation();
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/favorites/${song.youtubeId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include'
      });

      if (response.ok) {
        setFavoriteIds(prev => {
          const newSet = new Set(prev);
          newSet.delete(song.youtubeId);
          return newSet;
        });
      }
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  const handleLanguageSelect = async (language) => {
    if (!selectedSongForFavorite) return;
    
    setAddingFavorite(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/favorites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify({
          songId: selectedSongForFavorite.youtubeId,
          title: selectedSongForFavorite.title,
          artist: selectedSongForFavorite.artist,
          album: selectedSongForFavorite.album,
          language: language,
          coverArt: selectedSongForFavorite.coverArt,
          youtubeUrl: selectedSongForFavorite.youtubeUrl,
          youtubeId: selectedSongForFavorite.youtubeId
        })
      });

      if (response.ok) {
        setFavoriteIds(prev => new Set([...prev, selectedSongForFavorite.youtubeId]));
      }
    } catch (error) {
      console.error('Error adding favorite:', error);
    } finally {
      setAddingFavorite(false);
      setSelectedSongForFavorite(null);
    }
  };

  const isFavorite = (song) => {
    return favoriteIds.has(song.youtubeId);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading songs...</p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="no-results">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <h3>No songs found</h3>
        <p>Try searching for different keywords</p>
      </div>
    );
  }

  return (
    <div className="results-container">
      <div className="results-header">
        <h2>Search Results</h2>
        <span className="results-count">{results.length} songs found</span>
      </div>
      
      <div className="results-grid">
        {results.map((song) => (
          <div 
            key={song._id} 
            className="song-card"
            onClick={() => onSelect(song)}
          >
            <div className="song-cover">
              <img 
                src={song.coverArt || 'https://via.placeholder.com/200x200/667eea/ffffff?text=No+Cover'} 
                alt={`${song.title} cover`}
                onError={(e) => e.target.src = 'https://via.placeholder.com/200x200/667eea/ffffff?text=No+Cover'}
              />
              <div className="play-overlay">
                <svg className="play-icon" width="48" height="48" viewBox="0 0 24 24" fill="white">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </div>
              {user && (
                <button 
                  className={`favorite-btn ${isFavorite(song) ? 'favorited' : ''}`}
                  onClick={(e) => isFavorite(song) ? handleRemoveFromFavorites(song, e) : handleAddToFavorites(song, e)}
                  title={isFavorite(song) ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill={isFavorite(song) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </button>
              )}
            </div>
            
            <div className="song-info">
              <h3 className="song-title" title={song.title}>{song.title}</h3>
              <p className="song-artist" title={song.artist}>{song.artist}</p>
              <div className="song-meta">
                <span className="album" title={song.album}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="10"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                  {song.album}
                </span>
                <span className="genre">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M9 18V5l12-2v13"/>
                    <circle cx="6" cy="18" r="3"/>
                    <circle cx="18" cy="16" r="3"/>
                  </svg>
                  {song.genre}
                </span>
              </div>
              <div className="song-footer">
                <span className="duration">{song.duration}</span>
                <span className="year">{song.releaseYear}</span>
                {song.youtubeUrl && (
                  <a 
                    href={song.youtubeUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="youtube-link"
                    onClick={(e) => e.stopPropagation()}
                    title="Watch on YouTube"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                )}
                {song.spotifyUrl && (
                  <a 
                    href={song.spotifyUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="spotify-link"
                    onClick={(e) => e.stopPropagation()}
                    title="Open in Spotify"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <LanguageSelector 
        isOpen={showLanguageModal}
        onClose={() => {
          setShowLanguageModal(false);
          setSelectedSongForFavorite(null);
        }}
        onSelect={handleLanguageSelect}
        songTitle={selectedSongForFavorite?.title || ''}
      />
    </div>
  );
};

export default SearchResults;
