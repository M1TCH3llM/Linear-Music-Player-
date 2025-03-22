import { useState, useEffect, useRef } from 'react';
import playlistData from './data/playlists.json';
import { playTrackByIndex, playNextTrack,playPreviousTrack,handleAudioError} from './Utils/utils';

function App() {
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [currentTrack, setCurrentTrack] = useState<any>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentPlaylistIndex, setCurrentPlaylistIndex] = useState<number>(0);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);

  useEffect(() => {
    setPlaylists(playlistData.playlists);
    if (
      playlistData.playlists &&
      playlistData.playlists.length > 0 &&
      playlistData.playlists[0].tracks.length > 0
    ) {
      playTrackByIndex(
        0,
        0,
        playlistData.playlists,
        setCurrentPlaylistIndex,
        setCurrentTrackIndex,
        setCurrentTrack,
        audioRef
      );
    }
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onerror = () => {
        handleAudioError(
          playlists,
          currentPlaylistIndex,
          currentTrackIndex,
          setCurrentPlaylistIndex,
          setCurrentTrackIndex,
          setCurrentTrack,
          audioRef
        );
      };
    }
  }, [playlists, currentPlaylistIndex, currentTrackIndex, audioRef, setCurrentPlaylistIndex, setCurrentTrackIndex, setCurrentTrack]);

  return (
    <div style={{ cursor: 'default' }}>
      <h1>Music Player</h1>
      {currentTrack && (
        <div>
          <p>Now playing: {currentTrack.name}</p>
          <audio ref={audioRef} controls />
          <div>
            <button
              onClick={() =>
                playPreviousTrack(
                  playlists,
                  currentPlaylistIndex,
                  currentTrackIndex,
                  setCurrentPlaylistIndex,
                  setCurrentTrackIndex,
                  setCurrentTrack,
                  audioRef
                )
              }
            >
              Previous
            </button>
            <button
              onClick={() =>
                playNextTrack(
                  playlists,
                  currentPlaylistIndex,
                  currentTrackIndex,
                  setCurrentPlaylistIndex,
                  setCurrentTrackIndex,
                  setCurrentTrack,
                  audioRef
                )
              }
            >
              Next
            </button>
          </div>
        </div>
      )}
      {playlists.map((playlist, index) => (
        <div key={index}>
          <h2>{playlist.name}</h2>
          <ul>
            {playlist.tracks.map((track: any, trackIndex: number) => (
              <li
                key={trackIndex}
                onClick={() =>
                  playTrackByIndex(
                    index,
                    trackIndex,
                    playlists,
                    setCurrentPlaylistIndex,
                    setCurrentTrackIndex,
                    setCurrentTrack,
                    audioRef
                  )
                }
                style={{ cursor: 'pointer' }}
              >
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