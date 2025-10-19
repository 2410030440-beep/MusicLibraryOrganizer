import React, { useState, useRef, useEffect } from 'react';
import '../styles/audioplayer.css';

const AudioPlayer = ({ song, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef(null);
  
  // Check if it's a YouTube video
  const isYouTube = song?.youtubeId || song?.audioUrl?.includes('youtube.com');
  const youtubeEmbedUrl = song?.youtubeId 
    ? `https://www.youtube.com/embed/${song.youtubeId}?autoplay=1&enablejsapi=1`
    : null;

  useEffect(() => {
    if (audioRef.current && !isYouTube) {
      audioRef.current.volume = volume;
    }
  }, [volume, isYouTube]);

  useEffect(() => {
    // Auto-play when song changes (only for non-YouTube)
    if (song && !isYouTube) {
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.play().catch(err => console.error('Playback error:', err));
      }
    }
  }, [song, isYouTube]);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (e) => {
    const newTime = (e.target.value / 100) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!song) return null;

  return (
    <div className="audio-player-container">
      <div className="audio-player">
        <button className="close-btn" onClick={onClose} aria-label="Close player">
          ×
        </button>
        
        <div className="player-content">
          <div className="album-art">
            <img 
              src={song.coverArt || 'https://via.placeholder.com/120x120/667eea/ffffff?text=Music'} 
              alt={song.title}
              onError={(e) => e.target.src = 'https://via.placeholder.com/120x120/667eea/ffffff?text=Music'}
            />
            <div className={`equalizer ${isPlaying ? 'playing' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          
          <div className="player-info">
            <h3 className="now-playing-title">{song.title}</h3>
            <p className="now-playing-artist">{song.artist}</p>
            <p className="now-playing-album">{song.album} • {song.genre}</p>
            {song.youtubeUrl && (
              <a 
                href={song.youtubeUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="spotify-full-link"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                Watch Full Video on YouTube
              </a>
            )}
            {song.spotifyUrl && (
              <a 
                href={song.spotifyUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="spotify-full-link"
                style={{ background: '#1DB954', marginTop: '0.5rem' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
                Play on Spotify
              </a>
            )}
          </div>
          
          <div className="player-controls">
            {isYouTube ? (
              <div className="youtube-player-container">
                <iframe
                  width="100%"
                  height="300"
                  src={youtubeEmbedUrl}
                  title={song.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ borderRadius: '12px', marginTop: '1rem' }}
                ></iframe>
                <p className="youtube-note">🎬 Playing from YouTube - Full song available!</p>
              </div>
            ) : (
              <>
                <div className="progress-container">
              <span className="time-current">{formatTime(currentTime)}</span>
              <input
                type="range"
                className="progress-bar"
                min="0"
                max="100"
                value={(currentTime / duration) * 100 || 0}
                onChange={handleSeek}
              />
              <span className="time-duration">{formatTime(duration)}</span>
            </div>
            
            <div className="controls-buttons">
              <button className="control-btn" aria-label="Previous">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
                </svg>
              </button>
              
              <button className="control-btn play-btn" onClick={togglePlayPause} aria-label={isPlaying ? 'Pause' : 'Play'}>
                {isPlaying ? (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16"/>
                    <rect x="14" y="4" width="4" height="16"/>
                  </svg>
                ) : (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3"/>
                  </svg>
                )}
              </button>
              
              <button className="control-btn" aria-label="Next">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 18h2V6h-2zm-11.5-6L13 6v12z"/>
                </svg>
              </button>
            </div>
            
            <div className="volume-control">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
              </svg>
              <input
                type="range"
                className="volume-slider"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
              />
            </div>
            </>
            )}
          </div>
        </div>
        
        {!isYouTube && (
          <audio
            ref={audioRef}
            src={song.audioUrl}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
          />
        )}
      </div>
    </div>
  );
};

export default AudioPlayer;
