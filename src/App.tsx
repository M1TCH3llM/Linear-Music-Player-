import { useState, useEffect, useRef } from 'react';
import playlistData from './data/playlists.json';

function App() {
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [currentTrack, setCurrentTrack] = useState<any>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentPlaylistIndex, setCurrentPlaylistIndex] = useState<number>(0);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);


  useEffect(() => {
    setPlaylists(playlistData.playlists); 
  }, []);

  const playTrack = (track: any) => {
    setCurrentTrack(track);
    if (audioRef.current) {
      audioRef.current.src = track.url;
      audioRef.current.play();
    }
  };

  const playTrackByIndex = (playlistIndex: number, trackIndex: number) => {
    if (playlists[playlistIndex] && playlists[playlistIndex].tracks[trackIndex]) {
      const track = playlists[playlistIndex].tracks[trackIndex];
      setCurrentPlaylistIndex(playlistIndex);
      setCurrentTrackIndex(trackIndex);
      playTrack(track);
    }
  };

  const playNextTrack = () => {
    if (!playlists.length || !playlists[currentPlaylistIndex]) return;

    const currentPlaylist = playlists[currentPlaylistIndex];
    const nextTrackIndex = currentTrackIndex + 1;

    if (nextTrackIndex < currentPlaylist.tracks.length) {
      playTrackByIndex(currentPlaylistIndex, nextTrackIndex);
    } else if (currentPlaylistIndex + 1 < playlists.length) {
      playTrackByIndex(currentPlaylistIndex + 1, 0);
    }
  };

  const playPreviousTrack = () => {
    if (!playlists.length || !playlists[currentPlaylistIndex]) return;

    if (currentTrackIndex > 0) {
      playTrackByIndex(currentPlaylistIndex, currentTrackIndex - 1);
    } else if (currentPlaylistIndex > 0) {
      const previousPlaylist = playlists[currentPlaylistIndex - 1];
      playTrackByIndex(currentPlaylistIndex - 1, previousPlaylist.tracks.length - 1);
    }
  };

  return (
    <div>
      <h1>Music Player</h1>
      {currentTrack && (
        <div>
          <p>Now playing: {currentTrack.name}</p>
          <audio ref={audioRef} controls />
          <div>
            <button onClick={playPreviousTrack}>Previous</button>
            <button onClick={playNextTrack}>Next</button>
          </div>
        </div>
      )}
      {playlists.map((playlist, index) => (
        <div key={index}>
          <h2>{playlist.name}</h2>
          <ul>
            {playlist.tracks.map((track: any, trackIndex: number) => (
              <li key={trackIndex} onClick={() => playTrack(track)} style={{ cursor: 'pointer' }}>
                {track.name}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default App;
