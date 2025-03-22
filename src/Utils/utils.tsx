export const playTrack = (
    track: any,
    audioRef: React.RefObject<HTMLAudioElement>,
    setCurrentTrack: React.Dispatch<React.SetStateAction<any>>
  ) => {
    setCurrentTrack(track);
    if (audioRef.current) {
      audioRef.current.src = track.url;
      audioRef.current.play();
    }
  };
  
  export const playTrackByIndex = (
    playlistIndex: number,
    trackIndex: number,
    playlists: any[],
    setCurrentPlaylistIndex: React.Dispatch<React.SetStateAction<number>>,
    setCurrentTrackIndex: React.Dispatch<React.SetStateAction<number>>,
    setCurrentTrack: React.Dispatch<React.SetStateAction<any>>,
    audioRef: React.RefObject<HTMLAudioElement>
  ) => {
    if (playlists[playlistIndex] && playlists[playlistIndex].tracks[trackIndex]) {
      const track = playlists[playlistIndex].tracks[trackIndex];
      setCurrentPlaylistIndex(playlistIndex);
      setCurrentTrackIndex(trackIndex);
      setCurrentTrack(track); // Explicitly set currentTrack here
    if (audioRef.current) {
      audioRef.current.src = track.url;
      audioRef.current.play();
    }
    }
  };
  
  export const playNextTrack = (
    playlists: any[],
    currentPlaylistIndex: number,
    currentTrackIndex: number,
    setCurrentPlaylistIndex: React.Dispatch<React.SetStateAction<number>>,
    setCurrentTrackIndex: React.Dispatch<React.SetStateAction<number>>,
    setCurrentTrack: React.Dispatch<React.SetStateAction<any>>,
    audioRef: React.RefObject<HTMLAudioElement>
  ) => {
    if (!playlists.length || !playlists[currentPlaylistIndex]) return;
  
    const currentPlaylist = playlists[currentPlaylistIndex];
    const nextTrackIndex = currentTrackIndex + 1;
  
    if (nextTrackIndex < currentPlaylist.tracks.length) {
      playTrackByIndex(currentPlaylistIndex, nextTrackIndex, playlists, setCurrentPlaylistIndex, setCurrentTrackIndex, setCurrentTrack, audioRef);
    } else if (currentPlaylistIndex + 1 < playlists.length) {
      playTrackByIndex(currentPlaylistIndex + 1, 0, playlists, setCurrentPlaylistIndex, setCurrentTrackIndex, setCurrentTrack, audioRef);
    }
  };
  
  export const playPreviousTrack = (
    playlists: any[],
    currentPlaylistIndex: number,
    currentTrackIndex: number,
    setCurrentPlaylistIndex: React.Dispatch<React.SetStateAction<number>>,
    setCurrentTrackIndex: React.Dispatch<React.SetStateAction<number>>,
    setCurrentTrack: React.Dispatch<React.SetStateAction<any>>,
    audioRef: React.RefObject<HTMLAudioElement>
  ) => {
    if (!playlists.length || !playlists[currentPlaylistIndex]) return;
  
    if (currentTrackIndex > 0) {
      playTrackByIndex(currentPlaylistIndex, currentTrackIndex - 1, playlists, setCurrentPlaylistIndex, setCurrentTrackIndex, setCurrentTrack, audioRef);
    } else if (currentPlaylistIndex > 0) {
      const previousPlaylist = playlists[currentPlaylistIndex - 1];
      playTrackByIndex(currentPlaylistIndex - 1, previousPlaylist.tracks.length - 1, playlists, setCurrentPlaylistIndex, setCurrentTrackIndex, setCurrentTrack, audioRef);
    }
  };

  export const handleAudioError = (
    playlists: any[],
    currentPlaylistIndex: number,
    currentTrackIndex: number,
    setCurrentPlaylistIndex: React.Dispatch<React.SetStateAction<number>>,
    setCurrentTrackIndex: React.Dispatch<React.SetStateAction<number>>,
    setCurrentTrack: React.Dispatch<React.SetStateAction<any>>,
    audioRef: React.RefObject<HTMLAudioElement>
  ) => {
    console.error('Error loading audio. Playing next track.');
    playNextTrack(
      playlists,
      currentPlaylistIndex,
      currentTrackIndex,
      setCurrentPlaylistIndex,
      setCurrentTrackIndex,
      setCurrentTrack,
      audioRef
    );
  };