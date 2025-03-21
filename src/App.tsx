import { useState, useEffect, useRef } from 'react';
import playlistData from './data/playlists.json';

function App() {
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [currentTrack, setCurrentTrack] = useState<any>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

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

  return (
    <div>
      <h1>Music Player</h1>
      {currentTrack && (
        <div>
          <p>Now playing: {currentTrack.name}</p>
          <audio ref={audioRef} controls />
        </div>
      )}
      {playlists.map((playlist, index) => (
        <div key={index}>
          <h2>{playlist.name}</h2>
          <ul>
            {playlist.tracks.map((track: any, trackIndex: number) => (
              <li key={trackIndex} onClick={() => playTrack(track)}>
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
