import { useState, useEffect, useRef } from 'react';
import playlistData from './data/playlists.json';
import {
  playTrackByIndex,
  playNextTrack,
  playPreviousTrack,
  handleAudioError,
} from './Utils/utils';

function App() {
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [currentTrack, setCurrentTrack] = useState<any>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentPlaylistIndex, setCurrentPlaylistIndex] = useState<number>(0);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [isShuffled, setIsShuffled] = useState(false);
  const [shuffledTracks, setShuffledTracks] = useState<any[]>([]);

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

  const shufflePlaylist = () => {
    setIsShuffled((prev) => !prev);
    if (!isShuffled) {
      const allTracks = playlists.flatMap((playlist) => playlist.tracks);
      const shuffled = [...allTracks].sort(() => Math.random() - 0.5);
      setShuffledTracks(shuffled);
      playTrackByIndex(
        0,
        0,
        [{ tracks: shuffled }],
        setCurrentPlaylistIndex,
        setCurrentTrackIndex,
        setCurrentTrack,
        audioRef
      );
      setCurrentPlaylistIndex(0);
      setCurrentTrackIndex(0);
    } else {
      playTrackByIndex(
        currentPlaylistIndex,
        currentTrackIndex,
        playlists,
        setCurrentPlaylistIndex,
        setCurrentTrackIndex,
        setCurrentTrack,
        audioRef
      );
    }
  };

  const playNext = () => {
    if (isShuffled) {
      if (currentTrackIndex + 1 < shuffledTracks.length) {
        playTrackByIndex(
          0,
          currentTrackIndex + 1,
          [{ tracks: shuffledTracks }],
          setCurrentPlaylistIndex,
          setCurrentTrackIndex,
          setCurrentTrack,
          audioRef
        );
      }
    } else {
      playNextTrack(
        playlists,
        currentPlaylistIndex,
        currentTrackIndex,
        setCurrentPlaylistIndex,
        setCurrentTrackIndex,
        setCurrentTrack,
        audioRef
      );
    }
  };

  const playPrevious = () => {
    if (isShuffled) {
      if (currentTrackIndex > 0) {
        playTrackByIndex(
          0,
          currentTrackIndex - 1,
          [{ tracks: shuffledTracks }],
          setCurrentPlaylistIndex,
          setCurrentTrackIndex,
          setCurrentTrack,
          audioRef
        );
      }
    } else {
      playPreviousTrack(
        playlists,
        currentPlaylistIndex,
        currentTrackIndex,
        setCurrentPlaylistIndex,
        setCurrentTrackIndex,
        setCurrentTrack,
        audioRef
      );
    }
  };

  return (
    <div style={{ cursor: 'default' }}>
      <h1>Music Player</h1>
      {currentTrack && (
        <div>
          <p>Now playing: {currentTrack.name}</p>
          <audio ref={audioRef} controls />
          <div>
            <button onClick={playPrevious}>Previous</button>
            <button onClick={playNext}>Next</button>
            <button onClick={shufflePlaylist}>
              {isShuffled ? 'Unshuffle' : 'Shuffle'}
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
                style={{ cursor: 'pointer' }}>
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