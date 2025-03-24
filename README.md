# Linear Media Player

![Midea Player Screen Shot](/Public/MediaPlayer.png)

Hey, thanks for taking the time to work on this exercise. We're excited to see what you came up with – the goal was to create an audio player for playing a predefined playlist of audio files. Think of it like a stripped-down version of Spotify or the classic Winamp.

## Getting Started

This project is a React-based audio player that allows users to play through a predefined playlist of audio files.

### Installation

1. Clone this repository to your local machine:

    ```bash
    git clone git@github.com:M1TCH3llM/Linear-Music-Player-.git
    cd Linear-Music-Player-
    ```

2. Install the dependencies using npm:

    ```bash
    npm install
    ```

### Running the Application

To start the development server, run:

```bash
npm run dev
```

This will launch the application in your default web browser.

## Features

Playlist Playback: Plays audio files from a predefined playlist.
Track Information: Displays the name of the currently playing track.
Basic Controls: Includes play/pause, next track, and previous track controls.
Shuffle Functionality: Allows users to shuffle the playlist.
Error Handling: Implements error handling for audio playback.
Styling: Custom CSS styling for a clean and user-friendly interface.
Responsive Design: Adapts to different screen sizes.

## Requirements

This project fulfills the requirements of creating a working media player that can play through a playlist of audio files, display information on the currently playing track, and support basic functionality like play/pause and next track.

## Playlist Data

The playlist data is stored in src/data/playlists.json. It includes a list of audio files and associated metadata. The data is imported directly into the application, eliminating the need for network requests.

## Attribution

This project includes music from the following albums:

"Deep House" by Nul Tiel Records is licensed under CC BY-NC-SA 4.0.
"Neither and Both" by Brylie Christopher Oxley is licensed under CC BY 4.0.

## Implementation Details

The application is built using React.
State management is handled using React's useState hook.
useEffect is used for side effects, such as loading the initial playlist and setting up audio error handling.
useRef is used to create a reference to the audio element.
Playlist manipulation logic (shuffle, next, previous) is extracted into a utility file (src/Utils/utils.js).
The application includes error handling for audio playback issues.

## Future Improvements

Add volume control.
Implement a progress bar for track playback.
Enhance the UI with more detailed track information and artwork.
Add support for additional audio file formats.
Improve accessibility.

## Author

Mitchell Morgan (M1TCH3llM)
