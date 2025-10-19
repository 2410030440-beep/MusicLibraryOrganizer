import React, { useState, useEffect } from 'react';
import '../styles/suggestions.css';

const Suggestions = ({ currentSong, onSongSelect }) => {
  const [genres, setGenres] = useState([]);
  const [recommendedSongs, setRecommendedSongs] = useState([]);

  useEffect(() => {
    // Fetch available genres
    fetch('http://localhost:5000/api/genres')
      .then(res => res.json())
      .then(data => setGenres(data))
      .catch(err => console.error('Error fetching genres:', err));
  }, []);

  useEffect(() => {
    // Fetch recommended songs based on current song's genre
    if (currentSong && currentSong.genre) {
      fetch(`http://localhost:5000/api/genre/${currentSong.genre}`)
        .then(res => res.json())
        .then(data => {
          // Filter out the current song and limit to 4 recommendations
          const filtered = data.filter(song => song._id !== currentSong._id).slice(0, 4);
          setRecommendedSongs(filtered);
        })
        .catch(err => console.error('Error fetching recommendations:', err));
    }
  }, [currentSong]);

  const handleGenreClick = (genre) => {
    fetch(`http://localhost:5000/api/genre/${genre}`)
      .then(res => res.json())
      .then(data => setRecommendedSongs(data.slice(0, 6)))
      .catch(err => console.error('Error fetching genre songs:', err));
  };

  return (
    <div className="suggestions-container">
      <div className="genres-section">
        <h3 className="section-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M9 18V5l12-2v13"/>
            <circle cx="6" cy="18" r="3"/>
            <circle cx="18" cy="16" r="3"/>
          </svg>
          Browse by Genre
        </h3>
        <div className="genres-grid">
          {genres.map((genre, index) => (
            <button
              key={index}
              className="genre-card"
              onClick={() => handleGenreClick(genre)}
              style={{
                background: `linear-gradient(135deg, ${getGenreColor(genre, 0)} 0%, ${getGenreColor(genre, 1)} 100%)`
              }}
            >
              <span className="genre-name">{genre}</span>
              <svg className="genre-icon" width="40" height="40" viewBox="0 0 24 24" fill="white" opacity="0.3">
                <circle cx="12" cy="12" r="10"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </button>
          ))}
        </div>
      </div>

      {recommendedSongs.length > 0 && (
        <div className="recommendations-section">
          <h3 className="section-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            {currentSong ? `More like "${currentSong.title}"` : 'Recommended for You'}
          </h3>
          <div className="recommendations-list">
            {recommendedSongs.map((song) => (
              <div
                key={song._id}
                className="recommendation-item"
                onClick={() => onSongSelect && onSongSelect(song)}
              >
                <div className="rec-cover">
                  <img 
                    src={song.coverArt || 'https://via.placeholder.com/60x60/667eea/ffffff?text=Music'}
                    alt={song.title}
                    onError={(e) => e.target.src = 'https://via.placeholder.com/60x60/667eea/ffffff?text=Music'}
                  />
                  <div className="rec-play-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                      <polygon points="5 3 19 12 5 21 5 3"/>
                    </svg>
                  </div>
                </div>
                <div className="rec-info">
                  <h4 className="rec-title">{song.title}</h4>
                  <p className="rec-artist">{song.artist}</p>
                  <p className="rec-meta">{song.genre} • {song.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function to generate genre colors
const getGenreColor = (genre, shade) => {
  const colors = {
    'Pop': ['#FF6B9D', '#C06C84'],
    'Rock': ['#F67280', '#C06C84'],
    'Hip-Hop': ['#355C7D', '#2A4A5E'],
    'Electronic': ['#00D4FF', '#0099CC'],
    'R&B': ['#A8E6CF', '#56AB91'],
    'Jazz': ['#FFD93D', '#F4A261'],
    'Classical': ['#9D84B7', '#7B68A8'],
    'Country': ['#E8B4B8', '#D4959C'],
  };
  
  return colors[genre] ? colors[genre][shade] : (shade === 0 ? '#667eea' : '#764ba2');
};

export default Suggestions;
