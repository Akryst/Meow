/**
 * Music Player Module
 * Handles audio playback with random song selection
 */

function initMusicPlayer(config = {}) {
    if (config.enabled === false) {
        return;
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => initMusicPlayerInternal(config));
    } else {
        initMusicPlayerInternal(config);
    }
}

function initMusicPlayerInternal(config = {}) {

    const songs = config.tracks || ['assets/songs/Song1.mp3', 'assets/songs/Song2.mp3'];
    const defaultVolume = config.volume || 10;
    const autoplay = config.autoplay !== undefined ? config.autoplay : false;
    
    let currentSongIndex = Math.floor(Math.random() * songs.length);
    let sound = null;

    const toggleBtn = document.querySelector('.toggle-play');
    const volumeSlider = document.getElementById('volume-slider');
    let isPlaying = false;

    if (volumeSlider) {
        volumeSlider.value = defaultVolume;
    }

    function loadAndPlaySong(songIndex) {
        if (sound) {
            sound.stop();
            sound.unload();
        }

        sound = new Howl({
            src: [songs[songIndex]],
            volume: volumeSlider ? volumeSlider.value / 100 : defaultVolume / 100,
            onend: playNextSong,
            onloaderror: function(id, error) {
                playNextSong(); // Skip to next song if current fails
            }
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

    if (volumeSlider) {
        volumeSlider.addEventListener('input', (e) => {
            const volume = e.target.value / 100;
            if (sound) sound.volume(volume);
        });
    }

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
    } else {
        console.error('Toggle button not found - Music player controls unavailable');
    }


    if (autoplay) {
        setTimeout(() => {
            loadAndPlaySong(currentSongIndex);
        }, 1000);
    }
}

window.MusicPlayer = { initMusicPlayer };
