import React, { useState, useEffect } from 'react';
import SearchBar from './components/searchbar';
import SearchResults from './components/searchresults';
import AudioPlayer from './components/Audioplayer';
import Suggestions from './components/Suggestions';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import useSongSearch from './useSongSearch';
import './styles/app.css';

function App() {
  const [query, setQuery] = useState('');
  const [selectedSong, setSelectedSong] = useState(null);
  const [user, setUser] = useState(null);
  const [view, setView] = useState('search'); // 'search' or 'dashboard'
  const { songs, loading, error } = useSongSearch(query);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setView('search');
  };

  const handleSongSelect = (song) => {
    setSelectedSong(song);
  };

  const handleClosePlayer = () => {
    setSelectedSong(null);
  };

  // If not logged in, show login page
  if (!user) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  // If logged in, show dashboard or search
  if (view === 'dashboard') {
    return <Dashboard user={user} onLogout={handleLogout} onBackToSearch={() => setView('search')} />;
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18V5l12-2v13"/>
              <circle cx="6" cy="18" r="3"/>
              <circle cx="18" cy="16" r="3"/>
            </svg>
            <h1>🎵 Music Library Organizer</h1>
          </div>
          <div className="header-nav">
            <button className="nav-btn active">Search</button>
            <button className="nav-btn" onClick={() => setView('dashboard')}>My Library</button>
            <div className="user-badge" onClick={() => setView('dashboard')}>
              <div className="user-avatar-small">{user.name.charAt(0).toUpperCase()}</div>
              <span>{user.name}</span>
            </div>
          </div>
          <p className="tagline">Discover, Search, and Play Your Favorite Music</p>
        </div>
      </header>

      <main className="app-main">
        <div className="search-section">
          <SearchBar query={query} setQuery={setQuery} />
        </div>

        {error && (
          <div className="error-message">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <p>Error loading songs: {error}</p>
          </div>
        )}

        {query ? (
          <SearchResults 
            results={songs} 
            onSelect={handleSongSelect}
            loading={loading}
            user={user}
          />
        ) : (
          <div className="home-content">
            <div className="welcome-banner">
              <h2>Welcome back, {user.name}!</h2>
              <p>Search for your favorite songs, artists, albums, or browse by genre</p>
              <div className="stats">
                <div className="stat-item">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M9 18V5l12-2v13"/>
                    <circle cx="6" cy="18" r="3"/>
                    <circle cx="18" cy="16" r="3"/>
                  </svg>
                  <span>Millions of Songs</span>
                </div>
                <div className="stat-item">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  <span>Multiple Artists</span>
                </div>
                <div className="stat-item">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="10"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                  <span>All Languages</span>
                </div>
              </div>
            </div>
            
            <Suggestions 
              currentSong={selectedSong} 
              onSongSelect={handleSongSelect}
            />
          </div>
        )}
      </main>

      {selectedSong && (
        <AudioPlayer 
          song={selectedSong} 
          onClose={handleClosePlayer}
        />
      )}

      <footer className="app-footer">
        <p>© 2025 Music Library Organizer. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
