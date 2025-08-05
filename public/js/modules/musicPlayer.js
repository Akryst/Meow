/**
 * Music Player Module
 * Handles audio playback with random song selection
 */

function initMusicPlayer() {
    // Songs list
    const songs = ['assets/songs/Song1.mp3', 'assets/songs/Song2.mp3'];
    let currentSongIndex = Math.floor(Math.random() * songs.length);
    let sound = null;

    const toggleBtn = document.querySelector('.toggle-play');
    const volumeSlider = document.getElementById('volume-slider');
    let isPlaying = false;

    function loadAndPlaySong(songIndex) {
        if (sound) {
            sound.stop();
            sound.unload();
        }

        sound = new Howl({
            src: [songs[songIndex]],
            volume: volumeSlider ? volumeSlider.value / 100 : 0.1,
            onend: playNextSong
        });

        sound.play();
        isPlaying = true;
        if (toggleBtn) toggleBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }

    function playNextSong() {
        let nextIndex;
        do {
            nextIndex = Math.floor(Math.random() * songs.length);
        } while (nextIndex === currentSongIndex && songs.length > 1);
        
        currentSongIndex = nextIndex;
        loadAndPlaySong(currentSongIndex);
    }

    // Volume control
    if (volumeSlider) {
        volumeSlider.addEventListener('input', (e) => {
            const volume = e.target.value / 100;
            if (sound) sound.volume(volume);
        });
    }

    // pause and play toggle
    if (toggleBtn) {
        toggleBtn.onclick = () => {
            if (!sound) {
                loadAndPlaySong(currentSongIndex);
                return;
            }

            if (isPlaying) {
                sound.pause();
                toggleBtn.innerHTML = '<i class="fas fa-play"></i>';
                isPlaying = false;
            } else {
                sound.play();
                toggleBtn.innerHTML = '<i class="fas fa-pause"></i>';
                isPlaying = true;
            }
        };
    }

    // Start playing the first song
    loadAndPlaySong(currentSongIndex);
}

// Export the module for global use
window.MusicPlayer = { initMusicPlayer };
