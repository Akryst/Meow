/**
 * Main Application Entry Point
 * Coordinates all modules and initializes the app
 */

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Main initialization function
function initializeApp() {
    console.log('Loading...');

    // Initialize all modules
    TimeUtils.initTimeDisplay();
    MusicPlayer.initMusicPlayer();
    
    console.log('Loaded');
}
